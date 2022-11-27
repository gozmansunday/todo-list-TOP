import { dom } from './dom.js';
import { projects } from './projects.js';
import { format } from 'date-fns'
import { tasks } from './tasks.js';

function displayValidTasks() {
  let projectsArray = projects.projectsArray;
  const todayArray = [];
  const todayDate = format(new Date(), 'yyyy-MM-dd');
  
  projectsArray.forEach(project => {
    let tasksArray = project.projectArray;

    tasksArray.forEach(task => {
      if (task.fullDate === todayDate) {
        todayArray.push(task);
      }
    });
  })

  tasks.displayTask(todayArray);
}

function selectTodayMode() {
  const todayOption = dom.selector.todayOption;

  todayOption.onclick = () => {
    const projInbox = document.querySelector('#default-project');
    
    projects.makeAllProjectsNonActive(projInbox);
    dom.makeNotesOptionNonActive(dom.selector.notesOption);
    dom.makeTodayOptionActive(todayOption);
    dom.clearpageItemContainer();
    displayValidTasks();
  };
}

export const today = {
  selectTodayMode,
};