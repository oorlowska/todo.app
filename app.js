let todoList = document.getElementById('list-container');
const addButton = document.getElementById('add-button');

const addNewTask = function () {
	const newTaskFormInput = document.getElementById('input-box').value;
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
    checkbox.id = 'task-circle';
	const taskName = document.createTextNode(newTaskFormInput);
	const listElement = document.createElement('li');

	listElement.appendChild(checkbox);
	listElement.appendChild(taskName);

	todoList.appendChild(listElement);

	console.log(newTaskFormInput);
};

addButton.addEventListener('click', addNewTask);
