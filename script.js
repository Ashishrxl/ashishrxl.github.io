$(window).on('load', function(){
    'use strict';
    const imageCount = $('#slider ul li').length;
    const imageWidth = $('#slider ul li img').first().width();
    const totalWidth = (imageCount * imageWidth)+ 'px';
    alert(totalWidth);

});
