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
    var postTops =[];
    posts.each(function(){
        postTops.push(Math.floor($(this).offset().top));

    });
    $(window).scroll(function(){
        pageTop = $(window).scrollTop() + 210;
        if(pageTop > postTops[counter+1]){
            counter++;
            alert('scrolling down');
        }else if(counter > 0 && pagetop < postTops[counter]){
            counter--;
            alert('scrolling up');
        }
        if (counter != prevCounter){
            $(allLinks).removeAttr('class');
            $('nav ul li a').eq(counter).addClass('selected');
            prevCounter = counter;
            alert('no scrolling');
        }
    });

});

