import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth.guard";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { GalleryComponent } from "./dashboard/gallery/gallery.component";

import { LoginComponent } from "./dashboard/login/login.component";
import { ProductComponent } from "./dashboard/product/product.component";
import { SignupComponent } from "./dashboard/signup/signup.component";
import { SocialIconComponent } from "./dashboard/social-icon/social-icon.component";


const routes: Routes = [
  // {path: '',component: ProductComponent },
  {path: '',redirectTo: '/dashboard/product', pathMatch: 'full', canActivate:[AuthGuard] },
  {path: 'login',component: LoginComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'product',component: ProductComponent , canActivate:[AuthGuard] },
  {path: 'gallery',component: GalleryComponent , canActivate:[AuthGuard] },
  {path: 'social-links',component: SocialIconComponent , canActivate:[AuthGuard] }
  // no Security
  // {path: 'product',component: ProductComponent },
  // {path: 'gallery',component: GalleryComponent },
  // {path: 'social-links',component: SocialIconComponent }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule],
  providers: [AuthGuard]
})
export class DashboardRoutingModule{

}
