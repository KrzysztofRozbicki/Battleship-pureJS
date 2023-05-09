import { Battleship } from './battleship';
import { showHit, showSinked, showMiss, youWin } from './assets/notify';

const SIZE = 10;
const wrapperEl = document.getElementById('app');
const startBtn = document.getElementById('start-btn');
// const missedShotsEl = document.getElementById('missed');
// const sinkedCorvetteEl = document.getElementById('corvette');
// const sinkedFregateEl = document.getElementById('fregate');
// const sinkedDestroyerEl = document.getElementById('destroyer');
// const sinkedCruiserEl = document.getElementById('cruiser');
const pointsEl = document.getElementById('points');

const DESTROYED = 0;
const MISS = 6;
const EMPTY = 7;
const CORVETTE_QTY = 4;
const FREGATE_QTY = 3;
const DESTROYER_QTY = 2;
const CRUISER_QTY = 1;

const POINTS_MISS = 10;
const POINTS_CORVETTE = 20;
const POINTS_FREGATE = 50;
const POINTS_DESTROYER = 100;
const POINTS_CRUISER = 200;

let points = 0;
let missedHits = 0;
let sinkedCorvette = 0;
let sinkedFregate = 0;
let sinkedDestroyer = 0;
let sinkedCruiser = 0;

const battleship = new Battleship(SIZE);

battleship.randomize(wrapperEl);

startBtn.addEventListener('click', () => {
  battleship.clearBoard(wrapperEl);
  battleship.randomize(wrapperEl);
});

wrapperEl.addEventListener('click', event => {
  const clickedCell = event.target;
  const x = +clickedCell.dataset.row;
  const y = +clickedCell.dataset.column;
  const ship = battleship.board[x][y];
  if (ship.size > DESTROYED && ship.size < MISS) {
    clickedCell.innerHTML = '<img src="./burning.afd00d93.gif" class="animation" />';
    if (ship.size > DESTROYED + 1) showHit();
    clickedCell.classList.add('hit');
    battleship.board[x][y].size -= 1;
    if (battleship.board[x][y].size === 0) {
      ship.cells.forEach(cell => {
        const destroyedCell = document.querySelector(`[data-number="${cell}"]`);
        destroyedCell.innerHTML =
          '<img src="./sinking.d9fee310.gif" class="animation" loop="false"/>';
        destroyedCell.classList.add('destroyed');
      });
      console.log(ship.cells.length);
      switch (ship.cells.length) {
        case 1:
          sinkedCorvette += 1;
          //   sinkedCorvetteEl.innerText = sinkedCorvette;
          showSinked('Corvette', POINTS_CORVETTE);
          points += POINTS_CORVETTE;
          break;
        case 2:
          sinkedFregate += 1;
          //   sinkedFregateEl.innerText = sinkedFregate;
          showSinked('Fregate', POINTS_FREGATE);
          points += POINTS_FREGATE;
          break;
        case 3:
          sinkedDestroyer += 1;
          //   sinkedDestroyerEl.innerText = sinkedDestroyer;
          showSinked('Destroyer', POINTS_DESTROYER);
          points += POINTS_DESTROYER;
          break;
        case 4:
          sinkedCruiser += 1;
          //   sinkedCruiserEl.innerText = sinkedCruiser;
          showSinked('Cruiser', POINTS_CRUISER);
          points += POINTS_CRUISER;
          break;
      }
      if (
        sinkedCruiser === CRUISER_QTY &&
        sinkedDestroyer === DESTROYER_QTY &&
        sinkedFregate === FREGATE_QTY &&
        sinkedCorvette === CORVETTE_QTY
      ) {
        console.log('YOU WIN!');
        youWin(points);
      }
    }
  }
  if (ship === EMPTY) {
    clickedCell.innerHTML = '⚫';
    clickedCell.classList.add('miss');
    battleship.board[x][y] = MISS;
    missedHits += 1;
    // missedShotsEl.innerText = missedHits;
    showMiss(POINTS_MISS);
    points -= POINTS_MISS;
  }
  pointsEl.innerText = points;
});