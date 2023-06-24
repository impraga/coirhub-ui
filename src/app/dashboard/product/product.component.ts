import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

import { mimeType } from './mime-type.validator';
import { error } from 'protractor';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productStatus = ['Show', 'Hide'];
  productList: any = [];
  editProduct = [{ name: '', price: '', status: '' }];
  form: FormGroup;
  imagePreview: any;
  imageEditPreview: any;
  imageFile: any;
  imageFile64: any;
  imageEditFile: any;
  imageEditFile64: any;
  isProductEditorOpened = false;
  openAlert = false
  alertsTimeout: 5000
  alerts = {
    type: 'success',
    msg: ``,
  };

  staticAlertClosed = false;

  constructor(
    private productsservice: ProductsService,
    private spinnerService: SpinnerService
  ) {}

  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;

  ngOnInit(): void {
    this.spinnerService.loader(true);

    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      // price: new FormControl(null, { validators: [Validators.required] }),
      status: new FormControl(null, { validators: [Validators.required] }),
      descr: new FormControl(null, { validators: [Validators.required] }),
      amazonLink: new FormControl(null),
      flipkartLink: new FormControl(null),
      // image: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators:[mimeType]})
    });
    this.productsservice.getProduct().subscribe((res) => {
      this.productList = res;
      this.spinnerService.loader(false);
    });
  }

  addProduct() {
    this.spinnerService.spinner(true);
    // this.form.patchValue({ image: this.imagePreview });
    // this.form.get('image').updateValueAndValidity();
    this.form.patchValue({image: this.imageFile});
    this.form.get('image').updateValueAndValidity();
    // console.log(this.form.value)

    this.productsservice.addProduct(this.form.value).subscribe((res) => {
      this.productList.push({
        pName: this.form.value.name,
        // price: this.form.value.price,
        pStatus: this.form.value.status,
        descr: this.form.value.descr,
        amazonLink: this.form.value.amazonLink,
        flipkartLink: this.form.value.flipkartLink,
        id: res['id'],
        imagePath: res['imagePath'],
      });
      this.form.reset();
      this.imagePreview = ''
      this.spinnerService.spinner(false);
      this.alert('success','Product has been added successfully')
    }, error=>{
      this.spinnerService.spinner(false);
      this.alert('danger','Error occured. Please try again')

    });
    this.imageFile = null;
  }
  openDialog(product) {
    this.editProduct = JSON.parse(JSON.stringify(product));
    this.isProductEditorOpened = true;
  }
  closeDialog() {
    this.isProductEditorOpened = false;
  }
  updateProduct() {
    this.spinnerService.spinner(true);

    this.productList.forEach((ele) => {
      if (ele.id == this.editProduct['id']) {
        ele['name'] = this.editProduct['name'];
        // ele['price'] = this.editProduct['price'];
        ele['status'] = this.editProduct['status'];
        ele['imagePath'] = this.editProduct['imagePath'];
        ele['descr'] = this.editProduct['descr'];
        ele['amazonLink'] = this.editProduct['amazonLink'];
        ele['flipkartLink'] = this.editProduct['flipkartLink'];
      }
    });
    // console.log(this.editProduct)
    this.productsservice
      .updateProduct(this.editProduct['id'], this.editProduct)
      .subscribe((res) => {
        this.spinnerService.spinner(false);
      this.alert('success','Product has been updated successfully')

      }, error=>{
        this.spinnerService.spinner(false);
      this.alert('danger','Error occured. Please try again')

      });
    this.isProductEditorOpened = false;
  }
  deleteProduct() {
    this.spinnerService.spinner(true);

    this.productsservice
      .deleteProduct(this.editProduct['id'], this.editProduct['imagePath'])
      .subscribe((res) => {
        this.productList = this.productList.filter(
          (product) => product.id !== this.editProduct['id']
        );
        this.isProductEditorOpened = false;
        this.spinnerService.spinner(false);
        this.alert('success','Product has been deleted successfully')

      }, error=>{
        this.spinnerService.spinner(false);
        this.alert('danger','Error occured. Please try again')

      });
  }
  onImagePicked(event: Event) {
    this.spinnerService.spinner(true);

    this.imageFile = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: this.imageFile});
    const reader = new FileReader();
    if(this.imageFile){

      reader.readAsDataURL(this.imageFile);
      reader.onload = () => {
        this.imagePreview = reader.result;
      this.form.patchValue({ image: this.imagePreview });
      this.form.get('image').updateValueAndValidity();
      this.spinnerService.spinner(false);
    }, err => {
      this.spinnerService.spinner(false);
    };
  }else{
    this.spinnerService.spinner(false);
    }
  }
  onImageEditPicked(event: Event) {
    this.spinnerService.spinner(true);

    this.imageEditFile = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: this.imageEditFile});
    this.form.get('image').updateValueAndValidity();
    this.editProduct['image'] = this.imageEditFile;
    const reader = new FileReader();
    if(this.imageEditFile){

      reader.readAsDataURL(this.imageEditFile);
      reader.onload = () => {
        this.editProduct['imagePath'] = reader.result;
        // this.form.patchValue({ image: this.editProduct['imagePath'] });
        // this.form.get('image').updateValueAndValidity();
        this.spinnerService.spinner(false);
      }, err => {
        this.spinnerService.spinner(false);
      };
    }else{
      this.spinnerService.spinner(false);
    }
  }
  close(){
  }
  alert(type,msg){
    this.openAlert = true;
    this.alerts = {msg: msg,type:type}
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.openAlert = false;
    }, 4000);
    }
}
