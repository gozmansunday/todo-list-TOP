import { dom } from './dom.js';

function formControl() {
  // New Btns
  dom.selector.newTaskFormBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.newTaskForm);
  });
  
  dom.selector.newProjectFormBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.newProjectForm);
  });
  
  dom.selector.newNoteFormBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.newNoteForm);
  });

  // Close Btns
  dom.selector.newTaskFormCloseBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.newTaskForm);
  });

  dom.selector.editTaskFormCloseBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.editTaskForm);
  });

  dom.selector.newProjectFormCloseBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.newProjectForm);
  });
  
  dom.selector.newNoteFormCloseBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.newNoteForm);
  });
  
  dom.selector.editNoteFormCloseBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.editNoteForm);
  });

  // Modal
  dom.selector.modal.addEventListener('click', () => {
    if (!dom.selector.newTaskForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.newTaskForm);
    }

    if (!dom.selector.editTaskForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.editTaskForm);
    }

    if (!dom.selector.newProjectForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.newProjectForm);
    }

    if (!dom.selector.newNoteForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.newNoteForm);
    }

    if (!dom.selector.editNoteForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.editNoteForm);
    }
  });

  // Stop Propagation
  dom.selector.newTaskForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  dom.selector.editTaskForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  dom.selector.newProjectForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  dom.selector.newNoteForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  dom.selector.editNoteForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

export const forms = {
  formControl,
};