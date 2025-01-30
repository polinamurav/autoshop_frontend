import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../../../shared/services/application.service";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }

}
