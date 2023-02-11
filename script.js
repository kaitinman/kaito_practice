$(function(){
	$('#navToggle').click(function() {
		$(this).toggleClass('active');

		if ($(this).hasClass('active')) {
			$('#globalNavi').addClass('active');
		} else {
			$('#globalNavi').removeClass('active');
		}
	});
	

	
	// スクロールでハンバーガーメニューの色を変えるための名前付け
	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop(); // スクロール上部の位置
		var areaTop = $(".target-area").offset().top - 20; // 対象エリアの上部の位置
		var areaBottom = areaTop + $(".target-area").innerHeight(); // 対象エリアの下部の位置

//		if (scrollTop > areaTop && scrollTop < areaBottom) {
		if (scrollTop > areaTop) {
			$("body").addClass("is-in"); // スクロールが対象エリアに入った場合
		} else {
			$("body").removeClass("is-in"); // スクロールが対象エリアから出ている場合
		}
	});

	var $slider = $('#js-slider');
 
	$slider
	// 最初のスライドに"add-animation"のclassを付ける(data-slick-index="0"が最初のスライドを指す)
	.on("init", function () {
		$('.slick-slide[data-slick-index="0"]').addClass("add-animation");
	})
	// 通常のオプション
	.slick({
		arrows: false, // 前・次のボタンを表示しない
		dots: true, // ドットナビゲーションを表示する
		appendDots: $('.dots'), // ドットナビゲーションの生成位置を変更
		fade: true, // スライド切り替えをフェード
		autoplay: false, //自動再生させない
		slidesToShow: 1, // 表示させるスライド数
	})
	.on({
		// スライドが移動する前に発生するイベント
		beforeChange: function (event, slick, currentSlide, nextSlide) {
			// 表示されているスライドに"add-animation"のclassをつける
			$(".slick-slide", this).eq(nextSlide).addClass("add-animation");
			// あとで"add-animation"のclassを消すための"remove-animation"classを付ける
			$(".slick-slide", this).eq(currentSlide).addClass("remove-animation");
		},
		// スライドが移動した後に発生するイベント
		afterChange: function () {
			// 表示していないスライドはアニメーションのclassを外す
			$(".remove-animation", this).removeClass(
				"remove-animation add-animation"
			);
		},
	});
 
	/*--- プログレスバー設定 -----------------------*/
  var
    time = 3,
    $bar = $('#js-progressBar'),
    isPause,
    tick,
    percentTime;
  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    isPause = false;
    tick = setInterval(interval, 10);
  }
  function interval() {
    if (isPause === false) {
      percentTime += 1 / (time + 0.1);
      $bar.css({
        width: percentTime + "%"
      });
      if (percentTime >= 100) {
        $slider.slick('slickNext');
        startProgressbar();
      }
    }
  }
  function resetProgressbar() {
    $bar.css({
      width: 0 + '%'
    });
    clearTimeout(tick);
  }
	startProgressbar();
   
	// カーソルが乗ったら止める
	$slider.on({
		mouseenter: function () { isPause = true; },
		mouseleave: function () { isPause = false; }
	});
   
	// ドットがクリックされたら再発火(スライド切り替え前のイベント)
	$slider.on('beforeChange', function (slick, currentSlide, nextSlide) {
		startProgressbar();
	});

   //////画像をスクロールしたとき下から上に位置も変わる/////

	const image = document.getElementsByClassName('thumbnail');
	new simpleParallax(image, {
		overflow: true
	});
	
	on = document.getElementsByClassName('scroll');
	new simpleParallax(on, {
	  delay: 1,
	  transition: 'cubic-bezier(0,0,0,.1)'
	});

     ////inview///////            

	$('.box1').on('inview', function(event, isInView) {
	if (isInView) {
	  $(this).addClass('fadeInDown');
	} else {
	  $(this).removeClass('fadeInDown');
	  $(this).css('opacity',0);
	}
	});

});





