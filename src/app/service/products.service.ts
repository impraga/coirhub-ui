import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators'
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = environment.baseURL

  constructor(private http: HttpClient) { }


  getProduct(){

    return this.http.get<{message : string ; data : any}>(this.url + '/products').pipe(map(productData => {
      return productData.data.map(product =>{
        return {
          name: product.name,
          price: product.price,
          status: product.status,
          id: product.id,
          descr: product.descr,
          imagePath: product.imagePath,
          amazonLink: product.amazonLink,
          flipkartLink: product.flipkartLink,
        }
      })
    }))
  }
  addProduct(product){
    let date :any = new Date().getTime();
    const postData = new FormData();

    postData.append("name",product.name)
    // postData.append("price",product.price)
    postData.append("status",product.status)
    postData.append("descr",product.descr)
    postData.append('date', date)
    postData.append("file",product.image, product.name.split('.')[0])
    // postData.append("image",product.image)
    postData.append("amazonLink",product.amazonLink)
    postData.append("flipkartLink",product.flipkartLink)
    return this.http.post(this.url + '/products', postData)


    // return this.http.post(this.url + '/products', product)
  }
  deleteProduct(id, imagePath){
    return this.http.delete(this.url+'/products/?id='+id+'&imagePath='+imagePath)
  }
  updateProduct(id , product){
    //  postData :any;
    let date :any = new Date().getTime();
    console.log(product)
    const postData :any = new FormData();
    postData.append("id",id)
    postData.append('date', date)
    postData.append("name",product.name)
    postData.append("descr",product.descr)
    postData.append("status",product.status)
    postData.append("amazonLink",product.amazonLink)
    postData.append("flipkartLink",product.flipkartLink)
    console.log(postData)
    if(product.image){
      postData.append("file",product.image, product.name.split('.')[0])
    }else{
      postData.append("imagePath",product.imagePath)
    }
    return this.http.post(this.url+'/products/update' , postData)
  }

}
