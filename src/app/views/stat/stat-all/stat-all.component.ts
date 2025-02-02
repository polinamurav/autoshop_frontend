import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as html2pdf from 'html2pdf.js';

declare var google: any;

@Component({
  selector: 'app-stat-all',
  templateUrl: './stat-all.component.html',
  styleUrls: ['./stat-all.component.css']
})
export class StatAllComponent implements OnInit {

  @ViewChild('generatePDF') pdfContent!: ElementRef;

  // Данные для графиков
  top5String = ['BMW', 'Audi', 'Toyota', 'Mercedes', 'Ford'];
  top5Float = [50000, 45000, 40000, 35000, 30000];
  countString = ['BMW', 'Audi', 'Toyota', 'Mercedes', 'Ford'];
  countInt = [5, 10, 8, 6, 7];
  modString = ['X5', 'A6', 'Corolla', 'C-Class', 'Mustang'];
  modFloat = [20000, 18000, 16000, 14000, 12000];

  income = 250000; // Пример общего дохода

  constructor() { }

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.drawTop5Income();
      this.drawTop5Count();
      this.drawMod();
    });
  }

  drawTop5Income(): void {
    const data = google.visualization.arrayToDataTable([
      ['Автомобиль', 'Прибыль', { role: 'style' }],
      ...this.top5String.map((name, i) => [name, this.top5Float[i], 'silver'])
    ]);

    const options = {
      title: 'Топ-5 по прибыли',
      hAxis: { title: 'Автомобиль' },
      vAxis: { title: 'Прибыль' },
      bar: { groupWidth: '80%' },
      legend: { position: 'none' }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('top5Income'));
    chart.draw(data, options);
  }

  drawTop5Count(): void {
    const data = google.visualization.arrayToDataTable([
      ['Автомобиль', 'Количество', { role: 'style' }],
      ...this.countString.map((name, i) => [name, this.countInt[i], 'bronze'])
    ]);

    const options = {
      title: 'В автосалоне',
      hAxis: { title: 'Автомобиль' },
      vAxis: { title: 'Количество' },
      bar: { groupWidth: '80%' },
      legend: { position: 'none' }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('top5Count'));
    chart.draw(data, options);
  }

  drawMod(): void {
    const data = google.visualization.arrayToDataTable([
      ['Модель', 'Прибыль'],
      ...this.modString.map((name, i) => [name, this.modFloat[i]])
    ]);

    const options = {
      title: 'Прибыль по моделям',
      pieHole: 0.2
    };

    const chart = new google.visualization.PieChart(document.getElementById('drawMod'));
    chart.draw(data, options);
  }

  generatePDF(): void {
    if (this.pdfContent) {
      (html2pdf as any).from(this.pdfContent.nativeElement).save();
    }
  }

}
