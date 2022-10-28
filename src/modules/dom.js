const modal = document.querySelector('#modal');
// New Task Form Controls DOM
const newTaskForm = document.querySelector('#new-task-form');
const newTaskFormBtn = document.querySelector('#new-task-form-btn');
const newTaskFormCloseBtn = document.querySelector('#new-task-form-close-btn');
const newTaskFormSubmitBtn = document.querySelector('#new-task-form-submit-btn');
// New Task Form Inputs DOM
const taskTitle = document.querySelector('#title');
const taskDetails = document.querySelector('#details');
const taskDate = document.querySelector('#date');
const taskPriority = document.querySelector('#priority');
const taskProject = document.querySelector('#project');
// Task Display DOM
const taskContainer = document.querySelector('#task-container');

// Selector obj for accessing all DOM query selectors
const selector = {
  modal,
  newTaskForm,
  newTaskFormBtn,
  newTaskFormCloseBtn,
  newTaskFormSubmitBtn,
  taskTitle,
  taskDetails,
  taskDate,
  taskPriority,
  taskProject,
  taskContainer,
};

function newTaskFormDom() {
  if (modal.classList.contains('hidden')) {
    modal.classList.replace('hidden', 'flex');
    newTaskForm.classList.add('new-task-form-animation');
    newTaskForm.classList.remove('hidden');
  } else if (modal.classList.contains('flex')) {
    newTaskForm.classList.add('hidden');
    newTaskForm.classList.remove('new-task-form-animation');
    modal.classList.replace('flex', 'hidden');
  }
}

function clearTaskContainer() {
  taskContainer.textContent = '';
}

export const dom = {
  selector,
  newTaskFormDom,
  clearTaskContainer,
};