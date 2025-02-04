import {Component, Input, OnInit} from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";

@Component({
  selector: 'automobile-card',
  templateUrl: './automobile-card.component.html',
  styleUrls: ['./automobile-card.component.css']
})
export class AutomobileCardComponent implements OnInit {

  @Input() automobiles: AutomobileResponseType[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
