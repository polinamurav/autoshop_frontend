import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StatService} from "../../../shared/services/stat.service";
import {StatResponseType} from "../../../../types/stat-response.type";
import html2pdf from "html2pdf.js";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @ViewChild('generatePdf') pdfContent!: ElementRef;
  statistics!: StatResponseType | null;

  constructor(private statService: StatService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.statService.getStats()
      .subscribe((data: StatResponseType) => {
        this.statistics = data;
      });
  }

  statsReset() {
    this.statService.deleteStat().subscribe(() => {
        this.statistics = null;
        this._snackBar.open('Все успешно удалено!');
    })
  }

  generatePDF(): void {
    const element = this.pdfContent.nativeElement;

    html2pdf()
      .from(element)
      .save('stats.pdf');
  }

}
