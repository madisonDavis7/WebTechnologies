
class GameObject {
  constructor(x, y, width, height, color, speedX = 0, speedY = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.originalWidth = width;
    this.originalHeight = height;
    this.growTimer = 0; 
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) {
      this.x = 0;
      this.speedX = -this.speedX; //bounce horizontally
    } else if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
      this.speedX = -this.speedX;
    }
    if (this.y < 0) {
      this.y = 0;
      this.speedY = -this.speedY; //bounce vertically
    } else if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
      this.speedY = -this.speedY;
    }

    if (this.growTimer > 0) {
      this.growTimer--;
      this.width = this.originalWidth * 1.2;
      this.height = this.originalHeight * 1.2;
    } else {
      //Return to original size
      this.width = this.originalWidth;
      this.height = this.originalHeight;
    }
  }

  move(dx, dy, canvasWidth, canvasHeight) {
    this.x += dx;
    this.y += dy;
    // Clamp inside canvas
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > canvasWidth) this.x = canvasWidth - this.width;
    if (this.y + this.height > canvasHeight) this.y = canvasHeight - this.height;
  }
}

function hasCollided(obj1, obj2) {
  return !(
    obj1.x + obj1.width < obj2.x ||
    obj1.x > obj2.x + obj2.width ||
    obj1.y + obj1.height < obj2.y ||
    obj1.y > obj2.y + obj2.height
  );
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new GameObject(100, 100, 50, 50, '#3c327e');

const autoObj = new GameObject(400, 300, 60, 60, '#4f7cb7', 3, 2);

let bgColor = '#000';
let flashTimer = 0;

const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const speed = 5;
  if (keys['arrowup'] || keys['w']) player.move(0, -speed, canvas.width, canvas.height);
  if (keys['arrowdown'] || keys['s']) player.move(0, speed, canvas.width, canvas.height);
  if (keys['arrowleft'] || keys['a']) player.move(-speed, 0, canvas.width, canvas.height);
  if (keys['arrowright'] || keys['d']) player.move(speed, 0, canvas.width, canvas.height);

  autoObj.update(canvas.width, canvas.height);

  if (hasCollided(player, autoObj)) {
    flashTimer = 10; 
    player.growTimer = 10; 
    autoObj.growTimer = 10;
  }

  //Background flash effect
  if (flashTimer > 0) {
    bgColor = '#41141d'; 
    flashTimer--;
  } else {
    bgColor = '#000';
  }

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  autoObj.draw(ctx);

  requestAnimationFrame(update);
}

update();

//Background music controls
const music = document.getElementById('bgMusic');
const playBtn = document.getElementById('playMusicBtn');

playBtn.addEventListener('click', () => {
    if (music.paused) {
      music.volume = 1;
      music.muted = false;
      music.play();
      playBtn.textContent = 'Stop Music';
    } else {
      music.pause();
      music.currentTime = 0;
      playBtn.textContent = 'Play Music';
    }
});
