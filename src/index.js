import { Battleship } from './battleship';

const SIZE = 10;
const wrapperEl = document.getElementById('app');
const startBtn = document.getElementById('start-btn');
const pointsEl = document.getElementById('points');

const DESTROYED = 0;
const MISS = 6;
const EMPTY = 7;

const battleship = new Battleship(SIZE);

battleship.resetBoard(wrapperEl, pointsEl);

startBtn.addEventListener('click', () => {
  battleship.resetBoard(wrapperEl, pointsEl);
});

wrapperEl.addEventListener('click', event => {
  const clickedCell = event.target;
  const x = +clickedCell.dataset.row;
  const y = +clickedCell.dataset.column;
  const ship = battleship.getShip(x, y);

  if (ship.size > DESTROYED && ship.size < MISS) {
    battleship.shipHit(clickedCell, x, y);
    ///// WSZYSTKO PONIŻEJ TRZEBA PRZENIEŚĆ DO KLASY
  }
  if (ship === EMPTY) {
    battleship.shipMiss(clickedCell, x, y);
  }
  battleship.updatePoints(pointsEl);
});
