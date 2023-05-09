export class Battleship {
  size;
  max;

  empty = 7;

  constructor(size) {
    this.size = size;
    this.max = size * size - 1;
    this.board = new Array(this.size)
      .fill(this.empty)
      .map(() => new Array(this.size).fill(this.empty));
  }

  randomNumber() {
    return Math.floor(Math.random() * (this.max - 0) + 0);
  }

  shipsSpace = [];

  placeShip(number, ship) {
    const x = Math.floor(number / this.size);
    const y = number % this.size;
    this.board[x][y] = ship;
    ship.cells.push([number]);
    const shipSpace = [
      number,
      number - 1,
      number + 1,
      number - this.size,
      number + this.size,
      number - this.size + 1,
      number + this.size + 1,
      number - this.size - 1,
      number + this.size - 1,
    ];
    shipSpace.forEach(number => {
      if (!this.shipsSpace.includes(number)) {
        this.shipsSpace.push(number);
      }
    });
  }

  randomShip(size) {
    const number = this.randomNumber();
    const direction = this.checkLimit(number, size);
    if (this.shipsSpace.includes(number) || direction === false) {
      return this.randomShip(size);
    }
    const ship = {
      id: number,
      size: size,
      cells: [],
    };
    switch (direction) {
      case 'left':
        for (let i = 0; i < size; i++) {
          this.placeShip(number - i, ship);
        }
        break;
      case 'right':
        for (let i = 0; i < size; i++) {
          this.placeShip(number + i, ship);
        }
        break;
      case 'up':
        for (let i = 0; i < size; i++) {
          this.placeShip(number - this.size * i, ship);
        }
        break;
      case 'down':
        for (let i = 0; i < size; i++) {
          this.placeShip(number + this.size * i, ship);
        }
        break;
    }
  }

  randomize(container) {
    this.randomShip(4);
    this.randomShip(3);
    this.randomShip(3);
    this.randomShip(2);
    this.randomShip(2);
    this.randomShip(2);
    this.randomShip(1);
    this.randomShip(1);
    this.randomShip(1);
    this.randomShip(1);
    this.drawBoard(container);
  }

  clearBoard(container) {
    container.innerHTML = '';
    this.shipsSpace = [];
    this.board = new Array(this.size)
      .fill(this.empty)
      .map(() => new Array(this.size).fill(this.empty));
  }

  drawBoard(container) {
    this.board.forEach((row, rowIndex) => {
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
  }

  checkLimit(number, size) {
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
        limit = (number % this.size) - size;
        for (let i = 0; i < size; i++) {
          newShipNumbers.push(number - i);
        }
        break;
      case 'right':
        limit = (number % this.size) + size;
        for (let i = 0; i < size; i++) {
          newShipNumbers.push(number + i);
        }
        break;
      case 'up':
        limit = Math.floor(number / this.size) - size;
        for (let i = 0; i < size; i++) {
          newShipNumbers.push(number - this.size * i);
        }
        break;
      case 'down':
        limit = Math.floor(number / this.size) + size;
        for (let i = 0; i < size; i++) {
          newShipNumbers.push(number + this.size * i);
        }
        break;
    }
    newShipNumbers.forEach(number => {
      if (this.shipsSpace.includes(number)) {
        direction = false;
      }
    });
    if (limit > 0 && limit <= this.size) {
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
5 - hit
6 - miss
7 - empty
*/
