$(function() {
  //footer直营校区
  $('#campus-bj').hover(function () {
    $('.cl-bj').css('display', 'block')
  })
  $('#campus-bj').on('mouseout', function () {
    $('.cl-bj').css('display', 'none')
  })
  $('#campus-sh').hover(function () {
    $('.cl-sh').css('display', 'block')
  })
  $('#campus-sh').on('mouseout', function () {
    $('.cl-sh').css('display', 'none')
  })
  //名人推荐视频
  $('#play-langlang').on('click', function () {
    createFullVideo('http://static.1tai.com/theone/index-about-v3.mp4?v=2')
    $('.fixed-bar').css('display', 'none');
  })
  $('#play-likaifu').on('click', function () {
    createFullVideo('http://static.1tai.com/videos/music_center/likaifu.mp4')
    $('.fixed-bar').css('display', 'none');
  })
  //成人课程视频
  $('#play-xiaoli').on('click', function () {
    createFullVideo('http://static.1tai.com/videos/music_center/xiaoli.mp4')
    $('.fixed-bar').css('display', 'none');
  })
  $('#play-danxiaojie').on('click', function () {
    createFullVideo('http://static.1tai.com/videos/music_center/danxiaojie.mp4')
    $('.fixed-bar').css('display', 'none');
  })
  //header微信二维码
  $('.wechat').hover(function () {
    $('.pop').css('display', 'block')
  })
  $('.wechat').on('mouseout', function () {
    $('.pop').css('display', 'none')
  })
  //footer 微信二维码
  $('#wechat-public').hover(function(){
    $('.ft-pop-public').css('display', 'block')
  })
  $('#wechat-public').on('mouseout', function () {
    $('.ft-pop-public').css('display', 'none')
  })
  $('#wechat-service').hover(function(){
    $('.ft-pop-service').css('display', 'block')
  })
  $('#wechat-service').on('mouseout', function () {
    $('.ft-pop-service').css('display', 'none')
  })
  // //电话咨询and 在线咨询
  // $('.tel-helper').hover(function(){
  //   $('.tel-tip').css('display', 'block')
  // })
  // $('.tel-helper').on('mouseout', function () {
  //   $('.tel-tip').css('display', 'none')
  // })
  // 手风琴菜单
  $('#accordion').on('click','.link',function(){
    $(this).next().slideToggle();
    $(this).parent().siblings().children('.open').next().slideToggle();
    $(this).parent().siblings().children('.link').removeClass('open')
    $(this).toggleClass('open')
  })
  //领取框点击选择校区
  $('.campus-item').on('click',function(){
    const campus = $(this).text()
    $('.link > span').text(campus)
    $('.link').removeClass('open')
    $('.submenu').css('display', 'none')
    const chosenId = $(this).attr('value')
    $('#accordion').attr('value', chosenId)
  })
  //注册领取
  $('#submit').click(function(e){
    e.preventDefault()
    var parent  = $(this).parent();
    var mobile = parent.find('#adult-mobile').val()
    var name = parent.find('#adult-name').val()
    var age = parent.find('#adult-age').val()
    var captcha = parent.find('#adult-captcha').val()
    var id = $('#accordion').attr('value')
    if(!name){
      alert('请输入姓名')
      return
    }
    if(!age){
      alert('请输入年龄')
      return
    }
    if(!mobile) {
      alert('请输入手机号')
      return
    }
    if(!captcha) {
      alert('请输入验证码')
      return
    }
    if(!id) {
      alert('请选择校区')
      return
    }
    $.ajax({
      url: '/api/user/add',
      type: 'post',
      data: {
        mobile: mobile,
        name: name,
        age: age,
        school_id: id,
        captcha: captcha
      },
      success: function (data) {
        if (data.code == 0) {
          alert('您已注册成功，谢谢！')
        } else {
          alert(data.message || '注册失败')
        }
      },
      error: function (e) {
        console.log(e)
        alert('注册失败')
      }
    })
  })
  //回到顶部
  $('.back-to-top').on('click', function() {
    $('html , body').animate({scrollTop: 0},'slow')
  })
})

/*获取验证码*/
var isPhone = 1;
function getCode(e){
  checkPhone(); //验证手机号码
  if(isPhone){
    //倒计时
    var mobile = $('#adult-mobile').val();
    $.ajax({
      url: '/api/sendCaptcha',
      type: 'post',
      data: {
        mobile: mobile,
      },
      success: function (data) {
        console.log(data.code)
        console.log(data.message)
        if (data.code == 0) {
          alert('获取验证码成功')
          resetCode();
        } else {
          alert(data.message || '获取失败')
        }
      },
      error: function (data) {
          alert('获取失败')
      }
    })
  }else{
    $('#adult-mobile').focus();
  }
}
//验证手机号码
function checkPhone(){
  var phone = $('#adult-mobile').val();
  var pattern = /^(13|14|15|16|17|18|19)\d{9}$/g;
  isPhone = 1;
  if(phone == '') {
    alert('请输入手机号码');
    isPhone = 0;
    return;
  }
  if(!pattern.test(phone)){
    alert('请输入正确的手机号码');
    isPhone = 0;
    return;
  }
}
//倒计时
function resetCode(){
  $('#get-captcha').hide();
  $('#time-captcha').html('60');
  $('#reset-captcha').show();
  $('#reset-captcha').attr('disabled',true);
  $('#reset-captcha').css({'background': '#f2f2f2', 'color': '#b4b5b5', 'borderColor': '#f2f2f2'});
  var second = 60;
  var timer = null;
  timer = setInterval(function(){
    second -= 1;
    if (second >0) {
      $('#time-captcha').html(second);
    } else {
      clearInterval(timer);
      $('#get-captcha').show();
      $('#reset-captcha').hide();
    }
  },1000);
}