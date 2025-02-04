import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignupResponseType} from "../../../../types/signup-response.type";
import {UserService} from "../../../shared/services/user.service";
import {RoleTypeType} from "../../../../types/role-type.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: SignupResponseType[] = [];
  RoleTypeTypes = Object.values(RoleTypeType);
  isAdmin: boolean = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private _snackBar: MatSnackBar) {
    this.isAdmin = this.authService.getIsAdminIn();
  }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((data: SignupResponseType[]) => {
        this.users = data;
      });
  }

  updateRole(user: SignupResponseType) {
    this.userService.updateUser(user).subscribe(
      (data: SignupResponseType | DefaultResponseType) => {
        if ((data as DefaultResponseType).status === 400) {
          this._snackBar.open((data as DefaultResponseType).message);
          return;
        }

        this._snackBar.open('Роль пользователя успешно изменена!');
      },
      error => {
        this._snackBar.open('Ошибка при обновлении роли!');
      }
    );
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(m => m.id !== userId);
        this._snackBar.open('Пользователь успешно удален!');
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
