(function() {
  
  $('head').append('<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"/>');

  var plus = '<i class="viewPost fa fa-plus"></i>';
  var minusClass = 'fa-minus';
  var plusClass = 'fa-plus';

  var navTemplate = [
    '<div class="nav">',
    '<div class="headerBar"></div>',
    '<div>',
    '<input type="text" class="mySearchBar"/>',
    '<ul class="fa-ul actionLinks">',
    '<li><i class="fa-li fa fa-pencil"></i><a href="http://www.letsrun.com/forum/post.php?board=1">Start Thread</a></li>',
    '<li><i class="fa-li fa fa-dot-circle-o"></i><a href="http://www.letsrun.com/forum/register.php">Register Account</a></li>',
    '<li><i class="fa-li fa fa-spinner fa-exclamation-triangle"></i><a href="http://www.letsrun.com/forum/TOS.php">Read Rules</a></li>',
    '</ul>',
    '<div class="subForumLinks">',
    '<div>Main Message Board</div>',
    '<div>Training Forum</div>',
    '<div>High School Forum</div>',
    '<div>College Track and Field</div>',
    '<div>Shoes & Gear</div>',
    '</div>',
    '<div class="otherLinks">',
    '<div>What is LetsRun.com?</div>',
    '<div>News Archive</div>',
    '<div>Contact Us</div>',
    '<div>Advertise</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  /* JRT's Design */

  $('#wrapper, .page_content').wrapAll('<div class="tile"></div>');

  //Change the subject header to be 'Subject'
  $('.title.header').html('Subject');

  $('.lock_post').remove();

  $('.thread_list_container').append(navTemplate);

  //Fix the column order of the thread list
  $('.threads_container .row').each(function(idx, val) {
    var row = $(val);

    //reorder the columns to be Subject/Last Post/Posts
    row.find('.title').prependTo(row);
    row.find('.post_count').appendTo(row);

    if (row.hasClass('header')) {
      return;
    }

    row.find('.post_author').before('<br>');
    row.find('.post_author').before(plus);

    //make the datetimes span two rows
    var datetime = row.find('.timestamp');
    var dthtml = datetime.find('em').remove().html();
    if (dthtml) {
      datetime.html(dthtml.replace(' ', '<br>'));
    }

  });

  var $body = $('body');

  //display a preview of the first post when the preview button is clicked
  $body.on('click', '.' + plusClass, function() {
    
    var that = this;
    var url = $(this).parent().find('.post_title a').attr('href');
    url = url.replace(/&page=.*/, '') + '&page=0';
    $(this).removeClass(plusClass).addClass(minusClass);
    
    $.get(url).then(function(data) {
      var firstPost = '<div class="postPreview">' + 
                       $(data).find('.post_text span').html() + 
                       '<div style="margin-top:10px;font-size:x-small;"><a href="' + url + '">full thread</a></div>' +
                      '</div>';
      $(that).parent().parent().append(firstPost);
    });

  });

  $body.on('click', '.' + minusClass, function() {
    $(this).parent().parent().find('.postPreview').remove();
    $(this).removeClass(minusClass).addClass(plusClass);
  });




  $('.author').each(function(idx, val) {
    var author = $(val);
    var timestamp = author.parent().find('.timestamp');
    var reply = author.parent().find('.reply');
    author.remove();

    author = '<span class="author">' + author.html() + '</span>';
    timestamp.before(author);
    timestamp.after(reply);

    timestamp.parent().find('.timestamp, .author, .reply').wrapAll('<div style="height:20px;"></div>');

  });

  $('.subject_line:not(:first)').remove();

}());
