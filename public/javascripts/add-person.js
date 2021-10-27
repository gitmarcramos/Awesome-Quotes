// Write a code to add person on front :)

const addButton = document.querySelector(".button--add_person");
const personForm = document.querySelector(".ajax-form-by-person");
const messagesContainer = document.querySelector(
  ".ajax_form_message_container"
);
const template = document.querySelector(".template");


function addPerson() {
  const message = document.importNode(template.content, true);
  messagesContainer.appendChild(message);
}
addPerson();

addButton.addEventListener("click", () => {
  addPerson();
  addRemoveButton();
});

function addRemoveButton() {
  const removeBtn = addButton.cloneNode(true);
  removeBtn.innerText = "Remove this person";
  removeBtn.classList.add("remove-person");
  messagesContainer.appendChild(removeBtn);
  removeBtn.addEventListener("click", (e) => {
    e.currentTarget.previousSibling.remove();
    removeBtn.remove();
  });
}
