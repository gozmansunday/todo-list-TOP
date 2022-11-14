import { dom } from './dom.js';

function toggle() {
  const hamburger = dom.selector.hamburger;
  const sideBarOverlay = dom.selector.sideBarOverlay;

  hamburger.onclick = () => {
    dom.toggleDom();
  };

  sideBarOverlay.onclick = () => {
    dom.toggleDom();
  };
}

export const hamburger = {
  toggle,
};