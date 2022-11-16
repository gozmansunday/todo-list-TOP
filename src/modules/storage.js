function updateLocalStore(projectsArray) {
  localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
}

function getLocalArray() {
  return JSON.parse(localStorage.getItem('projectsArray'));
}


export const storage = {
  updateLocalStore,
  getLocalArray,
};