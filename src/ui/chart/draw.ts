const draw = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  let width = canvas.width;
  let height = canvas.height;

  console.log('width:', width, 'height', height);

  ctx.moveTo(0, 0);
  ctx.lineTo(200, height);
  ctx.moveTo(200, 0);
  ctx.lineTo(0, height);

  ctx.stroke();
};

export default draw;
