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
    alert(originalTop);
    
}