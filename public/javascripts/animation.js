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

function likeManager(evt, param) {
  const likeTotal = evt.currentTarget.closest(`.quote_social__item--${param}`).querySelector('.social-links');
  const id = evt.currentTarget.closest('.quote').getAttribute('data-value');
  const route = `/quotes/${id}/${param}`;
  let number = likeTotal.innerText;
  if (evt.currentTarget.querySelector('svg').classList.contains('svg-fill'))
    number--;
  else
    number++;
  likeTotal.innerText = number;

  axios
    .post(route)
    .then((httpResponse) => {
        window.location = "/auth/login";
    }) // is success
    .catch((err) => console.error(err)); // if failure

}

icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.currentTarget.closest(`.quote_social__item`).classList.contains(`quote_social__item--like`))
      likeManager(e, "like");
    else
      likeManager(e, "favorite");
    iconAnimate(e.currentTarget.querySelector('.quote_social-svg-icon'));
    svgFill(e.currentTarget.querySelector('svg'));
  });
});
