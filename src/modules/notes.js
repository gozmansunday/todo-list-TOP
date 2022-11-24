import { dom } from './dom.js';
import { projects } from './projects.js';
import { storage } from './storage.js';

// Notes Array
let notesArray = [];

// if (storage.getNotesArray() !== null) {
//   notesArray = storage.getNotesArray();
// } else {
//   notesArray = [];
// }

// Notes Obj Factory
function NoteObjCreator(title, note) {
  return {title, note};
}

function createNote(e) {
  dom.selector.newNoteFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Imported Form Input Values
    const noteTitle = dom.selector.newNoteTitle.value;
    const noteDetails = dom.selector.newNoteDetails.value;

    if (noteDetails === '') return;

    const noteObj = NoteObjCreator(noteTitle, noteDetails);

    notesArray.push(noteObj);
    console.log(notesArray);
  });
}

function selectNotesMode() {
  const notesOption = dom.selector.notesOption;

  notesOption.onclick = () => {
    const projInbox = document.querySelector('#default-project');
    projects.makeAllProjectsNonActive(projInbox);

    dom.makeNotesOptionActive(notesOption);
    dom.clearTaskContainer();
    // storage.updateProjectsArray(projects.projectsArray);
  };
}

export const notes = {
  createNote,
  selectNotesMode,
};