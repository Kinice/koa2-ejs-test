$(document).ready(function() {
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }

    // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // }
  })
  var brandSwiper = new Swiper ('.brand-swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    // pagination: {
    //   el: '.swiper-pagination',
    // },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.brand-swiper-button-next',
      prevEl: '.brand-swiper-button-prev',
    }

    // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // }
  })
  var starSwiper = new Swiper ('.star-swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    // pagination: {
    //   el: '.swiper-pagination',
    // },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.star-swiper-button-next',
      prevEl: '.star-swiper-button-prev',
    }

    // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // }
  })
})

$(function() {
  //首页banner滑动样式变化
  var nav = $('#g-hd-index')
  var win = $(window)
  var sc = $(document)
  var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
  win.scroll(function () {
    if (sc.scrollTop() > screenHeight) {
      nav.addClass('g-nav1')
    } else {
      nav.removeClass('g-nav1')
    }
    if (sc.scrollTop() > 120) {
      $('.fixed-bar').css('display','block')
    } else {
      $('.fixed-bar').css('display','none')
    }
  })
})

//首页滚动数字
var number1 = 38;
var number2 = 250000;
var number3 = 100;

var n1 = new DigitRoll({
  container: '#num1',
  width: 2
});
n1.roll(number1)

var n2 = new DigitRoll({
  container: '#num2',
  width: 6
});
n2.roll(number2)

var n3 = new DigitRoll({
  container: '#num3',
  width: 3
});
n3.roll(number3)


