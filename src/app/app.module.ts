import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule ,  FormsModule} from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthInterceptor } from './auth-interceptor';
import { SpinnerComponent } from './frontend/spinner/spinner.component';
import { HomeComponent } from './frontend/home/home.component';
import { HeaderComponent } from './frontend/header/header.component';
import { FooterComponent } from './frontend/footer/footer.component';
import { WebpageComponent } from './frontend/webpage/webpage.component';
import { ContactComponent } from './frontend/contact/contact.component';
import { WorkwithusComponent } from './frontend/workwithus/workwithus.component';
// import { DashboardModule } from './dashboard.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { ImageCropperModule } from 'ngx-image-cropper';

import { WhyusComponent } from './frontend/whyus/whyus.component';
import { ProductListComponent } from './frontend/product-list/product-list.component';
import { PagenotfoundComponent } from './frontend/pagenotfound/pagenotfound.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoaderComponent } from './frontend/loader/loader.component';
import { GalleryViewComponent } from './frontend/gallery-view/gallery-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    WebpageComponent,
    ContactComponent,
    WorkwithusComponent,
    WhyusComponent,
    ProductListComponent,
    PagenotfoundComponent,
    LoaderComponent,
    GalleryViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,MatDialogModule,MatProgressBarModule,
    NgbModule,
    HttpClientModule,BrowserAnimationsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    // ImageCropperModule
    // DashboardModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    // {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
