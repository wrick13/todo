document.addEventListener('DOMContentLoaded', function () {
    loadTasksFromLocalStorage();  // Load tasks when the page loads
});

document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input').value;

    if (taskInput) {
        addTaskToList(taskInput);
        saveTaskToLocalStorage(taskInput);

        document.getElementById('task-input').value = '';  // Clear input field
    }
});

// Function to add task to list
function addTaskToList(task) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.onclick = function () {
        deleteTaskFromLocalStorage(task);
        taskList.removeChild(li);
    };

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Function to save tasks to localStorage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
}

// Function to delete tasks from localStorage
function deleteTaskFromLocalStorage(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskToDelete);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
