const todoList = document.getElementById('list-container');
const addButton = document.getElementById('add-button');
const deleteTask = document.getElementById('trash-bin');

const addNewTask = function () {
	const newTaskFormInput = document.getElementById('input-box').value;
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.id = 'task-circle';
	const taskName = document.createTextNode(newTaskFormInput);
	const listElement = document.createElement('li');
	const removeItem = document.createElement('i');
	removeItem.id = 'trash-bin';
	removeItem.classList = 'fa-solid fa-trash';
	removeItem.onclick = remove;

	listElement.appendChild(checkbox);
	listElement.appendChild(taskName);
	listElement.appendChild(removeItem);

	todoList.appendChild(listElement);

	console.log(newTaskFormInput);
};

function remove(e) {
	e.parentElement.remove(e);
}

addButton.addEventListener('click', addNewTask);
// deleteTask.addEventListener('click', removeTask);
