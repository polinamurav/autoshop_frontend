import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../../../shared/services/application.service";
import {ApplicationResponseType} from "../../../../types/application-response.type";
import {AuthService} from "../../../core/auth/auth.service";
import {StatusTypeType} from "../../../../types/status-type.type";
import {StatusUtil} from "../../../shared/utils/status.util";

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
              private authService: AuthService) {
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

          item.statusRus = status.name;
          return item;
        });
      });
  }

  deleteApplication() {

  }

  doneApplication() {

  }

  rejectApplication() {

  }
}
