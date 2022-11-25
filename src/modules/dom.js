import { storage } from './storage.js';
import { date } from './date.js';

const modal = document.querySelector('#modal');
// New Task Form Controls DOM
const newTaskForm = document.querySelector('#new-task-form');
const newTaskFormBtn = document.querySelector('#new-task-form-btn');
const newTaskFormCloseBtn = document.querySelector('#new-task-form-close-btn');
const newTaskFormSubmitBtn = document.querySelector('#new-task-form-submit-btn');
// New Task Form Inputs DOM
const newTaskTitle = document.querySelector('#new-task-form #title');
const newTaskDetails = document.querySelector('#new-task-form #details');
const newTaskDate = document.querySelector('#new-task-form #date');
const newTaskPriority = document.querySelector('#new-task-form #priority');
// Edit Task Form Controls DOM
const editTaskForm = document.querySelector('#edit-task-form');
const editTaskFormCloseBtn = document.querySelector('#edit-task-form-close-btn');
const editTaskFormSubmitBtn = document.querySelector('#edit-task-form-submit-btn');
// Edit Task Form Inputs DOM
const editTaskTitle = document.querySelector('#edit-task-form #title');
const editTaskDetails = document.querySelector('#edit-task-form #details');
const editTaskDate = document.querySelector('#edit-task-form #date');
const editTaskPriority = document.querySelector('#edit-task-form #priority');
// Task Display DOM
const pageItemContainer = document.querySelector('#task-container');
const chevrons = document.querySelectorAll('.chevron');
// New Project Form Controls DOM
const newProjectForm = document.querySelector('#new-project-form');
const newProjectFormBtn = document.querySelector('#new-project-form-btn');
const newProjectFormCloseBtn = document.querySelector('#new-project-form-close-btn');
const newProjectFormSubmitBtn = document.querySelector('#new-project-form-submit-btn');
// New Project Form Inputs DOM
const newProjectName = document.querySelector('#new-project-form #name');
// Project Display DOM
const projectContainer = document.querySelector('#project-container');
// Home Display DOM
const homeContainer = document.querySelector('#home-container');
// Page Display
const pageHeading = document.querySelector('#page-heading');
// Hamburger Menu
const hamburger = document.querySelector('#hamburger');
// Sidebar
const sideBarOverlay = document.querySelector('#side-bar-overlay');
const sideBar = document.querySelector('#side-bar');
// Notes
const notesOption = document.querySelector('#notes');
// New Note Form Controls DOM
const newNoteForm = document.querySelector('#new-note-form');
const newNoteFormBtn = document.querySelector('#new-note-form-btn');
const newNoteFormCloseBtn = document.querySelector('#new-note-form-close-btn');
const newNoteFormSubmitBtn = document.querySelector('#new-note-form-submit-btn');
// New Note Form Inputs DOM
const newNoteTitle = document.querySelector('#new-note-form #title');
const newNoteDetails = document.querySelector('#new-note-form #details');
// Edit Note Form Controls DOM
const editNoteForm = document.querySelector('#edit-note-form');
const editNoteFormCloseBtn = document.querySelector('#edit-note-form-close-btn');
const editNoteFormSubmitBtn = document.querySelector('#edit-note-form-submit-btn');
// Edit Note Form Inputs DOM
const editNoteTitle = document.querySelector('#edit-note-form #title');
const editNoteDetails = document.querySelector('#edit-note-form #details');

// Selector obj for accessing all DOM query selectors
const selector = {
  newTaskFormBtn,
  modal,
  newTaskForm,
  newTaskFormCloseBtn,
  newTaskFormSubmitBtn,
  newTaskTitle,
  newTaskDetails,
  newTaskDate,
  newTaskPriority,
  editTaskForm,
  editTaskFormCloseBtn,
  editTaskFormSubmitBtn,
  editTaskTitle,
  editTaskDetails,
  editTaskDate,
  editTaskPriority,
  pageItemContainer,
  chevrons,
  newProjectForm,
  newProjectFormBtn,
  newProjectFormCloseBtn,
  newProjectFormSubmitBtn,
  newProjectName,
  projectContainer,
  homeContainer,
  pageHeading,
  hamburger,
  sideBarOverlay,
  sideBar,
  notesOption,
  newNoteForm,
  newNoteFormBtn,
  newNoteFormCloseBtn,
  newNoteFormSubmitBtn,
  newNoteTitle,
  newNoteDetails,
  editNoteForm,
  editNoteFormCloseBtn,
  editNoteFormSubmitBtn,
  editNoteTitle,
  editNoteDetails,
};

function formDom(form) {
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
  form.classList.toggle('task-form-animation');
  form.classList.toggle('hidden');
}

function clearpageItemContainer() {
  pageItemContainer.innerHTML = '';
}

function createTaskDisplayDom(baseColor, task) {
  const taskDisp = document.createElement('div');
  taskDisp.className = `task-display text-xs border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-xl px-2 sm:px-3 pt-0.5 space-y-0.5 sm:text-sm lg:text-base`;

  const taskHTML =
    `
    <div class="flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <div class="">
          <input type="checkbox" class="checkbox border-[3px] border-dark rounded-full w-4 h-4 sm:w-5 sm:h-5 bg-transparent checked:text-dark focus:ring-0 focus:ring-offset-0">
        </div>
        <h4 class="text-sm sm:text-base lg:text-lg font-semibold pt-0.5 sm:pt-1 lg:pt-0.5 sm:ml-0.5">${task.title}</h4>
        <i class="chevron rotate-0 fa-solid fa-chevron-up text-sm pt-1.5"></i>
      </div>
      <div class="flex gap-1.5 sm:gap-2 items-center">
        <p class="text-xs md:text-sm mr-1.5 sm:mr-2 lg:mr-4 pt-0.5 sm:pt-1">${task.date}</p>
        <i class="edit fa-solid fa-pen-to-square text-xs sm:text-sm pt-0.5 sm:pt-1 lg:pt-0.5"></i>
        <i class="trash fa-solid fa-trash text-xs sm:text-sm pt-0.5 sm:pt-1 lg:pt-0.5"></i>
      </div>
    </div>
    <div class="extended-part px-8">
      <p>
        <span class="font-semibold">Title:</span>
        ${task.title}
      </p>
      <p>
        <span class="font-semibold">Details:</span>
        ${task.details}
      </p>
      <p>
        <span class="font-semibold">Project:</span>
        ${task.project}
      </p>
      <p>
        <span class="font-semibold">Priority:</span>
        ${task.priority}
      </p>
      <p>
        <span class="font-semibold">Due Date:</span>
        ${task.fullDate}
      </p>
    </div>
    <div class="confirm-delete px-8 space-y-1">
      <h4 class="font-semibold">
        Are you sure you want to delete this task?
      </h4>
      <div class="flex items-center gap-2 md:gap-3 pb-1">
        <button class="cancel-del-btn bg-dark text-light rounded-md px-4 py-1 text-sm md:text-base transition duration-200 lg:hover:shadow-card">
          Cancel
        </button>
        <button class="confirm-del-btn bg-dark text-light rounded-md px-4 py-1 text-sm md:text-base transition duration-200 lg:hover:shadow-card">
          Delete
        </button>
      </div>
    </div>
    `;

  taskDisp.innerHTML = taskHTML;

  pageItemContainer.appendChild(taskDisp);
}

function taskDisplayControlDom(chevron) {
  const extendedPart = chevron.parentElement.parentElement.parentElement.children[1];

  if (extendedPart.style.maxHeight) {
    extendedPart.style.maxHeight = null;
  } else {
    extendedPart.style.maxHeight = extendedPart.scrollHeight + "px";
  }

  if (chevron.classList.contains('chevron-anim-down')) {
    chevron.classList.add('chevron-anim-up');
  } else if (chevron.classList.contains('chevron-anim-up')) {
    chevron.classList.remove('chevron-anim-up');
  }
  chevron.classList.toggle('rotate-0');
  chevron.classList.toggle('chevron-anim-down');
  chevron.classList.toggle('rotate-180');
}

function completeTaskDom(checkbox, tasksArray, projectsArray) {
  const taskDisp = checkbox.parentElement.parentElement.parentElement.parentElement;
  const taskIndex = [...pageItemContainer.children].indexOf(taskDisp);
  const taskTitle = taskDisp.children[0].children[0].children[1];
  const taskDate = taskDisp.children[0].children[1].children[0];
  const chevron = taskDisp.children[0].children[0].children[2];
  const taskEdit = taskDisp.children[0].children[1].children[1];
  const extendedPart = taskDisp.children[1];
  const confirmDelete = taskDisp.children[2];
  let baseColor;

  if (tasksArray[taskIndex].priority === 'Low') {
    baseColor = 'blue';
  } else if (tasksArray[taskIndex].priority === 'Medium') {
    baseColor = 'yellow';
  } else {
    baseColor = 'red';
  }

  if (checkbox.checked) {
    taskDisp.className = `task-display text-xs border-[3px] border-gray-300 bg-gray-200 text-gray-400 rounded-xl px-2 sm:px-3 pt-0.5 space-y-0.5 sm:text-sm lg:text-base`;
    checkbox.classList.replace('checked:text-dark', 'checked:text-gray-400');
    taskTitle.classList.add('line-through');
    taskDate.classList.add('hidden');
    chevron.classList.add('hidden');
    taskEdit.classList.add('hidden');
    extendedPart.style.maxHeight = null;
    confirmDelete.style.maxHeight = null;
    chevron.classList.remove('chevron-anim-down');
    chevron.classList.remove('chevron-anim-up');
    chevron.classList.remove('rotate-0');
    chevron.classList.remove('rotate-180');
    chevron.classList.add('rotate-0');
    tasksArray[taskIndex].completed = true;
  } else {
    taskDisp.className = `task-display text-xs border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-xl px-2 sm:px-3 pt-0.5 space-y-0.5 sm:text-sm lg:text-base`;
    checkbox.classList.replace('checked:text-gray-400', 'checked:text-dark');
    taskTitle.classList.remove('line-through');
    taskDate.classList.remove('hidden');
    chevron.classList.remove('hidden');
    taskEdit.classList.remove('hidden');
    tasksArray[taskIndex].completed = false;
  }

  storage.updateProjectsArray(projectsArray);
}

function deleteTaskDom(trash, tasksArray, projectsArray) {
  const taskDisp = trash.parentElement.parentElement.parentElement;
  const taskIndex = [...pageItemContainer.children].indexOf(taskDisp);
  const confirmDelete = taskDisp.children[2];
  const cancelBtn = confirmDelete.children[1].children[0];
  const deleteBtn = confirmDelete.children[1].children[1];

  if (tasksArray[taskIndex].completed) {
    taskDisp.remove();
    tasksArray.splice(taskIndex, 1);
  
    storage.updateProjectsArray(projectsArray);
  } else {
    if (confirmDelete.style.maxHeight) {
      confirmDelete.style.maxHeight = null;
    } else {
      confirmDelete.style.maxHeight = confirmDelete.scrollHeight + "px";
    }

    cancelBtn.addEventListener('click', () => {
      confirmDelete.style.maxHeight = null;
    });

    deleteBtn.addEventListener('click', () => {
      taskDisp.remove();
      tasksArray.splice(taskIndex, 1);
  
      storage.updateProjectsArray(projectsArray);
    });
  }
}

function editTaskDom(edit, tasksArray, projectsArray) {
  const taskDisp = edit.parentElement.parentElement.parentElement;
  const taskIndex = [...pageItemContainer.children].indexOf(taskDisp);
  const task = tasksArray[taskIndex];
  let baseColor;

  editTaskTitle.value = task.title;
  editTaskDetails.value = task.details;
  editTaskDate.value = task.fullDate;
  editTaskPriority.value = task.priority;

  formDom(editTaskForm);
  
  editTaskFormSubmitBtn.onclick = (e) => {
    e.preventDefault();

    const taskDate = date.getShortDate(editTaskDate.value);

    task.title = editTaskTitle.value;
    task.details = editTaskDetails.value;
    task.fullDate = editTaskDate.value;
    task.date = taskDate;
    task.priority = editTaskPriority.value;

    if (task.priority === 'Low') {
      baseColor = 'blue';
    } else if (task.priority === 'Medium') {
      baseColor = 'yellow';
    } else {
      baseColor = 'red';
    }

    taskDisp.className = `task-display text-xs border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-xl px-2 sm:px-3 pt-0.5 space-y-0.5 sm:text-sm lg:text-base`;
    taskDisp.children[0].children[0].children[1].textContent = editTaskTitle.value;
    taskDisp.children[0].children[1].children[0].textContent = taskDate;
    taskDisp.children[1].children[0].innerHTML = `<span class="font-semibold">Title:</span> ${editTaskTitle.value}`;
    taskDisp.children[1].children[1].innerHTML = `<span class="font-semibold">Details:</span> ${editTaskDetails.value}`;
    taskDisp.children[1].children[3].innerHTML = `<span class="font-semibold">Priority:</span> ${editTaskPriority.value}`;
    taskDisp.children[1].children[4].innerHTML = `<span class="font-semibold">Due Date:</span> ${editTaskDate.value}`;

    console.log(task);
  
    storage.updateProjectsArray(projectsArray);
  };
}

function showCheckedTaskDom(task, taskIndex) {
  // const pageItemContainer = pageItemContainer;
  const taskDisp = pageItemContainer.children[taskIndex];
  const checkbox = taskDisp.children[0].children[0].children[0].children[0];
  const taskTitle = taskDisp.children[0].children[0].children[1];
  const taskDate = taskDisp.children[0].children[1].children[0];
  const chevron = taskDisp.children[0].children[0].children[2];
  const taskEdit = taskDisp.children[0].children[1].children[1];
  const extendedPart = taskDisp.children[1];
  const confirmDelete = taskDisp.children[2];
  
  if (task.completed === true) {
    taskDisp.className = `task-display text-xs border-[3px] border-gray-300 bg-gray-200 text-gray-400 rounded-xl px-2 sm:px-3 pt-0.5 space-y-0.5 sm:text-sm lg:text-base`;
    checkbox.setAttribute('checked', '');
    checkbox.classList.replace('checked:text-dark', 'checked:text-gray-400');
    taskTitle.classList.add('line-through');
    taskDate.classList.add('hidden');
    chevron.classList.add('hidden');
    taskEdit.classList.add('hidden');
    extendedPart.style.maxHeight = null;
    confirmDelete.style.maxHeight = null;
    chevron.classList.remove('chevron-anim-down');
    chevron.classList.remove('chevron-anim-up');
    chevron.classList.remove('rotate-0');
    chevron.classList.remove('rotate-180');
    chevron.classList.add('rotate-0');
  }
}

function clearProjectContainer() {
  projectContainer.innerHTML = '';
}

function createProjectDisplayDom(project) {
  const projectDisp = document.createElement('div');
  
  projectDisp.className = 'project-display flex items-center justify-between px-3 border-[3px] bg-transparent border-mid rounded-xl cursor-pointer sm:text-xl lg:hover:border-brand';

  const projectHTML = 
    `
    <div class="flex items-center gap-3">                
      <i class="fa-solid fa-caret-right"></i>
      <h4 class="pt-1">
        ${project.name}
      </h4>
    </div>
    <i class="delete-project-btn fa-solid fa-trash text-sm pt-0.5"></i>`;
  
  projectDisp.innerHTML = projectHTML;

  projectContainer.appendChild(projectDisp);
}

function deleteProjectDom(delBtn, projectsArray) {
  const projDisp = delBtn.parentElement;
  const projIndex = [...projectContainer.children].indexOf(projDisp) + 1;

  projectsArray.splice(projIndex, 1);
  projDisp.remove();

  storage.updateProjectsArray(projectsArray);
}

function displayDefaultProjectDom(projectName) {
  const projectDisp = document.createElement('div');

  projectDisp.className = 'flex items-center gap-3 px-3 border-[3px] bg-brand border-brand rounded-xl cursor-pointer sm:text-xl lg:hover:border-brand';
  projectDisp.setAttribute('id', 'default-project');

  const projectHTML = 
    `         
    <i class="fa-solid fa-inbox"></i>
    <h4 class="pt-0.5">
      ${projectName}
    </h4>`;
  
  projectDisp.innerHTML = projectHTML;

  homeContainer.insertBefore(projectDisp, homeContainer.children[0]);
}

function makeAllProjectsNonActiveDom(projInbox) {
  projInbox.classList.replace('bg-brand', 'bg-transparent');
  projInbox.classList.replace('border-brand', 'border-mid');
  [...projectContainer.children].forEach(project => {
    project.classList.replace('bg-brand', 'bg-transparent');
    project.classList.replace('border-brand', 'border-mid');
  });
}

function toggleDom() {
  hamburger.classList.toggle('active');

  // Side Bar Overlay
  sideBarOverlay.classList.toggle('hidden');

  // Side Bar
  sideBar.classList.toggle('-translate-x-full');
  sideBar.classList.toggle('translate-x-0');

  if (sideBar.classList.contains('animate-show-side-bar') || sideBar.classList.contains('animate-hide-side-bar')) {
    sideBar.classList.toggle('animate-hide-side-bar');
  }

  sideBar.classList.toggle('animate-show-side-bar');
}

function makeDefaultProjectActive(projectsArray, projInbox) {
  projectsArray[0].active = true;
  projInbox.classList.replace('bg-transparent', 'bg-brand');
  projInbox.classList.replace('border-mid', 'border-brand');

  pageHeading.textContent = projectsArray[0].name;
}

function makeProjectActive(projectsArray, projIndex, projDisp) {
  projectsArray[projIndex].active = true;
  projDisp.classList.replace('bg-transparent', 'bg-brand');
  projDisp.classList.replace('border-mid', 'border-brand');

  pageHeading.textContent = projectsArray[projIndex].name;
}

function makeNotesOptionActive(notesOption) {
  notesOption.classList.replace('bg-transparent', 'bg-brand');
  notesOption.classList.replace('border-mid', 'border-brand');

  newTaskFormBtn.classList.add('hidden');
  newNoteFormBtn.classList.remove('hidden');

  pageHeading.textContent = 'Notes';

}

function makeNotesOptionNonActive(notesOption) {
  notesOption.classList.replace('bg-brand', 'bg-transparent');
  notesOption.classList.replace('border-brand', 'border-mid');

  newNoteFormBtn.classList.add('hidden');
  newTaskFormBtn.classList.remove('hidden');
}

function createNoteDisplayDom(note) {
  const noteDisp = document.createElement('div');
  noteDisp.className = `note-display text-xs space-y-1 border-[3px] border-dark bg-neutral-300 rounded-xl px-3 py-2 lg:pt-2 lg:pb-3 sm:text-sm lg:text-base`;

  const noteHTML =
    `
    <div class="flex items-center justify-between">
      <h4 class="text-sm sm:text-base lg:text-lg font-semibold">
        ${note.title}
      </h4>
      <div class="space-x-1.5">
        <i class="note-edit fa-solid fa-pen-to-square text-xs sm:text-sm sm:pt-0.5"></i>
        <i class="note-trash fa-solid fa-trash text-xs sm:text-sm sm:pt-0.5"></i>
      </div>
    </div>
    <div>
      <p class="leading-snug lg:leading-tight">
        ${note.details}
      </p>
    </div>
    `;

  noteDisp.innerHTML = noteHTML;

  pageItemContainer.appendChild(noteDisp);
}

function deleteNoteDom(trash, notesArray) {
  const noteDisp = trash.parentElement.parentElement.parentElement;
  const noteIndex = [...pageItemContainer.children].indexOf(noteDisp);

  noteDisp.remove();
  notesArray.splice(noteIndex, 1);  
}

function editNoteDom(edit, notesArray) {
  const noteDisp = edit.parentElement.parentElement.parentElement;
  const noteIndex = [...pageItemContainer.children].indexOf(noteDisp);
  const note = notesArray[noteIndex];

  editNoteTitle.value = note.title;
  editNoteDetails.value = note.details;

  formDom(editNoteForm);

  editNoteFormSubmitBtn.onclick = (e) => {
    e.preventDefault();

    note.title = editNoteTitle.value;
    note.details = editNoteDetails.value;

    noteDisp.children[0].children[0].textContent = editNoteTitle.value;
    noteDisp.children[1].children[0].textContent = editNoteDetails.value;
  };
}

export const dom = {
  selector,
  formDom,
  clearpageItemContainer,
  createTaskDisplayDom,
  taskDisplayControlDom,
  completeTaskDom,
  deleteTaskDom,
  editTaskDom,
  showCheckedTaskDom,
  clearProjectContainer,
  createProjectDisplayDom,
  deleteProjectDom,
  displayDefaultProjectDom,
  makeAllProjectsNonActiveDom,
  toggleDom,
  makeDefaultProjectActive,
  makeProjectActive,
  makeNotesOptionActive,
  makeNotesOptionNonActive,
  createNoteDisplayDom,
  deleteNoteDom,
  editNoteDom,
};