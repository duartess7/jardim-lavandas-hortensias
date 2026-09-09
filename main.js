const scene = document.querySelector('.scene');
const lavenderBed = document.querySelector('.lavenders');
const stars = document.querySelector('.stars');
const fireflies = document.querySelector('.fireflies');

function random(seed) {
  const x = Math.sin(seed * 999) * 43758.5453;
  return x - Math.floor(x);
}

function buildFireflies() {
  fireflies.innerHTML = '';
  for (let i = 0; i < 13; i++) {
    const light = document.createElement('i');
    light.className = 'firefly';
    light.style.cssText = `--x:${6 + random(i + 111) * 88}%;--y:${34 + random(i + 121) * 52}%;--flight:${5 + random(i + 131) * 5}s;--wait:${random(i + 141) * 5}s`;
    fireflies.append(light);
  }
}

function buildStars() {
  stars.innerHTML = '';
  for (let i = 0; i < 42; i++) {
    const star = document.createElement('i');
    star.className = 'star';
    star.style.cssText = `left:${random(i + 1) * 100}%;top:${random(i + 11) * 68}%;--speed:${1.8 + random(i + 21) * 2.8}s;--wait:${random(i + 31) * 2}s`;
    stars.append(star);
  }
}

function buildLavenders() {
  lavenderBed.innerHTML = '';
  const count = innerWidth < 700 ? 15 : 26;
  for (let i = 0; i < count; i++) {
    const flower = document.createElement('div');
    const x = 29 + (i / (count - 1)) * 70 + (random(i + 5) - .5) * 5;
    const height = 190 + random(i + 17) * 230;
    const delay = .25 + random(i + 8) * 1.55;
    flower.className = 'lavender';
    flower.style.cssText = `--x:${x}%;--h:${height}px;--lean:${-7 + random(i + 10) * 14}deg;--delay:${delay}s;--sway:${3.4 + random(i + 4) * 2.4}s`;
    const stem = document.createElement('div');
    stem.className = 'lavender__stem';
    const sprig = document.createElement('div');
    sprig.className = 'lavender__sprig';
    for (let j = 0; j < 13; j++) {
      const bud = document.createElement('i');
      const side = j % 2 ? 8 + random(i * 20 + j) * 6 : -8 - random(i * 20 + j) * 6;
      bud.className = 'bud';
      bud.style.cssText = `--side:${side};--y:${j * 6.3}%;--size:${8 + random(i * 40 + j) * 5}px;--bud-delay:${.9 + j * .055}s`;
      sprig.append(bud);
    }
    flower.append(stem, sprig);
    for (let l = 0; l < 2; l++) {
      const leaf = document.createElement('i');
      leaf.className = 'lavender__leaf';
      leaf.style.cssText = `--ly:${18 + l * 18}%;--lr:${l ? 190 : -22}deg`;
      flower.append(leaf);
    }
    lavenderBed.append(flower);
  }
}

function buildHydrangeas() {
  const flowers = document.querySelectorAll('.hydrangea');
  flowers.forEach((flower, index) => {
    flower.style.setProperty('--x', index ? '76%' : '8%');
    flower.style.setProperty('--delay', `${.55 + index * .35}s`);
    const head = flower.querySelector('.hydrangea__head');
    head.innerHTML = '';
    for (let i = 0; i < 54; i++) {
      const angle = i * 2.399;
      const radius = Math.sqrt(i / 54) * 43;
      const x = 50 + Math.cos(angle) * radius * 1.04;
      const y = 49 + Math.sin(angle) * radius * .82;
      const floret = document.createElement('b');
      const palette = index ? ['#8da9df','#728fc9','#a694d8','#6686c2'] : ['#83a5df','#9eb8e5','#758fc8','#ad9bdf'];
      floret.className = 'floret';
      floret.style.cssText = `--fx:${x}%;--fy:${y}%;--fs:${16 + random(i + index * 80) * 15}px;--fr:${random(i + 70) * 90}deg;--fd:${random(i + 90) * .65}s;--fc:${palette[i % palette.length]}`;
      floret.innerHTML = '<i><span></span></i>';
      head.append(floret);
    }
  });
}

function bloom() {
  document.body.classList.add('resetting');
  void document.body.offsetWidth;
  buildStars(); buildFireflies(); buildLavenders(); buildHydrangeas();
  document.body.classList.remove('resetting');
}

document.querySelector('.replay').addEventListener('click', bloom);
buildStars(); buildFireflies(); buildLavenders(); buildHydrangeas();

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let frame = 0;
  document.addEventListener('pointermove', (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mx', ((event.clientX / innerWidth) - .5).toFixed(2));
      document.documentElement.style.setProperty('--my', ((event.clientY / innerHeight) - .5).toFixed(2));
      frame = 0;
    });
  }, { passive: true });
}

