import { dom } from './dom.js';
import { projects } from './projects.js';
import { tasks } from './tasks.js';
import { format, add } from 'date-fns';

function displayValidTasks() {
  let projectsArray = projects.projectsArray;
  const weekArray = [];
  const weekDateArray = [];

  for (let i = 0; i < 7; i++) {
    let weekDate = format(add(new Date(), {days: i}), 'yyyy-MM-dd');
    weekDateArray.push(weekDate);
  }
  
  projectsArray.forEach(project => {
    let tasksArray = project.projectArray;

    tasksArray.forEach(task => {
      weekDateArray.forEach(weekDate => {
        if (task.fullDate === weekDate) {
          weekArray.push(task);
        }
      });
    });
  })

  tasks.displayTask(weekArray);
}

function selectWeekMode() {
  const weekOption = dom.selector.weekOption;

  weekOption.onclick = () => {
    const projInbox = document.querySelector('#default-project');
    
    projects.makeAllProjectsNonActive(projInbox);
    dom.makeNotesOptionNonActive(dom.selector.notesOption);
    dom.makeTodayOptionNonActive(dom.selector.todayOption);
    dom.makeWeekOptionActive(weekOption);
    dom.clearpageItemContainer();
    displayValidTasks();
  };
}

export const week = {
  selectWeekMode,
};