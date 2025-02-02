import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StatService } from "../../../shared/services/stat.service";
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import html2pdf from "html2pdf.js";

declare var google: any;

@Component({
  selector: 'app-stat-income',
  templateUrl: './stat-income.component.html',
  styleUrls: ['./stat-income.component.css']
})
export class StatIncomeComponent implements OnInit {

  @ViewChild('generatePdf') pdfContent!: ElementRef;
  statistics: AutomobileResponseType[] = [];

  constructor(private statService: StatService) { }

  ngOnInit(): void {
    this.statService.getStatIncome()
      .subscribe((data: AutomobileResponseType[]) => {
        this.statistics = data;
        this.loadGoogleCharts();
      });
  }

  loadGoogleCharts(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.drawTop5IncomeChart();
    });
  }

  drawTop5IncomeChart(): void {
    if (!this.statistics) return;

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Автомобиль');
    data.addColumn('number', 'Прибыль');

    this.statistics.forEach(car => {
      data.addRow([car.name, car.incomePrice]);
    });

    const options = { title: 'ТОП-5 по прибыли', width: 600, height: 400 };
    const chart = new google.visualization.ColumnChart(document.getElementById('top5Income'));
    chart.draw(data, options);
  }

  generatePDF(): void {
    const element = this.pdfContent.nativeElement;

    html2pdf()
      .from(element)
      .save('stat-income.pdf');
  }

}
