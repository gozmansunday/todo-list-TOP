import dom from './dom';
import projects from './projects';
import storage from './storage';

// Notes Array
let notesArray;

if (storage.getNotesArray() !== null) {
  notesArray = storage.getNotesArray();
} else {
  notesArray = [];
}

// Notes Obj Factory
function NoteObjCreator(title, details) {
  return { title, details };
}

function deleteNote() {
  const trashs = document.querySelectorAll('.note-trash');

  [...trashs].forEach((trash) => {
    trash.addEventListener('click', () => {
      dom.deleteNoteDom(trash, notesArray);
    });
  });
}

function editNote() {
  const edits = document.querySelectorAll('.note-edit');

  [...edits].forEach((edit) => {
    edit.addEventListener('click', () => {
      dom.editNoteDom(edit, notesArray);
    });
  });
}

function displayNote() {
  dom.clearpageItemContainer();

  notesArray.forEach((note) => {
    dom.createNoteDisplayDom(note);
  });

  deleteNote();
  editNote();
}

function selectNotesMode() {
  const { notesOption } = dom.selector;

  notesOption.onclick = () => {
    const projInbox = document.querySelector('#default-project');
    projects.makeAllProjectsNonActive(projInbox);
    dom.makeTodayOptionNonActive(dom.selector.todayOption);
    dom.makeWeekOptionNonActive(dom.selector.weekOption);

    dom.makeNotesOptionActive(notesOption);
    dom.clearpageItemContainer();
    displayNote();
    storage.updateNotesArray(notesArray);
  };
}

function createNote() {
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
    dom.selector.newNoteForm.reset();
    dom.formDom(dom.selector.newNoteForm);
  });
}

const notes = {
  createNote,
  selectNotesMode,
};

export default notes;
