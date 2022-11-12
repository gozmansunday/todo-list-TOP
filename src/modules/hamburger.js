import { dom } from './dom.js';

function toggle() {
  const hamburger = dom.selector.hamburger;
  const sideBarOverlay = dom.selector.sideBarOverlay;
  const sideBar = dom.selector.sideBar;

  hamburger.onclick = () => {
    hamburger.classList.toggle('active');
    sideBar.classList.remove('side-bar-show');
    sideBar.classList.remove('side-bar-hide');
    sideBar.classList.remove('-translate-x-full');
    sideBar.classList.remove('translate-x-0');

    if ((hamburger.classList.contains('active'))) {
      sideBarOverlay.classList.toggle('hidden');
      sideBar.classList.toggle('side-bar-show');
    }

    if (!(hamburger.classList.contains('active'))) {
      sideBar.classList.toggle('side-bar-hide');
      // sideBar.classList.add('-translate-x-full');
      sideBarOverlay.classList.toggle('hidden');
    }

  //   if ((hamburger.classList.contains('active'))) {
  //     if (!(sideBar.classList.contains('side-bar-show')) && !(sideBar.classList.contains('side-bar-hide'))) {
  //       sideBarOverlay.classList.toggle('hidden');
  //       sideBar.classList.toggle('-translate-x-full');
  //       sideBar.classList.toggle('side-bar-show');
  //     }
      
  //     if ((sideBar.classList.contains('side-bar-hide'))) {
  //       sideBarOverlay.classList.toggle('hidden');
  //       sideBar.classList.toggle('-translate-x-full');
  //       sideBar.classList.toggle('translate-x-0');
  //       sideBar.classList.toggle('side-bar-hide');
  //       sideBar.classList.toggle('side-bar-show');
  //     }
  //   } else {
  //     sideBar.classList.toggle('side-bar-show');
  //     sideBar.classList.toggle('side-bar-hide');
  //     sideBarOverlay.classList.toggle('hidden');
  //     sideBar.classList.toggle('-translate-x-full');
  //     sideBar.classList.toggle('translate-x-0');
  //   }
  };
}

// function toggleSideBar(hamburger) {

// }

export const hamburger = {
  toggle,
};