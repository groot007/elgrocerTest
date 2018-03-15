/*
Theme Name:  el Grocer
Type:        Custom function
Description: Js for el Grocer.
Version:     1.0
Tags:        scroll,
*/
$(document).ready(function(e){
	$('.dropdown-menu').on({
		"click":function(e){
		  e.stopPropagation();
		}
	});

	$('.popup-close').click(function(){
		$('#dropdownMenu2, #dropdownMenu4, #dropdownMenu5, #dropdownMenu6').attr('aria-expanded', 'false');
		$('#dropdownMenu2, #dropdownMenu4, #dropdownMenu5, #dropdownMenu6').closest('.open').removeClass('open');
	});

	$('.store-info').click(function(){
		$(this).parent().parent().hide();
		$(this).closest('.store-box').siblings('.store-detail').show();
	});

	$('.store-detail-info').click(function(){
		$(this).parent().hide();
		$(this).closest('.store-detail').siblings('.store-box').show();
	});

	// clicking button with class "category-button"
    $(".content-nav li a").click(function(){
        // get the data-filter value of the button
        var filterValue = $(this).attr('data-filter');

        // show all items
        if(filterValue == "all")
        {
            $(".all").show("slow");
        }
        else
        {
            // hide all items
            $(".all").not('.'+filterValue).hide("slow");
            // and then, show only items with selected data-filter value
            $(".all").filter('.'+filterValue).show("slow");
        }
    });
	// $('.carousel').each(function(){
	// 	$(this).carousel({
	// 		pause: true,
	// 		interval: false
	// 	});
	// });
	// cHeight = $('#carousel-example-generic').height();
	// hHeight = $('#header-top').height();
	// nHeight = $('#main-nav').height();
	// cnHeight = $('.content-nav').height();
	// sHeight = $('.searchbar-con').height();
	// res = cHeight - hHeight-30;
	// resN = hHeight + nHeight;
  // console.log(res, cHeight, hHeight);

	// $('.short-header .main-nav').css('top', hHeight+40);
	// $('.content-nav').css('top', resN+13);
	// $('.short-header .content').css('margin-top', resN+cnHeight+sHeight+20);
    //
	// if(screen.width < 992){
	// 	$('.searchbar-con').css('top', hHeight+nHeight+sHeight);
	// } else {
    //
	// }
	// $(window).scroll(function() {
	// 	if(screen.width < 992){
	// 		if($(this).scrollTop()>2){
	// 			$('.searchbar-con').css('top', resN+20);
	// 		}
	// 		else {
	// 			$('.searchbar-con').css('top', hHeight+nHeight+sHeight);
	// 		}
	// 	}
    //
	// 	if(screen.width > 767){
	// 		if($(this).scrollTop()>2) {
	// 			// $( "#header-top" ).addClass("header-fix");
	// 			$('.full-header .site-logo > img').attr('src', '/assets/img/site-logo-green.png');
	// 		} else {
	// 			// $( "#header-top" ).removeClass("header-fix");
	// 			$('.full-header .site-logo > img').attr('src', '/assets/img/site-logo.png');
	// 		}
	// 	}
	// 	if(screen.width > 767){
     //  // console.log($(this).scrollTop(), res, cHeight, hHeight);
	// 		if($(this).scrollTop()>res) {
	// 			$( "#main-nav" ).addClass("nav-fix");
	// 			$('.nav-fix').css('top', hHeight+30);
	// 		} else {console.log('less');
	// 			$( "#main-nav" ).removeClass("nav-fix");
	// 			$('#main-nav').css('top', 'auto');
	// 		}
	// 		if($(this).scrollTop()>2){
	// 		} else {
	// 			$( "#main-nav" ).removeClass("nav-fix");
     //    $( "#main-nav" ).css("top", "auto");
	// 			$('.short-header .main-nav').css('top', hHeight+40);
    //
	// 		}
	// 	}
	// });
});
