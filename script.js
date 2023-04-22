const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addList);
taskList.addEventListener('click', deleteList);
taskList.addEventListener('click', completeList);


let tasks = [];


if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
}


tasks.forEach(function (task) {
	renderTask(task);
})

checkEmptyList();


//Функия по добавлению задач
function addList (event) {

	event.preventDefault();

	const taskText = taskInput.value;

	const saveTask = {
		id: Date.now(),
		text: taskText,
		done: false, 
	};

	tasks.push(saveTask);

	//Хранилище браузера
	saveToLocalStorage();

	const cssClass = saveTask.done ? 'complete completed' : 'complete';

	const taskHTML = `<li id="${saveTask.id}" class="addList">
					<span class="${cssClass}">${saveTask.text}</span>
					<div class="list-btns">
						<button>
							<img src="img/yaya.svg" class="p-e-n" alt="Done" data-action="done" width="18px" height="20px">
						</button>
						<button>
							<img src="img/nain.svg" class="p-e-n" alt="Del" data-action="delete" width="18px" height="20px">
						</button>
					</div>
				</li>`;

	taskList.insertAdjacentHTML('beforeend', taskHTML);

	taskInput.value = "";
	taskInput.focus();

	checkEmptyList();
}

//Функция по удалению задач
function deleteList (event) {

	if (event.target.dataset.action === 'delete') {

		const parenNode = event.target.closest('.addList');

		//ID задачи
		const id = Number(parenNode.id);

		//Находим индекс задачи в массиве

		const index = tasks.findIndex(function (task) {
			return task.id === id;
		});

		//Оптимизированно скажем так выше

		//-----------------------------------------------
		/*const index = tasks.findIndex(function (task) {
			if (task.id === id) {
				return true;
			}
		});*/

		//------------------------------------------------

		//Удаляем задачу из массива
		tasks.splice(index, 1);

		//Хранилище браузера
		saveToLocalStorage();

		//Удаление задачи из разметки
		parenNode.remove();

		checkEmptyList();
	}
}

//Функция по зачеркиванию задач (выполненных тип)
function completeList (event) {

	if (event.target.dataset.action === 'done') {

		const parenNode = event.target.closest('.addList');

		//--------------------------------------------

		const id = Number(parenNode.id);

		const task = tasks.find( function (task) {
			if (task.id === id) {
				return true
			}
		});

		task.done = !task.done;

		//Хранилище браузера
		saveToLocalStorage()

		//---------------------------------------------

		const listTitle = parenNode.querySelector('.complete');
		listTitle.classList.toggle('completed');
	}
}

//Функция по пустому листу
function checkEmptyList() {

	if (tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="emptLi">
					<img src="img/perekatiego.svg" alt="Perekati-Pole" class="perekat">
					<div class="txt">Ваш список пуст</div>
				</li>`;

		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}

	if (tasks.length > 0) {
		const emptyListCss = document.querySelector('#emptyList');
		emptyListCss ? emptyListCss.remove() : null;
	}
}

//Функция с работой с LocalStorage
function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
} 

function renderTask (task) {

	const cssClass = task.done ? 'complete completed' : 'complete';

	const taskHTML = `<li id="${task.id}" class="addList">
					<span class="${cssClass}">${task.text}</span>
					<div class="list-btns">
						<button>
							<img src="img/yaya.svg" class="p-e-n" alt="Done" data-action="done" width="18px" height="20px">
						</button>
						<button>
							<img src="img/nain.svg" class="p-e-n" alt="Del" data-action="delete" width="18px" height="20px">
						</button>
					</div>
				</li>`;

	taskList.insertAdjacentHTML('beforeend', taskHTML);
}
