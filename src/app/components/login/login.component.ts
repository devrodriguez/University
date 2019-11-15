import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);

  user: User = {} as User;

  constructor(private snack: MatSnackBar, private router: Router, private userServ: UserService) { 
    
  }

  ngOnInit() {
  }

  async login() {
    
    if(this.email.invalid || this.password.invalid){
      this.openSnack('Check your credentials!');
      return;
    }

    this.user.email = this.email.value;
    this.user.password = this.password.value;

    try {
      await this.userServ.login(this.user);
      this.router.navigateByUrl('home', { replaceUrl: true });
    } catch (error) {
      this.openSnack(error.message);
      throw error;
    }


  }

  openSnack(message: string) {
    this.snack.open(message, null, {
      duration: 3000
    });
  }

}
