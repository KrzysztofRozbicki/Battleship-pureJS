import { Battleship } from './battleship';

const SIZE = 10;
const wrapperEl = document.getElementById('app');
const startBtn = document.getElementById('start-btn');

const DESTROYED = 0;
const MISS = 6;
const EMPTY = 7;

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
  console.log(ship);
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
    }
  }
  if (ship === EMPTY) {
    clickedCell.innerHTML = '⚫';
    clickedCell.classList.add('miss');
    battleship.board[x][y] = MISS;
  }
});
