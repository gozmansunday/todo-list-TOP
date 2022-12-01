import dom from './dom';

function toggle() {
  const { hamburger } = dom.selector;
  const { sideBarOverlay } = dom.selector;

  hamburger.onclick = () => {
    dom.toggleDom();
  };

  sideBarOverlay.onclick = () => {
    dom.toggleDom();
  };
}

const hamburger = {
  toggle,
};

export default hamburger;
