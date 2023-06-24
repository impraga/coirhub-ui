import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private token : string;

  constructor(private authService : AuthService, private router: Router,private spinnerService: SpinnerService) { }
  emailalreadytaken = false
  ngOnInit(): void {
  }
  onSignup(form : NgForm){
    this.authService.createUser(form.value.email , form.value.password).subscribe(res=>{
      if(res['message'] === 'User Created!'){
        this.router.navigate(['/dashboard/login'])
      }
      this.spinnerService.spinner(false)
    }, error=>{
      console.log(error.error.data)
      if(error.error.data){
        this.emailalreadytaken = true
      }
      this.spinnerService.spinner(false)
    })
  }
}
