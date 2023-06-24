import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'coirhub';

  loader : Boolean = false;
  spinner : Boolean = false;
  constructor(public spinnerService : SpinnerService){

    this.spinnerService.spinnerObservable.subscribe(res => {this.spinner = res })
    this.spinnerService.loaderObservable.subscribe(res => {this.loader = res })

  }
  ngOnInit(): void {
  }

  moveToTop(){
    window.scrollTo(500, 0);
  }

}
