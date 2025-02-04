import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StatService } from "../../../shared/services/stat.service";
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import html2pdf from "html2pdf.js";
import {StatModelResponseType} from "../../../../types/stat-model-response.type";

declare var google: any;


@Component({
  selector: 'app-stat-model',
  templateUrl: './stat-model.component.html',
  styleUrls: ['./stat-model.component.css']
})
export class StatModelComponent implements OnInit {

  @ViewChild('generatePdf') pdfContent!: ElementRef;
  statistics: StatModelResponseType[] = [];

  constructor(private statService: StatService) { }

  ngOnInit(): void {
    this.statService.getStatModel()
      .subscribe((data: StatModelResponseType[]) => {
        this.statistics = data;
        // this.drawModelIncomeChart();
        this.loadGoogleCharts();
      });
  }

  loadGoogleCharts(): void {
    if (typeof google !== 'undefined' && google.charts) {
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(this.drawModelIncomeChart);
    } else {
      console.error('Google Charts library is not loaded');
    }
  }

  drawModelIncomeChart(): void {
    if (!this.statistics || this.statistics.length === 0) return;

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Модель');
    data.addColumn('number', 'Прибыль');

    this.statistics.forEach(model => {
      data.addRow([model.name, model.price]);
    });

    const options = {
      title: 'Прибыль по моделям',
      width: 600,
      height: 400,
      is3D: true,
      pieSliceText: 'percentage'
    };

    const chart = new google.visualization.PieChart(document.getElementById('drawMod'));
    chart.draw(data, options);
  }

  generatePDF(): void {
    const element = this.pdfContent.nativeElement;

    html2pdf()
      .from(element)
      .save('stat-model.pdf');
  }

}
