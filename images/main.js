 
// JavaScript Document
/* 回版頭*/


/*開關PC黏人精*/
$(function(){
	var $fixed_Area = $('.fixed_Area');
	//預設進場
	setTimeout( function(){ $fixed_Area.toggleClass('fixed_Area_hide') } ,1500)
	//點擊切換
	$fixed_Area.find('.js-fixed_Area_hide').click(function(){
		$fixed_Area.toggleClass('fixed_Area_hide');
	})
});


/* 滑動的GOTO */
function goTop(val) {
	var gotop_i = 60
	jQuery('html,body').animate({scrollTop: jQuery(val).offset().top - gotop_i });
}




/*TimeSwitch指定時間開關物件
  -----------------------------------------------
  啟動器: data-TimeSwitch_start="2018/2/12 00:00:00" data-TimeSwitch_end="2018/2/20 23:59:59" data-TimeSwitch_Myswitch="0"
  說明:
  data-TimeSwitch_start		開始時間
  data-TimeSwitch_end		結束時間
  data-TimeSwitch_Myswitch	動作 0刪除、1打開
  -----------------------------------------------*/
$(function() {
	$("[data-TimeSwitch_start]").each(function() {
		var TimeSwitch = new Date();
		//var TimeSwitch = new Date('2021/1/21');
		var TimeSwitchmonth  = TimeSwitch.getMonth()+1; //月
		var TimeSwitchday    = TimeSwitch.getDate(); //日
		var TimeSwitchhour   = TimeSwitch.getHours();  //時
		var TimeSwitchminute = TimeSwitch.getMinutes();  //分
		var TimeSwitchsecond = TimeSwitch.getSeconds();  //秒
		var TimeSwitchweek   = TimeSwitch.getDay(); //星期0~6 
		if( TimeSwitchmonth < 10 ){TimeSwitchmonth = '0' + TimeSwitchmonth;}  
		if( TimeSwitchday   < 10 ){TimeSwitchday   = '0' + TimeSwitchday;}  

		//範圍時間
		var Mydate_start = new Date( $(this).attr('data-TimeSwitch_start') );
		var Mydate_end   = new Date( $(this).attr('data-TimeSwitch_end') );
		var Myswitch     = $(this).attr('data-TimeSwitch_Myswitch') ;
    var Myclass      = $(this).attr('data-TimeSwitch_class')

		//Myswitch = 0 隱藏
		if ( Myswitch == 0){
				if ( Mydate_start <= TimeSwitch && TimeSwitch <= Mydate_end ) {
						$(this).remove();  //Myswitch:0, 時間內,刪除
				} else {
						$(this).show();  //Myswitch:0, 時間外,打開
				}
		}
		//Myswitch = 1 打開
		if ( Myswitch == 1){
				if ( Mydate_start <= TimeSwitch && TimeSwitch <= Mydate_end ) {
						$(this).show();   //Myswitch:1, 時間內,打開
				} else {
						$(this).remove();   //Myswitch:1, 時間外,刪除
				}
		}		
    //Myswitch = 3 加class
		if ( Myswitch == 3){
				if ( Mydate_start <= TimeSwitch && TimeSwitch <= Mydate_end ) {
						//$(this).show();   //Myswitch:3, 時間內,打開
						$(this).addClass(Myclass);   //Myswitch:3, 時間內,打開
				} else {
						//$(this).remove();   //Myswitch:3, 時間外,刪除
				}
		}
	});
});


/*倒數*/
function clock(){
  var DifferenceHour = -1;
  var DifferenceMinute = -1;
  var DifferenceSecond = -1;
  var Tday = new Date("2023/5/1 00:00:00");
  var daysms = 24 * 60 * 60 * 1000;
  var hoursms = 60 * 60 * 1000;
  var Secondms = 60 * 1000;
  var microsecond = 1000;
  var msecms = 10;
  var day = 1;
  var time = new Date()
  var hour = time.getHours()
  var minute = time.getMinutes()
  var second = time.getSeconds()
  var msec = time.getMilliseconds()
  var convertHour = DifferenceHour;
  var convertMinute = DifferenceMinute;
  var convertSecond = DifferenceSecond;
  var Diffms = Tday.getTime() - time.getTime();
  DifferenceHour = Math.floor(Diffms / daysms);
  Diffms -= DifferenceHour * daysms;
  DifferenceMinute = Math.floor(Diffms / hoursms);
  Diffms -= DifferenceMinute * hoursms;
  DifferenceSecond = Math.floor(Diffms / Secondms);
  Diffms -= DifferenceSecond * Secondms
  var dSecs = Math.floor(Diffms / microsecond)
  var dMsec = Math.floor( Diffms / msecms % 100)
  
  if(convertHour   != DifferenceHour  ) { DifferenceHour   = ( DifferenceHour   < 10 ) ?      DifferenceHour   : DifferenceHour  ; document.getElementById('DD').innerHTML = DifferenceHour; }
  if(convertMinute != DifferenceMinute) { DifferenceMinute = ( DifferenceMinute < 10 ) ? "0"+ DifferenceMinute : DifferenceMinute; document.getElementById('HH').innerHTML = DifferenceMinute; }
  if(convertSecond != DifferenceSecond) { DifferenceSecond = ( DifferenceSecond < 10 ) ? "0"+ DifferenceSecond : DifferenceSecond; document.getElementById('MM').innerHTML = DifferenceSecond; }
  dSecs = ( dSecs < 10 ) ? "0"+ dSecs : dSecs; document.getElementById("SS").innerHTML = dSecs;
  dMsec = ( dMsec < 10 ) ? "0"+ dMsec : dMsec; document.getElementById("MS").innerHTML = dMsec;  

  setTimeout("clock()",10)
};
  clock();


/* 浮層區*/
function agree(val) {
	$(val).fadeIn();
	var winST =  jQuery(window).scrollTop(); //目前位置
	var winH =  jQuery(window).height(); //裝置高度
	//浮層高度
	$(val).find('.agreeArea .txtArea').css('height', winH * 70 / 100 );
	var this_agreeH = $(val).find('.agreeArea').height();
	//浮層top定位
	$('.agreeArea').css('top', winST + winH/2 - this_agreeH/2 );
    /*延遲載圖*/
	$(function () {  
            imglazyload();
        });
	function imglazyload() { 
	  var imglazy = ".agree_more img.lazy"; 
	  $(imglazy).show().lazyload({
		  threshold: 1000,
		  //failure_limit: 10,
		  effect : "fadeIn",
		  container:$('#agree')
	  });
};
}
$(function(){
	var blackBox = $(".blackBox");
	var blackBox_close = $(".blackBox .close , .blackBox .but-close");
	var blackBox_BOXclose = ".Boxclose , .fixedfooterArea_B ";
	//點按鈕關閉
	blackBox_close.delegate( "a" ,"touchstart click",function(e){
		$(blackBox).fadeOut();
		e.preventDefault();
	});
	//點黑區關閉
	blackBox.delegate( blackBox_BOXclose ,"touchstart click",function(e){
		$(blackBox).fadeOut();
		e.preventDefault();
	});
});
 
 
 
 /* 浮層區2*/
function agree(val) {
	$(val).fadeIn();
	var winST =  jQuery(window).scrollTop(); //目前位置
	var winH =  jQuery(window).height(); //裝置高度
	//浮層高度
	$(val).find('.agreeArea1 .txtArea').css('height', winH * 60 / 100 );
	var this_agreeH = $(val).find('.agreeArea1').height();
	//浮層top定位
	$('.agreeArea1').css('top', winST + winH/2 - this_agreeH/2 );
}
$(function(){
	var blackBox = $(".blackBox1");
	var blackBox_close = $(".blackBox1 .close , .blackBox1 .but-close");
	var blackBox_BOXclose = ".Boxclose , .fixedfooterArea_B ";
	//點按鈕關閉
	blackBox_close.delegate( "a" ,"touchstart click",function(e){
		$(blackBox).fadeOut();
		e.preventDefault();
	});
	//點黑區關閉
	blackBox.delegate( blackBox_BOXclose ,"touchstart click",function(e){
		$(blackBox).fadeOut();
		e.preventDefault();
	});
});


 

$(function(){
	
	/*頁籤開關動作*/
	var $tabPanel = $('.menu'),
		$tabs = $tabPanel.find('.labelbox'),
		$tab = $tabs.find('li'),
		$tabContent = $('.content'),
		$content = $tabContent.find('> .page');
		$tab.eq(0).addClass('selected');
		$content.eq(0).show();
		$tab.click(function(){
			var $tabIndex = $(this).index();
			$(this).addClass('selected').siblings().removeClass('selected');
			$content.eq($tabIndex).show().siblings().hide();
			imglazyload();
		});	

	
	/*網址指定頁籤開關*/
	var domainQur = window.location.search.substring(1); // domainQur = npn=1vEK1psAv1Uo&n=1&code=3
	if(domainQur!=''){
		var params = JSON.parse('{"' + decodeURI(domainQur).replace(/"/g, '\\"').replace(/=/g, '":"').replace(/&/g, '","') + '"}');// {npn: 1vEK1psAv1Uo , n : 1, code : 3}
		//var npn = params.npn; 
		//var n=params.n
		var art_code=params.art_code

		//console.log('here'+art_code);
		if(art_code!=undefined) {
			$tab.eq(art_code-1).addClass('selected').siblings().removeClass('selected');
			$content.eq(art_code-1).show().siblings().hide();	
		}
	}	
	
});
	


/* 開關PC置頂頁籤 */
jQuery(function(){
if ( $(window).width() > 767 ) {
    jQuery(window).scroll(function() {
        if ( jQuery(this).scrollTop() > 100){ //設定大於100px才顯示浮層
            jQuery('.cantantBase').css("position", "fixed");
        } else {
            jQuery('.cantantBase').css("position", "relative");
        }
    });
};	
});


/* PC置頂頁籤內容物切換 */


$(function(){
	if ( $(window).width() > 767 ) {
	// 預設顯示第一個 Tab
	//var _showTab = 0;
	//var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
	//$($defaultLi.find('a').attr('href')).siblings().hide();
	//$($defaultLi.find('a').attr('href')).addClass('active').siblings('.active').removeClass('active');
	
	// 當 li 頁籤被點擊時...
	// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
	$('ul.tabs li').mouseover(function() {
		// 找出 li 中的超連結 href(#id)
		var $this = $(this),
		_clickTab = $this.find('a').attr('href');
		// 把目前點擊到的 li 頁籤加上 .active
		// 並把兄弟元素中有 .active 的都移除 class
		$this.addClass('active').siblings('.active').removeClass('active');
		// 淡入相對應的內容並隱藏兄弟元素
		//$(_clickTab).stop(false, true).fadeIn().siblings().fadeOut();
		$(_clickTab).addClass('active').siblings('.active').removeClass('active');
		
		return false;
	}).find('a').focus(function(){
		this.blur();
	});
	
	//點按鈕關閉
	$(".tab_content .colse_button").click(function(){
		$(".tab_content").removeClass('active');
		$('ul.tabs li').removeClass('active');
	});
	
};
});

//滑鼠移出頁籤區關閉
$(document).mouseout(function (e) {
    var container =$(".cantantBase,.tab_content"); // 這邊放你想要排除的區塊
    if (!container.is(e.target) && container.has(e.target).length === 0) {
		$(".tab_content").removeClass('active');
		$('ul.tabs li').removeClass('active');   
    }
}); 



/*開合*/
$(function(){
	if ( $(window).width() < 768 ) {
	// 預設顯示第一個 Tab
	var _showTab = 1;
	var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('open');
	$($defaultLi.find('a').attr('href')).siblings().hide();
	$($defaultLi.find('a').attr('href')).addClass('open').siblings('.open').removeClass('open');		
		
		
	$('ul.tabs li').click(function() {
	// 找出 li 中的超連結 href(#id)
	var $this = $(this),
	_clickTab = $this.find('a').attr('href');
	// 把目前點擊到的 li 頁籤加上 .active
	// 並把兄弟元素中有 .active 的都移除 class
	$this.toggleClass('open').siblings('.open').toggleClass('open');
	// 淡入相對應的內容並隱藏兄弟元素
	//$(_clickTab).stop(false, true).fadeIn().siblings().fadeOut();
	$(_clickTab).toggleClass('open').siblings('.open').toggleClass('open');
	$(".tab_content").stop(true,false).animate({scrollTop:0}); //設定回頁面頂端
	return false;
	}).find('a').focus(function(){
		this.blur();
	});
		
	};
});
