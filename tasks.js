// variabls declaradas.
const form = document.querySelector('#task-form-one');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#tasks');
const input = document.querySelector('.input');
const fileres = document.querySelector('.filter');
const label = input.querySelector('label')
const labelT = fileres.querySelector('label')
// Llamando todas los add addEventListener
loadEventListeners();

// loadEventListeners
function loadEventListeners(){
  document.addEventListener('DOMContentLoaded', getTasks);
  //add tst event
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  input.addEventListener('click', inputt);
  fileres.addEventListener('click', filterees);
}
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){

    const li = document.createElement('li');
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class=" icon icon-close"></i>'

    const check =document.createElement('a');
    check.className = 'icon-check secondary-content';
    check.innerHTML = '<i class="icon icon-checkmark"></i>'

    li.appendChild(link);
    li.appendChild(check);
    taskList.appendChild(li);

  });
}
// add task
function addTask(e){
  if(taskInput.value === ''){
    confirm('add task?');
  }
  const li = document.createElement('li');
  li.className = 'collection-item'
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class=" icon icon-close"></i>'

  const check =document.createElement('a');
  check.className = 'icon-check secondary-content';
  check.innerHTML = '<i class="icon icon-checkmark"></i>'

  li.appendChild(link);
  li.appendChild(check);
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove tasks
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  // cuando este lista
  if(e.target.parentElement.classList.contains('icon-check')){
    e.target.parentElement.parentElement.style.background = 'lightgray';
  }

}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearTasksFromLocalStorage();
}


// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toUpperCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toUpperCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function inputt(){
  if(label.classList.contains('active')){
    label.classList.remove('active');
    input.classList.remove('active');
    console.log('removida');
  }else{
      label.classList.add('active');
      labelT.classList.remove('active');
      console.log('añadio tarea');
  }
}

function filterees(){
  if(labelT.classList.contains('active')){
    labelT.classList.remove('active');
    console.log('removida');
  }else{
      labelT.classList.add('active');
      label.classList.remove('active');
      console.log('añadio tarea');
  }
}
