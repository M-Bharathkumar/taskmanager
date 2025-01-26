const token = localStorage.getItem("token"); // Get token from localStorage
const taskForm = document.getElementById("add-task-form");
const taskContainer = document.getElementById("tasks-container");

// API Base URL (Update according to your backend URL)
const API_BASE_URL = "http://localhost:5000/api/tasks";
// Fetch and display tasks
async function fetchTasks() {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to Authorization header
      },
    });

    if (response.status === 401) {
      console.error("Unauthorized. Redirecting to login.");
      window.location.href = "/login.html";
      return;
    }

    const tasks = await response.json();
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    taskContainer.innerHTML = "";

    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";
      taskItem.innerHTML = `
        <div>
        <h1></h1>
          <h3>${task.date}</h3>
          <p>${task.taskInput}</p>
        </div>
        <button onclick="deleteTask('${task._id}')">Delete</button>
      `;
      taskContainer.appendChild(taskItem);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Add a new task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dateInput = document.getElementById("date-input").value;
  const taskvalue = document.getElementById("task-input").value;

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
      body: JSON.stringify({
        date: new Date(dateInput).toISOString(),
        taskInput: taskvalue,
      }),
    });
    if (response.status === 401) {
      console.error("Unauthorized. Redirecting to login.");
      window.location.href = "/login.html";
      return;
    }
    if (response.statusCode === 200) {
      console.log("Task added successfully");
      fetchTasks();
      return;
    }

    taskForm.reset();
    fetchTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

// Delete a task
async function deleteTask(id) {
  try {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    });
    fetchTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Initialize
fetchTasks();
