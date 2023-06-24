import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }
  url = environment.baseURL;


  getGalleryView(params :any){
    return this.http.get(this.url+'/gallery?limit='+params['limit']+'&offset='+params['offset'])
  }

  getGalleryImage(){
    return this.http.get(this.url+'/gallery')
  }
  postGalleryImage(gallery, file){
    const postData = new FormData();
    postData.append('image',file,file.name.split('.')[0])
    postData.append('oldPath',gallery.imagePath)
    return this.http.put(this.url+'/gallery/'+gallery.id, postData)
  }
  deleteGallery(id, imagePath){
    return this.http.delete(this.url+'/gallery/?id='+id+'&imagePath='+imagePath)
  }
  addGallery(file){
    // uncomment below line to send image as file
    let date :any = new Date().getTime();
    const postData = new FormData();
    postData.append('file',file,file.name.split('.')[0])
    postData.append('date', date)

    return this.http.post(this.url+'/gallery', postData, {
      // headers: {'Content-Type': 'multipart/form-data'}
    })

    // let galleryDetails = {
    //   imagePath : file
    // }
    // return this.http.post(this.url+'/gallery', galleryDetails)
  }
}
