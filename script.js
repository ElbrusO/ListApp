const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addList);
taskList.addEventListener('click', deleteList);
taskList.addEventListener('click', completeList);

//Функия по добавлению задач
function addList (event) {

	event.preventDefault();

	const taskText = taskInput.value;

	const taskHTML = `<li class="addList">
					<span class="complete">${taskText}</span>
					<div class="list-btns">
						<button>
							<img src="img/yaya.svg" alt="Done" data-action="done" width="20px" height="25px">
						</button>
						<button>
							<img src="img/nain.svg" alt="Del" data-action="delete" width="20px" height="25px">
						</button>
					</div>
				</li>`;

	taskList.insertAdjacentHTML('beforeend', taskHTML);

	taskInput.value = "";
	taskInput.focus();

	if (taskList.children.length > 1) {
		emptyList.classList.add('none')
	}
}

//Функция по удалению задач
function deleteList (event) {

	if (event.target.dataset.action === 'delete') {

		const parenNode = event.target.closest('.addList');
		parenNode.remove();

		if (taskList.children.length === 1) {
			emptyList.classList.remove('none');
		}
	}
}

//Функция по зачеркиванию задач (выполненных тип)
function completeList (event) {

	if (event.target.dataset.action === 'done') {
		const parenNode = event.target.closest('.addList');
		const listTitle = parenNode.querySelector('.complete');
		listTitle.classList.toggle('completed');
	}
}

