import { Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    var aboutusParallax = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-left-cont",
        start: "top center",
        end: "bottom top",
        scrub: true,
        markers: false
      }
    });
    aboutusParallax.fromTo(".small-green-cont",{ y: 20 ,duration: 1 , ease:'Sine'},{ y: -20 }, 'about');
    aboutusParallax.fromTo(".large-image-cont",{ y: 40 ,duration: 1 , ease:'Sine'},{ y: -40 }, 'about');
    aboutusParallax.fromTo(".large-green-cont",{ y: 60 ,duration: 1 , ease:'Sine'},{ y: 0 }, 'about');



  }



}
