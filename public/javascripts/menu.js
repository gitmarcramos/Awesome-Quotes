// import { format, render, cancel, register } from '../../timeago.js';

const burger = document.querySelector("#menu_burger");
const menu = document.querySelector("#menu_page");

if (burger) {
  burger.addEventListener("click", () => {
    menu.classList.toggle("menu-reveal");
  });
}

// const hours = document.querySelector('.need_to_be_rendered')
// timeago.render(hours);
