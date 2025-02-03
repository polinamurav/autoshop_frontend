import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StatService } from "../../../shared/services/stat.service";
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import html2pdf from "html2pdf.js";

declare var google: any;

@Component({
  selector: 'app-stat-count',
  templateUrl: './stat-count.component.html',
  styleUrls: ['./stat-count.component.css']
})
export class StatCountComponent implements OnInit {

  @ViewChild('generatePdf') pdfContent!: ElementRef;

  statistics: AutomobileResponseType[] = [];

  constructor(private statService: StatService) { }

  ngOnInit(): void {
    this.statService.getStatCount()
      .subscribe((data: AutomobileResponseType[]) => {
        this.statistics = data;
        this.loadGoogleCharts();
      });
  }

  loadGoogleCharts(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.drawTop5CountChart();
    });
  }

  drawTop5CountChart(): void {
    if (!this.statistics || !this.statistics) return;

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Автомобиль');
    data.addColumn('number', 'Количество');

    this.statistics.forEach(car => {
      data.addRow([car.name, car.count]);
    });

    const options = { title: 'ТОП-5 по количеству', width: 600, height: 400 };
    const chart = new google.visualization.ColumnChart(document.getElementById('top5Count'));
    chart.draw(data, options);
  }

  generatePDF(): void {
    const element = this.pdfContent.nativeElement;

    html2pdf()
      .from(element)
      .save('stat-count.pdf');
  }

}
