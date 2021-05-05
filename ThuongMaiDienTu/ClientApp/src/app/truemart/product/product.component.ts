import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductShopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('.hot-deal-active').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        smartSpeed: 1500,
        navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"],
        margin: 10,
        responsive: {
          0: {
            items: 1,
            autoplay: true,
            smartSpeed: 500
          },
          480: {
            items: 2
          },
          768: {
            items: 2
          },
          992: {
            items: 3
          },
          1200: {
            items: 5
          }
        }
      })
      $('.hot-deal-active3').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        smartSpeed: 1500,
        navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"],
        margin: 10,
        responsive: {
          0: {
            items: 1,
            autoplay: true,
            smartSpeed: 500
          },
          480: {
            items: 1
          },
          768: {
            items: 1
          },
          992: {
            items: 1
          },
          1200: {
            items: 1
          }
        }
      })
    });
  }

}
