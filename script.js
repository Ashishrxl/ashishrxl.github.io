const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(function(eachLink){
    eachLink.addEventListener('click', smoothScroll(eachLink));
});
function smoothScroll(event){
    event.preventDefault();
    const targetID = event.target.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
 
    alert(targetAnchor.getBoundingClientRect().top);
    
}