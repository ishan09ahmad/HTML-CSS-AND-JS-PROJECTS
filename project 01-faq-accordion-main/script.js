let plusButtonEl = document.querySelectorAll(".plusButton");
let minusButtonEl = document.querySelectorAll(".minusButton");
let answerEls = document.querySelectorAll(".answer");
let sunIconEl = document.querySelector("#sun");
let moonIconEl = document.querySelector("#moon");
const singleButtonEl = document.querySelector("#single");
const multipleButtonEl = document.querySelector("#multiple");
let multiple = false;
singleButtonEl.addEventListener("click", () => {
    multiple = false;
    singleButtonEl.classList.add("button_color");
    multipleButtonEl.classList.remove("button_color");
    closeAll();
});
multipleButtonEl.addEventListener("click", () => {
    multiple = true;
    multipleButtonEl.classList.add("button_color");
    singleButtonEl.classList.remove("button_color");
    closeAll();
});
plusButtonEl.forEach((item, index) => {
    item.addEventListener("click", () => {
        !multiple && closeAll();
        item.classList.add("hide");
        minusButtonEl[index]?.classList.remove("hide");
        answerEls[index]?.classList.remove("hide");
    });
});
minusButtonEl.forEach((item, index) => {
    item.addEventListener("click", () => {
        answerEls[index]?.classList.add("hide");
        item.classList.add("hide");
        plusButtonEl[index]?.classList.remove("hide");
    });
});
function closeAll() {
    plusButtonEl.forEach((item, index) => {
        item.classList.remove("hide");
    });
    minusButtonEl.forEach((item, index) => {
        item.classList.add("hide");
    });
    answerEls.forEach((answer) => {
        answer.classList.add("hide");
    });
}
function checkTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        sunIconEl?.classList.toggle("hide");
        moonIconEl?.classList.toggle("hide");
    }
    else {
        document.body.classList.remove("dark");
    }
}
checkTheme();
moonIconEl?.addEventListener("click", () => {
    document.body.classList.add("dark");
    sunIconEl?.classList.toggle("hide");
    moonIconEl?.classList.toggle("hide");
    localStorage.setItem("theme", "dark");
});
sunIconEl?.addEventListener("click", () => {
    document.body.classList.remove("dark");
    sunIconEl?.classList.toggle("hide");
    moonIconEl?.classList.toggle("hide");
    localStorage.setItem("theme", "light");
});
export {};
//# sourceMappingURL=script.js.map