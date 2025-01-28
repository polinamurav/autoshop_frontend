import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {AutomobilesService} from "../../shared/services/automobiles.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  automobiles: ProductType[] = [];

  constructor(private automobileService: AutomobilesService) { }

  ngOnInit(): void {
    this.automobileService.getAutomobiles()
      .subscribe((data: ProductType[]) => {
        this.automobiles = data;
      });
  }

}
