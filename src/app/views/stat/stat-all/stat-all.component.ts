import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StatAllResponseType } from "../../../../types/stat-all-response.type";
import { StatService } from "../../../shared/services/stat.service";
import html2pdf from "html2pdf.js";
import {StatResponseType} from "../../../../types/stat-response.type";

declare var google: any;

@Component({
  selector: 'app-stat-all',
  templateUrl: './stat-all.component.html',
  styleUrls: ['./stat-all.component.css']
})
export class StatAllComponent implements OnInit {

  @ViewChild('generatePdf') pdfContent!: ElementRef;

  statistics!: StatAllResponseType;
  statisticsAuto!: StatResponseType;

  constructor(private statService: StatService) { }

  ngOnInit(): void {
    this.statService.getStatAll()
      .subscribe((data: StatAllResponseType) => {
        this.statistics = data;
        this.loadGoogleCharts();
      });

    this.statService.getStats()
      .subscribe((data: StatResponseType) => {
        this.statisticsAuto = data;
      });
  }

  loadGoogleCharts(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.drawTop5IncomeChart();
      this.drawTop5CountChart();
      this.drawModelIncomeChart();
    });
  }

  drawTop5IncomeChart(): void {
    if (!this.statistics || !this.statistics.top5ByIncome) return;

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Автомобиль');
    data.addColumn('number', 'Прибыль');

    this.statistics.top5ByIncome.forEach(car => {
      data.addRow([car.name, car.incomePrice]);
    });

    const options = { title: 'ТОП-5 по прибыли', width: 600, height: 400 };
    const chart = new google.visualization.ColumnChart(document.getElementById('top5Income'));
    chart.draw(data, options);
  }

  drawTop5CountChart(): void {
    if (!this.statistics || !this.statistics.sortedByCount) return;

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Автомобиль');
    data.addColumn('number', 'Количество');

    this.statistics.sortedByCount.forEach(car => {
      data.addRow([car.name, car.count]);
    });

    const options = { title: 'ТОП-5 по количеству', width: 600, height: 400 };
    const chart = new google.visualization.ColumnChart(document.getElementById('top5Count'));
    chart.draw(data, options);
  }

  drawModelIncomeChart(): void {
    if (!this.statistics || !this.statistics.modelIncome) return;

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Модель');
    data.addColumn('number', 'Прибыль');

    this.statistics.modelIncome.forEach(model => {
      data.addRow([model.name, model.price]);
    });

    const options = { title: 'Прибыль по моделям', width: 600, height: 400 };
    const chart = new google.visualization.ColumnChart(document.getElementById('drawMod'));
    chart.draw(data, options);
  }

  generatePDF(): void {
    const element = this.pdfContent.nativeElement;

    html2pdf()
      .from(element)
      .save('stat-all.pdf');
  }
}
