import {Component, OnInit} from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.css']
})
export class AutomobileComponent implements OnInit {

  automobile!: AutomobileResponseType;

  constructor(private automobileService: AutomobilesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.automobileService.getAutomobile(params['id'])
        .subscribe((data: AutomobileResponseType) => {
          this.automobile = data;
        });
    });
  }

}
