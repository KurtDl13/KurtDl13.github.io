"use strict";

// $(document).ready(function(){
//   $('.carousel__inner').slick({
//     speed: 1200,
//     // adaptiveHeight: true,
//     prevArrow: '<button type="button" class="slick-prev"><img src="../img/carousel/chevron-left-solid.svg"></button>',
//     nextArrow: '<button type="button" class="slick-next"><img src="../img/carousel/chevron-right-solid.svg"></button>',
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           dots: true,
//           arrows: false
//         }
//       }
//     ]
//   });
// });

$(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Настройка модальных окон
  $('[data-modal=consultation]').on("click", function() {
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", function() {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".button_min").each(function(i) {
    $(this).on("click", function() {
      $("#order .modal__desc").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  // Настройка форм валидации
  // $('#consultation-form').validate();
  // $('#consultation form').validate({
  //   rules: {
  //     name: {
  //       required: true,
  //       minlength: 2
  //     },
  //     phone: "required",
  //     email: {
  //       required: true,
  //       email: true
  //     }
  //   },
  //   messages: {
  //     name: {
  //       required: "Пожалуйста, введите своё имя",
  //       minlength: jQuery.validator.format("Введите {0} символа")
  //     },
  //     phone: "Пожалуйста, введите своё номер телефона",
  //     email: {
  //       required: "Пожалуйста, введите свой почтовый адрес",
  //       email: "Неправильно введён адрес почты"
  //     }
  //   }
  // });
  // $('#order form').validate();

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format("Введите {0} символа")
        },
        phone: "Пожалуйста, введите своё номер телефона",
        email: {
          required: "Пожалуйста, введите свой почтовый адрес",
          email: "Неправильно введён адрес почты"
        }
      }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  // Настройка маски ввода номера телефона
  $('input[name=phone]').mask("+375 (999) 999-9999");

  // Настройка отправки заявки на сервер без перезагрузки страницы
  $('form').submit(function(e) {
    e.preventDefault();

    if(!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "../mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });

  // Настройка появления скрола при прогартовании страницы
  $(window).scroll(function() {
    if($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  // Настройка скорости прокрутки и куда прокручивать
  var $page = $('html, body');
  $('a[href*="#up"]').click(function() {
      $page.animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 400);
      return false;
  });

  // Для управления анимацией
  new WOW().init();

});

const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});