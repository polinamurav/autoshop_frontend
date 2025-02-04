import {Component, OnInit} from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {ModelType} from "../../../../types/model.type";
import {ModelsService} from "../../../shared/services/models.service";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {EngineTypeUtil} from "../../../shared/utils/engine-type.util";

@Component({
  selector: 'app-automobiles',
  templateUrl: './automobiles.component.html',
  styleUrls: ['./automobiles.component.css']
})
export class AutomobilesComponent implements OnInit {

  searchField = new FormControl();
  automobiles: AutomobileResponseType[] = [];
  models: ModelType[] = [];
  isAdmin: boolean = false;

  constructor(private automobilesService: AutomobilesService,
              private authService: AuthService,
              private modelsService: ModelsService,
              private router: Router) {
    this.isAdmin = this.authService.getIsAdminIn();
  }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdminIn: boolean) => {
      this.isAdmin = isAdminIn;
    });

    this.automobilesService.getAutomobiles()
      .subscribe((data: AutomobileResponseType[]) => {
        this.automobiles = data;

        this.automobiles = data.map(item => {
          const engineType = EngineTypeUtil.getEngineType(item.engineType);

          item.engineTypeRus = engineType.name;
          return item;
        });
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

              this.automobiles = data.map(item => {
                const engineType = EngineTypeUtil.getEngineType(item.engineType);

                item.engineTypeRus = engineType.name;
                return item;
              });
            });
        } else {
          this.automobilesService.getAutomobiles()
            .subscribe((data: AutomobileResponseType[]) => {
              this.automobiles = data;

              this.automobiles = data.map(item => {
                const engineType = EngineTypeUtil.getEngineType(item.engineType);

                item.engineTypeRus = engineType.name;
                return item;
              });
            });
        }
      });
  }
}
