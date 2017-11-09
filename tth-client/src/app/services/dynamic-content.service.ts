import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { BlogPost } from './../classes/blog-post';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import _ from 'lodash';

@Injectable()
export class DynamicContentService {

  constructor(private http: Http) { }

  // production
  apiUrl = 'https://zenkit.com/api/v1/';

  // development
  // apiUrl = 'https://localhost:9000/api/v1/';

  // Only necessary if zenkit collection is not public
  // TODO: Remove before release
  // apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5NzV9LCJpYXQiOjE1MDQ5ODc4Mzl9.j1BVnV32r_h2xZrTxUIsQWEDrzZjiEgzf6Sl6-UtfR0';

  fetchAndTransformZenkitListData(listShortId) {
    return this.fetchZenkitListData(listShortId)
      .then((results) => {
        return this.transformZenkitListData(results);
      });
  }

  fetchZenkitListData(listId: string) {
    const headers: Headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + this.apiToken);

    const fetchList = this.http
      .get(this.apiUrl + 'lists/' + listId, {headers: headers})
      .toPromise();

    const fetchListElements = this.http
      .get(this.apiUrl + 'lists/' + listId + '/elements', {headers: headers})
      .toPromise();

    const fetchListEntriesInKanbanMode = (elementIdX: string) => {
      const httpRequestBody = {
        filter: {
          AND: {
            TERMS: []
          }
        },
        elementIdX: elementIdX
      };
      return this.http
        .post(this.apiUrl + 'lists/' + listId + '/entries/filter/kanban', httpRequestBody, {headers: headers})
        .toPromise();
    };

    return Promise.all([fetchList, fetchListElements]).then((results) => {
      const listResponse = results[0];
      const elementsResponse = results[1];

      if (listResponse.status === 403  || elementsResponse.status === 403) {
        throw new Error('It seems like you do not have permission to access this collection');
      }
      if (listResponse.status !== 200 || elementsResponse.status !== 200) {
        throw new Error('Collection not found.');
      }

      return Promise
        .all([
          listResponse.json(),
          elementsResponse.json(),
        ])
        .then((results) => {
          const listJson = results[0];
          const elementsJson = results[1];

          const sectionElement = _.find(elementsJson, {
            name: 'Labels',
            elementcategory: 6
          });

          if (_.has(sectionElement, ['id']) === false) {
            throw new Error('Missing Section Field! Please define a field called "Sorted Items" for the Zenkit Collection ' + listJson.name + '.');
          }

          return fetchListEntriesInKanbanMode(sectionElement.id)
            .then((entriesResponse) => {

              if (entriesResponse.status === 403) {
                throw new Error('It seems like you do not have permission to access this collection (Collection ID:' + listId + ').');
              }

              if (entriesResponse.status !== 200) {
                throw new Error('Collection not found (Collection ID: ' + listId + ').');
              }

              const entriesJson = entriesResponse.json();

              return {
                list: listJson,
                elements: elementsJson,
                kanbanEntries: entriesJson,
                sectionElement: sectionElement
              };
            });
        });
    });
  }

  transformZenkitListData(params) {

    const getZenkitCollection = (list) => {
      return _.find(ZenkitCollections, {
        shortId: list.shortId
      });
    };

    const zenkitCollection = getZenkitCollection(params.list);

    const modifiedRequiredElements = _
      .map(zenkitCollection.requiredElements, (requiredElement) => {
        const fullElement = _.find(params.elements, {
          name: requiredElement.name
        });
        if (_.isNil(fullElement)) {
          throw new Error('Element ' + requiredElement.name + 'in the Collection ' + params.list.name + ' was not found.');
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
          label: label.name
        };

        return _.reduce(modifiedRequiredElements, (modifiedEntry, modifiedElement) => {

          const value = entry[modifiedElement.uuid + '_' + modifiedElement.type.category];
          modifiedEntry[modifiedElement.mappedClassPropertyName] = value;
          return modifiedEntry;
        }, simplifiedEntry);
      });

    return modifiedEntries;
  }

  getFileSrc(fileShortId, listShortId) {
    return (fileShortId && listShortId) ? this.apiUrl + 'lists/' + listShortId + '/files/' + fileShortId : '';
  }
}

