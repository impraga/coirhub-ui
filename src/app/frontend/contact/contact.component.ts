import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from 'src/app/service/mail.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  formSubmited = false;
  formError = false;
  isSending = false;
  constructor(private mailService : MailService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
      message: new FormControl(null, { validators: [Validators.required] })
    });
  }
  sendMail(){
    this.isSending = true
    this.mailService.sendMail(this.form.value).subscribe(res=>{
      console.log(res)
      this.formSubmited = true;
      this.isSending = false
    },error =>{
      console.log(error)
      this.formError = true
      this.isSending = false
    })
  }

}
