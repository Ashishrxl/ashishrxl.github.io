/*
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
*/

$(window).on('load', function(){
    var posts = $('section');
    var pageTop;
    var postPos;
    var counter = 0;
    var postTops =[];
    posts.each(function(){
        postTops.push($(this).offset().top);

    });
    alert(postTops);
    $(window).scroll(function(){
        

    });

});






