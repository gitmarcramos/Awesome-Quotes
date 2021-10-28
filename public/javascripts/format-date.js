const dateToFormat = document.querySelectorAll("#quote-date");

dateToFormat.forEach((date) => {
  date.innerText = date.innerText.slice(0, 15)
});
