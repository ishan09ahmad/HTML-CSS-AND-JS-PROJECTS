const scoreEl = document.querySelector("#score");
const containerEl = document.querySelector("#container");
const rockEl = document.querySelector("#rock");
const paperEl = document.querySelector("#paper");
const scissorEl = document.querySelector("#scissor");
const gameContainerEl = document.querySelector("#game-container");
const userEl = document.querySelector("#user");
const houseEl = document.querySelector("#house");
const resultEl = document.querySelector("#result");
const resultContainerEl = document.querySelector("#result-container");
const playButtonEl = document.querySelector("#playBtn");
const rulesContainerEl = document.querySelector("#rules-container");
const crossBtnEl = document.querySelector("#cross-btn");
const rulesButtonEl = document.querySelector("#rules");
const game = ["paper", "scissor", "rock"];
let score = 0;
if (scoreEl) scoreEl.textContent = String(score);
rulesButtonEl?.addEventListener("click", () => {
  rulesContainerEl?.classList.remove("hide");
});
crossBtnEl?.addEventListener("click", () => {
  rulesContainerEl?.classList.add("hide");
});
function reset() {
  rulesContainerEl?.classList.add("hide");
  containerEl?.classList.remove("hide");
  gameContainerEl?.classList.add("hide");
  if (userEl) userEl.innerHTML = "";
  if (houseEl) houseEl.innerHTML = "";
  if (resultEl) resultEl.textContent = "";
  resultContainerEl?.classList.add("hide");
}
function appendUser(name) {
  if (userEl) userEl.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add(name);
  const img = document.createElement("img");
  img.src = `./images/icon-${name}.svg`;
  img.alt = `${name}-image`;
  div.appendChild(img);
  userEl?.appendChild(div);
  return div;
}
function appendHouse(name) {
  houseEl.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add(name);
  const img = document.createElement("img");
  img.src = `./images/icon-${name}.svg`;
  img.alt = `${name}-image`;
  div.appendChild(img);
  houseEl?.appendChild(div);
  return div;
}
function playGame(userChoice) {
  let value = game[Math.floor(Math.random() * game.length)];
  let houseChoice;
  if (value) houseChoice = value;
  containerEl?.classList.add("hide");
  gameContainerEl?.classList.remove("hide");
  const userDiv = appendUser(userChoice);

  houseEl?.classList.remove("hide");
  houseEl.textContent = "3";
  setTimeout(() => {
    houseEl?.classList.remove("hide");
    houseEl.textContent = "2";
  }, 700);
  setTimeout(() => {
    houseEl?.classList.remove("hide");
    houseEl.textContent = "1";
  }, 1400);

  setTimeout(() => {
    const houseDiv = appendHouse(houseChoice);
    houseEl?.classList.remove("hide");

    let result = "";
    if (userChoice === houseChoice) {
      result = "DRAW";
    } else if (
      (userChoice === "paper" && houseChoice === "rock") ||
      (userChoice === "rock" && houseChoice === "scissor") ||
      (userChoice === "scissor" && houseChoice === "paper")
    ) {
      result = "YOU WIN";
      score++;
      userDiv.classList.add("circle");
    } else {
      result = "YOU LOSE";
      score--;
      houseDiv.classList.add("circle");
    }
    if (resultEl) resultEl.textContent = result;
    if (scoreEl) scoreEl.textContent = String(score);
    resultContainerEl?.classList.remove("hide");
  }, 2100);
}
paperEl?.addEventListener("click", () => playGame("paper"));
rockEl?.addEventListener("click", () => playGame("rock"));
scissorEl?.addEventListener("click", () => playGame("scissor"));
playButtonEl?.addEventListener("click", reset);
export {};
//# sourceMappingURL=script.js.map
