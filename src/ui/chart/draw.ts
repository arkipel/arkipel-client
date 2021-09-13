import { DateTime } from 'luxon';

const draw = (canvas: HTMLCanvasElement, points: Point[]) => {
  let start = DateTime.now();

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  let width = canvas.width;
  let height = canvas.height;

  // console.log('width:', width, 'height', height);
  // console.log(`there are ${points.length} points`);
  // console.log('points', points);

  // ctx.moveTo(0, 0);
  // ctx.lineTo(width, height);
  // ctx.moveTo(width, 0);
  // ctx.lineTo(0, height);
  // ctx.stroke();

  // ctx.font = '48px serif';
  // ctx.fillText('Hello world!', 10, 50);
  // ctx.stroke();

  // Sort points
  points.sort((a, b) => {
    return b.x - a.x;
  });

  // Find min and max
  let xMin = 0;
  let xMax = 0;
  let yMin = 0;
  let yMax = 0;

  points.forEach((p) => {
    xMin = !xMin || p.x < xMin ? p.x : xMin;
    xMax = !xMax || p.x > xMax ? p.x : xMax;
    yMin = !yMin || p.y < yMin ? p.y : yMin;
    yMax = !yMax || p.y > yMax ? p.y : yMax;
  });

  // console.log('xMin =', xMin);
  // console.log('xMax =', xMax);
  // console.log('yMin =', yMin);
  // console.log('yMax =', yMax);

  // Round yMin and yMax
  let floor = Math.floor(yMin / 10) * 10;
  let ceil = Math.ceil(yMax / 10) * 10;

  // console.log('floor =', floor);
  // console.log('ceil =', ceil);

  if (floor === yMin) {
    floor -= 10;
  }

  if (ceil === yMax) {
    ceil += 10;
  }

  // Draw grid
  ctx.beginPath();
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;

  let numRows = 4;
  //let numRows = Math.floor((ceil - floor) / 10);

  for (let i = 1; i < numRows; i++) {
    ctx.moveTo(0, (height / numRows) * (numRows - i));

    if (i > 0) {
      let label = (floor + ((ceil - floor) / numRows) * i).toString();

      ctx.font = '12px serif';
      ctx.fillStyle = '#aaa';
      ctx.fillText(label, 2, (height / numRows) * (numRows - i) - 2);
    }

    ctx.lineTo(width, (height / numRows) * (numRows - i));
  }

  ctx.stroke();
  ctx.closePath();

  // Draw points
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#289486';

  points.forEach((p, i) => {
    let x = ((p.x - xMin) / (xMax - xMin)) * width;
    let y = height - ((p.y - floor) / (ceil - floor)) * height;

    // console.log('point:', p.x, p.y);
    // console.log('lineTo:', x, y);

    if (i === 0) {
      ctx.moveTo(x, y);
    }

    ctx.lineTo(x, y);
  });

  ctx.stroke();

  let end = DateTime.now();
  // console.log(`draw took ${end.toMillis() - start.toMillis()}ms`);
};

class Graph {
  constructor() {
    let pts = new Array<Point>();
    this.points = pts;
  }

  points: Point[] = new Array<Point>();
}

type Point = {
  x: number;
  y: number;
};

export { Graph, Point };
export default draw;
