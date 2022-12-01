import { format, add } from 'date-fns';
import dom from './dom';
import projects from './projects';
import tasks from './tasks';

function displayValidTasks() {
  const { projectsArray } = projects;
  const weekArray = [];
  const weekDateArray = [];

  for (let i = 0; i < 7; i += 1) {
    const weekDate = format(add(new Date(), { days: i }), 'yyyy-MM-dd');
    weekDateArray.push(weekDate);
  }

  projectsArray.forEach((project) => {
    const tasksArray = project.projectArray;

    tasksArray.forEach((task) => {
      weekDateArray.forEach((weekDate) => {
        if (task.fullDate === weekDate) {
          weekArray.push(task);
        }
      });
    });
  });

  tasks.displayTask(weekArray);
}

function selectWeekMode() {
  const { weekOption } = dom.selector;

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

const week = {
  selectWeekMode,
};

export default week;
