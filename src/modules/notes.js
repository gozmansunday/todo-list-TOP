import { dom } from './dom.js';
import { projects } from './projects.js';
import { storage } from './storage.js';

// Notes Array
let notesArray;

if (storage.getNotesArray() !== null) {
  notesArray = storage.getNotesArray();
} else {
  notesArray = [];
}

// Notes Obj Factory
function NoteObjCreator(title, details) {
  return {title, details};
}

function createNote(e) {
  selectNotesMode();
  
  dom.selector.newNoteFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Imported Form Input Values
    const noteTitle = dom.selector.newNoteTitle.value;
    const noteDetails = dom.selector.newNoteDetails.value;

    if (noteDetails === '') return;

    const noteObj = NoteObjCreator(noteTitle, noteDetails);

    notesArray.push(noteObj);
    storage.updateNotesArray(notesArray);
    displayNote();
    console.log(notesArray); //! DELETE LATER
  });
}

function displayNote() {
  dom.clearpageItemContainer();

  notesArray.forEach(note => {
    dom.createNoteDisplayDom(note);
  });

  deleteNote();
  editNote();
}

function deleteNote() {
  const trashs = document.querySelectorAll('.note-trash');

  [...trashs].forEach(trash => {
    trash.addEventListener('click', () => {
      dom.deleteNoteDom(trash, notesArray);
    });
  });
}

function editNote() {
  const edits = document.querySelectorAll('.note-edit');

  [...edits].forEach(edit => {
    edit.addEventListener('click', () => {
      dom.editNoteDom(edit, notesArray);
    });
  });
}

function selectNotesMode() {
  const notesOption = dom.selector.notesOption;

  notesOption.onclick = () => {
    const projInbox = document.querySelector('#default-project');
    projects.makeAllProjectsNonActive(projInbox);
    dom.makeTodayOptionNonActive(dom.selector.todayOption);

    dom.makeNotesOptionActive(notesOption);
    dom.clearpageItemContainer();
    displayNote();
    storage.updateNotesArray(notesArray);
  };
}

export const notes = {
  createNote,
  selectNotesMode,
};