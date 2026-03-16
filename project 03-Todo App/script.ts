type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

let storedTodo = localStorage.getItem("todo");

let todo: TodoItem[] = storedTodo ? JSON.parse(storedTodo) : [];

let currentFilter: "all" | "active" | "completed" = "all";
let sunEl = document.querySelector<HTMLImageElement>("#sun");
let moonEl = document.querySelector<HTMLImageElement>("#moon");
let themeEl = document.querySelector<HTMLDivElement>(".theme");
const inputEl = document.querySelector<HTMLInputElement>("#input")!;
const addButtonEl = document.querySelector<HTMLButtonElement>("#add")!;

const itemContainerEl =
  document.querySelector<HTMLDivElement>("#item-container")!;
const itemLeftEl = document.querySelector<HTMLParagraphElement>("#item-left")!;
const clearButtonEl = document.querySelector<HTMLButtonElement>("#clear")!;

const allButtonEl = document.querySelector<HTMLButtonElement>("#all")!;
const activeButtonEl = document.querySelector<HTMLButtonElement>("#active")!;
const completedButtonEl =
  document.querySelector<HTMLButtonElement>("#completed")!;

addButtonEl.addEventListener("click", () => {
  addTodo();
});

inputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo(): void {
  if (inputEl.value.trim() === "") return;

  const todoItem: TodoItem = {
    id: Date.now(),
    text: inputEl.value,
    completed: false,
  };

  todo.push(todoItem);
  createItem(todoItem);

  inputEl.value = "";

  updateItemCount();
  saveTodo();
  filterTodo("all");
}

function saveTodo(): void {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function createItem(todoItem: TodoItem): void {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  itemEl.dataset.id = String(todoItem.id);

  const leftEl = document.createElement("div");
  leftEl.classList.add("left");

  const selectEl = document.createElement("div");
  selectEl.classList.add("select");

  const circleEl = document.createElement("div");
  circleEl.classList.add("circle");

  const checkEl = document.createElement("img");
  checkEl.src = "./images/icon-check.svg";
  checkEl.alt = "check";
  checkEl.classList.add("check", "hide");

  const paraEl = document.createElement("p");
  paraEl.innerText = todoItem.text;

  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.innerText = "Delete";
  deleteButtonEl.classList.add("delete");

  selectEl.append(circleEl);
  selectEl.append(checkEl);
  leftEl.append(selectEl);
  leftEl.append(paraEl);

  itemEl.append(leftEl);
  itemEl.append(deleteButtonEl);

  itemContainerEl.append(itemEl);

  if (todoItem.completed) {
    circleEl.classList.add("hide");
    checkEl.classList.remove("hide");
    paraEl.classList.add("textStyle");
  }

  itemEl.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("delete")) {
      itemEl.remove();

      const id = Number(itemEl.dataset.id);
      todo = todo.filter((t) => t.id !== id);

      updateItemCount();
      saveTodo();
      filterTodo(currentFilter);
    } else if (target.closest(".left")) {
      circleEl.classList.toggle("hide");
      checkEl.classList.toggle("hide");
      paraEl.classList.toggle("textStyle");

      const id = Number(itemEl.dataset.id);

      todo = todo.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      );

      updateItemCount();
      saveTodo();
      filterTodo(currentFilter);
    }
  });
}

function updateItemCount(): void {
  const remaining = todo.filter((t) => !t.completed).length;

  itemLeftEl.innerText =
    remaining === 1 ? `${remaining} item left` : `${remaining} items left`;
}

clearButtonEl.addEventListener("click", () => {
  todo = todo.filter((t) => !t.completed);

  itemContainerEl.innerHTML = "";

  todo.forEach((item) => createItem(item));

  saveTodo();
  updateItemCount();
  filterTodo("all");
});

allButtonEl.addEventListener("click", () => filterTodo("all"));
activeButtonEl.addEventListener("click", () => filterTodo("active"));
completedButtonEl.addEventListener("click", () => filterTodo("completed"));

function filterTodo(type: "all" | "active" | "completed"): void {
  currentFilter = type;

  const todos = document.querySelectorAll<HTMLDivElement>(".item");

  todos.forEach((item) => {
    console.log(item);
    const id = Number(item.dataset.id);
    const todoItem = todo.find((t) => t.id === id);

    if (!todoItem) return;

    if (type === "all") {
      item.classList.remove("hide");
    }

    if (type === "active") {
      if (todoItem.completed) {
        item.classList.add("hide");
      } else {
        item.classList.remove("hide");
      }
    }

    if (type === "completed") {
      if (todoItem.completed) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    }
  });

  allButtonEl.classList.toggle("active-style", type === "all");
  activeButtonEl.classList.toggle("active-style", type === "active");
  completedButtonEl.classList.toggle("active-style", type === "completed");
}

todo.forEach((item) => createItem(item));

updateItemCount();
filterTodo("all");




themeEl?.addEventListener("click", () => {
  localStorage.setItem(
    "theme",
    localStorage.getItem("theme") === "dark" ? "light" : "dark",
  );
  setTheme();
});

function setTheme(): void {
  const isDark = localStorage.getItem("theme") === "dark";

  document.body.classList.toggle("dark", isDark);
  sunEl?.classList.toggle("hide", !isDark);
  moonEl?.classList.toggle("hide", isDark);
}

setTheme();
