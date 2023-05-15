import burning from './assets/animation/burning.gif';
import sinking from './assets/animation/sinking.gif';

const createInnerHTML = (size, type) => {
  let innerHTML = '';
  for (let i = 0; i < size; i++) {
    innerHTML += `<img src="${type}" class="ships-to-sink" />`;
  }
  return innerHTML;
};

const createFigure = (size, amount, type) => {
  const elements = [];
  for (let i = 0; i < amount; i++) {
    const figure = document.createElement('figure');
    figure.classList.add('ships-type');
    figure.innerHTML = createInnerHTML(size, type);
    elements.push(figure);
  }
  return elements;
};

export const drawShip = (size, quantity, sinked) => {
  const elements = [];
  elements.push(...createFigure(size, quantity, burning));
  elements.push(...createFigure(size, sinked, sinking));
  return elements;
};
