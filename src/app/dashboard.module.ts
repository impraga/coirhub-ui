import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule ,  FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { MatProgressBarModule} from '@angular/material/progress-bar';


import { LoginComponent } from './dashboard/login/login.component';
import { SignupComponent } from './dashboard/signup/signup.component';
import { ProductComponent } from './dashboard/product/product.component';
import { DashboardNavComponent } from './dashboard/dashboard-nav/dashboard-nav.component';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GalleryComponent } from './dashboard/gallery/gallery.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SocialIconComponent } from './dashboard/social-icon/social-icon.component';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations:[
    ProductComponent,
    LoginComponent,
    SignupComponent,
    DashboardNavComponent,
    GalleryComponent,
    DashboardComponent,
    SocialIconComponent
  ] ,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    DashboardRoutingModule,
    AlertModule.forRoot()
  ],
})
export class DashboardModule { }
