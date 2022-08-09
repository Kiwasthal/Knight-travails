import Knight from '../knight.svg';
import Board from './board';
import animatePath from './animation';

//--Getters

let getBoardCells = () => {
  return document.querySelectorAll('.cell');
};

export let getKnight = () => {
  return document.querySelector('img');
};

export let getDataCell = (x, y) => {
  return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
};

//--Dom

const generateDOMboard = (board = Board.generate()) => {
  const boardContainer = document.querySelector('.board');
  for (let i = 0; i < board.length; i++) {
    let row = document.createElement('div');
    for (let y = 0; y < board[i].length; y++) {
      let cell = document.createElement('div');
      if (i % 2 === 0)
        y % 2 === 0 ? cell.classList.add('white') : cell.classList.add('black');
      else
        y % 2 === 0 ? cell.classList.add('black') : cell.classList.add('white');

      cell.dataset.originalColor = cell.classList;
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.column = y;
      cell.dataset.x = i;
      cell.dataset.y = y;

      row.appendChild(cell);
    }
    row.classList.add('row');
    boardContainer.appendChild(row);
  }
};

export let createKnight = () => {
  let knight = new Image();
  knight.src = Knight;
  return knight;
};

export let appendNewKnight = newCell => {
  let oc = getKnight().parentNode;
  oc.removeChild(getKnight());
  newCell.appendChild(createKnight());
};

let manualPlace = e => {
  clearKnight();
  let parent = getDataCell(e.target.dataset.x, e.target.dataset.y);
  parent.appendChild(createKnight());
  parent.style.backgroundColor = 'grey';
  Board.getStartingCoords(parent);
  Board.getPossibleMoves(Board.startingX, Board.staringY);
  getBoardCells().forEach(cell => {
    cell.removeEventListener('click', manualPlace);
  });
};

let placeKnight = () => {
  getBoardCells().forEach(cell => {
    cell.addEventListener('click', manualPlace);
  });
};

const clearKnight = () => {
  Board.resetBoard();
  getBoardCells().forEach(cell => {
    if (cell.style.backgroundColor === 'grey') {
      cell.textContent = '';
      cell.dataset.originalColor === 'white'
        ? (cell.style.backgroundColor = cell.dataset.originalColor)
        : (cell.style.backgroundColor = '#44403c');
    }
    if (cell.hasChildNodes()) cell.removeChild(getKnight());
  });
  if (getKnight()) {
    getKnight().style.transform = '';
  }
};

const createRandomKnight = (
  x = Math.floor(Math.random() * 8),
  y = Math.floor(Math.random() * 8)
) => {
  clearKnight();
  let randomCell = getDataCell(x, y);
  randomCell.appendChild(createKnight());
  randomCell.style.backgroundColor = 'grey';
  Board.getStartingCoords(randomCell);
  Board.getPossibleMoves(Board.startingX, Board.staringY);
};

let handleClick = e => {
  if (Board.checkValidEnd(e.target)) {
    Board.getEndingCoords(e.target);
    let endCell = getDataCell(e.target.dataset.x, e.target.dataset.y);
    endCell.style.backgroundColor = '#ef4444';
    getBoardCells().forEach(cell => {
      cell.removeEventListener('click', handleClick);
    });
  }
};

let handleRandom = () => {
  clearKnight();
  createRandomKnight();
};

let knightTravails = () => {
  animatePath(Board.findPath());
  Board.chainReset();
};

generateDOMboard();

let placeBtn = document.querySelector('.place');
let clearBtn = document.querySelector('.clear');
let randomBtn = document.querySelector('.random');
let selectEndBtn = document.querySelector('.selectEnd');
let startButton = document.querySelector('.start');

let selectEndCell = () => {
  getBoardCells().forEach(cell => {
    if (cell.style.backgroundColor === 'rgb(239, 68, 68)') {
      Board.resetEnd();
      cell.classList.contains('white')
        ? (cell.style.backgroundColor = 'white')
        : (cell.style.backgroundColor = '#44403c');
    }
    cell.addEventListener('click', handleClick);
  });
};

const eventListeners = {
  clearListener() {
    return clearBtn.addEventListener('click', clearKnight);
  },
  placeListener() {
    return placeBtn.addEventListener('click', placeKnight);
  },
  randomListener() {
    return randomBtn.addEventListener('click', handleRandom);
  },
  endListener() {
    return selectEndBtn.addEventListener('click', selectEndCell);
  },
  startListener() {
    return startButton.addEventListener('click', knightTravails);
  },
  applyListeners() {
    this.clearListener();
    this.randomListener();
    this.placeListener();
    this.endListener();
    this.startListener();
  },
};

export default eventListeners;
