const themeToggleEl = document.querySelector("#theme-toggle");
const lightEl = document.querySelector("#light");
const darkEl = document.querySelector("#dark");
const inputEl = document.querySelector("#input");
const searchButtonEl = document.querySelector("#search");
const profileContainerEl = document.querySelector("#profile-container");
const imageEl = document.querySelector("#image");
const nameEl = document.querySelector("#name");
const usernameEl = document.querySelector("#username");
const reposEl = document.querySelector("#repos");
const followersEl = document.querySelector("#followers");
const followingsEl = document.querySelector("#followings");
const checkProfileButton = document.querySelector("#button2");
const loadingEl = document.querySelector("#loading");
const deleteEl = document.querySelector("#delete");
const BASE_URL = "https://api.github.com/users";
const storedData = localStorage.getItem("data");
let data = storedData ? JSON.parse(storedData) : null;
if (data) {
    renderUser(data);
}
searchButtonEl.addEventListener("click", () => {
    const username = inputEl.value.trim();
    if (username)
        fetchUser(username);
});
inputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const username = inputEl.value.trim();
        if (username)
            fetchUser(username);
    }
});
deleteEl?.addEventListener("click", () => {
    reset();
    deleteData();
});
async function fetchUser(username) {
    try {
        showLoading("Loading...");
        const res = await fetch(`${BASE_URL}/${username}`);
        if (!res.ok)
            throw new Error("User not found");
        const data = await res.json();
        renderUser(data);
        localStorage.setItem("data", JSON.stringify(data));
    }
    catch (error) {
        handleError(error);
    }
}
function renderUser(data) {
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
function handleError(error) {
    reset();
    if (error instanceof Error) {
        showLoading(error.message);
    }
    else {
        showLoading("Something went wrong");
    }
}
function showLoading(message) {
    loadingEl.textContent = message;
    setTimeout(() => {
        loadingEl.textContent = "";
    }, 3000);
}
function reset() {
    profileContainerEl.classList.add("hide");
    inputEl.value = "";
    loadingEl.textContent = "";
}
themeToggleEl.addEventListener("click", (e) => {
    const target = e.target;
    const selected = target.closest(".light, .dark");
    const isDark = selected?.classList.contains("light");
    document.body.classList.toggle("dark", isDark);
    lightEl.classList.toggle("hide", isDark);
    darkEl.classList.toggle("hide", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
function applyTheme() {
    const isDark = localStorage.getItem("theme") === "dark";
    document.body.classList.toggle("dark", isDark);
    lightEl.classList.toggle("hide", isDark);
    darkEl.classList.toggle("hide", !isDark);
}
function deleteData() {
    localStorage.removeItem("data");
}
applyTheme();
export {};
//# sourceMappingURL=script.js.map