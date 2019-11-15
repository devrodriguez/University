import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Role } from 'src/app/interfaces/role';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'role', 'email', 'delete'];
  userSource = new MatTableDataSource();
  userData: User[] = [];
  user: User = {} as User;
  roles: Role[] = [
    {
      name: 'Admin'
    },
    {
      name: 'Alumno'
    }
  ];

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.getUsers();
  }

  async createUser() {

    try {
      await this.userService.createUser(this.user);
      await this.userService.register(this.user);
      this.user = {} as User;
      this.openSnack('User created!');
    } catch (error) {
      this.openSnack('Process failed!');
      throw error;
    }
  }

  getUsers() {
    this.userService.getUsers().valueChanges().subscribe(_users => {
      this.userSource.data = _users;
    });
  }

  async deleteUser(user) {
    try {
      await this.userService.deleteUser(user.email);
      await this.userService.deleteAccount();
      this.openSnack('User deleted!');
    } catch (error) {
      this.openSnack('Process failed!');
      throw error;
    }
  }

  applyFilter(value: string) {
    this.userSource.filter = value.trim().toLowerCase();
  }

  openSnack(message: string) {
    this.snack.open(message, null, {
      duration: 3000
    });
  }

}
