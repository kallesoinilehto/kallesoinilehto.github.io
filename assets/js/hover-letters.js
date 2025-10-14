const span = (text, index) => {
  const node = document.createElement('span');
  node.textContent = text;
  node.style.setProperty('--index', index);
  return node;
};

const byLetter = text => [...text].map(span);

// const {matches:motionOK} = window.matchMedia('(prefers-reduced-motion:no-preference)');

if (motionOK) {
  const splitTargets = document.querySelectorAll('[split-by]');
  splitTargets.forEach(node => {
    const chars = node.textContent.split('');
    node.textContent = '';
    chars.forEach((char, i) => {
      node.appendChild(span(char, i));
    });
  });
}
