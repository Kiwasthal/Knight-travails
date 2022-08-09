import { getDataCell } from './domStuff';

const Board = {
  startingX: null,
  staringY: null,
  endingX: null,
  endingY: null,
  possibleX: [2, 1, -1, -2, -2, -1, 1, 2],
  possibleY: [1, 2, 2, 1, -1, -2, -2, -1],
  board: {},
  movesq: [],
  prev: [...Array(8)].map(() => Array(8).fill(0)),
  generate() {
    return [...Array(8)].map(() => Array(8).fill(''));
  },
  getStartingCoords(cell) {
    this.startingX = parseInt(cell.dataset.x);
    this.staringY = parseInt(cell.dataset.y);
    this.movesq = [];
    this.movesq.push([this.startingX, this.staringY]);
    this.board[JSON.stringify([this.startingX, this.staringY])] = 1;
  },
  getEndingCoords(cell) {
    this.endingX = parseInt(cell.dataset.x);
    this.endingY = parseInt(cell.dataset.y);
  },
  checkValidEnd(cell) {
    if (typeof cell.dataset.x === 'undefined') return false;
    return true;
  },
  getPossibleMoves(x, y, possibleMoves = []) {
    for (let i = 0; i < 8; i++) {
      let newX = x + this.possibleX[i];
      let newY = y + this.possibleY[i];
      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        possibleMoves.push([newX, newY]);
      }
    }
    return possibleMoves;
  },
  findPath(queue = this.movesq) {
    if (this.endingX === null || this.startingX === null) return;
    while (queue.length) {
      const location = queue.shift();
      if (location[0] === this.endingX && location[1] === this.endingY) break;
      const moves = this.getPossibleMoves(location[0], location[1]);
      moves.forEach(move => {
        if (this.board[JSON.stringify(move)]) return;
        queue.push(move);
        this.board[JSON.stringify(move)] = 1;
        this.prev[move[0]][move[1]] = [location[0], location[1]];
      });
    }
    let path = [];
    let curLocation = [this.endingX, this.endingY];
    while (
      curLocation[0] !== this.startingX ||
      curLocation[1] !== this.staringY
    ) {
      path.unshift(curLocation);
      curLocation = this.prev[curLocation[0]][curLocation[1]];
    }
    path.unshift([this.startingX, this.staringY]);

    //Setting new starting pos
    this.getStartingCoords(
      getDataCell(path[path.length - 1][0], path[path.length - 1][1])
    );
    return path;
  },

  //-- Helpers
  resetBoard() {
    this.startingX = null;
    this.staringY = null;
    this.endingX = null;
    this.endingY = null;
    this.board = {};
    this.movesq = [];
    this.prev = [...Array(8)].map(() => Array(8).fill(0));
  },
  chainReset() {
    this.prev = [...Array(8)].map(() => Array(8).fill(0));
    this.board = {};
  },
  resetEnd() {
    this.endingX = null;
    this.endingY = null;
  },
};

export default Board;
