const newTaskBtn = document.querySelector('#new-task-btn');
const main = document.querySelector('main');

function bringUpForm() {
  const newTaskFormHtml = 
    `<div class="bg-mid space-y-4 rounded-md px-6 pt-5 pb-8 w-[26rem] shadow-card">
      <h3 class="text-3xl font-semibold">Add New Task</h3>
      <div class="space-y-4">
        <div>
          <label for="title" class="block text-2xl leading-none">Title</label>
          <input type="text" name="title" id="title" class="w-full border-[3px] border-dark/50 bg-mid px-2.5 pb-1.5 pt-2 text-lg leading-none rounded transition duration-200 focus:ring-0 focus:border-dark">
        </div>
        <div>
          <label for="details" class="block text-2xl leading-none">Details</label>
          <textarea name="details" id="details" class="w-full border-[3px] border-dark/50 bg-mid px-2.5 pb-1.5 pt-2 h-20 -mb-2 text-lg leading-none rounded transition duration-200 focus:ring-0 focus:border-dark"></textarea>
        </div>
        <div>
          <label for="date" class="block text-2xl leading-none">Due Date</label>
          <input type="date" name="date" id="date" class="w-full border-[3px] border-dark/50 bg-mid px-2.5 pb-1.5 pt-2 text-lg leading-none rounded transition duration-200 focus:ring-0 focus:border-dark">
        </div>
        <div>
          <label for="priority" class="block text-2xl leading-none">Priority</label>
          <select name="priority" id="priority" class="w-full border-[3px] border-dark/50 bg-mid px-2.5 pb-1.5 pt-2 text-lg leading-none rounded transition duration-200 focus:ring-0 focus:border-dark">
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
          <label for="project" class="block text-2xl leading-none">Project</label>
          <select name="project" id="project" class="w-full border-[3px] border-dark/50 bg-mid px-2.5 pb-1.5 pt-2 text-lg leading-none rounded transition duration-200 focus:ring-0 focus:border-dark">
            <option value="all tasks">
              All Tasks
            </option>
          </select>
        </div>
      </div>
    </div>`;
  
  const newTaskForm = document.createElement('div');
  newTaskForm.setAttribute('id', 'form-overlay');
  newTaskForm.className = 'bg-black/60 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center';
  newTaskForm.innerHTML = newTaskFormHtml;

  newTaskBtn.addEventListener('click', () => {
    main.appendChild(newTaskForm);
  });
}

export const dom = {
  bringUpForm,
};