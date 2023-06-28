const todoList = document.getElementById('list-container');
const addButton = document.getElementById('add-button');
const deleteTask = document.getElementById('trash-bin');

const addNewTask = function () {
	const newTaskFormInput = document.getElementById('input-box').value;
	const listElement = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.id = 'task-circle';
	const taskName = document.createTextNode(newTaskFormInput);
	const paragraph = document.createElement('span');
	paragraph.id = 'task-name';
	paragraph.addEventListener('dblclick', editTask);
	const removeItem = document.createElement('i');
	removeItem.id = 'trash-bin';
	removeItem.classList = 'fa-solid fa-trash';
	removeItem.onclick = remove;

	paragraph.appendChild(taskName);
	listElement.appendChild(checkbox);
	listElement.appendChild(paragraph);
	listElement.appendChild(removeItem);

	todoList.appendChild(listElement);

	console.log(newTaskFormInput);
};

function remove(e) {
	e.parentElement.remove(e);
}
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

addButton.addEventListener('click', addNewTask);
// deleteTask.addEventListener('click', removeTask);
