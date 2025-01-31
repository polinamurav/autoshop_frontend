import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignupResponseType} from "../../../../types/signup-response.type";
import {UserService} from "../../../shared/services/user.service";
import {RoleTypeType} from "../../../../types/role-type.type";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: SignupResponseType[] = [];
  userRole: RoleTypeType = RoleTypeType.ROLE_USER;
  RoleTypeTypes = Object.values(RoleTypeType);

  constructor(private userService: UserService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((data: SignupResponseType[]) => {
        this.users = data;
      });
  }

  updateRole() {

  }

  deleteUser() {

  }

}
