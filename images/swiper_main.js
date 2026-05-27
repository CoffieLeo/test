 


$(function () { 

	/*PC_版頭*/
	var topbn_PC1 = new Swiper('.topbn_PC1', {
		
    //★5.2.1★小圓點-白點swiper-pagination-white, 黑點swiper-pagination-black
    pagination: {
      el: '.topbn_PC1 .swiper-pagination',
      clickable: true, //觸擊切換
    },
    //左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black
    nextButton: '.swiper-button-next', 
    prevButton: '.swiper-button-prev',
    autoplay: {
      delay: 4500,
      disableOnInteraction: false, //觸擊後不再自動輪播
    },    	
		loop: true, //無限循環
    watchSlidesProgress: true, //進度參數啟動(過程3 2 1 0 -1 -2 -3)
		
		
    //★5.2.1★↓動作↓
    on: {
      //輪播開始時觸發
      transitionStart: function() {
        var prev_video = $(this.slides).eq(this.activeIndex).siblings('.swiper-slide').find('video');
        var video = $(this.slides).eq(this.activeIndex).find('video');
        if(video.length > 0){
          video[0].play();
        }
        if(prev_video.length > 0){
          for(var i=0;i<prev_video.length;i++){
            prev_video[i].pause();
            prev_video[i].currentTime = 0;
          }
        }
      },
    }, //↑動作↑    
    
    
    
    
		/*
		effect: 'fade',
		fade: {
            crossFade: true //打開自動淡出
        },
		*/		
	});

	
	/*第1區輪播*/
	var Areabtn = new Swiper('.btn01', {
		
    //★5.2.1★小圓點-白點swiper-pagination-white, 黑點swiper-pagination-black
    pagination: {
      el: '.btn01 .swiper-pagination',
      clickable: true, //觸擊切換
    },
    //左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black
    nextButton: '.swiper-button-next', 
    prevButton: '.swiper-button-prev',
    autoplay: {
      delay: 4500,
      disableOnInteraction: false, //觸擊後不再自動輪播
    },    	
		loop: true, //無限循環
    watchSlidesProgress: true, //進度參數啟動(過程3 2 1 0 -1 -2 -3)
		
		
    //★5.2.1★↓動作↓
    on: {
      //輪播開始時觸發
      transitionStart: function() {
        var prev_video = $(this.slides).eq(this.activeIndex).siblings('.swiper-slide').find('video');
        var video = $(this.slides).eq(this.activeIndex).find('video');
        if(video.length > 0){
          video[0].play();
        }
        if(prev_video.length > 0){
          for(var i=0;i<prev_video.length;i++){
            prev_video[i].pause();
            prev_video[i].currentTime = 0;
          }
        }
      },
    }, //↑動作↑    
    
    
    
    
		/*
		effect: 'fade',
		fade: {
            crossFade: true //打開自動淡出
        },
		*/		
	});

	/*第2區輪播*/
	var Areabtn = new Swiper('.btn02', {
		
    //★5.2.1★小圓點-白點swiper-pagination-white, 黑點swiper-pagination-black
    pagination: {
      el: '.btn02 .swiper-pagination',
      clickable: true, //觸擊切換
    },
    //左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black
    nextButton: '.swiper-button-next', 
    prevButton: '.swiper-button-prev',
    autoplay: {
      delay: 4500,
      disableOnInteraction: false, //觸擊後不再自動輪播
    },    	
		loop: true, //無限循環
    watchSlidesProgress: true, //進度參數啟動(過程3 2 1 0 -1 -2 -3)
		
		
    //★5.2.1★↓動作↓
    on: {
      //輪播開始時觸發
      transitionStart: function() {
        var prev_video = $(this.slides).eq(this.activeIndex).siblings('.swiper-slide').find('video');
        var video = $(this.slides).eq(this.activeIndex).find('video');
        if(video.length > 0){
          video[0].play();
        }
        if(prev_video.length > 0){
          for(var i=0;i<prev_video.length;i++){
            prev_video[i].pause();
            prev_video[i].currentTime = 0;
          }
        }
      },
    }, //↑動作↑    
    
    
    
    
		/*
		effect: 'fade',
		fade: {
            crossFade: true //打開自動淡出
        },
		*/		
	});
	
	/*第3區輪播*/
	var Areabtn = new Swiper('.btn03', {
		
    //★5.2.1★小圓點-白點swiper-pagination-white, 黑點swiper-pagination-black
    pagination: {
      el: '.btn03 .swiper-pagination',
      clickable: true, //觸擊切換
    },
    //左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black
    nextButton: '.swiper-button-next', 
    prevButton: '.swiper-button-prev',
    autoplay: {
      delay: 4500,
      disableOnInteraction: false, //觸擊後不再自動輪播
    },    	
		loop: true, //無限循環
    watchSlidesProgress: true, //進度參數啟動(過程3 2 1 0 -1 -2 -3)
		
		
    //★5.2.1★↓動作↓
    on: {
      //輪播開始時觸發
      transitionStart: function() {
        var prev_video = $(this.slides).eq(this.activeIndex).siblings('.swiper-slide').find('video');
        var video = $(this.slides).eq(this.activeIndex).find('video');
        if(video.length > 0){
          video[0].play();
        }
        if(prev_video.length > 0){
          for(var i=0;i<prev_video.length;i++){
            prev_video[i].pause();
            prev_video[i].currentTime = 0;
          }
        }
      },
    }, //↑動作↑    
    
    
    
    
		/*
		effect: 'fade',
		fade: {
            crossFade: true //打開自動淡出
        },
		*/		
	});

	/*第4區輪播*/
	var Areabtn = new Swiper('.btn04', {
		
    //★5.2.1★小圓點-白點swiper-pagination-white, 黑點swiper-pagination-black
    pagination: {
      el: '.btn04 .swiper-pagination',
      clickable: true, //觸擊切換
    },
    //左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black
    nextButton: '.swiper-button-next', 
    prevButton: '.swiper-button-prev',
    autoplay: {
      delay: 4500,
      disableOnInteraction: false, //觸擊後不再自動輪播
    },    	
		loop: true, //無限循環
    watchSlidesProgress: true, //進度參數啟動(過程3 2 1 0 -1 -2 -3)
		
		
    //★5.2.1★↓動作↓
    on: {
      //輪播開始時觸發
      transitionStart: function() {
        var prev_video = $(this.slides).eq(this.activeIndex).siblings('.swiper-slide').find('video');
        var video = $(this.slides).eq(this.activeIndex).find('video');
        if(video.length > 0){
          video[0].play();
        }
        if(prev_video.length > 0){
          for(var i=0;i<prev_video.length;i++){
            prev_video[i].pause();
            prev_video[i].currentTime = 0;
          }
        }
      },
    }, //↑動作↑    
    
    
    
    
		/*
		effect: 'fade',
		fade: {
            crossFade: true //打開自動淡出
        },
		*/		
	});

	/*輪播公版*/
	var Area01_tag = $('.Area07 .tag a');
  var Area01 = new Swiper('.Area07 .Area07_swiper ', {
    //★5.2.1★自動撥放
		autoplay: true,
		autoplay: {
    delay: 5000,
    disableOnInteraction: false, //觸擊後不再自動輪播
		},
    //★5.2.1★小圓點-白點swiper-pagination-white, 黑點swiper-pagination-black
    pagination: {
      el: '.Area07 .Area07_swiper .swiper-pagination',
      clickable: true, //觸擊切換
    },
    //★5.2.1★左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black  
    navigation:{
      nextEl: '.Area07 .Area07_swiper .button_myarrow_r',
      prevEl: '.Area07 .Area07_swiper .button_myarrow_l',
    },
    //initialSlide: now_activeIndex, //初始險是第幾個
    //★5.2.1★RWD(換成大於)
    breakpoints: {
      0: {
        //手機版
        slidesPerView: 1.05,
        spaceBetween: 25,
        centeredSlides: true, //當前區塊居中
      },
      768: {
        //電腦版
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true, //當前區塊居中
      },
    },
		
    //★5.2.1★↓動作↓
    on: {
      //初始化
      init: function() {
				Area01_tag.eq(this.activeIndex).addClass('cate-hover');
      },
      //輪播開始時觸發
      transitionStart: function() {
				//高亮
      		Area01_tag.removeClass('cate-hover').eq(this.activeIndex).addClass('cate-hover');
      },
    }, //↑動作↑		

  }); 

  /*點選單時*/
  Area01_tag.click(function(){
    var i = $(this).index();
    Area01.slideTo(i , 300); //移動到點擊卡
  })  


  var bunnySwiper = new Swiper('.bunnySwiper', {
      loop: true, // 啟用循環播放
      autoplay: {
      delay: 5000, // 5秒自動切換
      disableOnInteraction: false, // 使用者操作後仍然繼續自動播放
      },
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true, // 允許點擊切換
      },
      breakpoints: {
          // 針對不同屏幕大小做調整
          320: {
              slidesPerView: 1, // 小屏幕顯示一個幻燈片
              spaceBetween: 0,
          },
          768: {
              slidesPerView: 1, // 中等屏幕顯示兩個幻燈片
              spaceBetween: 0,
          },
          1024: {
              slidesPerView: 1, // 大屏幕顯示三個幻燈片
              spaceBetween: 0,
          }
      },
  });




  
})		
