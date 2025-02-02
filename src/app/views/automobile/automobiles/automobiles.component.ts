import {Component, HostListener, OnInit} from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {ModelType} from "../../../../types/model.type";
import {ModelsService} from "../../../shared/services/models.service";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-automobiles',
  templateUrl: './automobiles.component.html',
  styleUrls: ['./automobiles.component.css']
})
export class AutomobilesComponent implements OnInit {

  searchField = new FormControl();
  automobiles: AutomobileResponseType[] = [];
  models: ModelType[] = [];

  constructor(private automobilesService: AutomobilesService,
              private modelsService: ModelsService,
              private router: Router) { }

  ngOnInit(): void {
    this.automobilesService.getAutomobiles()
      .subscribe((data: AutomobileResponseType[]) => {
        this.automobiles = data;
      });

    this.modelsService.getModels()
      .subscribe((modelData: ModelType[]) => {
        this.models = modelData;
      });

    this.searchField.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        if (value && value.length > 0) {
          this.automobilesService.searchAutomobile(value)
            .subscribe((data: AutomobileResponseType[]) => {
              this.automobiles = data;
            });
        } else {
          this.automobilesService.getAutomobiles()
            .subscribe((data: AutomobileResponseType[]) => {
              this.automobiles = data;
            });
        }
      });
  }
}
