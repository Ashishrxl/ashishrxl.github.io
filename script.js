const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(function(eachLink){
    eacLink.addEventListener('click', smoothScroll());
});
function smoothScroll(event){
    event.preventDefault();
    const targetID = event.target.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
 
    //alert(targetAnchor.getBoundingClientRect().top);
    alert('hi');
}