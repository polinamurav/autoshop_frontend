import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StatService } from "../../../shared/services/stat.service";
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
    const doc = new jsPDF();

    const chartElement = document.getElementById('top5Income');

    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        const margin = 10; // отступы от границ страницы
        const imgWidth = 180;  // ширина изображения
        const imgHeight = (canvas.height * imgWidth) / canvas.width;  // пропорциональная высота

        // Добавляем изображение с корректными размерами и отступами
        doc.addImage(imgData, 'PNG', margin, 20, imgWidth, imgHeight);
        // doc.addImage(imgData, 'PNG', -5, 20, 180, 120);

        doc.text('Топ-5 по прибыли', 10, 10);

        doc.save('stat-income.pdf');
      });
    }
  }

}
