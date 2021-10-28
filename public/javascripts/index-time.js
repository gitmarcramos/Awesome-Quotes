const body = document.querySelector("body");
const animate = document.createElement("div");
body.appendChild(animate);

function expandDiv() {
  body.style.overflow = "hidden";
  animate.classList.add("expand");
  setTimeout(() => {
    window.location.href = "/home";
  }, 300);
}

setTimeout(() =>{
    expandDiv();
}, 1600)
