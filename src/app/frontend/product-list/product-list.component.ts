import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productsservice: ProductsService, private spinnerService: SpinnerService) { }
  isDetailsOpened = false;
  productList : any;
  productDetialList : any;
  ngOnInit(): void {

    this.spinnerService.loader(true);
    // this.productsservice.getProductStatic().subscribe((res) => {
    //   this.productList = res;
    //   this.spinnerService.spinner(false);
    //   console.log(this.productList)
    // });

    this.productsservice.getProduct().subscribe(res=>{
      this.productList = res
    this.spinnerService.loader(false);

    })

  }
  openDetails(productId){
    this.productList.forEach(element => {
      if(element['id'] == productId){
        this.productDetialList = element
        // this.productDetialList['id'] = element['id']
        // this.productDetialList['name'] = element['name']
        // this.productDetialList['descr'] = element['descr']
        // this.productDetialList['price'] = element['price']
        // this.productDetialList['imagePath'] = element['imagePath']
      }
    });
    this.details()
  }
  details(){
    this.isDetailsOpened = !this.isDetailsOpened
  }
}
