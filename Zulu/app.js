const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".header-menu");

menuToggle.addEventListener("click", function(){
    menu.classList.add("is-active");
})

document.addEventListener("click", function(e) {
    if(!menu.contains(e.target) && !e.target.matches(".menu-toggle")){
        menu.classList.remove("is-active");
    }
})