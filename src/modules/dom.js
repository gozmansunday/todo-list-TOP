import { storage } from './storage.js';

// projects.createProject();

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
const taskContainer = document.querySelector('#task-container');
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
  taskContainer,
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
};

function newTaskFormDom() {
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
  newTaskForm.classList.toggle('task-form-animation');
  newTaskForm.classList.toggle('hidden');
}

function editTaskFormDom() {
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
  editTaskForm.classList.toggle('task-form-animation');
  editTaskForm.classList.toggle('hidden');
}

function newProjectFormDom() {
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
  newProjectForm.classList.toggle('task-form-animation');
  newProjectForm.classList.toggle('hidden');
}

function clearTaskContainer() {
  taskContainer.innerHTML = '';
}

function createTaskDisplayDom(baseColor, task) {
  const taskDisp = document.createElement('div');
  taskDisp.className = `task-display text-sm border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-xl px-3 pt-0.5 space-y-0.5 md:text-base`;

  const taskHTML =
    `
    <div class="flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <div class="">
          <input type="checkbox" class="checkbox border-[3px] border-dark rounded-full w-5 h-5 bg-transparent checked:text-dark focus:ring-0 focus:ring-offset-0">
        </div>
        <h4 class="text-lg font-semibold pt-0.5 ml-1">${task.title}</h4>
        <i class="chevron rotate-0 fa-solid fa-chevron-up text-sm pt-1 md:pt-1.5"></i>
      </div>
      <div class="flex gap-2 items-center">
        <p class="mr-4  pt-0.5">${task.date}</p>
        <i class="edit fa-solid fa-pen-to-square text-sm"></i>
        <i class="trash fa-solid fa-trash text-sm"></i>
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

  taskContainer.appendChild(taskDisp);
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
  const taskIndex = [...taskContainer.children].indexOf(taskDisp);
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
    taskDisp.className = `task-display text-sm border-[3px] border-gray-300 bg-gray-200 text-gray-400 rounded-xl px-3 pt-0.5 space-y-0.5 md:text-base`;
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
    taskDisp.className = `task-display text-sm border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-xl px-3 pt-0.5 space-y-0.5 md:text-base`;
    checkbox.classList.replace('checked:text-gray-400', 'checked:text-dark');
    taskTitle.classList.remove('line-through');
    taskDate.classList.remove('hidden');
    chevron.classList.remove('hidden');
    taskEdit.classList.remove('hidden');
    tasksArray[taskIndex].completed = false;
  }

  storage.updateLocalStore(projectsArray);
}

function deleteTaskDom(trash, tasksArray, projectsArray) {
  const taskDisp = trash.parentElement.parentElement.parentElement;
  const taskIndex = [...taskContainer.children].indexOf(taskDisp);
  const confirmDelete = taskDisp.children[2];
  const cancelBtn = confirmDelete.children[1].children[0];
  const deleteBtn = confirmDelete.children[1].children[1];

  if (tasksArray[taskIndex].completed) {
    taskDisp.remove();
    tasksArray.splice(taskIndex, 1);
  
    storage.updateLocalStore(projectsArray);
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
  
      storage.updateLocalStore(projectsArray);
    });
  }
}

function editTaskDom(edit, tasksArray, projectsArray) {
  const taskDisp = edit.parentElement.parentElement.parentElement;
  const taskIndex = [...taskContainer.children].indexOf(taskDisp);
  const task = tasksArray[taskIndex];
  let baseColor;

  editTaskTitle.value = task.title;
  editTaskDetails.value = task.details;
  editTaskDate.value = task.date;
  editTaskPriority.value = task.priority;

  editTaskFormDom();
  
  editTaskFormSubmitBtn.onclick = (e) => {
    e.preventDefault();

    task.title = editTaskTitle.value;
    task.details = editTaskDetails.value;
    task.date = editTaskDate.value;
    task.priority = editTaskPriority.value;

    if (task.priority === 'Low') {
      baseColor = 'blue';
    } else if (task.priority === 'Medium') {
      baseColor = 'yellow';
    } else {
      baseColor = 'red';
    }

    taskDisp.className = `task-display text-sm border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-xl px-3 pt-0.5 space-y-0.5 md:text-base`;
    taskDisp.children[0].children[0].children[1].textContent = editTaskTitle.value;
    taskDisp.children[0].children[1].children[0].textContent = editTaskDate.value;
    taskDisp.children[1].children[0].innerHTML = `<span class="font-semibold">Title:</span> ${editTaskTitle.value}`;
    taskDisp.children[1].children[1].innerHTML = `<span class="font-semibold">Details:</span> ${editTaskDetails.value}`;
    taskDisp.children[1].children[3].innerHTML = `<span class="font-semibold">Priority:</span> ${editTaskPriority.value}`;

    console.log(task);
  
    storage.updateLocalStore(projectsArray);
  };
}

function clearProjectContainer() {
  projectContainer.innerHTML = '';
}

function createProjectDisplayDom(project) {
  const projectDisp = document.createElement('div');
  
  projectDisp.className = 'project-display flex items-center justify-between text-xl px-3 border-[3px] bg-transparent border-mid rounded-xl cursor-pointer lg:hover:border-brand';

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
  storage.updateLocalStore(projectsArray);
}

function displayDefaultProjectDom(projectName) {
  const projectDisp = document.createElement('div');

  projectDisp.className = 'flex items-center gap-3 text-xl px-3 border-[3px] bg-brand border-brand rounded-xl cursor-pointer lg:hover:border-brand';
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

export const dom = {
  selector,
  newTaskFormDom,
  editTaskFormDom,
  newProjectFormDom,
  clearTaskContainer,
  createTaskDisplayDom,
  taskDisplayControlDom,
  completeTaskDom,
  deleteTaskDom,
  editTaskDom,
  clearProjectContainer,
  createProjectDisplayDom,
  deleteProjectDom,
  displayDefaultProjectDom,
  makeAllProjectsNonActiveDom,
  toggleDom,
};