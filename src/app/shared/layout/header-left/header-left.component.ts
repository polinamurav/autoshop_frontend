import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {RoleTypeType} from "../../../../types/role-type.type";

@Component({
  selector: 'app-header-left',
  templateUrl: './header-left.component.html',
  styleUrls: ['./header-left.component.css']
})
export class HeaderLeftComponent implements OnInit {

  @Input() isLogged: boolean = false;
  isAdmin: boolean = false;
  userRole: RoleTypeType | null = RoleTypeType.ROLE_USER;

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.getIsAdminIn();
  }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdminIn: boolean) => {
      this.isAdmin = isAdminIn;
      console.log("Статус администратора обновлен:", this.isAdmin);
    });
  }

}
