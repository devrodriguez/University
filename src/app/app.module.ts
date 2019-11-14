import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UniversityAdminComponent } from './components/university-admin/university-admin.component';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//Util
import { environment } from 'src/environments/environment';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    UsersComponent,
    UniversityAdminComponent,
    DataFormComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
