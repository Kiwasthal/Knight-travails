import Board from './board';
import { getDataCell, getKnight, appendNewKnight } from './domStuff';

let animatePath = path => {
  if (Board.endingX === null || Board.startingX === null) return;
  let timecount = 0;
  let totalX = 0;
  let totalY = 0;
  let newCell;
  let appendKnight = (cell, timecount) => {
    setTimeout(() => {
      appendNewKnight(cell);
    }, timecount);
  };
  let animate = (timecount, totalX, totalY, cell, i) => {
    setTimeout(() => {
      getKnight().style.transform = `translateY(${totalX}px) translateX(${totalY}px)`;
      if (cell) {
        cell.style.backgroundColor = 'grey';
        cell.textContent = i + 1;
      }
    }, timecount);
  };
  for (let i = 0; i < path.length - 1; i++) {
    console.log('path :', path[i + 1][0], path[i + 1][1]);
    let animY =
      path[i][0] > path[i + 1][0]
        ? (path[i][0] - path[i + 1][0]) * 100
        : -Math.abs((path[i + 1][0] - path[i][0]) * 100);
    totalX += animY;
    animate(timecount, totalX, totalY);
    timecount += 301;

    let animX =
      path[i][1] > path[i + 1][1]
        ? -Math.abs((path[i][1] - path[i + 1][1]) * 100)
        : (path[i + 1][1] - path[i][1]) * 100;
    totalY += animX;
    newCell = getDataCell(path[i + 1][0], path[i + 1][1]);
    animate(timecount, totalX, totalY, newCell, i);
    timecount += 301;
  }
  // appendNewKnight(getDataCell(Board.startingX, Board.staringY), timecount);
  let newStarting = getDataCell(Board.startingX, Board.staringY);
  appendKnight(newStarting, timecount);
};

export default animatePath;
