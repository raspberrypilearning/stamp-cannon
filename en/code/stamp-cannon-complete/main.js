const WIDTH = 800;
const HEIGHT = 540;
const GROUND_Y = 470;
const CANNON_X = 120;
const CANNON_Y = 420;
const BARREL_LENGTH = 84;

const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

let stamps = [];
let stampCount = 5;
let currentShape = "star";
let mouseX = WIDTH * 0.55;
let mouseY = HEIGHT * 0.45;
let frameCount = 0;

function clamp(value, minimumValue, maximumValue) {
  return Math.max(minimumValue, Math.min(maximumValue, value));
}

function lerpNum(startValue, endValue, amount) {
  return startValue + (endValue - startValue) * amount;
}

function paletteColour(index) {
  const colours = [
    [255, 87, 87],
    [255, 174, 66],
    [255, 230, 109],
    [108, 224, 171],
    [86, 156, 255],
    [170, 120, 255],
    [255, 120, 220],
  ];

  return colours[index % colours.length];
}

function clearStamps() {
  stamps = [];
}

function addStamp(xPos, yPos, sizeValue, colourValue, shapeName, angleValue) {
  stamps.push({
    x: xPos,
    y: yPos,
    size: sizeValue,
    colour: colourValue,
    shape: shapeName,
    angle: angleValue,
  });
}

function getBarrelAngle(targetX, targetY) {
  return Math.atan2(targetY - CANNON_Y, targetX - CANNON_X);
}

function getMuzzlePosition(targetX, targetY) {
  const barrelAngle = getBarrelAngle(targetX, targetY);
  const muzzleX = CANNON_X + Math.cos(barrelAngle) * BARREL_LENGTH;
  const muzzleY = CANNON_Y + Math.sin(barrelAngle) * BARREL_LENGTH;
  return { muzzleX, muzzleY, barrelAngle };
}

function rgb(red, green, blue, alpha = 1) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function fillRect(x, y, width, height, colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, width, height);
}

function fillEllipse(x, y, width, height, colour) {
  ctx.beginPath();
  ctx.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = colour;
  ctx.fill();
}

function fillCircle(x, y, diameter, colour) {
  fillEllipse(x, y, diameter, diameter, colour);
}

function updatePointerPosition(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  mouseX = (event.clientX - rect.left) * scaleX;
  mouseY = (event.clientY - rect.top) * scaleY;
}

function drawBackground() {
  fillRect(0, 0, WIDTH, HEIGHT, rgb(243, 247, 255));

  for (let stripeY = 0; stripeY < HEIGHT; stripeY += 30) {
    const stripeMix = Math.floor((stripeY / HEIGHT) * 90);
    fillRect(
      0,
      stripeY,
      WIDTH,
      30,
      rgb(235 - Math.floor(stripeMix / 3), 242 - Math.floor(stripeMix / 6), 255)
    );
  }

  fillRect(0, GROUND_Y, WIDTH, HEIGHT - GROUND_Y, rgb(245, 223, 165));

  for (let sparkIndex = 0; sparkIndex < 12; sparkIndex += 1) {
    const sparkleX = (frameCount * 2 + sparkIndex * 67) % WIDTH;
    const sparkleY = 70 + ((sparkIndex * 37) % 220);
    fillCircle(sparkleX, sparkleY, 8, rgb(255, 255, 255, 120 / 255));
  }

  fillEllipse(120, 90, 90, 90, rgb(255, 255, 255, 55 / 255));
  fillEllipse(170, 85, 75, 75, rgb(255, 255, 255, 55 / 255));
  fillEllipse(145, 65, 70, 70, rgb(255, 255, 255, 55 / 255));

  fillEllipse(610, 120, 100, 100, rgb(255, 255, 255, 55 / 255));
  fillEllipse(665, 105, 85, 85, rgb(255, 255, 255, 55 / 255));
  fillEllipse(645, 82, 80, 80, rgb(255, 255, 255, 55 / 255));
}

function drawCannon(targetX, targetY) {
  const { muzzleX, muzzleY, barrelAngle } = getMuzzlePosition(targetX, targetY);

  fillRect(CANNON_X - 70, CANNON_Y + 22, 150, 18, rgb(90, 70, 60));

  fillCircle(CANNON_X - 28, CANNON_Y + 38, 54, rgb(64, 73, 92));
  fillCircle(CANNON_X + 34, CANNON_Y + 38, 54, rgb(64, 73, 92));
  fillCircle(CANNON_X - 28, CANNON_Y + 38, 22, rgb(35, 43, 58));
  fillCircle(CANNON_X + 34, CANNON_Y + 38, 22, rgb(35, 43, 58));

  ctx.save();
  ctx.translate(CANNON_X, CANNON_Y);
  ctx.rotate(barrelAngle);
  fillRect(0, -18, BARREL_LENGTH, 36, rgb(65, 76, 95));
  fillEllipse(BARREL_LENGTH, 0, 28, 40, rgb(42, 50, 66));
  fillEllipse(BARREL_LENGTH + 2, 0, 16, 18, rgb(20, 24, 34));
  ctx.restore();

  fillCircle(muzzleX, muzzleY, 12, rgb(255, 225, 120, 90 / 255));
}

function drawAllStamps() {
  for (const stamp of stamps) {
    drawStamp(stamp);
  }
}

function drawStamp(stamp) {
  ctx.save();
  ctx.translate(stamp.x, stamp.y);
  ctx.rotate(stamp.angle);

  if (stamp.shape === "square") {
    drawSquareStamp(stamp.size, stamp.colour);
  } else if (stamp.shape === "flower") {
    drawFlowerStamp(stamp.size, stamp.colour);
  } else {
    drawStarStamp(stamp.size, stamp.colour);
  }

  ctx.restore();
}

function drawSquareStamp(sizeValue, colourValue) {
  const colour = rgb(colourValue[0], colourValue[1], colourValue[2]);
  const halfSize = sizeValue * 0.5;
  fillRect(-halfSize, -halfSize, sizeValue, sizeValue, colour);
  fillRect(
    -halfSize * 0.6,
    -halfSize * 0.6,
    sizeValue * 0.35,
    sizeValue * 0.35,
    rgb(255, 255, 255, 90 / 255)
  );
}

function drawFlowerStamp(sizeValue, colourValue) {
  const colour = rgb(colourValue[0], colourValue[1], colourValue[2]);
  const petalSize = sizeValue * 0.42;
  const petalDistance = sizeValue * 0.34;

  for (let petalIndex = 0; petalIndex < 6; petalIndex += 1) {
    const petalAngle = (Math.PI * 2 * petalIndex) / 6;
    const petalX = Math.cos(petalAngle) * petalDistance;
    const petalY = Math.sin(petalAngle) * petalDistance;
    fillEllipse(petalX, petalY, petalSize, petalSize, colour);
  }

  fillEllipse(0, 0, sizeValue * 0.48, sizeValue * 0.48, rgb(255, 240, 110));
}

function drawStarStamp(sizeValue, colourValue) {
  const outerRadius = sizeValue * 0.5;
  const innerRadius = sizeValue * 0.22;

  ctx.beginPath();
  for (let pointIndex = 0; pointIndex < 10; pointIndex += 1) {
    const pointAngle = -Math.PI / 2 + pointIndex * (Math.PI / 5);
    const pointRadius = pointIndex % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(pointAngle) * pointRadius;
    const y = Math.sin(pointAngle) * pointRadius;

    if (pointIndex === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fillStyle = rgb(colourValue[0], colourValue[1], colourValue[2]);
  ctx.fill();

  fillEllipse(0, 0, sizeValue * 0.22, sizeValue * 0.22, rgb(255, 255, 255, 95 / 255));
}

function drawHud(shapeName, volleyCount, messageLine1, messageLine2 = "") {
  fillRect(16, 16, 290, 120, rgb(19, 28, 46, 210 / 255));

  ctx.fillStyle = rgb(255, 255, 255);
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = "700 22px Trebuchet MS, Verdana, sans-serif";
  ctx.fillText("Stamp Cannon", 28, 28);

  ctx.font = "14px Trebuchet MS, Verdana, sans-serif";
  ctx.fillText(`Shape: ${shapeName}`, 28, 60);
  ctx.fillText(`Stamp count: ${volleyCount}`, 28, 82);
  ctx.fillText(`On canvas: ${stamps.length}`, 28, 104);

  fillRect(16, HEIGHT - 78, WIDTH - 32, 58, rgb(19, 28, 46, 180 / 255));
  ctx.fillStyle = rgb(255, 255, 255);
  ctx.fillText(messageLine1, 28, HEIGHT - 66);
  if (messageLine2 !== "") {
    ctx.fillText(messageLine2, 28, HEIGHT - 44);
  }
}

function fireVolley(targetX, targetY) {
  const { muzzleX, muzzleY, barrelAngle } = getMuzzlePosition(targetX, targetY);

  for (let stampIndex = 0; stampIndex < stampCount; stampIndex += 1) {
    const amount = stampCount === 1 ? 1 : stampIndex / (stampCount - 1);
    const stampX = lerpNum(muzzleX, targetX, amount);
    const stampY = lerpNum(muzzleY, targetY, amount);
    const stampSize = 18 + stampIndex * 7;
    const stampColour = paletteColour(stampIndex);
    const stampAngle = barrelAngle + stampIndex * 0.35;

    addStamp(stampX, stampY, stampSize, stampColour, currentShape, stampAngle);
  }
}

function render() {
  frameCount += 1;
  drawBackground();
  drawAllStamps();
  drawCannon(mouseX, mouseY);
  drawHud(
    currentShape,
    stampCount,
    "Click to fire. UP/DOWN changes the stamp count.",
    "C clears the canvas. Keep building the cannon controls."
  );
  requestAnimationFrame(render);
}

canvas.addEventListener("pointermove", (event) => {
  updatePointerPosition(event);
});

canvas.addEventListener("pointerdown", (event) => {
  updatePointerPosition(event);
  fireVolley(mouseX, mouseY);
});

window.addEventListener("keydown", (event) => {
  const pressed = event.key.toUpperCase();

  if (event.key === "ArrowUp") {
    stampCount = clamp(stampCount + 1, 1, 12);
    event.preventDefault();
    return;
  }

  if (event.key === "ArrowDown") {
    stampCount = clamp(stampCount - 1, 1, 12);
    event.preventDefault();
    return;
  }

  if (pressed === "1") {
    currentShape = "star";
  } else if (pressed === "2") {
    currentShape = "square";
  } else if (pressed === "3") {
    currentShape = "flower";
  } else if (pressed === "C") {
    clearStamps();
  }
});

render();
