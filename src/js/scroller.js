(function() {
  
  var pageRegex = /.*&page=(\d).*/i;
  var currentUrl = window.location.href;
  var pendingPageLoad = false;

  if (currentUrl.indexOf('/forum.php') === -1) {
    return;
  }

  var PAGES_LOADED = window.PAGES_LOADED = [];

  if (!pageRegex.test(currentUrl)) {
  	currentUrl += '&page=0';
  }

  var pageNum = +currentUrl.replace(pageRegex, '$1') || 0;
  PAGES_LOADED.push(pageNum);

  $(window).scroll(_.throttle(function() {
    if($(window).scrollTop() + window.innerHeight == $(window).height()) {
      renderNextPage();
    }
  }, 100));

  function renderNextPage() {

    if (!pendingPageLoad && _.contains(PAGES_LOADED, pageNum)) {
      ++pageNum;
    } else if (pendingPageLoad) {
      return;
    }

    pendingPageLoad = true;

    PAGES_LOADED.push(pageNum);
    
    currentUrl = currentUrl.replace(/&page=\d/, '&page=' + pageNum);

    $('.thread_list').append('<div class="loadingBar">Loading Next Page...</div>');

    var currentHeight = $(document).height();
    $("html, body").animate({ scrollTop: $(document).height() }, 'fast');



    $.get(currentUrl).then(function(data) {
    	$(data).find('.thread_list li').addClass('page' + pageNum).appendTo('.thread_list');
    	$('.loadingBar').remove();
    	fixShit('.page' + pageNum);
      pendingPageLoad = false;
      $('.page' + pageNum)
      $("html, body").animate({ scrollTop: $('.page' + pageNum).offset().top - 400 }, "slow", 'linear');

    });

  }

}());