const modal = document.querySelector('#modal');
const newTaskForm = document.querySelector('#new-task-form');
const newTaskFormBtn = document.querySelector('#new-task-form-btn');
const newTaskFormCloseBtn = document.querySelector('#new-task-form-close-btn');

const selector = {
  modal,
  newTaskForm,
  newTaskFormBtn,
  newTaskFormCloseBtn,
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

export const dom = {
  selector,
  newTaskFormDom,
};