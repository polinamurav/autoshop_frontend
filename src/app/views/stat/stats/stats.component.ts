import { Component, OnInit } from '@angular/core';
import {StatService} from "../../../shared/services/stat.service";
import {StatResponseType} from "../../../../types/stat-response.type";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  statistics!: StatResponseType;

  constructor(private statService: StatService) { }

  ngOnInit(): void {
    this.statService.getStats()
      .subscribe((data: StatResponseType) => {
        this.statistics = data;
      });
  }

  statsReset() {

  }

}
