const newTaskBtn = document.querySelector('#new-task-btn');
const main = document.querySelector('main');

function formControl() {
  const newTaskFormHtml = `
  <div id="form-container" class="bg-mid space-y-4 rounded-md px-6 pt-5 pb-8 w-[22rem] shadow-card md:w-[26rem]">
    <div class="flex items-center justify-between">            
      <h3 class="text-[1.75rem] leading-none font-semibold">Add New Task</h3>
      <i id="form-close-btn" class="fa-solid fa-xmark text-[1.75rem] leading-none pb-1.5"></i>
    </div>
    <form class="space-y-4">
      <div>
        <label for="title" class="block text-xl leading-none">Title</label>
        <input type="text" name="title" id="title" class="w-full border-[3px] border-dark/50 bg-mid px-2 pb-1 pt-1.5 text-md leading-none rounded transition duration-200 focus:ring-0 focus:border-dark">
      </div>
      <div>
        <label for="details" class="block text-xl leading-none">Details</label>
        <textarea name="details" id="details" class="w-full border-[3px] border-dark/50 bg-mid px-2.5 pb-1.5 pt-2 h-16 -mb-2 text-md leading-none rounded transition duration-200 focus:ring-0 focus:border-dark"></textarea>
      </div>
      <div>
        <label for="date" class="block text-xl leading-none">Due Date</label>
        <input type="date" name="date" id="date" class="w-full border-[3px] border-dark/50 bg-mid px-2 pb-1 pt-1.5 text-md leading-none rounded transition duration-200 focus:ring-0 focus:border-dark">
      </div>
      <div>
        <label for="priority" class="block text-xl leading-none">Priority</label>
        <select name="priority" id="priority" class="w-full border-[3px] border-dark/50 bg-mid px-2 pb-1 pt-1.5 text-md leading-none rounded transition duration-200 focus:ring-0 focus:border-dark">
          <option value="low" selected>
            Low
          </option>
          <option value="medium">
            Medium
          </option>
          <option value="high">
            High
          </option>
        </select>
      </div>
      <div>
        <label for="project" class="block text-xl leading-none">Project</label>
        <select name="project" id="project" class="w-full border-[3px] border-dark/50 bg-mid px-2 pb-1 pt-1.5 text-md leading-none rounded transition duration-200 focus:ring-0 focus:border-dark">
          <option value="all tasks">
            All Tasks
          </option>
        </select>
      </div>
      <div>
        <button class="w-full bg-dark text-light px-2.5 pb-2 pt-2.5 mt-4 text-lg leading-none rounded transition duration-200 lg:hover:scale-[1.03] lg:hover:shadow-card">
          Add
        </button>
      </div>
    </form>
  </div>`;
  
  const newTaskForm = document.createElement('div');
  newTaskForm.setAttribute('id', 'form-overlay');
  newTaskForm.className = 'bg-black/60 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center';
  newTaskForm.innerHTML = newTaskFormHtml;

  newTaskBtn.addEventListener('click', () => {
    main.appendChild(newTaskForm);

    const closeFormBtn = document.querySelector('#form-close-btn');
    const formContainer = document.querySelector('#form-container');
    closeFormBtn.onclick = () => main.removeChild(newTaskForm);
    newTaskForm.onclick = () => main.removeChild(newTaskForm);
    formContainer.onclick = (e) => e.stopPropagation();
  });
}

export const dom = {
  formControl,
};