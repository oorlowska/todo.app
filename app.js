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
	const newTaskFormInput = document.getElementById('input-box').value;
	const taskTemplate = document.getElementById('task-template');
	const taskElement = document.importNode(taskTemplate.content, true);
	taskElement.children[0].children[2].id = `trash-bin-${elementId}`;
	elementId++;
	const taskName = taskElement.querySelector('#task-name');

	taskName.textContent = newTaskFormInput;
	todoList.appendChild(taskElement);

	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks.push(newTaskFormInput);
	localStorage.setItem('tasks', JSON.stringify(tasks));

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

document.querySelectorAll('#task-name').forEach(function (node) {
	node.ondblclick = editTask;
});

var taskCheckbox = document.querySelectorAll('input[type="checkbox"]');

taskCheckbox.forEach(function (checkbox) {
	checkbox.addEventListener('click', function () {
		if (checkbox.checked) {
			var listItem = checkbox.parentNode;
			listItem.classList.add('checked');
		} else {
			var listItem = checkbox.parentNode;
			listItem.classList.remove('checked');
		}
	});
});

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

function showCompleted() {
	const listElement = document.querySelectorAll('li');
	listElement.forEach((task) => {
		if (task.classList.contains('checked')) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}

function showActive() {
	const listElement = document.querySelectorAll('li');
	listElement.forEach((task) => {
		if (task.classList.contains('checked')) {
			task.style.display = 'none';
		} else {
			task.style.display = 'block';
		}
	});
}

function showAll() {
	const listElement = document.querySelectorAll('li');
	listElement.forEach((task) => {
		task.style.display = 'block';
	});
}

function clearCompleted() {
	let newTasks = [];
	const listElement = document.querySelectorAll('li');
	listElement.forEach((task) => {
		if (task.classList.contains('checked')) {
			task.remove();
		} else {
			newTasks.push(task.outerText);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(newTasks));
}

const remove = function (id) {
	let tasks = [];
	let newTasks = [];
	tasks = JSON.parse(localStorage.getItem('tasks'));
	document.querySelectorAll('.remove-icon').forEach((item) => {
		if (item.id === id) {
			item.parentElement.remove(item);
			newTasks = tasks.filter(
				(val) => val !== item.parentNode.children[1].outerText
			);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(newTasks));
};

const getLocalStorage = function () {
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

	tasks.forEach((task) => {
		const taskTemplate = document.getElementById('task-template');
		const taskElement = document.importNode(taskTemplate.content, true);
		taskElement.children[0].children[2].id = `trash-bin-${elementId}`;
		elementId++;
		const taskName = taskElement.querySelector('#task-name');
		taskName.textContent = task;
		todoList.appendChild(taskElement);
	});
};

addButton.addEventListener('click', addNewTask);
completedTasksButton.addEventListener('click', showCompleted);
activeTasksButton.addEventListener('click', showActive);
showAllTasksButton.addEventListener('click', showAll);
clearTasksButton.addEventListener('click', clearCompleted);
inputBox.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		addNewTask();
	}
});

getLocalStorage();
