import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GalleryService } from 'src/app/service/gallery.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { AlertComponent } from 'ngx-bootstrap/alert';

// import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  modalRef: BsModalRef;
  imagePreview: any;
  imageFile: any;
  gallery: any;
  selectedImage: any;
  enableUpload = false;
  isNewImage = false;
  openAlert = false
  alertsTimeout: 5000
  alerts = {
    type: 'success',
    msg: ``,
  };
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private modalService: BsModalService,
    private spinnerService: SpinnerService,
    private galleryService: GalleryService
  ) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.getGallery()
  }
  getGallery() {
    this.spinnerService.spinner(true);
    this.galleryService.getGalleryImage().subscribe((res) => {
      this.gallery = res['data'];
      console.log(this.gallery)
      this.spinnerService.spinner(false);

    });
  }

  onImagePicked(event: Event) {
    this.spinnerService.spinner(true);

    this.imageFile = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    reader.onload = () => {
      this.enableUpload = true
      this.imagePreview = reader.result;
      // to convert base64 start - comment this line if need to send as file
      // this.imageFile = this.imagePreview
      // end
      this.spinnerService.spinner(false);
      this.imageChangedEvent = event;
    };

  }
  uploadFile(gallery) {
    this.selectedImage = gallery;
    this.imagePreview = gallery.imagePath;
    this.isNewImage = false;
  }
  newFile(){
    this.imagePreview = null;
    this.isNewImage = true;
  }
  addGallery(){
    this.spinnerService.spinner(true);
    console.log(this.imageFile)
    this.galleryService.addGallery(this.imageFile).subscribe(res=>{
      this.getGallery()
      this.modalRef.hide()
      this.spinnerService.spinner(false);
      this.alert('success','Image has been added successfully')
    },err=>{
      this.getGallery();
      this.modalRef.hide()
      this.spinnerService.spinner(false);
      this.alert('danger','Error occured. Please try again')
    })
  }
  saveGallery() {
    this.spinnerService.spinner(true);
    this.galleryService
      .postGalleryImage(this.selectedImage, this.imageFile)
      .subscribe(
        res => {
          this.getGallery();
          this.spinnerService.spinner(false);
          this.modalRef.hide()
          this.enableUpload = false
        },
        error => {
          this.spinnerService.spinner(false);
          this.modalRef.hide()
          this.enableUpload = false
        }
      );
  }
  deleteGallery(){
    this.spinnerService.spinner(true);
    this.galleryService.deleteGallery(this.selectedImage.id, this.selectedImage.imagePath).subscribe(res=>{
      this.getGallery();
      this.modalRef.hide()
      this.spinnerService.spinner(false);
      this.alert('success','Image has been deleted successfully')
    },err=>{
      this.getGallery();
      this.modalRef.hide()
      this.spinnerService.spinner(false);
      this.alert('danger','Error occured. Please try again')
    })
  }

  alert(type,msg){
  this.openAlert = true;
  this.alerts = {msg: msg,type:type}
  setTimeout(()=>{                           // <<<---using ()=> syntax
    this.openAlert = false;
  }, 4000);
  }


  // fileChangeEvent(event: any): void {
  //     this.imageChangedEvent = event;
  // }
  // imageCropped(event: ImageCroppedEvent) {
  //     this.croppedImage = event.base64;
  // }
  // imageLoaded() {
  //     // show cropper
  // }
  // cropperReady() {
  //     // cropper ready
  // }
  // loadImageFailed() {
  //     // show message
  // }
}
