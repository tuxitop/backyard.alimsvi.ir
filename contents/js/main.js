var processingAjax = false;

$(document).ready(function() {
  // fix navbar to top
  $(document).scroll(function() {
    var scroll = $(this).scrollTop();
    var topDistTitle = $('.page-header').position();
    if (scroll > topDistTitle.top) {
      $('#website-title').addClass('fixed');
      // $('#website-title').css({'font-size': '25px'}, 1000);
    } else {
      $('#website-title').removeClass('fixed');
    }

    // load next page
    if (processingAjax) {
      return false;
    }

    if ($('.load-more').length > 0) {
      var topDistMore = $('.load-more').position().top - $('.load-more').outerHeight();
      if ($(window).scrollTop() + $(window).height() > topDistMore) {
        processingAjax = true;
        var nextHref = $('.next-page').attr('href');
        $.ajax({ type: 'GET', url: nextHref,
          success : function(text){
            var article = $(text).find('.list-articles').html();
            $('.load-more').replaceWith(article);
            $.getScript('//alimsvi.disqus.com/count.js');
            processingAjax = false;
          },
          error: function() {
            $('.load-more').removeClass('bg-success');
            $('.load-more').addClass('bg-danger');
            $('.load-more > p').text('بارگزاری با مشکل روبرو شد.');
          }
        });
      }
    }
  });

  // run colorbox to have image lightbox
  $('article img').parent('a').addClass('image-link').css({'width': '80%'});
  $('a.image-link:not(.islink)').colorbox({rel:'gal',maxWidth:'100%',maxHeight:'100%',scalePhotos:true});

  // The subscribe to email popup
  $('.toggle-large').removeClass('fa-chevron-right');
  $('.toggle-large').addClass('fa-chevron-left');
  $('.toggle-small > .fa').removeClass('fa-chevron-up');
  $('.toggle-small > .fa').addClass('fa-chevron-down');
  $('.popup').addClass('popup-expanded');

  $('.toggle').on('click', function() {
    if ($('.popup').hasClass('popup-expanded')) {
      $('.popup').removeClass('popup-expanded');
      $('.toggle-large').removeClass('fa-chevron-left');
      $('.toggle-large').addClass('fa-chevron-right');
      $('.toggle-small > .fa').removeClass('fa-chevron-down');
      $('.toggle-small > .fa').addClass('fa-chevron-up');
    } else {
      $('.popup').addClass('popup-expanded');
      $('.toggle-large').removeClass('fa-chevron-right');
      $('.toggle-large').addClass('fa-chevron-left');
      $('.toggle-small > .fa').removeClass('fa-chevron-up');
      $('.toggle-small > .fa').addClass('fa-chevron-down');
    }
  });
});
