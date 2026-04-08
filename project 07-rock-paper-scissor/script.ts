type Choice = "rock" | "paper" | "scissor";

const scoreEl = document.querySelector<HTMLSpanElement>("#score");

const containerEl = document.querySelector<HTMLDivElement>("#container");
const rockEl = document.querySelector<HTMLDivElement>("#rock");
const paperEl = document.querySelector<HTMLDivElement>("#paper");
const scissorEl = document.querySelector<HTMLDivElement>("#scissor");

const gameContainerEl =
  document.querySelector<HTMLDivElement>("#game-container");
const userEl = document.querySelector<HTMLDivElement>("#user");
const houseEl = document.querySelector<HTMLDivElement>("#house");

const resultEl = document.querySelector<HTMLDivElement>("#result");
const resultContainerEl =
  document.querySelector<HTMLDivElement>("#result-container");
const playButtonEl = document.querySelector<HTMLButtonElement>("#playBtn");

const rulesContainerEl =
  document.querySelector<HTMLDivElement>("#rules-container");
const crossBtnEl = document.querySelector<HTMLButtonElement>("#cross-btn");
const rulesButtonEl = document.querySelector<HTMLButtonElement>("#rules");

const game: Choice[] = ["paper", "scissor", "rock"];
let score: number = 0;

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

function appendUser(name: Choice): HTMLElement {
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

function appendHouse(name: Choice): HTMLElement {
  if (houseEl) houseEl.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add(name);

  const img = document.createElement("img");
  img.src = `./images/icon-${name}.svg`;
  img.alt = `${name}-image`;

  div.appendChild(img);
  houseEl?.appendChild(div);

  return div;
}

function playGame(userChoice: Choice) {
  let value = game[Math.floor(Math.random() * game.length)];
  let houseChoice: Choice;
  if (value) houseChoice = value;

  containerEl?.classList.add("hide");
  gameContainerEl?.classList.remove("hide");

  const userDiv = appendUser(userChoice);

  setTimeout(() => {
    const houseDiv = appendHouse(houseChoice);
    houseEl?.classList.remove("hide");

    let result = "";

    if (userChoice === houseChoice) {
      result = "DRAW";
      if (playButtonEl) playButtonEl.style.color = "blue";
    } else if (
      (userChoice === "paper" && houseChoice === "rock") ||
      (userChoice === "rock" && houseChoice === "scissor") ||
      (userChoice === "scissor" && houseChoice === "paper")
    ) {
      result = "YOU WIN";
      score++;
      userDiv.classList.add("circle");
      if (playButtonEl) playButtonEl.style.color = "green";
    } else {
      result = "YOU LOSE";
      score--;
      houseDiv.classList.add("circle");
      if (playButtonEl) playButtonEl.style.color = "red";
    }

    if (resultEl) resultEl.textContent = result;
    if (scoreEl) scoreEl.textContent = String(score);

    resultContainerEl?.classList.remove("hide");
  }, 1000);
}

paperEl?.addEventListener("click", () => playGame("paper"));
rockEl?.addEventListener("click", () => playGame("rock"));
scissorEl?.addEventListener("click", () => playGame("scissor"));

playButtonEl?.addEventListener("click", reset);
