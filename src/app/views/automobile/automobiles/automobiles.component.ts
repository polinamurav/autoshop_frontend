import { Component, OnInit } from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {ModelType} from "../../../../types/model.type";
import {ModelsService} from "../../../shared/services/models.service";

@Component({
  selector: 'app-automobiles',
  templateUrl: './automobiles.component.html',
  styleUrls: ['./automobiles.component.css']
})
export class AutomobilesComponent implements OnInit {

  automobiles: AutomobileResponseType[] = [];
  models: ModelType[] = [];
  selectedCarModel: number = 1;

  constructor(private automobilesService: AutomobilesService,
              private modelsService: ModelsService) { }

  ngOnInit(): void {
    this.automobilesService.getAutomobiles()
      .subscribe((data: AutomobileResponseType[]) => {
        this.automobiles = data;
      });

    this.modelsService.getModels()
      .subscribe((modelData: ModelType[]) => {
        this.models = modelData;
      });
  }

}
