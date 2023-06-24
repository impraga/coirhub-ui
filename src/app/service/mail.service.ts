import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  url = environment.baseURL
  constructor(private http: HttpClient) { }

  sendMail(mail){
    return this.http.post(this.url + '/mail', mail)
  }


}
