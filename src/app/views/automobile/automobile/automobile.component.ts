import {Component, OnInit} from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.css']
})
export class AutomobileComponent implements OnInit {

  automobile!: AutomobileResponseType;

  constructor(private automobileService: AutomobilesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.automobileService.getAutomobile(params['id'])
        .subscribe((data: AutomobileResponseType) => {
          this.automobile = data;
        });
    });
  }

  deleteAuto(userId: string) {
    this.automobileService.deleteAutomobile(userId).subscribe({
      next: () => {
        this.router.navigate(['/automobiles']);
        this._snackBar.open('Автомобиль успешно удален!');
      },
      error: (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          this._snackBar.open(errorResponse.error.message);
        } else {
          this._snackBar.open('Ошибка удаления');
        }
      }
    })
  }
}
