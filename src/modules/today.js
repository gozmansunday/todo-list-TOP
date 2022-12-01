import { format } from 'date-fns';
import dom from './dom';
import projects from './projects';
import tasks from './tasks';

function displayValidTasks() {
  const { projectsArray } = projects;
  const todayArray = [];
  const todayDate = format(new Date(), 'yyyy-MM-dd');

  projectsArray.forEach((project) => {
    const tasksArray = project.projectArray;

    tasksArray.forEach((task) => {
      if (task.fullDate === todayDate) {
        todayArray.push(task);
      }
    });
  });

  tasks.displayTask(todayArray);
}

function selectTodayMode() {
  const { todayOption } = dom.selector;

  todayOption.onclick = () => {
    const projInbox = document.querySelector('#default-project');

    projects.makeAllProjectsNonActive(projInbox);
    dom.makeNotesOptionNonActive(dom.selector.notesOption);
    dom.makeWeekOptionNonActive(dom.selector.weekOption);
    dom.makeTodayOptionActive(todayOption);
    dom.clearpageItemContainer();
    displayValidTasks();
  };
}

const today = {
  selectTodayMode,
};

export default today;
