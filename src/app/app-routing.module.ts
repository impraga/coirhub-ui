import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GalleryViewComponent } from './frontend/gallery-view/gallery-view.component';
import { HomeComponent } from './frontend/home/home.component';
import { PagenotfoundComponent } from './frontend/pagenotfound/pagenotfound.component';
import { ProductListComponent } from './frontend/product-list/product-list.component';


const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'product',component: ProductListComponent},
  {path: 'gallery',component: GalleryViewComponent},
  {path:'dashboard', loadChildren:()=> import('./dashboard.module').then(m=>m.DashboardModule)},
  {path: '**', pathMatch: 'full', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
