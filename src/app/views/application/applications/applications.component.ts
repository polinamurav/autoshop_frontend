import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../../../shared/services/application.service";
import {ApplicationResponseType} from "../../../../types/application-response.type";
import {AuthService} from "../../../core/auth/auth.service";
import {StatusTypeType} from "../../../../types/status-type.type";
import {StatusUtil} from "../../../shared/utils/status.util";
import {EngineTypeUtil} from "../../../shared/utils/engine-type.util";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications: ApplicationResponseType[] = [];
  isAdmin: boolean = false;
  statusTypeTypes = StatusTypeType;

  constructor(private applicationService: ApplicationService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
    this.isAdmin = this.authService.getIsAdminIn();
  }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdminIn: boolean) => {
      this.isAdmin = isAdminIn;
    });

    this.applicationService.getApplications()
      .subscribe((data: ApplicationResponseType[]) => {
        this.applications = data;

        this.applications = data.map(item => {
          const status = StatusUtil.getStatus(item.status);
          const engineType = EngineTypeUtil.getEngineType(item.automobileEngineType);

          item.statusRus = status.name;
          item.color = status.color;
          item.automobileEngineTypeRus = engineType.name;
          return item;
        });
      });
  }

  deleteApplication(id: string) {
    this.applicationService.deleteApplications(id).subscribe({
      next: () => {
        this.applications = this.applications.filter(app => app.id !== id);
        this._snackBar.open('Заявка отказана!');
      },
      error: (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          this._snackBar.open(errorResponse.error.message);
        } else {
          this._snackBar.open('Ошибка отказа');
        }
      }
    })
  }

  doneApplication(id: string) {
    this.applicationService.doneApplications(id).subscribe({
      next: (data: ApplicationResponseType) => {
        this.applications = this.applications.map(app => {
          if (app.id === data.id) {
            const status = StatusUtil.getStatus(data.status);
            const engineType = EngineTypeUtil.getEngineType(data.automobileEngineType);

            return {
              ...app,
              ...data,
              statusRus: status.name,
              color: status.color,
              automobileEngineTypeRus: engineType.name
            };
          }
          return app;
        });
        this._snackBar.open('Заявка одобрена!');
      },
      error: (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          this._snackBar.open(errorResponse.error.message);
        } else {
          this._snackBar.open('Ошибка одобрения');
        }
      }
    })
  }

  rejectApplication(id: string) {
    this.applicationService.rejectApplications(id).subscribe({
      next: (data: ApplicationResponseType) => {
        this.applications = this.applications.map(app => {
          if (app.id === data.id) {
            const status = StatusUtil.getStatus(data.status);
            const engineType = EngineTypeUtil.getEngineType(data.automobileEngineType);

            return {
              ...app,
              ...data,
              statusRus: status.name,
              color: status.color,
              automobileEngineTypeRus: engineType.name
            };
          }
          return app;
        });
        this._snackBar.open('Заявка отменена');
      },
      error: (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          this._snackBar.open(errorResponse.error.message);
        } else {
          this._snackBar.open('Ошибка отмены');
        }
      }
    })
  }
}
