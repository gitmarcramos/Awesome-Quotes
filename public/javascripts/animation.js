// animation
const svgAnim = document.querySelectorAll(".svg-animate");
const svgIcons = document.querySelectorAll(".icon-animate");
const icons = document.querySelectorAll(".quote_social-icon-animate");

function iconAnimate(item) {
  item.classList.toggle("svg-animate");
}

function svgFill(item) {
    item.classList.toggle("svg-fill");
}

icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    iconAnimate(e.currentTarget.querySelector('.quote_social-svg-icon'));
    svgFill(e.target);
    console.log(e.currentTarget)
  });
});
