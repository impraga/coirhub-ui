import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuState = false;
  menuStateOverlay = false;
  menuItemState = false;
  constructor() { }
  ngOnInit(): void {
  }
  onMenu(){
    // this.menuState = !this.menuState;
    this.menuItemState = !this.menuItemState;
    if(this.menuState){setTimeout(() => {this.menuState = false}, 400)}else{this.menuState = true}
    if(this.menuStateOverlay){setTimeout(() => {this.menuStateOverlay = false}, 600)}else{this.menuStateOverlay = true}

  }



}
