import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  authenticated: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private userServ: UserService, private router: Router) {
    
  }

  ngOnChanges() {
    console.log('change')
  }

  ngOnInit() {
    this.authenticated = this.userServ.userExist;
  }

  async logout() {
    try {
      await this.userServ.logout();
      this.router.navigateByUrl('login', { replaceUrl: true });
    } catch (error) {
      throw error;
    }
  }

}
