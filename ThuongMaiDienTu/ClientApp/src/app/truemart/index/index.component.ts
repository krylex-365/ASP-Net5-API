import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
/** index component*/
export class IndexComponent implements OnInit {
  /** index ctor */
  constructor() { }
  ngOnInit() {
    /* BEGIN JQUERY HERE */
    $(document).ready(function () {
      /*----------------------------
    5. NivoSlider Activation
    -----------------------------*/
      $('#slider').nivoSlider({
        effect: 'random',
        animSpeed: 300,
        pauseTime: 5000,
        directionNav: true,
        manualAdvance: true,
        controlNavThumbs: false,
        pauseOnHover: true,
        controlNav: false,
        prevText: "<i class='lnr lnr-arrow-left'></i>",
        nextText: "<i class='lnr lnr-arrow-right'></i>"
      });

      /*----------------------------------------------------
      6. Hot Deal Product Activation
      -----------------------------------------------------*/
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

      /*----------------------------------------------------
      7. Brand Banner Activation
      -----------------------------------------------------*/
      $('.brand-banner').owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        dots: false,
        navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"],
        smartSpeed: 1200,
        margin: 0,
        responsive: {
          0: {
            items: 1,
            autoplay: true,
            smartSpeed: 500
          },
          380: {
            items: 2
          },
          768: {
            items: 3
          },
          1000: {
            items: 3
          }
        }
      })

      /*----------------------------------------------------
      8. Electronics Product Activation
      -----------------------------------------------------*/
      $('.electronics-pro-active2')
        .on('changed.owl.carousel initialized.owl.carousel', function (event) {
          $(event.target)
            .find('.owl-item').removeClass('last')
            .eq(event.item.index + event.page.size - 1).addClass('last');
        }).owlCarousel({
          loop: false,
          nav: true,
          dots: false,
          smartSpeed: 1000,
          navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"],
          margin: 10,
          responsive: {
            0: {
              items: 1,
              autoplay: true,
              smartSpeed: 500
            },
            768: {
              items: 2
            },
            992: {
              items: 2
            },
            1200: {
              items: 3
            }
          }
        })

      /*----------------------------------------------------
      9. Best Seller Product Activation
      -----------------------------------------------------*/
      $('.best-seller-pro-active').owlCarousel({
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
          450: {
            items: 2
          },
          768: {
            items: 3
          },
          992: {
            items: 4
          },
          1200: {
            items: 5
          }
        }
      })
      $('.trending-pro-active').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        smartSpeed: 1500,
        navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"],
        margin: 10,
        responsive: {
          0: {
            items: 1,
            autoplay: true,
            smartSpeed: 500
          },
          450: {
            items: 2
          },
          768: {
            items: 3
          },
          992: {
            items: 4
          },
          1200: {
            items: 5
          }
        }
      })
    })
    /* END JQUERY HERE */
  }
}
