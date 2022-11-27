import './style.css';
import { forms } from './modules/forms.js';
import { tasks } from './modules/tasks.js';
import { notes } from './modules/notes.js';
import { hamburger } from './modules/hamburger.js';
import { today } from './modules/today.js';
import { week } from './modules/week.js';

hamburger.toggle();
forms.formControl();
forms.setMinDateToToday();
tasks.addTask();
notes.createNote();
today.selectTodayMode();
week.selectWeekMode();