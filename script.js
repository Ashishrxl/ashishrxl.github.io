window.addEventListener('load', function(){

    const slideCount = document.querySelectorAll('#slider-wrapper ul li').length;
    const slideWidth = document.querySelector('#slider-wrapper').offsetWidth;
    const totalWidth = slideCount * slideWidth + 'px';
    const  slider = document.querySelector('#slider-wrapper ul');
    const next = document.getElementById('next');
    const previous = document.getElementById('prev');
    let leftPosition = 0;
    let counter = 0;
    slider.style.width = totalWidth;

    next.addEventListener('click', function(evt){
        evt.preventDefault();
        counter++;
        if(counter == slideCount){counter = 0;}
        leftPosition = `-${counter * slideWidth}px;
        slider.style.left = leftPosition;
    });

});
