import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {

  @Input() isLogged: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.removeToken();
    // this._snackBar.open('Вы вышли из системы');
    console.log('Вы вышли из системы');
    this.router.navigate(['/']);
  }
}
