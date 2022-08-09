import { getDataCell, getKnight } from './domStuff';

let animatePath = path => {
  let timecount = 0;
  let totalX = 0;
  let totalY = 0;
  let newCell;
  let animate = (timecount, totalX, totalY, cell) => {
    setTimeout(() => {
      getKnight().style.transform = `translateY(${totalX}px) translateX(${totalY}px)`;
      if (cell) cell.style.backgroundColor = 'grey';
    }, timecount);
  };
  for (let i = 0; i < path.length; i++) {
    console.log('path', path[i + 1][0], path[i + 1][1]);
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
    animate(timecount, totalX, totalY, newCell);
    timecount += 301;
  }
};

export default animatePath;
