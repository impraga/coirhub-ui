import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { GalleryService } from 'src/app/service/gallery.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-workwithus',
  templateUrl: './workwithus.component.html',
  styleUrls: ['./workwithus.component.css']
})
export class WorkwithusComponent implements OnInit {

  constructor(
    private galleryService: GalleryService,
    private spinnerService: SpinnerService
    ) { }

  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;

  gallery : any = [];

  myInterval = 3500;
  activeSlideIndex = 0;

  ngOnInit(): void {


  }

  getGalleryImage(){
    this.spinnerService.loader(true)
    this.galleryService.getGalleryImage().subscribe(res=>{
      console.log(res)
      this.gallery = res['data'];
      this.spinnerService.loader(false)
    }, err=>{
      this.spinnerService.loader(false)
    })
  }

  // coursel(){
  //   $(".insights__list__item:first-child").addClass("active");
  //   $("#insight8, #insight7").prependTo(".insights__list");
  //   const slideCount = $(".insights__list__item").length;
  //   var slideWidth;
  //   var sliderUlWidth;
  //   function startSlider() {
  //     $("#insightsSlider").css({ width: "432vw" });

  //     var windowWidth = $(".insights").width();
  //     var sliderOffset = (windowWidth / 100) * 88;

  //     slideWidth = $(".insights__list__item").width();
  //     slideWidth += (windowWidth / 100) * 12;
  //     sliderUlWidth = (windowWidth / 100) * 432;


  //     console.log("Insight Width " + slideWidth + "px");
  //     console.log("Slider Width " + sliderUlWidth + "px");
  //     console.log("Window Width " + windowWidth + "px");


  //     // sets width of container
  //     $("#insightsSlider").css({
  //       width: sliderUlWidth,
  //       marginLeft: -sliderOffset
  //     });
  //   }

  //   function moveRight() {
  //     $(".active").animate(
  //       {
  //         width: "40vw",
  //         height: "60%",
  //         maxHeight: "350px"
  //       },
  //       { duration: 600, queue: false }
  //     );
  //     $(".active").next().animate(
  //       {
  //         width: "56vw",
  //         height: "100%",
  //         maxHeight:"450px"
  //       },
  //       { duration: 600, queue: false }
  //     );
  //     $(".insights__list").animate(
  //       { left: -slideWidth },
  //       { duration: 600, queue: false }
  //     );

  //     $(".insights__list")
  //       .promise()
  //       .then(function () {
  //         // all finished
  //         $(".insights__list__item:first-child").appendTo(".insights__list");
  //         $(".insights__list").css("left", "");

  //         $(".active").next().addClass("active").removeClass("hovered");
  //         $(".insights__list__item:nth-child(2)").removeClass("active");
  //         $(".active").next().addClass("hovered");
  //       });
  //   }

  //   function moveLeft() {
  //     $(".active").animate(
  //       {
  //         width: "40vw",
  //         height: "60%",
  //         maxHeight: "350px"
  //       },
  //       { duration: 600, queue: false }
  //     );
  //     $(".active").prev().animate(
  //       {
  //         width: "56vw",
  //         height: "100%",
  //         maxHeight:"450px"
  //       },
  //       { duration: 600, queue: false }
  //     );
  //     $(".insights__list").animate(
  //       { right: - slideWidth },
  //       { duration: 600, queue: false }
  //     );

  //     $(".insights__list")
  //       .promise()
  //       .then(function () {
  //         // all finished
  //         $(".insights__list__item:last-child").prependTo(".insights__list");
  //         $(".insights__list").css("right", "");

  //         $(".active").prev().addClass("active").removeClass("hovered");
  //         $(".insights__list__item:nth-child(4)").removeClass("active");
  //         $(".active").prev().addClass("hovered");
  //       });
  //   }
  //   startSlider();
  //   $("#arrowRight")
  //     .mouseover(function () {
  //       $(".active").next().addClass("hovered");
  //    })
  //     .mouseout(function () {
  //       $(".active").next().removeClass("hovered");
  //    })
  //     .click(function () {
  //       moveRight();
  //    });

  //   $("#arrowLeft")
  //     .mouseover(function () {
  //       $(".active").prev().addClass("hovered");
  //    })
  //     .mouseout(function () {
  //       $(".active").prev().removeClass("hovered");
  //    })
  //     .click(function () {
  //       moveLeft();
  //    });

  //   $(window).resize(function () {
  //     waitForFinalEvent(
  //       function () {
  //         startSlider();
  //       },
  //       200,
  //       "resizeInsightSliderId"
  //     );
  //   });

  // var waitForFinalEvent = (function () {
  //   var timers = {};
  //   return function (callback, ms, uniqueId) {
  //     if (!uniqueId) {
  //       uniqueId = "Don't call this twice without a uniqueId";
  //     }
  //     if (timers[uniqueId]) {
  //       clearTimeout(timers[uniqueId]);
  //     }
  //     timers[uniqueId] = setTimeout(callback, ms);
  //   };
  // })();
  // }


}
