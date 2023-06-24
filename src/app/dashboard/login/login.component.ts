import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private token : string;
  errorMessagePass = false;
  errorMessageUser = false;
  errorMessage = false;
  constructor(private authService : AuthService , private router: Router,private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }
  onLogin(form : NgForm){
    this.errorMessage = false
    this.errorMessagePass = false
    this.errorMessageUser = false
    this.authService.login(form.value.email, form.value.password).subscribe(res=>{
      this.token = res['access_token']
      console.log(this.token)
      if(this.token){
        const expriesInDuration = res['expiresIn']
        this.authService.setAuthtimer(expriesInDuration)
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expriesInDuration * 1000)
        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("expireIn", expirationDate.toString());
        this.router.navigate(['/dashboard'])
        this.spinnerService.spinner(false)
      }
    }, error=>{
      console.log(error)
      if(error.error.message === "Auth failed"){
        this.errorMessagePass = true
      }else if(error.error.message === "User not available"){
        this.errorMessageUser = true
      }
        else{
        this.errorMessage = true
      }
      this.spinnerService.spinner(false)
    })
  }

}
