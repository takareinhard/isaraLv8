$(function() {
  //ハンバーガーメニュー
  $('.toggle').click(function() {
   $(this).toggleClass('active');
  if ($(this).hasClass('active')) {
   $('.nav-menu').addClass('active'); 
   $('body').addClass('active');
   $('.header-inner').addClass('active');
   $('.header-logo').addClass('active');
  } else {
   $('.nav-menu').removeClass('active');
   $('body').removeClass('active');
   $('.header-inner').removeClass('active');
   $('.header-logo').removeClass('active');
  }
  });

//自動ループスライダー
    var $nav = $('#nav'),
    $slides = $('#slide-inner'),
    $slideContents= $('.slide-contents'),
    current = 0,
    number = $slideContents.length;
  $slideContents.each(function(i) { 
    $(this).css({
      left: '100' * i + '%'
    });
  });
  function navUpdate() {
    $nav.find('a').removeClass('active');
    $nav.find('a').eq(current).addClass('active');
  }
  function slider(index) {
    if (index < 0) {
      index = number - 1;
    }
    if (index > number - 1) {
      index = 0;
    }
    $slides.stop().animate({
      left: '-100' * index + '%'
    });
    current = index;
    navUpdate();
  }
  $nav.find('a').click(function(event) {
    event.preventDefault();
    var navIndex = $(this).index();
    navUpdate();
    slider(navIndex);
  });
  var start;
  function timerStart() {
    start = setInterval(function() {
      slider(current + 1);
    }, 5000);
  }
  function timerStop() {
    clearInterval(start);
  }
  slider(current);
  timerStart();
  // timerStop();

  //ページ内スクロール
  $('a[href^="#"]').click(function() {
    var speed = 400; 
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    var headerHeight = $('#header').outerHeight(true);
    $('body,html').animate({scrollTop:position - headerHeight}, speed, 'swing');
    $('.toggle').removeClass('active');
    $('.nav-menu').removeClass('active');
    $('body').removeClass('active');
    $('.header-inner').removeClass('active');
    $('.header-logo').removeClass('active');
    return false;
  });

  //フェードイン
  $(window).on('scroll', function() {
    if ($(window).scrollTop() >= $('.fade-contents').offset().top - $(window).height() + 150) {
      $('.fade-contents').addClass('fade');
    }
  });

  //タブメニュー
  $('.tab_btn').on('click', function() {
    $('.tab_item').removeClass("is-active-item");
    var Index = $('li .tab_btn').index(this)
    $('.tab_item').eq(Index).addClass("is-active-item");
    $('.tab_btn').removeClass('is-active-btn');
    $(this).addClass('is-active-btn');
  });

  //モーダルウインドウ
  $('.modal-btn').on('click',function(){
    var Index = $('div .modal-btn').index(this)
    $('body').css("overflowY","hidden");
    $('div .modal').eq(Index).fadeIn();
    return false;
});
$('.js-modal-close').on('click',function(){
    $('.js-modal').fadeOut();
    $('body').css("overflowY","scroll");
    return false;
});

//メンバースライダー
$(".member-card").each(function(i) { 
  $(this).css({
    left: (220 *i)+(i*30) + 'px'
  });
});
var currentMember = 0;
var slideNum = $('.member-card').length-1
var slidingMember = function(){
  if( currentMember < 0 ){
    currentMember = slideNum-2;
  }else if( currentMember > slideNum-2){
    currentMember = 0;
  }
  $(".slide-inner").stop().animate({
    marginLeft : (- currentMember * 220) + (- currentMember * 30) + "px"
    }, {
    duration : 500
    });
}
  $('.next').click(function() {
    currentMember++;
    slidingMember();
  });
  $('.prev').click(function() {
    currentMember--;
    slidingMember();
  });


  //アコーディオンメニュー
  $(".icon--plus").on("click", function() {
    $(this).parent().next().stop().slideToggle();
    $(this).parent().toggleClass("active");
    $(this).toggleClass("active");
  });

    //ローディング画面
  $(function() { 
    var h = $(window).height();
    $('#main-contents').css('display','none');
    $('#loader-bg ,#loading').height(h).css('display','block');
  });
  $(window).on('load',function () {
    $('#loader-bg').delay(900).fadeOut(800);
    $('#loading').delay(600).fadeOut(300);
    $('#main-contents').css('display', 'block');
  });
});

