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

function likeManager(evt) {
  const likeTotal = evt.currentTarget.closest(".quote_social__item--like").querySelector('.social-links');
  const id = evt.currentTarget.closest('.quote').getAttribute('data-value');
  const route = `/quotes/${id}/like`;
  let number = likeTotal.innerText;
  if (evt.currentTarget.querySelector('svg').classList.contains('svg-fill'))
    number--;
  else
    number++;
  likeTotal.innerText = number;

  axios
    .post(route)
    .then((httpResponse) => {
      console.log(httpResponse.data)
    }) // is success
    .catch((err) => console.error(err)); // if failure

}

icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    likeManager(e);
    iconAnimate(e.currentTarget.querySelector('.quote_social-svg-icon'));
    svgFill(e.currentTarget.querySelector('svg'));
  });
});
