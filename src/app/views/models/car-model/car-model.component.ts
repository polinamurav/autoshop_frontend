import { Component, OnInit } from '@angular/core';
import {ModelType} from "../../../../types/model.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {ModelsService} from "../../../shared/services/models.service";

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.css']
})
export class CarModelComponent implements OnInit {

  models: ModelType[] = [];
  addModelForm = this.fb.group({
    name: ['', Validators.required],
  })

  constructor(private router: Router,
              private automobilesService: AutomobilesService,
              private modelsService: ModelsService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.modelsService.getModels()
      .subscribe((modelData: ModelType[]) => {
        this.models = modelData;
      });
  }

  addModel() {
    if (this.addModelForm.valid && this.addModelForm.value.name) {
      this.modelsService.addModel({name: this.addModelForm.value.name}).subscribe({
        next: (data: ModelType | DefaultResponseType) => {
          let error = null;
          if ((data as DefaultResponseType).status === 400) {
            error = (data as DefaultResponseType).message;
          }

          const modelResponse = data as ModelType;
          if (!modelResponse.id || !modelResponse.name) {
            error = 'Ошибка добавления модели';
          }

          if (error) {
            this._snackBar.open(error);
            throw new Error(error);
          }

          this.models.push(modelResponse);
          this.addModelForm.reset();
          this._snackBar.open('Модель успешно добавлен!');
          // this.router.navigate(['/models']);
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

  updateModel(model: ModelType) {
    this.modelsService.updateModel(model).subscribe({
      next: (data: ModelType | DefaultResponseType) => {
        if ((data as DefaultResponseType).status === 400) {
          this._snackBar.open((data as DefaultResponseType).message);
          return;
        }
        this._snackBar.open('Модель успешно обновлена!');
      },
      error: (errorResponse: HttpErrorResponse) => {
        this._snackBar.open('Ошибка обновления');
      }
    });
  }

  deleteModel(model: ModelType) {
    this.modelsService.deleteModel(model).subscribe({
      next: () => {
        this.models = this.models.filter(m => m.id !== model.id);
        this._snackBar.open('Модель успешно удалена!');
      },
      error: (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          this._snackBar.open(errorResponse.error.message);
        } else {
          this._snackBar.open('Ошибка удаления');
        }
      }
    });
  }

}
