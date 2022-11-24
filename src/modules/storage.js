function updateProjectsArray(projectsArray) {
  localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
}

function getProjectsArray() {
  return JSON.parse(localStorage.getItem('projectsArray'));
}

function updateNotesArray(notesArray) {
  localStorage.setItem('notesArray', JSON.stringify(notesArray));
}

function getNotesArray() {
  return JSON.parse(localStorage.getItem('notesArray'));
}

export const storage = {
  updateProjectsArray,
  getProjectsArray,
  updateNotesArray,
  getNotesArray,
};