const themeToggleEl = document.querySelector<HTMLDivElement>("#theme-toggle")!;
const lightEl = document.querySelector<HTMLDivElement>("#light")!;
const darkEl = document.querySelector<HTMLDivElement>("#dark")!;

const inputEl = document.querySelector<HTMLInputElement>("#input")!;
const searchButtonEl = document.querySelector<HTMLButtonElement>("#search")!;

const profileContainerEl =
  document.querySelector<HTMLDivElement>("#profile-container")!;
const imageEl = document.querySelector<HTMLImageElement>("#image")!;
const nameEl = document.querySelector<HTMLElement>("#name")!;
const usernameEl = document.querySelector<HTMLElement>("#username")!;

const reposEl = document.querySelector<HTMLElement>("#repos")!;
const followersEl = document.querySelector<HTMLElement>("#followers")!;
const followingsEl = document.querySelector<HTMLElement>("#followings")!;

const checkProfileButton =
  document.querySelector<HTMLAnchorElement>("#button2")!;
const loadingEl = document.querySelector<HTMLDivElement>("#loading")!;
const deleteEl=document.querySelector<HTMLIFrameElement>("#delete");
const BASE_URL = "https://api.github.com/users";

type ProfileData = {
  name: string;
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

const storedData = localStorage.getItem("data");

let data = storedData ? JSON.parse(storedData) : null;

if (data) {
  renderUser(data);
}

searchButtonEl.addEventListener("click", () => {
  const username = inputEl.value.trim();
  if (username) fetchUser(username);
});

inputEl.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    const username = inputEl.value.trim();
    if (username) fetchUser(username);
  }
});
deleteEl?.addEventListener("click",()=>
{
  reset();
  deleteData();
})

async function fetchUser(username: string): Promise<void> {
  try {
    showLoading("Loading...");

    const res = await fetch(`${BASE_URL}/${username}`);
    if (!res.ok) throw new Error("User not found");

    const data: ProfileData = await res.json();
    renderUser(data);
    localStorage.setItem("data", JSON.stringify(data));
  } catch (error) {
    handleError(error);
  }
}

function renderUser(data: ProfileData): void {
  reset();

  imageEl.src = data.avatar_url;
  nameEl.textContent = data.name ?? "No Name";
  usernameEl.textContent = `@${data.login}`;

  reposEl.textContent = data.public_repos.toString();
  followersEl.textContent = data.followers.toString();
  followingsEl.textContent = data.following.toString();

  checkProfileButton.href = data.html_url;

  profileContainerEl.classList.remove("hide");
}

function handleError(error: unknown): void {
  reset();

  if (error instanceof Error) {
    showLoading(error.message);
  } else {
    showLoading("Something went wrong");
  }
}

function showLoading(message: string): void {
  loadingEl.textContent = message;

  setTimeout(() => {
    loadingEl.textContent = "";
  }, 3000);
}

function reset(): void {
  profileContainerEl.classList.add("hide");
  inputEl.value = "";
  loadingEl.textContent = "";
  
}

themeToggleEl.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const selected = target.closest(".light, .dark");

  const isDark = selected?.classList.contains("light");

  document.body.classList.toggle("dark", isDark);

  lightEl.classList.toggle("hide", isDark);
  darkEl.classList.toggle("hide", !isDark);

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

function applyTheme(): void {
  const isDark = localStorage.getItem("theme") === "dark";

  document.body.classList.toggle("dark", isDark);

  lightEl.classList.toggle("hide", isDark);
  darkEl.classList.toggle("hide", !isDark);
}
function deleteData()
{
    localStorage.removeItem("data");
}
applyTheme();
