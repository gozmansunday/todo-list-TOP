import dom from './dom';

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
    dom.selector.newTaskForm.reset();
  });

  dom.selector.editTaskFormCloseBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.editTaskForm);
    dom.selector.editTaskForm.reset();
  });

  dom.selector.newProjectFormCloseBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.newProjectForm);
    dom.selector.newProjectForm.reset();
  });

  dom.selector.newNoteFormCloseBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.newNoteForm);
    dom.selector.newNoteForm.reset();
  });

  dom.selector.editNoteFormCloseBtn.addEventListener('click', () => {
    dom.formDom(dom.selector.editNoteForm);
    dom.selector.editNoteForm.reset();
  });

  // Modal
  dom.selector.modal.addEventListener('click', () => {
    if (!dom.selector.newTaskForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.newTaskForm);
      dom.selector.newTaskForm.reset();
    }

    if (!dom.selector.editTaskForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.editTaskForm);
      dom.selector.editTaskForm.reset();
    }

    if (!dom.selector.newProjectForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.newProjectForm);
      dom.selector.newProjectForm.reset();
    }

    if (!dom.selector.newNoteForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.newNoteForm);
      dom.selector.newNoteForm.reset();
    }

    if (!dom.selector.editNoteForm.classList.contains('hidden')) {
      dom.formDom(dom.selector.editNoteForm);
      dom.selector.editNoteForm.reset();
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

function setMinDateToToday() {
  [...dom.selector.dateInputs].forEach((dateInput) => {
    dateInput.min = new Date().toLocaleDateString('en-ca');
  });
}

const forms = {
  formControl,
  setMinDateToToday,
};

export default forms;
