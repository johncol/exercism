
const ALIVE = 1;
const DEAD = 0;

const NUM_OF_NEIGHBORS_TO_REMAIN_ALIVE = [2, 3];
const NUM_OF_NEIGHBORS_TO_BECOME_ALIVE = [3];

export class GameOfLife {
  constructor(cells) {
    this.cells = GameOfLife.#clone(cells);
    this.rows = this.cells.length;
    this.columns = this.cells[0]?.length ?? 0;
  }

  state() {
    return this.cells;
  }

  tick() {
    const nextState = GameOfLife.#clone(this.cells);

    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const cell = {
          value: this.cells[row][column],
          row,
          column,
        };

        const numOfNeighborsAlive = this.#numberOfNeighborsInState(cell, ALIVE);

        if (cell.value === ALIVE) {
          if (NUM_OF_NEIGHBORS_TO_REMAIN_ALIVE.includes(numOfNeighborsAlive)) {
            nextState[row][column] = ALIVE;
          } else {
            nextState[row][column] = DEAD;
          }
        } else {
          if (NUM_OF_NEIGHBORS_TO_BECOME_ALIVE.includes(numOfNeighborsAlive)) {
            nextState[row][column] = ALIVE;
          }
        }
      }
    }

    this.cells = nextState;
  }

  #numberOfNeighborsInState(cell, state) {
    let countNeighborsInState = 0;
    const { row, column } = cell;

    const previousRow = row - 1;
    const nextRow = row + 1;
    const previousColumn = column - 1;
    const nextColumn = column + 1;

    const neighborCells = [
      [previousRow, previousColumn],
      [previousRow, column],
      [previousRow, nextColumn],
      [row, previousColumn],
      [row, nextColumn],
      [nextRow, previousColumn],
      [nextRow, column],
      [nextRow, nextColumn],
    ];

    neighborCells.forEach(([row, column]) => {
      if (this.#cellExistsAndInState(row, column, state)) {
        countNeighborsInState++;
      }
    });

    return countNeighborsInState;
  }

  #cellExistsAndInState(row, column, state) {
    const cellValue = this.cells[row]?.[column];

    return cellValue === state;
  }

  static #clone(cells) {
    return JSON.parse(JSON.stringify(cells));
  }
}
