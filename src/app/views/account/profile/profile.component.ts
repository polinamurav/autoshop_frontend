import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../shared/services/profile.service";
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {SignupResponseType} from "../../../../types/signup-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {EngineTypeType} from "../../../../types/engine-type.type";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: SignupResponseType;
  profileForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}$')]],
    email: ['', [Validators.required, Validators.email]],
  })


  constructor(private profileService: ProfileService,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.profileService.getProfile()
      .subscribe((data: SignupResponseType) => {
        this.profileForm.patchValue(data);
      });
  }

  updateProfile() {

  }
}
