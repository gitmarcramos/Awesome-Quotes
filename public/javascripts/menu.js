const burger = document.querySelector("#menu_burger");
const menu = document.querySelector("#menu_page");

burger.addEventListener('click', () => {
    menu.classList.toggle("menu-reveal")
})


