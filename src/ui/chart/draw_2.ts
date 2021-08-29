const draw = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  let width = canvas.width;
  let height = canvas.height;

  console.log('width:', width, 'height', height);

  // Fake data
  data.forEach((point, i) => {
    let previous = 100;
    if (i > 0) {
      previous = data[i - 1].y;
    }

    point.y = previous * (1 + Math.random() / 10 - 0.04);
  });

  // Points
  let points: any = [];
  data.forEach((point, i) => {
    points.push({
      x: point.x,
      y: point.y,
    });
  });

  // Consolidate as necessary
  // TODO

  // Calculate min and max
  let min = 999 * 999;
  let max = 0;

  points.forEach((point: any, i: any) => {
    if (point.y < min) {
      min = point.y;
    }

    if (point.y > max) {
      max = point.y;
    }
  });

  min = min * 0.98;
  if (min < 0) {
    min = 0;
  }
  max = max * 1.02;

  // console.log(`Min: ${min}, Max: ${max}`);

  // Draw labels
  points.forEach((point: any, i: any) => {
    if (i > 0) {
      let t = width / (points.length - 1);
      ctx.translate(t, 0);
    }

    let x = 0;
    let yScale = height / (max - min);
    let y = height + min * yScale - point.y * yScale;

    if (i === 0) {
      ctx.moveTo(x, y);
    }

    if (i >= points.length - 1) {
      return;
    }

    // Print label
    if (i % 10 === 0) {
      ctx.font = '24px serif';
      let label = formatDate(point.x);
      ctx.fillText(label, x - 30, height - 10);
    }
  });

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Draw grid (vertical lines)
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ddd';

  points.forEach((point: any, i: any) => {
    if (i > 0) {
      let t = width / (points.length - 1);
      ctx.translate(t, 0);
    }

    let x = 0;
    let yScale = height / (max - min);
    let y = height + min * yScale - point.y * yScale;

    if (i === 0) {
      ctx.moveTo(x, y);
    }

    if (i >= points.length - 1) {
      return;
    }

    if (i === 0 || i % 10 !== 0) {
      return;
    }

    ctx.moveTo(0, height);
    ctx.lineTo(0, 0);
  });

  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.closePath();

  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.closePath();

  // Draw line
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#289486';

  points.forEach((point: any, i: any) => {
    if (i > 0) {
      let t = width / (points.length - 1);
      ctx.translate(t, 0);
      // console.log(`Canvas translates ${t}px to the right`);
    }

    let x = 0;
    let yScale = height / (max - min);
    let y = height + min * yScale - point.y * yScale;

    if (i === 0) {
      ctx.moveTo(x, y);
    }

    // console.log(`Line moves to ${x}, ${y}`);

    ctx.lineTo(x, y);
  });

  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.closePath();
};

const data = [
  { x: new Date('2021-06-26T18:00:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:01:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:02:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:03:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:04:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:05:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:06:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:07:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:08:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:09:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:10:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:11:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:12:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:13:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:14:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:15:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:16:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:17:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:18:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:19:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:20:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:21:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:22:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:23:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:24:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:25:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:26:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:27:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:28:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:29:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:30:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:31:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:32:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:33:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:34:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:35:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:36:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:37:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:38:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:39:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:40:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:41:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:42:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:43:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:44:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:45:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:46:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:47:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:48:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:49:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:50:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:51:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:52:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:53:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:54:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:55:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:56:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:57:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:58:00+00:00'), y: 0 },
  { x: new Date('2021-06-26T18:59:00+00:00'), y: 0 },
];

const formatDate = (d: Date) => {
  // let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let hour = d.getHours();
  let min = d.getMinutes();
  // let sec = d.getSeconds();

  // let yearStr = String(year);
  let monthStr = String(month);
  let dayStr = String(day);
  let hourStr = String(hour);
  let minStr = String(min);
  // let secStr = String(sec);

  if (month < 10) {
    monthStr = '0' + month;
  }

  if (day < 10) {
    dayStr = '0' + day;
  }

  if (hour < 10) {
    hourStr = '0' + hour;
  }

  if (min < 10) {
    minStr = '0' + min;
  }

  return `${hourStr}:${minStr}`;
  // return d;
};

export default draw;
