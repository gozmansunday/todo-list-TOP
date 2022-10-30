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
const chevrons = document.querySelectorAll('.chevron');

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
  chevrons,
};

function newTaskFormDom() {
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
  newTaskForm.classList.toggle('new-task-form-animation');
  newTaskForm.classList.toggle('hidden');
}

function clearTaskContainer() {
  taskContainer.textContent = '';
}

function createTaskDisplayDom(baseColor, task) {
  const taskDisp = document.createElement('div');
  taskDisp.className = `task-display text-sm border-[3px] border-${baseColor}-400 bg-${baseColor}-200 rounded-lg px-3 py-0.5 transition duration-150 md:text-base`;

  const taskHTML =
    `
    <div class="flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <div class="">
          <input type="checkbox" class="finish-task border-[3px] border-dark rounded-full w-5 h-5 bg-transparent checked:text-dark focus:ring-0 focus:ring-offset-0">
        </div>
        <h4 class="text-lg font-semibold pt-0.5 ml-1">${task.title}</h4>
        <i class="chevron rotate-0 fa-solid fa-chevron-up text-sm pt-1 md:pt-1.5"></i>
      </div>
      <div class="flex gap-2 items-center">
        <p class="mr-4  pt-0.5 md:pt-0">${task.date}</p>
        <i class="fa-solid fa-pen-to-square text-sm"></i>
        <i class="fa-solid fa-trash text-sm"></i>
      </div>
    </div>
    <div class="extended-part px-8 pb-0.5">
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
    `;

  taskDisp.innerHTML = taskHTML;

  dom.selector.taskContainer.appendChild(taskDisp);
}

function taskDisplayControlDom(chevron) {
  const task = chevron.parentElement.parentElement.parentElement;
  const extendedPart = task.children[1];
  
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

export const dom = {
  selector,
  newTaskFormDom,
  clearTaskContainer,
  createTaskDisplayDom,
  taskDisplayControlDom,
};