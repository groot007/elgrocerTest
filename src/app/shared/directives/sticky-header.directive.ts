import {AfterViewInit, Directive, ElementRef} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Directive({
  selector: '[stickyHeader]'
})
export class StickyHeaderDirective implements AfterViewInit {
  cHeigh  = 0;
  hHeight = 0;
  nHeight = 0;
  cnHeight = 0;
  sHeight = 0;
  res = 0;
  resN = 0;

  ngAfterViewInit(): void {
    $(function() {

      this.cHeight = $('#carousel-example-generic').height();
      this.hHeight = $('#header-top').height();
      this.nHeight = $('#main-nav').height();
      this.cnHeight = $('.content-nav').height();
      this.sHeight = $('.searchbar-con').height();
      this.res = this.cHeight - this.hHeight - 30;
      this.resN = this.hHeight + this.nHeight;

      $('.short-header .main-nav').css('top', this.hHeight + 40);
      $('.content-nav').css('top', this.resN + 13);
      $('.short-header .content').css('margin-top', this.resN + this.cnHeight + this.sHeight + 20);

      if (screen.width < 992) {
        $('.searchbar-con').css('top', this.hHeight + this.nHeight + this.sHeight);
      } else {

      }

      window.addEventListener('scroll', (e) => {

        if (screen.width < 992) {
          if ($(window).scrollTop() > 2) {
            $('.searchbar-con').css('top', this.resN + 20);
          } else {
            $('.searchbar-con').css('top', this.hHeight + this.nHeight + this.sHeight);
          }
        }

        if (screen.width > 767) {
          if ($(window).scrollTop() > 2) {
            $('#header-top').addClass('header-fix');
            $('.full-header .site-logo > img').attr('src', '/assets/img/site-logo-green.png');
          } else {
            $('#header-top').removeClass('header-fix');
            $('.full-header .site-logo > img').attr('src', '/assets/img/site-logo.png');
          }
        }
        if (screen.width > 767) {

          if ($(window).scrollTop() > this.res) {
            $('#main-nav').addClass('nav-fix');
            $('.nav-fix').css('top', this.hHeight + 30);
          } else {
            console.log('less');
            $('#main-nav').removeClass('nav-fix');
            $('#main-nav').css('top', 'auto');
          }
          if ($(window).scrollTop() > 2) {
          } else {
            $('#main-nav').removeClass('nav-fix');
            $('#main-nav').css('top', 'auto');
            $('.short-header .main-nav').css('top', this.hHeight + 40);
          }
        }
      });
    });
  }
}
