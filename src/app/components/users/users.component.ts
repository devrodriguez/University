import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Role } from 'src/app/interfaces/role';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'role', 'email'];
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  registerUser() {
    this.userService.register(this.user);
  }

  createUser() {
    this.userService.createUser(this.user).then(res => {
      console.log('User created', res);
    });
  }

  getUsers() {
    this.userService.getUsers().valueChanges().subscribe(_users => {
      this.userSource.data = _users;
    });
  }

}
