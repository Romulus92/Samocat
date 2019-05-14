"use strict";

var func = {
  "heroBgHover": function heroBgHover() {
    var left = document.querySelector(".hero__ride");
    var right = document.querySelector(".hero__buisness");
    var container = document.querySelector(".hero");
    var logoDiv = document.querySelector(".nav__logo");
    var logo = document.querySelector(".nav__logo-img");
    var line = document.querySelector(".nav__lang-line");
    var lang = document.querySelectorAll(".nav__lang-link");
    var body = document.querySelector("body");
    var buisness = document.querySelector("buisness");
    var ride = document.querySelector("ride");
    left.addEventListener("click", function () {
      if (document.documentElement.clientWidth >= 802) {
        container.classList.add("click-left");
        line.classList.add("nav__lang-line_orange");
        lang[0].classList.add("nav__lang-link_left");
        lang[1].classList.add("nav__lang-link_left");
        setTimeout(function () {
          right.style.display = "none";
        }, 450);
        $(".content__wrapper").load("../../ride.html .ride__content", function () {
          $('.ride__slider').slick({
            arrows: false,
            dots: true,
            dotsClass: "ride__pagination",
            infinite: false
          });
          func.variationSlider();
        });
      } else {
        $("body").load("../../ride_mobile.html .ride__content-mobile", function () {
          if (document.documentElement.clientWidth >= 481) {
            $(".ride__mobile_rent_bg").attr("src", "assets/images/stoika_plan.png");
            $(".ride__mobile_buisness_bg").attr("src", "assets/images/menu_fransh_plan.png");
          } else {
            $(".ride__mobile_rent_bg").attr("src", "assets/images/stoika_mob.png");
            $(".ride__mobile_buisness_bg").attr("src", "assets/images/menu_fransh.png");
          }

          $('.ride__mobile-slider').slick({
            arrows: false,
            dots: true,
            dotsClass: "ride__pagination-mobile",
            infinite: false
          });
          $('.ride__mobile-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
            if ($(".slick-active").attr("data-slick-index") == 3) {
              $(".ride__item-picture").addClass("ride__item-picture_active slideInRight");
              $(".ride__item-bubble").addClass("ride__item-bubble_active fadeIn");
            }
          });
          var lang = document.querySelectorAll(".nav__lang-link");
          lang[0].addEventListener("click", function () {
            lang[1].classList.remove("nav__lang-link_active");
            lang[0].classList.add("nav__lang-link_active");
          });
          lang[1].addEventListener("click", function () {
            lang[0].classList.remove("nav__lang-link_active");
            lang[1].classList.add("nav__lang-link_active");
          });
          func.burgerMenu();
          func.loadSvg();
          func.burgerBgChange();
        });
      }
    });

    if (document.documentElement.clientWidth >= 802) {
      right.addEventListener("click", function () {
        container.classList.add("click-right");
        logo.classList.add("nav__logo-img_white");
        setTimeout(function () {
          container.classList.add("click-right-bg");
          left.style.display = "none";
        }, 450);
        $(".content__wrapper").load("../../buisness.html .buisness__content", function () {
          func.variationSlider();
        });
      });
    }

    logoDiv.addEventListener("click", function () {
      var lang = document.querySelectorAll(".nav__lang-link");
      container.classList.remove("click-left");
      logo.classList.remove("nav__logo-img_white");
      right.style.display = "flex";
      container.classList.remove("click-right");
      container.classList.remove("click-right-bg");
      left.style.display = "flex";
      lang[1].classList.remove("nav__lang-link_left");
      lang[0].classList.remove("nav__lang-link_left");
    });

    if (document.documentElement.clientWidth >= 802) {
      left.addEventListener("mouseenter", function () {
        container.classList.add("hover-left");
      });
      left.addEventListener("mouseleave", function () {
        container.classList.remove("hover-left");
      });
      right.addEventListener("mouseenter", function () {
        container.classList.add("hover-right");
      });
      right.addEventListener("mouseleave", function () {
        container.classList.remove("hover-right");
      });
    }
  },
  "langClick": function langClick() {
    var lang = document.querySelectorAll(".nav__lang-link");
    lang[0].addEventListener("click", function () {
      lang[1].classList.remove("nav__lang-link_active");
      lang[0].classList.add("nav__lang-link_active");
    });
    lang[1].addEventListener("click", function () {
      lang[0].classList.remove("nav__lang-link_active");
      lang[1].classList.add("nav__lang-link_active");
    });
    /* lang[2].addEventListener("click", function () {
      lang[2].classList.add("nav__lang-link_active")
      lang[3].classList.remove("nav__lang-link_active")
    })
    lang[3].addEventListener("click", function () {
      lang[2].classList.remove("nav__lang-link_active")
      lang[3].classList.add("nav__lang-link_active")
    }) */
  },
  "slickSlider": function slickSlider() {//ride main slider

    /* $('.ride__slider').slick({
      arrows: false,
      dots: true,
      dotsClass: "ride__pagination",
      infinite: false
    });
     var scroll = new ScrollWatcher();
    var rideSlider = document.querySelector(".ride__slider")
     scroll.watch(rideSlider).on('enter:full', function (evt) {
      $('.ride__slider').mousewheel(function (e) {
        if (e.deltaY < 1) {
          if ($(this).slick('slickCurrentSlide') == $(this).find('.slick-slide').length - 1) {
            return
          }
           e.preventDefault()
          $(this).slick('slickNext')
        } else {
          if ($(this).slick('slickCurrentSlide') == 0) {
            return
          }
           e.preventDefault()
          $(this).slick('slickPrev')
        }
      });
    })
     scroll.watch(rideSlider).on('exit:partial', function (evt) {
      $('.ride__slider').unmousewheel()
    })
    $('.ride__slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
      if ($(".slick-active").attr("data-slick-index") == 3) {
        $(".ride__item-picture").addClass("slideInRight")
        $(".ride__item-bubble").addClass("fadeIn")
      }
    }); */
    //ride mobile slider

    /* $('.ride__mobile-slider').slick({
      arrows: false,
      dots: true,
      dotsClass: "ride__pagination-mobile",
      infinite: false
    });
    $('.ride__mobile-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
      if ($(".slick-active").attr("data-slick-index") == 3) {
        $(".ride__item-picture").addClass("ride__item-picture_active slideInRight")
        $(".ride__item-bubble").addClass("ride__item-bubble_active fadeIn")
      }
    }); */
  },
  "loadSvg": function loadSvg() {
    $.get("/assets/svg/symbol/svg/sprite.symbol.svg", function (data) {
      var div = document.createElement("div");
      div.classList.add("svg-sprite");
      div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
      document.body.insertBefore(div, document.body.childNodes[0]);
    });
  },
  "burgerMenu": function burgerMenu() {
    var burger = document.querySelector(".ride__mobile_burger");
    var menu = document.querySelector(".ride__mobile_menu");
    var lines = document.querySelectorAll(".ride__mobile_line");
    var wrapper = document.querySelector(".ride__mobile_menu_wrapper");
    var bg = document.querySelector(".ride__mobile_bg");
    var burgerRide = document.querySelector(".ride__mobile_rent");
    var burgerBuisness = document.querySelector(".ride__mobile_buisness");
    var footer = document.querySelector(".ride__mobile_footer");
    burger.addEventListener("click", function () {
      if (menu.classList.contains("ride__mobile_menu_open")) {
        burger.classList.remove("ride__mobile_burger_open");
        menu.classList.remove("ride__mobile_menu_open");
        footer.classList.remove("slideInUp");
      } else {
        burger.classList.add("ride__mobile_burger_open");
        menu.classList.add("ride__mobile_menu_open");
        footer.classList.add("slideInUp");
      }

      for (i = 0; i < lines.length; i++) {
        lines[i].classList.toggle("ride__mobile_line_open");
      }
    });
    burgerRide.addEventListener("click", function () {
      $("body").load("../../ride_mobile.html .ride__content-mobile", function () {
        if (document.documentElement.clientWidth >= 481) {
          $(".ride__mobile_rent_bg").attr("src", "assets/images/stoika_plan.png");
          $(".ride__mobile_buisness_bg").attr("src", "assets/images/menu_fransh_plan.png");
        } else {
          $(".ride__mobile_rent_bg").attr("src", "assets/images/stoika_mob.png");
          $(".ride__mobile_buisness_bg").attr("src", "assets/images/menu_fransh.png");
        }

        $('.ride__mobile-slider').slick({
          arrows: false,
          dots: true,
          dotsClass: "ride__pagination-mobile",
          infinite: false
        });
        $('.ride__mobile-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
          if ($(".slick-active").attr("data-slick-index") == 3) {
            $(".ride__item-picture").addClass("ride__item-picture_active slideInRight");
            $(".ride__item-bubble").addClass("ride__item-bubble_active fadeIn");
          }
        });
        func.burgerMenu();
        func.loadSvg();
        func.langClick();
      });
    });
  },
  "burgerBgChange": function burgerBgChange() {
    if (document.documentElement.clientWidth >= 481) {
      $(".ride__mobile_rent_bg").attr("src", "assets/images/stoika_plan.png");
      $(".ride__mobile_buisness_bg").attr("src", "assets/images/menu_fransh_plan.png");
    } else {
      $(".ride__mobile_rent_bg").attr("src", "assets/images/stoika_mob.png");
      $(".ride__mobile_buisness_bg").attr("src", "assets/images/menu_fransh.png");
    }
  },
  "variationSlider": function variationSlider() {
    $('.variation__slider').slick({
      arrows: false,
      dots: true,
      infinite: false,
      dotsClass: "variation__slider-pagination",
      fade: true
    });
    $(".variation__slider-switcher-item").click(function (e) {
      e.preventDefault;
      var indexItem = $(this).index();
      $('.variation__slider').slick("slickGoTo", indexItem);
      $(".variation__slider-switcher-item").removeClass("variation__slider-switcher-item-active");
      $(this).addClass("variation__slider-switcher-item-active");
    });
    $('.variation__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $(".variation__slider-switcher-item").removeClass("variation__slider-switcher-item-active");
      $(".variation__slider-switcher-item-" + (nextSlide + 1)).addClass("variation__slider-switcher-item-active");
    });
    var scroll = new ScrollWatcher();
    var varSlider = document.querySelector('.variation__slider');
    scroll.watch(varSlider).on('enter:full', function (evt) {
      document.querySelector(".variation__hero").classList.add("variation__hero_active");
      $('.variation__slider').mousewheel(function (e) {
        if (e.deltaY < 1) {
          if ($(this).slick('slickCurrentSlide') == $(this).find('.slick-slide').length - 1) {
            return;
          }

          e.preventDefault();
          $(this).slick('slickNext');
        } else {
          if ($(this).slick('slickCurrentSlide') == 0) {
            return;
          }

          e.preventDefault();
          $(this).slick('slickPrev');
        }
      });
    });
    scroll.watch(varSlider).on('exit:partial', function (evt) {
      $('.variation__slider').unmousewheel();
    });
  }
};
var app = {
  'init': function init() {
    func.langClick();
    func.slickSlider();
    func.loadSvg();
    func.heroBgHover();
    func.burgerMenu();
    func.burgerBgChange();
  },
  'scroll': function scroll() {},
  'load': function load() {},
  'resize': function resize() {}
};
app.init();
window.addEventListener("load", function (event) {
  app.load();
});
window.addEventListener("resize", function (event) {
  app.resize();
});
window.addEventListener("scroll", function (event) {
  app.scroll();
});