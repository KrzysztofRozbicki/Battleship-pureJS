import { showHit, showSinked, showMiss, youWin } from './assets/notify';
import burning from './assets/animation/burning.gif';
import sinking from './assets/animation/sinking.gif';
import { drawShip } from './drawShips';

const cruiserEl = document.getElementById('cruiser-left');
const destroyerEl = document.getElementById('destroyer-left');
const fregateEl = document.getElementById('fregate-left');
const corvetteEl = document.getElementById('corvette-left');

export class Battleship {
  #size;
  #max;
  #board;
  #shipsSpace = [];
  #points = 0;
  #DESTROYED = 0;
  #MISS = 6;
  #EMPTY = 7;
  #corvette;
  #corvetteQuantity = 4;
  #CORVETTE_SIZE = 1;
  #POINTS_CORVETTE = 20;
  #fregate;
  #fregateQuantity = 3;
  #FREGATE_SIZE = 2;
  #POINTS_FREGATE = 50;
  #destroyer;
  #destroyerQuantity = 2;
  #DESTROYER_SIZE = 3;
  #POINTS_DESTROYER = 100;
  #cruiser;
  #cruiserQuantity = 1;
  #CRUISER_SIZE = 4;
  #POINTS_CRUISER = 200;

  #POINTS_MISS = 10;

  #createShips() {
    this.#corvette = {
      name: 'corvette',
      size: this.#CORVETTE_SIZE,
      quantity: this.#corvetteQuantity,
      sinked: 0,
      points: this.#POINTS_CORVETTE,
      element: corvetteEl,
    };

    this.#fregate = {
      name: 'fregate',
      size: this.#FREGATE_SIZE,
      quantity: this.#fregateQuantity,
      sinked: 0,
      points: this.#POINTS_FREGATE,
      element: fregateEl,
    };

    this.#destroyer = {
      name: 'destroyer',
      size: this.#DESTROYER_SIZE,
      quantity: this.#destroyerQuantity,
      sinked: 0,
      points: this.#POINTS_DESTROYER,
      element: destroyerEl,
    };

    this.#cruiser = {
      name: 'cruiser',
      size: this.#CRUISER_SIZE,
      quantity: this.#cruiserQuantity,
      sinked: 0,
      points: this.#POINTS_CRUISER,
      element: cruiserEl,
    };
  }

  #resetGame() {
    this.#points = 0;
    this.#createShips();
  }
  updatePoints(pointsContainer) {
    pointsContainer.innerText = this.#points;
  }

  #sinkShip(ship) {
    ship.quantity -= 1;
    ship.sinked += 1;
    this.#points += ship.points;
    showSinked(ship.name, ship.points);
    this.#showShip(ship);
  }

  #createBoardArray() {
    this.#board = new Array(this.#size)
      .fill(this.#EMPTY)
      .map(() => new Array(this.#size).fill(this.#EMPTY));
  }

  getShip(x, y) {
    return this.#board[x][y];
  }
  get points() {
    return this.#points;
  }

  shipHit(cell, x, y) {
    const ship = this.#board[x][y];
    cell.innerHTML = `<img src="${burning}" class="animation" />`;
    if (ship.size > this.#DESTROYED + 1) showHit();
    cell.classList.add('hit');
    this.#board[x][y].size -= 1;
    if (this.#board[x][y].size === 0) {
      ship.cells.forEach(cell => {
        const destroyedCell = document.querySelector(`[data-number="${cell}"]`);
        destroyedCell.innerHTML = `<img src="${sinking}" class="animation"/>`;
        destroyedCell.classList.add('destroyed');
      });
      switch (ship.cells.length) {
        case 1:
          this.#sinkShip(this.#corvette);
          break;
        case 2:
          this.#sinkShip(this.#fregate);
          break;
        case 3:
          this.#sinkShip(this.#destroyer);
          break;
        case 4:
          this.#sinkShip(this.#cruiser);
          break;
      }
      if (
        this.#cruiser.quantity === 0 &&
        this.#destroyer.quantity === 0 &&
        this.#fregate.quantity === 0 &&
        this.#corvette.quantity === 0
      ) {
        youWin(this.#points);
      }
    }
  }

  shipMiss(cell, x, y) {
    cell.innerHTML = '⚫';
    cell.classList.add('miss');
    this.#board[x][y] = this.#MISS;
    showMiss(this.#POINTS_MISS);
    this.#points -= this.#POINTS_MISS;
  }

  constructor(size) {
    this.#size = size;
    this.#max = size * size - 1;
    this.#createBoardArray();
  }

  randomNumber() {
    return Math.floor(Math.random() * (this.#max - 0) + 0);
  }

  #placeShip(number, ship) {
    const x = Math.floor(number / this.#size);
    const y = number % this.#size;
    this.#board[x][y] = ship;
    ship.cells.push([number]);
    const shipSpace = [
      number,
      number - 1,
      number + 1,
      number - this.#size,
      number + this.#size,
      number - this.#size + 1,
      number + this.#size + 1,
      number - this.#size - 1,
      number + this.#size - 1,
    ];
    shipSpace.forEach(number => {
      if (!this.#shipsSpace.includes(number)) {
        this.#shipsSpace.push(number);
      }
    });
  }

  #placeRandomShip(size) {
    const number = this.randomNumber();
    const direction = this.#getShipDirection(number, size);
    if (this.#shipsSpace.includes(number) || direction === false) {
      return this.#placeRandomShip(size);
    }
    const ship = {
      id: number,
      size: size,
      cells: [],
    };
    switch (direction) {
      case 'left':
        for (let i = 0; i < size; i++) {
          this.#placeShip(number - i, ship);
        }
        break;
      case 'right':
        for (let i = 0; i < size; i++) {
          this.#placeShip(number + i, ship);
        }
        break;
      case 'up':
        for (let i = 0; i < size; i++) {
          this.#placeShip(number - this.#size * i, ship);
        }
        break;
      case 'down':
        for (let i = 0; i < size; i++) {
          this.#placeShip(number + this.#size * i, ship);
        }
        break;
    }
  }

  randomize(container) {
    this.#placeRandomShip(4);
    this.#placeRandomShip(3);
    this.#placeRandomShip(3);
    this.#placeRandomShip(2);
    this.#placeRandomShip(2);
    this.#placeRandomShip(2);
    this.#placeRandomShip(1);
    this.#placeRandomShip(1);
    this.#placeRandomShip(1);
    this.#placeRandomShip(1);
    this.#drawBoard(container);
  }

  resetBoard(container, pointsContainer) {
    this.#resetGame();
    container.innerHTML = '';
    this.updatePoints(pointsContainer);
    this.#shipsSpace = [];
    this.#createBoardArray();
    this.randomize(container);
  }

  #drawBoard(container) {
    this.#board.forEach((row, rowIndex) => {
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');
      container.appendChild(rowEl);
      row.forEach((column, columnIndex) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        rowEl.appendChild(cell);
        cell.dataset.row = rowIndex;
        cell.dataset.column = columnIndex;
        cell.dataset.number = rowIndex * 10 + columnIndex;
      });
    });
    this.#showShip(this.#corvette);
    this.#showShip(this.#fregate);
    this.#showShip(this.#destroyer);
    this.#showShip(this.#cruiser);
  }

  #showShip(ship) {
    ship.element.innerHTML = '';
    ship.element.append(...drawShip(ship.size, ship.quantity, ship.sinked));
  }

  #getShipDirection(number, size) {
    const directionNumber = this.randomNumber(3);
    let direction = '';
    let limit = 0;
    let newShipNumbers = [];
    let bool = true;
    switch (directionNumber) {
      case 0:
        direction = 'left';
        break;
      case 1:
        direction = 'up';
        break;
      case 2:
        direction = 'right';
        break;
      case 3:
        direction = 'down';
        break;
    }
    switch (direction) {
      case 'left':
        limit = (number % this.#size) - size;
        for (let i = 0; i < size; i++) {
          newShipNumbers.push(number - i);
        }
        break;
      case 'right':
        limit = (number % this.#size) + size;
        for (let i = 0; i < size; i++) {
          newShipNumbers.push(number + i);
        }
        break;
      case 'up':
        limit = Math.floor(number / this.#size) - size;
        for (let i = 0; i < size; i++) {
          newShipNumbers.push(number - this.#size * i);
        }
        break;
      case 'down':
        limit = Math.floor(number / this.#size) + size;
        for (let i = 0; i < size; i++) {
          newShipNumbers.push(number + this.#size * i);
        }
        break;
    }
    newShipNumbers.forEach(number => {
      if (this.#shipsSpace.includes(number)) {
        direction = false;
      }
    });
    if (limit > 0 && limit <= this.#size) {
      return direction;
    } else {
      return false;
    }
  }
}

/* 
0 - destroyed
1 - oneShip
2 - twoShip
3 - threeShip
4 - fourShip
6 - miss
7 - empty
*/
