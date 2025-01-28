import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-left',
  templateUrl: './header-left.component.html',
  styleUrls: ['./header-left.component.css']
})
export class HeaderLeftComponent implements OnInit {

  @Input() isLogged: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
