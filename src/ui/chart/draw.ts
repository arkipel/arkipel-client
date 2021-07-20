const draw = (canvas: HTMLCanvasElement) => {
  // const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  // ctx.rotate(-10);

  let width = 1600;
  let height = 800;

  // Fake data
  data.forEach((point, i) => {
    let previous = 100;
    if (i > 0) {
      previous = data[i - 1].y;
    }

    point.y = previous * (1 + Math.random() / 10 - 0.04);
  });

  // Points
  let points: any[] = [];
  data.forEach((point) => {
    points.push({
      x: point.x,
      y: point.y,
    });
  });

  // Consolidate as necessary
  // TODO

  // Calculate x-min and x-max
  let xMin = 0;
  let xMax = 0;

  points.forEach((point, i) => {
    if (point.x < xMin || xMin === 0) {
      xMin = point.x;
    }

    if (point.x > xMax || xMax === 0) {
      xMax = point.x;
    }
  });

  console.log(`xMin: ${xMin}, xMax: ${xMax}`);

  // Calculate y-min and y-max
  let yMin = 999 * 999;
  let yMax = 0;

  points.forEach((point, i) => {
    if (point.y < yMin) {
      yMin = point.y;
    }

    if (point.y > yMax) {
      yMax = point.y;
    }
  });

  yMin = yMin * 0.98;
  if (yMin < 0) {
    yMin = 0;
  }
  yMax = yMax * 1.02;

  console.log(`yMin: ${yMin}, yMax: ${yMax}`);

  // Draw labels
  points.forEach((point, i) => {
    // ctx.beginPath();
    // ctx.lineWidth = 4;
    // ctx.strokeStyle = 'red';

    if (i > 0) {
      let t = width / (points.length - 1);
      ctx.translate(t, 0);
      // console.log(`Canvas translates ${t}px to the right`);
    }

    let x = 0;
    let yScale = height / (yMax - yMin);
    let y = height + yMin * yScale - point.y * yScale;

    if (i === 0) {
      ctx.moveTo(x, y);
    }

    // console.log(`Line moves to ${x}, ${y}`);

    // ctx.lineTo(x, y)

    if (i >= points.length - 1) {
      return;
    }

    // ctx.stroke();
    // ctx.closePath();

    // Print label
    if (i % 10 === 0) {
      ctx.font = '24px serif';
      // ctx.translate(-200, 20);
      // ctx.rotate(50);
      let label = formatDate(point.x);
      ctx.fillText(label, x + 2, height - 2);
      // ctx.rotate(-50);
      // ctx.translate(200, -20);

      // Draw vertical line

      // ctx.save();
      // ctx.beginPath();
      // ctx.lineWidth = 20;
      // ctx.strokeStyle = 'blue';
      // ctx.moveTo(0, height);
      // ctx.lineTo(0, 0);
      // ctx.stroke();
      // ctx.restore();

      // ctx.moveTo(x, y);
    }
  });

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Draw grid (vertical lines)
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ddd';

  points.forEach((point, i) => {
    // ctx.beginPath();
    // ctx.lineWidth = 4;
    // ctx.strokeStyle = 'red';

    if (i > 0) {
      let t = width / (points.length - 1);
      ctx.translate(t, 0);
      // console.log(`Canvas translates ${t}px to the right`);
    }

    let x = 0;
    let yScale = height / (yMax - yMin);
    let y = height + yMin * yScale - point.y * yScale;

    if (i === 0) {
      ctx.moveTo(x, y);
    }

    // console.log(`Line moves to ${x}, ${y}`);

    // ctx.lineTo(x, y)

    if (i >= points.length - 1) {
      return;
    }

    if (i === 0 || i % 10 !== 0) {
      return;
    }

    // ctx.stroke();
    // ctx.closePath();

    // Print label
    // if (i % 10 === 0) {
    // ctx.font = '24px serif';
    // ctx.translate(-200, 20);
    // ctx.rotate(50);
    // let label = formatDate(point.x);
    // ctx.fillText(label, x - 20, height - 10);
    // ctx.rotate(-50);
    // ctx.translate(200, -20);

    // Draw vertical line

    // ctx.save();
    // ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, 0);
    // ctx.restore();

    // ctx.moveTo(x, y);
    // }
  });

  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.closePath();
  // ctx.lineTo(200, 175);
  // ctx.lineTo(200, 125);

  // Draw grid (horizontal lines)
  // ctx.beginPath();
  // ctx.lineWidth = 2;
  // ctx.strokeStyle = '#ddd';

  // let range = max - min;

  // points.forEach((point, i) => {
  //     // ctx.beginPath();
  //     // ctx.lineWidth = 4;
  //     // ctx.strokeStyle = 'red';

  //     if (i > 0) {
  //         let t = (width / (points.length - 1));
  //         ctx.translate(t, 0);
  //         // console.log(`Canvas translates ${t}px to the right`);
  //     }

  //     let x = 0;
  //     let yScale = height / (max - min);
  //     let y = height + (min * yScale) - point.y * yScale;

  //     if (i === 0) {
  //         ctx.moveTo(x, y)
  //     }

  //     // console.log(`Line moves to ${x}, ${y}`);

  //     // ctx.lineTo(x, y)

  //     if (i >= points.length - 1) {
  //         return;
  //     }

  //     // ctx.stroke();
  //     // ctx.closePath();

  //     // Print label
  //     if (i % 10 === 0) {
  //         // ctx.font = '24px serif';
  //         // ctx.translate(-200, 20);
  //         // ctx.rotate(50);
  //         // let label = formatDate(point.x);
  //         // ctx.fillText(label, x - 20, height - 10);
  //         // ctx.rotate(-50);
  //         // ctx.translate(200, -20);

  //         // Draw vertical line

  //         // ctx.save();
  //         // ctx.beginPath();
  //         ctx.moveTo(0, height);
  //         ctx.lineTo(0, 0);
  //         // ctx.restore();

  //         // ctx.moveTo(x, y);
  //     }
  // });

  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.closePath();

  // Draw line
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#289486';

  points.forEach((point, i) => {
    // ctx.beginPath();
    // ctx.lineWidth = 4;
    // ctx.strokeStyle = 'red';

    if (i > 0) {
      let t = width / (points.length - 1);
      ctx.translate(t, 0);
      // console.log(`Canvas translates ${t}px to the right`);
    }

    let x = 0;
    let yScale = height / (yMax - yMin);
    let y = height + yMin * yScale - point.y * yScale;

    if (i === 0) {
      ctx.moveTo(x, y);
    }

    // console.log(`Line moves to ${x}, ${y}`);

    // ctx.quadraticCurveTo(x, y, y, y)
    ctx.lineTo(x, y);

    // if (i >= points.length - 1) {
    //     return;
    // }

    // ctx.stroke();
    // ctx.closePath();
  });

  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.closePath();

  // // Draw curves
  // ctx.beginPath();
  // ctx.lineWidth = 4;
  // ctx.strokeStyle = 'red';

  // points.forEach((point, i) => {
  //     // ctx.beginPath();
  //     // ctx.lineWidth = 4;
  //     // ctx.strokeStyle = 'red';

  //     if (i > 0) {
  //         let t = (width / (points.length - 1));
  //         ctx.translate(t, 0);
  //         console.log(`Canvas translates ${t}px to the right`);
  //     }

  //     // Original coordinates
  //     let x = 0;
  //     let y = height

  //     let yScale = height / (max - min);
  //     let y = height + (min * yScale) - point.y * yScale;

  //     if (i === 0) {
  //         ctx.moveTo(x, y)
  //         return;
  //     }

  //     // let prevPoint = {
  //     //     x: 0,
  //     //     y: 0,
  //     // };

  //     // prevPoint.x = points[i-1].x;
  //     // prevPoint.y = points[i-1].y;

  //     let beforeX = x - 10;
  //     let afterX = x + 10;
  //     // let beforeY = y - 10*0;
  //     // let afterY = y + 10*0;

  //     ctx.moveTo(beforeX, y);
  //     ctx.quadraticCurveTo(x, y - 20, afterX, y);

  //     console.log(`Line moves to ${x}, ${y}`);

  //     // ctx.quadraticCurveTo(x, y, y, y)
  //     // ctx.lineTo(x, y)

  //     // if (i >= points.length - 1) {
  //     //     return;
  //     // }
  // });

  //  ctx.stroke();
  //  ctx.setTransform(1, 0, 0, 1, 0, 0);
  //  ctx.closePath();

  // ctx.fillStyle = "#000";
  // ctx.beginPath();
  // ctx.arc(500, 300, 100, 0,  2 * Math.PI, true);
  // ctx.fill();
  // ctx.closePath();
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

  return `${hour}:${min}`;
  // return d;
};
