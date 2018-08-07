
import { Component, OnInit } from '@angular/core';
import {DynamicContentService} from "../../services/dynamic-content.service";
import {ModelService} from "../../services/model.service";
import {Imprint} from "../../classes/imprint";
import {ZenkitCollections} from "../../shared/constants/zenkit-collections";


@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  title: string;
  description: string;

  ngOnInit() {
    this.modelService.getImprint().then((imprint: Imprint) => {
      this.title = imprint.title;
      this.description = imprint.description;
    });
  }

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) {}

}
