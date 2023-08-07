const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(function(eachLink){
    eachLink.addEventListener('click', smoothScroll);
});
function smoothScroll(event){
    event.preventDefault();
    const targetID = event.target.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
 
    const originalTop = Math.floor(targetAnchor.getBoundingClientRect().top) - 200;
    window.scrollBy({top:originalTop, left:0, behaviour:'smooth'});
    
}

window.addEventListener('load', function(){
    const posts = document.querySelectorAll('section');
    let postTops = [];
    let pagetop;
    let counter = 1;
    let prevCounter = 1;
    let doneResizing;
    posts.forEach(function(post){
        postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);

    });
    window.addEventListener('scroll', function(){
        pagetop = window.pageYOffset + 250;
        if(pagetop > postTops[counter]){
            counter++;
            alert(`scrolling down!${counter}`);
        } else if(counter > 1 && pagetop < postTops[counter-1]){
            counter--;
            alert(`scrolling up!${counter}`);
        }
    });
    
});