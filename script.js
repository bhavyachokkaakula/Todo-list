// Grab DOM elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const taskList = document.getElementById('task-list');

// Initialize data list collection from browser storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Update the DOM interface to match array state
function renderTasks() {
    taskList.innerHTML = ''; 
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        if (task.completed) {
            li.classList.add('completed');
        }
        
        // Match explicit item layout markup with clean action components
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="action-btns">
                <button class="row-btn check-btn" onclick="toggleTask(${index})">✓</button>
                <button class="row-btn delete-btn" onclick="deleteTask(${index})">×</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}

// Append data instances safely
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    tasks.push({ text: taskText, completed: false });
    saveData();
    renderTasks();
    taskInput.value = '';
}

// Check/Uncheck toggle control
window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveData();
    renderTasks();
}

// Delete item index callback tracking
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveData();
    renderTasks();
}

// Flush entire item target array logic
clearAllBtn.addEventListener('click', () => {
    if (tasks.length === 0) return;
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        saveData();
        renderTasks();
    }
});

// Sync data locally to LocalStorage
function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Handle layout tracking triggers
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Build state instantly on script loading lifecycle execution
renderTasks();