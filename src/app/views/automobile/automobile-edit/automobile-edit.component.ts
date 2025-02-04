import {Component, OnInit} from '@angular/core';
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {EngineTypeType} from "../../../../types/engine-type.type";
import {ModelType} from "../../../../types/model.type";
import {ModelsService} from "../../../shared/services/models.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {EngineTypeUtil} from "../../../shared/utils/engine-type.util";

@Component({
  selector: 'app-automobile-edit',
  templateUrl: './automobile-edit.component.html',
  styleUrls: ['./automobile-edit.component.css']
})
export class AutomobileEditComponent implements OnInit {

  models: ModelType[] = [];
  engineTypes = Object.values(EngineTypeType).map(type => ({
    value: type,
    label: EngineTypeUtil.getEngineType(type).name
  }));
  automobileForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    origin: ['', Validators.required],
    count: [0, Validators.required],
    engineType: [EngineTypeType.DIESEL, Validators.required],
    carModelId: [0, Validators.required],
    photo: ['']
  })
  originAutomobile!: AutomobileResponseType;

  constructor(private automobileService: AutomobilesService,
              private modelsService: ModelsService,
              private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.automobileService.getAutomobile(params['id'])
        .subscribe((data: AutomobileResponseType) => {
          this.originAutomobile = {...data};
          // this.automobileForm.patchValue(data);
          this.automobileForm.patchValue({
            name: data.name,
            price: data.price,
            origin: data.origin,
            count: data.count,
            engineType: data.engineType,
            carModelId: data.carModelId
          });
        });
    });

    this.modelsService.getModels()
      .subscribe((modelData: ModelType[]) => {
        this.models = modelData;
      });
  }

  updateAuto() {
    if (this.automobileForm.valid) {
      const formData = new FormData();

      const updatedAuto: Partial<AutomobileResponseType> = {};
      Object.keys(this.automobileForm.controls).forEach((key) => {
        const formValue = this.automobileForm.get(key)?.value;
        const originalValue = (this.originAutomobile as any)[key];

        if (formValue !== originalValue) {
          updatedAuto[key as keyof AutomobileResponseType] = formValue;
        }
      });

      if (Object.keys(updatedAuto).length > 0) {
        formData.append('auto', JSON.stringify(updatedAuto));
      }

      const fileInput = (document.querySelector('[formControlName="photo"]') as HTMLInputElement).files;
      if (fileInput && fileInput[0]) {
        formData.append('file', fileInput[0], fileInput[0].name);
      }

      const carModelId = this.automobileForm.value.carModelId;
      if (carModelId !== null && carModelId !== undefined) {
        formData.append('carModelId', carModelId.toString());
      }

      this.automobileService.updateAutomobile(this.originAutomobile.id, formData)
        .subscribe({
          next: (data: DefaultResponseType | AutomobileResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).status === 400) {
              error = (data as DefaultResponseType).message;
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            const automobileResponse = data as AutomobileResponseType;

            this._snackBar.open('Автомобиль успешно обновлен');
            this.router.navigate(['/automobiles/' + automobileResponse.id]);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка обновления');
            }
          }
        });
    }
  }

}
