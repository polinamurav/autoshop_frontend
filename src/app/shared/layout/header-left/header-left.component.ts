import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.getIsAdminIn();
  }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe(isAdmin => {
      console.log("HeaderLeftComponent: Статус администратора обновлен:", isAdmin);
      this.isAdmin = isAdmin;
    });
  }

}
