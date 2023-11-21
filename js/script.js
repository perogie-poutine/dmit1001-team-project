const o = document.querySelector('.outer-marquee');
const i = document.querySelector('.inner-marquee');

o.style.height = window.innerHeight;
o.style.width = window.innerWidth;
i.style.height = window.innerHeight;
i.style.width = window.innerWidth;

let count = 0;

const NAMED_COLORS = ['SPRINGGREEN', 'LIME', 'YELLOW', 'ORANGE', 'RED', 'HOTPINK', 'VIOLET', 'DARKVIOLET', 'BLUE', 'DEEPSKYBLUE'];

function getColor(existing) {
  const index = (count++) % NAMED_COLORS.length
  console.log('getColor', existing, index)
  return NAMED_COLORS[index];
}

const handler = e => {
  o.style.color = getColor(o.style.color)
}

o.addEventListener('bounce', handler);
i.addEventListener('bounce', handler);