import { Battleship } from './battleship';
import highScore from './highScore.json';

const SIZE = 10;
const wrapperEl = document.getElementById('app');
const startBtn = document.getElementById('start-btn');
const pointsEl = document.getElementById('points');
const postBtn = document.getElementById('post-btn');

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
  }
  if (ship === EMPTY) {
    battleship.shipMiss(clickedCell, x, y);
  }
  battleship.updatePoints(pointsEl);
});

postBtn.addEventListener('click', () => {
  fetch('http://localhost:1234/highScore.json')
    .then(res => res.json())
    .then(console.log);
});
