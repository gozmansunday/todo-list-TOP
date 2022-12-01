import './style.css';
import forms from './modules/forms';
import tasks from './modules/tasks';
import notes from './modules/notes';
import hamburger from './modules/hamburger';
import today from './modules/today';
import week from './modules/week';

hamburger.toggle();
forms.formControl();
forms.setMinDateToToday();
tasks.addTask();
notes.createNote();
today.selectTodayMode();
week.selectWeekMode();
