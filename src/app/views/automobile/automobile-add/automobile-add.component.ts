import { Component, OnInit } from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {AuthService} from "../../../core/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EngineTypeType} from "../../../../types/engine-type.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {ModelType} from "../../../../types/model.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModelsService} from "../../../shared/services/models.service";

@Component({
  selector: 'app-automobile-add',
  templateUrl: './automobile-add.component.html',
  styleUrls: ['./automobile-add.component.css']
})
export class AutomobileAddComponent implements OnInit {

  engineTypes = Object.values(EngineTypeType);
  automobiles: AutomobileResponseType[] = [];
  models: ModelType[] = [];
  selectedCarModel: number = 1;

  addAutomobileForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    origin: ['', Validators.required],
    count: ['', Validators.required],
    engineType: [EngineTypeType.DIESEL, Validators.required],
    carModelId: [''],
    photo: ['']
  })

  constructor(private router: Router,
              private automobilesService: AutomobilesService,
              private modelsService: ModelsService,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.modelsService.getModels()
      .subscribe((modelData: ModelType[]) => {
        this.models = modelData;
      });
  }

  addAutomobile() {
    if (this.addAutomobileForm.valid) {

      const formData = new FormData();
      formData.append('auto', JSON.stringify({
        name: this.addAutomobileForm.value.name,
        price: this.addAutomobileForm.value.price,
        origin: this.addAutomobileForm.value.origin,
        count: this.addAutomobileForm.value.count,
        engineType: this.addAutomobileForm.value.engineType,
        carModelId: this.addAutomobileForm.value.carModelId,
      }));

      const fileInput = (document.querySelector('[formControlName="photo"]') as HTMLInputElement).files;
      if (fileInput && fileInput[0]) {
        formData.append('file', fileInput[0], fileInput[0].name);
      }

      const carModelId = this.addAutomobileForm.value.carModelId;
      if (carModelId !== null && carModelId !== undefined) {
        formData.append('carModelId', carModelId.toString());
      }

      this.automobilesService.addAutomobile(formData).subscribe({
        next: (data: AutomobileResponseType | DefaultResponseType) => {
          let error = null;
          if ((data as DefaultResponseType).status === 400) {
            error = (data as DefaultResponseType).message;
          }

          const automobileResponse = data as AutomobileResponseType;
          // if (!automobileResponse.id || !automobileResponse.name || !automobileResponse.photo
          //   || !automobileResponse.origin || !automobileResponse.price || !automobileResponse.count
          //   || automobileResponse.engineType || !automobileResponse.carModel || !automobileResponse.applications
          //   || !automobileResponse.incomePrice || !automobileResponse.incomeCount) {
          //   error = 'Ошибка добавления';
          // }
          //
          // if (error) {
          //   // this._snackBar.open(error);
          //   throw new Error(error);
          // }

          this._snackBar.open('Автомобиль успешно добавлен!');
          this.router.navigate(['/automobiles/' + automobileResponse.id]);
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
            // console.log(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка добавления');
          }
        }
      });
    }
  }
}
