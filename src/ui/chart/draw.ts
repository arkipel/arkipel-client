const draw = (canvas: HTMLCanvasElement, points: Point[]) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  let width = canvas.width;
  let height = canvas.height;

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

  // Round yMin and yMax
  let floor = Math.floor(yMin / 10) * 10;
  let ceil = Math.ceil(yMax / 10) * 10;

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

    if (i === 0) {
      ctx.moveTo(x, y);
    }

    ctx.lineTo(x, y);
  });

  ctx.stroke();
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
