// Write a code to add person on front :)

const addButton = document.querySelector(".button--add_person");
const personForm = document.querySelector(".ajax-form-by-person");
const messagesContainer = document.querySelector(
  ".ajax_form_message_container"
);

const template = document.querySelector(".template");

// function addPerson() {
//   const newPerson = document.createElement("div");
//   newPerson.classList.add("ajax-form-by-person");

//   const newMessage = document.createElement("div");
//   newMessage.classList.add("ajax_input");

//   const newAjaxInput = document.createElement("div");
//   newAjaxInput.classList.add("ajax_input");

//   const newNameLabel = document.createElement("label");
//   newNameLabel.classList.add('body-bold');
//   newNameLabel.setAttribute('for', "ajax-input-name");
//   newNameLabel.innerText = "Name";

//   const newNameInput = document.createElement("input");
//   newNameInput.classList.add("ajax-input-name");
//   newNameInput.innerText = "Message"
//   newNameInput.setAttribute('type', 'text');
//   newNameInput.setAttribute('name', 'publisher');
//   newNameInput.setAttribute('required', true);
//   newNameInput.setAttribute('placeholder', "Enter the name of the person");

//   newAjaxInput.appendChild(newNameLabel);
//   newAjaxInput.appendChild(newNameInput);
//   newMessage.appendChild(newAjaxInput);
//   newPerson.appendChild(newMessage);

//   messagesContainer.appendChild(newPerson);

//   console.log(newPerson);
// }

function addPerson() {
  const message = document.importNode(template.content, true);
  messagesContainer.appendChild(message);
}
addPerson();

addButton.addEventListener("click", () => {
  addPerson();
  console.log("addPerson button clicked");
});
