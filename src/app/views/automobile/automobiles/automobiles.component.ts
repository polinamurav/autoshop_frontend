import { Component, OnInit } from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {ModelType} from "../../../../types/model.type";

@Component({
  selector: 'app-automobiles',
  templateUrl: './automobiles.component.html',
  styleUrls: ['./automobiles.component.css']
})
export class AutomobilesComponent implements OnInit {

  automobiles: AutomobileResponseType[] = [];
  models: ModelType[] = [];
  selectedCarModel: number = 1;

  constructor(private automobilesService: AutomobilesService) { }

  ngOnInit(): void {
    this.automobilesService.getAutomobiles()
      .subscribe((data: AutomobileResponseType[]) => {
        this.automobiles = data;
      });

    this.automobilesService.getModels()
      .subscribe((modelData: ModelType[]) => {
        this.models = modelData;
      });
  }

}
