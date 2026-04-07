const themeToggleEl = document.querySelector("#themeToggle");
const lightEl = document.querySelector(".light");
const darkEl = document.querySelector(".dark");
const statusEl = document.querySelector("#status");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector("#reset");
const gameBoardEl = document.querySelector("#board");

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currentPlayer = "X";
let isGameActive = true;

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const row = parseInt(cell.getAttribute("data-row"));
    const col = parseInt(cell.getAttribute("data-col"));

    if (board[row][col] === "" && isGameActive) {
      board[row][col] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);
      cell.classList.add("disable");

      if (checkWinner()) {
        statusEl.textContent = `Player ${currentPlayer} Wins `;
        isGameActive = false;
        return;
      }

      if (checkDraw()) {
        statusEl.textContent = "It's a Draw ";
        isGameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";

      statusEl.textContent = `Player ${currentPlayer}'s Turn`;
    }
  });
});

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    )
      return true;
  }

  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    )
      return true;
  }

  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2])
    return true;

  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    return true;

  return false;
}

function checkDraw() {
  return board.flat().every((item) => item !== "");
}

function resetGame() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  currentPlayer = "X";
  isGameActive = true;
  statusEl.textContent = `Player ${currentPlayer}'s Turn`;

  cells.forEach((cell) => {
    cell.textContent = "";
     cell.classList.remove("X", "O");
      cell.classList.remove("disable");
  });
}

resetBtn?.addEventListener("click", resetGame);

themeToggleEl.addEventListener("click", (e) => {
  const clicked = e.target;
  const selected = clicked.closest(".light,.dark");
  if (!selected) return;

  const applyDark = selected.classList.contains("dark");

  lightEl?.classList.toggle("hide", !applyDark);
  darkEl?.classList.toggle("hide", applyDark);
  document.body.classList.toggle("dark", applyDark);

  localStorage.setItem("theme", applyDark ? "dark" : "light");
});

function applyTheme() {
  const applyDark = localStorage.getItem("theme") === "dark";

  lightEl?.classList.toggle("hide", !applyDark);
  darkEl?.classList.toggle("hide", applyDark);
  document.body.classList.toggle("dark", applyDark);
}
applyTheme();
resetGame()

