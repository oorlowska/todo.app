const todoList = document.getElementById('list-container');
const addButton = document.getElementById('add-button');
const listInput = document.getElementById('input-box');
let elementId = 1;
const completedTasksButton = document.querySelector('.completed-tasks');
const activeTasksButton = document.querySelector('.active-tasks');
const showAllTasksButton = document.querySelector('.all-tasks');
const clearTasksButton = document.querySelector('.clear-tasks');
const checkbox = document.querySelectorAll(
	'#list-container input[type="checkbox"]'
);
const inputBox = document.getElementById('input-box');

const addNewTask = function () {
	let newTaskFormInput = '';
	if (addNewTask.arguments[0] && typeof addNewTask.arguments[0] === 'string') {
		newTaskFormInput = addNewTask.arguments[0];
	} else {
		newTaskFormInput = document.getElementById('input-box').value;
	}

	const taskTemplate = document.getElementById('task-template');
	const taskElement = document.importNode(taskTemplate.content, true);
	taskElement.children[0].children[2].id = `trash-bin-${elementId}`;
	elementId++;
	const taskName = taskElement.querySelector('#task-name');

	taskName.textContent = newTaskFormInput;
	todoList.appendChild(taskElement);

	if (listInput.value) {
		let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
		tasks.push(newTaskFormInput);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	console.log(newTaskFormInput);
	listInput.value = '';
};

const editTask = function () {
	var val = this.innerHTML;
	var input = document.createElement('input');
	input.value = val;
	input.onblur = function () {
		var val = this.value;
		this.parentNode.innerHTML = val;
	};
	this.innerHTML = '';
	this.appendChild(input);
	input.focus();
};

todoList.addEventListener('dblclick', function (event) {
	if (event.target.matches('#task-name')) {
		editTask.call(event.target);
	}
});

var taskCheckbox = document.querySelectorAll('input[type="checkbox"]');

todoList.addEventListener('click', function (event) {
	if (event.target && event.target.matches('input[type="checkbox"]')) {
		var checkbox = event.target;
		if (checkbox.checked) {
			var listItem = checkbox.parentNode;
			listItem.classList.add('checked');
		} else {
			var listItem = checkbox.parentNode;
			listItem.classList.remove('checked');
		}
	}
});

function showTasks(type) {
	const listElement = document.querySelectorAll('li');
	listElement.forEach((task) => {
		if (type === 'completed' && task.classList.contains('checked')) {
			task.style.display = 'block';
		} else if (type === 'active' && !task.classList.contains('checked')) {
			task.style.display = 'block';
		} else if (type === 'all') {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
};

completedTasksButton.addEventListener('click', function () {
	showTasks('completed');
});
activeTasksButton.addEventListener('click', function () {
	showTasks('active');
});
showAllTasksButton.addEventListener('click', function () {
	showTasks('all');
});

function clearCompleted() {
	const completedTasks = document.querySelectorAll('li.checked');
	let tasksToKeep = [];

	completedTasks.forEach((task) => {
		task.remove();
	});

	const remainingTasks = document.querySelectorAll('li');
	remainingTasks.forEach((task) => {
		tasksToKeep.push(task.outerText);
	});

	localStorage.setItem('tasks', JSON.stringify(tasksToKeep));
};

const remove = (id) => {
	const task = document.getElementById(`${id}`);
	const taskName = task.parentNode.children[1].textContent;
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	let newTasks = tasks.filter((task) => task !== taskName);
	localStorage.setItem('tasks', JSON.stringify(newTasks));
	task.parentElement.remove(task);

	console.log(localStorage.getItem('tasks'));
};

const getLocalStorage = function () {
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks.forEach((task) => addNewTask(task));
};

addButton.addEventListener('click', addNewTask);
clearTasksButton.addEventListener('click', clearCompleted);
inputBox.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		addNewTask();
	}
});

getLocalStorage();
