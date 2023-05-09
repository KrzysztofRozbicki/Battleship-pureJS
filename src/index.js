import { Battleship } from './battleship';

const SIZE = 10;
const wrapperEl = document.getElementById('app');
const startBtn = document.getElementById('start-btn');
const missedShotsEl = document.getElementById('missed');
const sinkedCorvetteEl = document.getElementById('corvette');
const sinkedFregateEl = document.getElementById('fregate');
const sinkedDestroyerEl = document.getElementById('destroyer');
const sinkedCruiserEl = document.getElementById('cruiser');

const DESTROYED = 0;
const MISS = 6;
const EMPTY = 7;

let missedHits = 0;
let sinkedCorvette = 0;
let sinkedFregate = 0;
let sinkedDestroyer = 0;
let sinkedCruiser = 0;

const battleship = new Battleship(SIZE);

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
    clickedCell.innerHTML = '🔥';
    clickedCell.classList.add('hit');
    battleship.board[x][y].size -= 1;
    if (battleship.board[x][y].size === 0) {
      ship.cells.forEach(cell => {
        const destroyedCell = document.querySelector(`[data-number="${cell}"]`);
        destroyedCell.innerHTML = '⚓';
        destroyedCell.classList.add('destroyed');
      });
      console.log(ship.cells.length);
      switch (ship.cells.length) {
        case 1:
          sinkedCorvette += 1;
          sinkedCorvetteEl.innerText = sinkedCorvette;
          break;
        case 2:
          sinkedFregate += 1;
          sinkedFregateEl.innerText = sinkedFregate;
          break;
        case 3:
          sinkedDestroyer += 1;
          sinkedDestroyerEl.innerText = sinkedDestroyer;
          break;
        case 4:
          sinkedCruiser += 1;
          sinkedCruiserEl.innerText = sinkedCruiser;
          break;
      }
    }
  }
  if (ship === EMPTY) {
    clickedCell.innerHTML = '⚫';
    clickedCell.classList.add('miss');
    battleship.board[x][y] = MISS;
    missedHits += 1;
    missedShotsEl.innerText = missedHits;
  }
});
