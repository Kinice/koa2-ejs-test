$(document).ready(function() {
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
  var reportSwiper = new Swiper ('.report-swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    // pagination: {
    //   el: '.swiper-pagination',
    // },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.report-swiper-button-next',
      prevEl: '.report-swiper-button-prev',
    }

    // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // }
  })
})