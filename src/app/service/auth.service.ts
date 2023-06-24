import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.baseURL
  private token : string;
  private tokenTimer : any;
  // authStatusListner = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerService) {
    // this.authStatusListner.next(false)
  }

  // getAuthStatusListner(){
  //   return this.authStatusListner.asObservable();
  // }

  createUser(email: string , password: string){
    this.spinnerService.spinner(true)

    return this.http.post(this.url+"/user/signup", {email : email, password : password})
  }
  login(email: string , password: string){
    const type = 'application/json; charset=UTF-8';
    const httpOptions = {
        headers: new HttpHeaders({   'Content-Type': type  })
    };
    this.spinnerService.spinner(true)
    return this.http.post(this.url+"/user/login", {uName : email, password_hash : password}, httpOptions)
  }
  autoAuthuser(){

    const authInfo = this.getAuthData()
    if(!authInfo){
      return
    }
    const now = new Date()
    const expriesInDuration = authInfo.expireIn.getTime() - now.getTime()
    if(expriesInDuration > 0){
      this.token = authInfo.token
      this.setAuthtimer(expriesInDuration/1000)
      return true
    }
  }

  setAuthtimer(expriesInDuration){
    // console.log("setting timer:" + expriesInDuration)
    this.tokenTimer = setTimeout(()=>{
      this.logOut()
    },expriesInDuration * 1000)
  }
  private getAuthData(){
    const token = sessionStorage.getItem("token")
    const expireIn = sessionStorage.getItem("expireIn")
    if(!token || !expireIn){
      return
    }
    return {
      token : token,
      expireIn : new Date(expireIn)
    }
  }

  logOut(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expireIn");
    this.router.navigate(['/dashboard/login'])
    clearTimeout(this.tokenTimer)
  }

}
