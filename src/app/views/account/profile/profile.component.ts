import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../shared/services/profile.service";
import {SignupResponseType} from "../../../../types/signup-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}$')]],
    email: ['', [Validators.required, Validators.email]],
  })

  private originalProfileData!: SignupResponseType;

  constructor(private profileService: ProfileService,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.profileService.getProfile()
      .subscribe((data: SignupResponseType) => {
        this.originalProfileData = {...data};
        this.profileForm.patchValue(data);
      });
  }

  updateProfile() {
    if (this.profileForm.valid && this.profileForm.value.name && this.profileForm.value.phone && this.profileForm.value.email) {
      const updatedProfile: { name?: string; phone?: string; email?: string } = {};

      if (this.profileForm.value.name !== this.originalProfileData.name) {
        updatedProfile.name = this.profileForm.value.name;
      }
      if (this.profileForm.value.phone !== this.originalProfileData.phone) {
        updatedProfile.phone = this.profileForm.value.phone;
      }
      if (this.profileForm.value.email !== this.originalProfileData.email) {
        updatedProfile.email = this.profileForm.value.email;
      }

      if (Object.keys(updatedProfile).length > 0) {
        this.profileService.updateProfile(updatedProfile)
          .subscribe({
            next: (data: DefaultResponseType | SignupResponseType) => {
              let error = null;
              if ((data as DefaultResponseType).status === 400) {
                error = (data as DefaultResponseType).message;
              }

              if (error) {
                this._snackBar.open(error);
                throw new Error(error);
              }

              this._snackBar.open('Вы успешно обновили пользователя!');
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                this._snackBar.open(errorResponse.error.message);
              } else {
                this._snackBar.open('Ошибка обновления');
              }
            }
          });
      } else {
        this._snackBar.open('Нет изменений для отправки');
      }
    }
  }
}
