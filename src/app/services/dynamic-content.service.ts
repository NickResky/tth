import { ElementTypes } from './../shared/constants/element_types';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DynamicContentService {

  constructor(private http: HttpClient) { }

  // production
  apiUrl = 'https://zenkit.com/api/v1/';

  // development
  // apiUrl = 'https://localhost:9000/api/v1/';

  // Only necessary if zenkit collection is not public
  // TODO: Remove before release
  // headers.append('Authorization', 'Bearer ' + this.apiToken);

  fetchAndTransformZenkitListData(listShortId): Promise<any> {
    return this.fetchZenkitListData(listShortId)
      .then((results) => {
        return this.transformZenkitListData(results);
      });
  }

  fetchList(listId): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders();
    // headers.append('Authorization', 'Bearer ' + this.apiToken);
    return this.http
      .get(this.apiUrl + 'lists/' + listId, { headers: headers })
      .toPromise();
  }

  fetchListElements(listId): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders();
    // headers.append('Authorization', 'Bearer ' + this.apiToken);
    return this.http
      .get(this.apiUrl + 'lists/' + listId + '/elements', { headers: headers })
      .toPromise();
  }

  fetchListEntriesInKanbanMode(elementIdX: string, listId): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders();
    // headers.append('Authorization', 'Bearer ' + this.apiToken);
    const httpRequestBody = {
      filter: {
        AND: {
          TERMS: []
        }
      },
      elementIdX: elementIdX
    };
    return this.http
      .post(this.apiUrl + 'lists/' + listId + '/entries/filter/kanban', httpRequestBody, { headers: headers })
      .toPromise();
  }

  async fetchZenkitListData(listId: string): Promise<any> {

    const [list, elements] = await Promise.all([this.fetchList(listId), this.fetchListElements(listId)]);

    const sectionElement: any = _.find(elements, {
      name: 'Labels',
      elementcategory: 6
    });

    if (_.has(sectionElement, ['id']) === false) {
      // tslint:disable-next-line:max-line-length
      throw new Error('Missing Section Field! Please define a field called "Labels" for the Zenkit Collection ' + list.name + '.');
    }

    const entries = await this.fetchListEntriesInKanbanMode(sectionElement.id, listId);
    return {
      list: list,
      elements: elements,
      kanbanEntries: entries,
      sectionElement: sectionElement
    };
  }

  transformZenkitListData(params): Promise<{}> {

    const getZenkitCollection = (list) => {
      return _.find(ZenkitCollections, {
        shortId: list.shortId
      });
    };

    const zenkitCollection = getZenkitCollection(params.list);

    const predefinedCategories: any = {};

    const modifiedRequiredElements = _
      .map(zenkitCollection.requiredElements, (requiredElement: any) => {
        const fullElement: any = _.find(params.elements, {
          name: requiredElement.name
        });
        if (_.isNil(fullElement)) {
          throw new Error('Element ' + requiredElement.name + ' in the Collection ' + params.list.name + ' was not found.');
        }
        // Save element data for labels
        if (_.isEqual(requiredElement.type, ElementTypes.labels)) {
          requiredElement.predefinedCategories = fullElement.elementData.predefinedCategories;
          const predefinedCategory = _.map(requiredElement.predefinedCategories, (c) => {
            return {
              name: c.name,
              id: c.id,
              colorHex: c.colorHex
            };
          });
          predefinedCategories[requiredElement.mappedClassPropertyName] = (predefinedCategory);
        }
        requiredElement.uuid = fullElement.uuid;
        return requiredElement;
      });

    const modifiedEntries = _
      .map(params.kanbanEntries.kanbanData, (entry) => {

        const labelIds = entry[params.sectionElement.uuid + '_categories'];
        const label = _.find(params.sectionElement.elementData.predefinedCategories, {
          id: _.head(labelIds)
        });

        const simplifiedEntry = {
          label: _.get(label, ['name']),
          uuid: entry.uuid,
          shortId: entry.shortId
        };

        return _.reduce(modifiedRequiredElements, (modifiedEntry, modifiedElement) => {
          // Handle label elements
          let value;
          if (_.isEqual(modifiedElement.type, ElementTypes.labels)) {
            const labelsIds1 = entry[modifiedElement.uuid + '_' + modifiedElement.type.category];

            if (_.isEmpty(labelsIds1) === false) {
              value = _.map(labelsIds1, (labelId) => {
                const _label = _.find(modifiedElement.predefinedCategories, {
                  id: labelId
                });
                return _.get(_label, ['name']);
              });
            }
            // Handle other elements
          } else {
            value = entry[modifiedElement.uuid + '_' + modifiedElement.type.category];
          }
          modifiedEntry[modifiedElement.mappedClassPropertyName] = value;
          return modifiedEntry;
        }, simplifiedEntry);
      });
    return new Promise((resolve, reject) => {
      return resolve({
        entries: modifiedEntries,
        prefefinedCategories: predefinedCategories
      });
    });
  }

  getFileSrc(fileShortId, listShortId) {
    return (fileShortId && listShortId) ? this.apiUrl + 'lists/' + listShortId + '/files/' + fileShortId : '';
  }
}

