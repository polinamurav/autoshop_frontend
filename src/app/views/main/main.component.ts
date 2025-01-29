import { Component, OnInit } from '@angular/core';
import {AutomobileResponseType} from "../../../types/automobile-response.type";
import {AutomobilesService} from "../../shared/services/automobiles.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  automobiles: AutomobileResponseType[] = [];

  constructor(private automobileService: AutomobilesService) { }

  ngOnInit(): void {
    this.automobileService.getAutomobiles()
      .subscribe((data: AutomobileResponseType[]) => {
        this.automobiles = data;
      });
  }

}
