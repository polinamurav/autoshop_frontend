import {Component, HostListener, OnInit} from '@angular/core';
import {AutomobileResponseType} from "../../../../types/automobile-response.type";
import {AutomobilesService} from "../../../shared/services/automobiles.service";
import {ModelType} from "../../../../types/model.type";
import {ModelsService} from "../../../shared/services/models.service";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-automobiles',
  templateUrl: './automobiles.component.html',
  styleUrls: ['./automobiles.component.css']
})
export class AutomobilesComponent implements OnInit {

  searchField = new FormControl();
  showedSearch: boolean = false;
  automobiles: AutomobileResponseType[] = [];
  models: ModelType[] = [];
  selectedCarModel: number = 1;

  constructor(private automobilesService: AutomobilesService,
              private modelsService: ModelsService,
              private router: Router) { }

  ngOnInit(): void {
    this.automobilesService.getAutomobiles()
      .subscribe((data: AutomobileResponseType[]) => {
        this.automobiles = data;
      });

    this.modelsService.getModels()
      .subscribe((modelData: ModelType[]) => {
        this.models = modelData;
      });

    this.searchField.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        if (value && value.length > 0) {
          this.automobilesService.searchAutomobile(value)
            .subscribe((data: AutomobileResponseType[]) => {
              this.automobiles = data;
              this.showedSearch = true;
            });
        } else {
          this.automobilesService.getAutomobiles()
            .subscribe((data: AutomobileResponseType[]) => {
              this.automobiles = data;
            });
        }
      });
  }

  selectAutomobile(id: string) {
    this.router.navigate(['/automobile/' + id]);
    this.searchField.setValue('');
    this.automobiles = [];
  }

  @HostListener('document:click', ['$event'])
  click(event: Event) {
    if (this.showedSearch && (event.target as HTMLElement).className.indexOf('search-product') === -1) {
      this.showedSearch = false;
    }
  }

}
