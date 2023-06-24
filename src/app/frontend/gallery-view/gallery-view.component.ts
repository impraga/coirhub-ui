import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/service/gallery.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit {

  lazyLoad = {limit : 10 , offset: 0}
  constructor(private galleryService : GalleryService, private spinnerService : SpinnerService) { }

  galleryList : any = []

  ngOnInit(): void {
    this.getGalleryView()
  }

  getGalleryView(){
    this.spinnerService.loader(true);
    this.galleryService.getGalleryView(this.lazyLoad).subscribe((res:any)=>{
      this.spinnerService.loader(false);
      this.galleryList = res.data
    },err =>{
      this.spinnerService.loader(false);
    })
  }
}
