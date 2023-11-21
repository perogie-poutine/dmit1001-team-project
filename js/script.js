const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

const logoEl = document.getElementById('logo');
const container = document.getElementById('container');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

/* Helper functions */
const clamp = (val, min, max) =>
Math.min(Math.max(min, val), max);


const rand = (min, max) =>
Math.floor(Math.random() * (max - min + 1) + min);


/* Element classes */
class Logo {
  constructor(x, y) {
    this.color = rand(0, COLORS.length - 1);
    this.x = x;this.y = y;
    this.vx = this.vy = 0;
  }

  changeColor() {
    const newCol = rand(0, COLORS.length - 1);
    if (newCol === this.color) this.changeColor();else
    this.color = newCol;
  }

  draw() {
    const { x, y, color } = this;
    ctx.drawImage(logoImgs[color],
    x - logoDim.w_half,
    y - logoDim.h_half,
    logoDim.w, logoDim.h);

  }

  _bounded() {
    const { x, y } = this;
    const { w_half, h_half } = logoDim;

    // rebound on hit
    if (x < w_half || x > width - w_half) {
      this.changeColor();
      this.x = clamp(x, w_half, width - w_half);
      this.vx *= -1;
    }

    if (y < h_half || y > height - h_half) {
      this.changeColor();
      this.y = clamp(y, h_half, height - h_half);
      this.vy *= -1;
    }
  }

  update(fn, bound) {
    if (fn) fn.call(this);
    if (bound) this._bounded();
    this.draw();
  }}


/* controllable params */
const COLORS = ['blue', 'red', 'white', 'green', 'orange', 'cyan', 'grey', 'purple', 'yellow', 'brown'],
SPEED = 3;

/* environmental vars */
let logoImgs = [];
let logoDim = {
  w: 0, h: 0,
  get w_half() {return this.w / 2;},
  get h_half() {return this.h / 2;} };


/* canvas elements */
const logo = new Logo(width / 2, height / 2);


/* Initial set-up */
function init() {
  // get dimensions of logo
  logoDim.w = logoEl.clientWidth;
  logoDim.h = logoEl.clientHeight;

  // get image data for each logo colour
  const logoStr = new XMLSerializer().serializeToString(logoEl);
  logoImgs = COLORS.map(col => {
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${
    logoStr.replace('white', col)
    }`;
    return img;
  });

  // set initial velocity
  logo.vx = -SPEED;
  logo.vy = SPEED;
}

/* Main animation routine */
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, width, height);

  // draw elements
  logo.update(function () {
    this.x += this.vx;
    this.y += this.vy;
  }, true);
}

init();
animate();

/* Event Listeners */
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  logoDim.w = logoEl.clientWidth;
  logoDim.h = logoEl.clientHeight;
});