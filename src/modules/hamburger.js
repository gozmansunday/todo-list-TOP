import { dom } from './dom.js';

function toggle() {
  const hamburger = dom.selector.hamburger;
  const sideBar = dom.selector.sideBar;
  const sideBarOverlay = dom.selector.sideBarOverlay;

  hamburger.onclick = () => {
    hamburger.classList.toggle('active');

    // Side Bar Overlay
    sideBarOverlay.classList.toggle('hidden');

    // Side Bar
    sideBar.classList.toggle('-translate-x-full');
    sideBar.classList.toggle('translate-x-0');

    if (sideBar.classList.contains('animate-show-side-bar') || sideBar.classList.contains('animate-hide-side-bar')) {
      sideBar.classList.toggle('animate-hide-side-bar');
    }

    sideBar.classList.toggle('animate-show-side-bar');
  };
}

export const hamburger = {
  toggle,
};