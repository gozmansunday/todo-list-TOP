import { dom } from './dom.js';

function newTaskFormControl() {
  dom.selector.newTaskFormBtn.addEventListener('click', () => {
    dom.newTaskFormDom();
  });

  dom.selector.newTaskFormCloseBtn.addEventListener('click', () => {
    dom.newTaskFormDom();
  });

  dom.selector.modal.addEventListener('click', () => {
    dom.newTaskFormDom();
  });

  dom.selector.newTaskForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

export const forms = {
  newTaskFormControl,
};