// Mobile Navigation
const menuButton = document.querySelector(".menu-btn");

menuButton.addEventListener("click", () => {
  if (document.querySelector(".modal") == null) {
    const modal = document.createElement("div");
    const popout = document.createElement("div");
    const links = [...document.querySelectorAll("header a")];
    const cloneLinks = [];
    links.forEach((x) => {
      cloneLinks.push(x.cloneNode(true));
    });

    modal.className = "modal";
    popout.className = "popout";

    menuButton.classList.toggle("close-btn");
    document.querySelector("body").appendChild(modal);
    modal.appendChild(popout);
    cloneLinks.forEach((link) => {
      link.classList.add("visible");
      popout.appendChild(link);
    });
  } else {
    menuButton.classList.toggle("close-btn");
    document.querySelector(".modal").remove();
  }
});

//Director Buttons
const openButtons = [...document.querySelectorAll(".open")];
const closeButtons = [...document.querySelectorAll(".close")];
const directorInfo = [...document.querySelectorAll(".director-info")];
const directorProfile = [...document.querySelectorAll(".director-profile")];

openButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    let index = openButtons.indexOf(btn);
    directorProfile[index].classList.toggle("hidden");
    directorInfo[index].classList.toggle("grid");
  })
);

closeButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    let index = closeButtons.indexOf(btn);
    directorProfile[index].classList.toggle("hidden");
    directorInfo[index].classList.toggle("grid");
  })
);

//Form Validation
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const nameLabel = document.querySelector("#name-label");
const emailLabel = document.querySelector("#email-label");
const nameRegex = /^\w{2,}/gi;
const emailRegex = /.{2,}\@.{2,}\./gi;
const submit = document.querySelector("#submit");
let nameLabelText;
let emailLabelText;
const nameBox = document.querySelectorAll(".validation")[0];
const emailBox = document.querySelectorAll(".validation")[1];

window.innerWidth < 768
  ? ((nameLabelText = "Required Field!"), (emailLabelText = "Required Field!"))
  : ((nameLabelText = "Please provide your name"),
    (emailLabelText = "Please provide your email address"));

submit.addEventListener("click", (event) => {
  nameLabel.className = "";
  emailLabel.className = "";
  name.className = "";
  email.className = "";
  nameBox.className = "validation";
  emailBox.className = "validation";
  nameLabel.textContent = "";
  emailLabel.textContent = "";

  name.value == ""
    ? (event.preventDefault(),
      (nameLabel.textContent = nameLabelText),
      nameLabel.classList.add("invalid-label"),
      nameBox.classList.add("invalid-border"))
    : email.value == ""
    ? (event.preventDefault(),
      (emailLabel.textContent = emailLabelText),
      emailLabel.classList.add("invalid-label"),
      emailBox.classList.add("invalid-border"))
    : !nameRegex.test(name.value)
    ? (event.preventDefault(),
      (nameLabel.textContent = nameLabelText),
      nameLabel.classList.add("invalid-label"),
      nameBox.classList.add("invalid-border"))
    : !emailRegex.test(email.value)
    ? (event.preventDefault(),
      (emailLabel.textContent = emailLabelText),
      emailLabel.classList.add("invalid-label"),
      emailBox.classList.add("invalid-border"))
    : true;
});
