
$('nav ul li a').click(function(){
    var thisSection = $(this).attr('href');
    var thisLink = $(this);
    $('html, body').stop().animate({
        scrollTop: $(thisSection).offset.top -200
    }, 800, 'easeOutCirc', function(){
        $('nav ul li a').removeAttr('class');
        $(thisLink).addClass('selected');

    });

});

$(window).on('load', function(){
    var allLinks = $('nav ul li a');
    var posts = $('section');
    var pageTop;
    var postPos;
    var counter = 0;
    var prevCounter = 0;
    var doneResizing;
    var postTops =[];
    posts.each(function(){
        postTops.push(Math.floor($(this).offset().top));

    });
    $(window).scroll(function(){
        pageTop = $(window).scrollTop() + 210;
        if(pageTop > postTops[counter+1]){
            counter++;
        }else if(counter > 0 && pagetop < postTops[counter]){
            counter--;
        }
        if (counter != prevCounter){
            $(allLinks).removeAttr('class');
            $('nav ul li a').eq(counter).addClass('selected');
            prevCounter = counter;
        }
    });

    $(window).on('resize', function(){
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function(){
            postTops=[];
            posts.each(function(){
                postTops.push(Math.floor($(this).offset().top));
            });
        }, 500);
    });

});

/*
$(window).on('load', function(){
  $('.flexslider').flexslider(
    {
      animation: 'slide',
      slideshowSpeed: 2000,
      direction: 'vertical',
      reverse: true,
      pauseOnHover: true,
      before: function(){$('.cta').css('bottom', '100%')},
      start: function(){$('.cta').animate({bottom: '5%'},3000, 'easeOutElastic');},
      after: function(){$('.cta').animate({bottom: '5%'}, 3000, 'easeOutElastic');}
    }
  );
});
*/




