import {Component, OnInit} from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../core/auth/auth.service";
import {ApplicationService} from "../../../shared/services/application.service";

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.css']
})
export class AutomobileComponent implements OnInit {

  automobile!: AutomobileResponseType;
  isAdmin: boolean = false;
  isLogged: boolean = false;

  constructor(private automobileService: AutomobilesService,
              private authService: AuthService,
              private applicationService: ApplicationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.isAdmin = this.authService.getIsAdminIn();
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdminIn: boolean) => {
      this.isAdmin = isAdminIn;
    });

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.activatedRoute.params.subscribe(params => {
      this.automobileService.getAutomobile(params['id'])
        .subscribe((data: AutomobileResponseType) => {
          this.automobile = data;
        });
    });
  }

  deleteAuto(autoId: string) {
    this.automobileService.deleteAutomobile(autoId).subscribe({
      next: () => {
        this.router.navigate(['/automobiles']);
        this._snackBar.open('Автомобиль успешно удален!');
      },
      error: (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          this._snackBar.open(errorResponse.error.message);
        } else {
          this._snackBar.open('Ошибка удаления');
        }
      }
    })
  }

  makeAppointment(autoId: string) {
    this.applicationService.getUserApplication(autoId).subscribe({
      next: () => {
        this._snackBar.open('Заявка успешно добавлена!');
        this.router.navigate(['/applications']);
      },
      error: (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          this._snackBar.open(errorResponse.error.message);
        } else {
          this._snackBar.open('Ошибка добавления');
        }
      }
    })
  }
}
