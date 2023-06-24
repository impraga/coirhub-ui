import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  isSpinnerOn : Boolean = false
  isLoaderOn : Boolean = false

  private spinnerSubject = new Subject<any>();
  private loaderSubject = new Subject<any>();

  spinnerObservable = this.spinnerSubject.asObservable()
  loaderObservable = this.loaderSubject.asObservable()

  spinner(val : Boolean){
    this.spinnerSubject.next(val)
  }
  loader(val : Boolean){
    this.loaderSubject.next(val)
  }
}
