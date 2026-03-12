let firstNameInput = document.querySelector("#firstName");
let lastNameInput = document.querySelector("#lastName");
let emailInput = document.querySelector("#email");
let messageInput = document.querySelector("#message");
let generalQueryInput = document.querySelector("#generalEnquiry");
let supportRequestInput = document.querySelector("#supportRequest");
let consentInput = document.querySelector("#consent");
let fnameErrorEl = document.querySelector("#fname-error");
let lnameErrorEl = document.querySelector("#lname-error");
let emailErrorEl = document.querySelector("#email-error");
let queryErrorEl = document.querySelector("#query-error");
let messageErrorEl = document.querySelector("#message-error");
let consentErrorEl = document.querySelector("#consent-error");
let toastEl = document.querySelector("#toast");
let formEl = document.querySelector("form");
const nameRegex = /^[A-Z][a-z]{1,}$/;
const emailRegex = /^[A-Za-z0-9+-._%]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
formEl?.addEventListener("submit", (e) => {
  e.preventDefault();
  toastEl?.classList.remove("animation");
  const formData = new FormData(formEl);
  const data = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    query: String(formData.get("query") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    consent: formData.get("consent") ? "on" : "off",
  };
  let error = checkError(data);
  if (!error) {
    formEl.reset();
    toastEl?.classList.add("animation");
  }
});
function checkError(data) {
  let error = false;
  if (data.firstName.length === 0) {
    error = true;
    if (fnameErrorEl) {
      fnameErrorEl.innerHTML = "This field is required";
      fnameErrorEl?.classList.remove("hide");
      firstNameInput?.classList.add("border");
    }
  } else if (!nameRegex.test(data.firstName)) {
    error = true;
    if (fnameErrorEl) {
      fnameErrorEl.innerHTML = "Please enter valid first name";
      fnameErrorEl?.classList.remove("hide");
    }
  }
  if (data.lastName.length === 0) {
    error = true;
    if (lnameErrorEl) {
      lnameErrorEl.innerHTML = "This field is required";
      lnameErrorEl?.classList.remove("hide");
      lastNameInput?.classList.add("border");
    }
  } else if (!nameRegex.test(data.lastName)) {
    error = true;
    if (lnameErrorEl) {
      lnameErrorEl.innerHTML = "Please enter valid last name";
      lnameErrorEl?.classList.remove("hide");
    }
  }
  if (data.email.length === 0) {
    error = true;
    if (emailErrorEl) {
      emailErrorEl.innerHTML = "This field is required";
      emailErrorEl?.classList.remove("hide");
      emailInput?.classList.add("border");
    }
  } else if (!emailRegex.test(data.email)) {
    error = true;
    if (emailErrorEl) {
      emailErrorEl.innerHTML = "Please enter valid email";
      emailErrorEl?.classList.remove("hide");
    }
  }
  if (data.query.length === 0) {
    error = true;
    queryErrorEl?.classList.remove("hide");
  }
  if (data.message.length === 0) {
    error = true;
    messageErrorEl?.classList.remove("hide");
    messageInput?.classList.add("border");
  }
  if (data.consent === "off") {
    error = true;
    consentErrorEl?.classList.remove("hide");
  }
  removeErrortext();
  return error;
}
function removeErrortext() {
  setTimeout(() => {
    fnameErrorEl?.classList.add("hide");
    firstNameInput?.classList.remove("border");
    lnameErrorEl?.classList.add("hide");
    lastNameInput?.classList.remove("border");
    emailErrorEl?.classList.add("hide");
    emailInput?.classList.remove("border");
    queryErrorEl?.classList.add("hide");
    messageErrorEl?.classList.add("hide");
    messageInput?.classList.remove("border");
    consentErrorEl?.classList.add("hide");
  }, 10000);
}
firstNameInput?.addEventListener("input", () => {
  fnameErrorEl?.classList.add("hide");
  firstNameInput?.classList.remove("border");
});
lastNameInput?.addEventListener("click", () => {
  lnameErrorEl?.classList.add("hide");
  lastNameInput?.classList.remove("border");
});
emailInput?.addEventListener("input", () => {
  emailErrorEl?.classList.add("hide");
  emailInput?.classList.remove("border");
});
generalQueryInput?.addEventListener("change", () => {
  queryErrorEl?.classList.add("hide");
});
supportRequestInput?.addEventListener("change", () => {
  queryErrorEl?.classList.add("hide");
});
messageInput?.addEventListener("click", () => {
  messageErrorEl?.classList.add("hide");
  messageInput?.classList.remove("border");
});
consentInput?.addEventListener("change", () => {
  consentErrorEl?.classList.add("hide");
});
// theme change
let moonEl = document.querySelector("#moon");
let sunEl = document.querySelector("#sun");
let themeEl = document.querySelector("#theme");
themeEl?.addEventListener("click", () => {
  sunEl?.classList.toggle("none");
  moonEl?.classList.toggle("none");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});
function setTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
setTheme();
export {};
//# sourceMappingURL=script.js.map
