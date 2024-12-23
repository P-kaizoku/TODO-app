const inputTask = document.getElementById("task");
const submitButton = document.getElementById("submit-button");
const todoList = document.getElementById("todo-list");

function createTask(task) {
  const listItem = document.createElement("li");
  const deleteButton = document.createElement("button");
  listItem.textContent = task;

  deleteButton.textContent = "❌";
  deleteButton.style.marginLeft = "10px";
  deleteButton.addEventListener("click", () => {
    listItem.remove();
    saveTasks();
  });

  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);
}

const addTask = () => {
  const task = inputTask.value.trim();

  if (task) {
    createTask(task);
    inputTask.value = "";
    saveTasks();
  } else {
    alert("Please enter a task");
  }
};

const saveTasks = () => {
  const tasks = [];
  todoList.querySelectorAll("li").forEach((task) => {
    tasks.push(task.firstChild.textContent.trim()); // Get text without button
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   todoList.innerHTML = ""; // Clear the list before loading

  if (tasks.length === 0) {
    todoList.innerHTML = "";
  } else {
    tasks.forEach(createTask);
  }
};

// Event Listeners
submitButton.addEventListener("click", addTask);

// Initial Load
loadTasks();
