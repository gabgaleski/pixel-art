// Import
const getHeader = document.getElementById('header');
const getDiv = document.getElementById('color-palette');
const colorBtn = document.getElementById('button-random-color');
const matriz = document.getElementById('pixel-board');
const clear = document.getElementById('clear-board');
const sizeBoard = document.getElementById('board-size');
const generateBoard = document.getElementById('generate-board');

const createH1 = () => {
  const create = document.createElement('h1');
  create.id = 'title';
  create.innerHTML = 'Paleta de Cores';
  getHeader.appendChild(create);
};

const saveStorage = () => {
  let save = [];
  const elements = document.getElementsByClassName('color');
  for (let index = 0; index < elements.length; index += 1) {
    save.push(elements[index].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(save));
};

const palletCreate = () => {
  const pallete = document.createElement('div');
  for (let index = 0; index < 4; index += 1) {
    const pallete = document.createElement('div');
    pallete.className = 'color';
    pallete.style.border = '1px solid black';
    getDiv.appendChild(pallete);
  }
};

const palletColor = () => {
  const colorGenerate = document.getElementsByClassName('color');
  for (let index = 0; index < colorGenerate.length; index += 1) {
    if (index === 0) {
      colorGenerate[index].style.backgroundColor = 'black';
    } else {
      colorGenerate[index].style.backgroundColor = generateColor();
    }
  }
  saveStorage();
};

const palletColorStore = () => {
  const colorGenerate = document.getElementsByClassName('color');
  for (let index = 0; index < colorGenerate.length; index += 1) {
    if (index === 0) {
      colorGenerate[index].style.backgroundColor = 'black';
    } else {
      const getLocal = JSON.parse(localStorage.getItem('colorPalette'));
      colorGenerate[index].style.backgroundColor = getLocal[index];
    }
  }
};

// Ideia baseada no aulao do Aysllan para gerar uma cor aleatoria
const generateColor = () => {
  const number1 = Math.floor(Math.random() * 255);
  const number2 = Math.floor(Math.random() * 255);
  const number3 = Math.floor(Math.random() * 255);
  return `rgb(${number1}, ${number2}, ${number3})`;
};

colorBtn.addEventListener('click', () => {
  palletColor();
});

const verify = () => {
  if (localStorage.getItem('colorPalette') === null) {
    palletColor();
  } else {
    palletColorStore();
  }
};

const generateMatriz = () => {
  for (let index = 0; index < 5; index += 1) {
    for (let index1 = 0; index1 < 5; index1 += 1) {
      const pixels1 = document.createElement('div');
      pixels1.className = 'pixel';
      pixels1.style.backgroundColor = 'white';
      matriz.appendChild(pixels1);
    }
  }
};

const saveColorMatriz = () => {
  let boardPixel = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < 25; index += 1) {
    let pixels = document.createElement('div')
    pixels.className = 'pixel';
    pixels.style.backgroundColor = boardPixel[index];
    matriz.appendChild(pixels);
  }
};

const selectInitial = () => {
  const color = document.querySelector('.color');
  color.className += ' selected';
};

const colorSelect = (event) => {
  const color = document.getElementsByClassName('selected')[0];
  color.classList.remove('selected');
  color.style.border = '1px solid black';
  event.target.classList.add('selected');
  event.target.style.border = '2px solid white';
};

const saveBoard = () => {
  const colors = document.getElementsByClassName('pixel');
  let arrColors = [];
  for (let index = 0; index < colors.length; index += 1) {
    arrColors.push(colors[index].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(arrColors));
};

const eventClickColors = () => {
  const palletColors = document.getElementsByClassName('color');
  for (let index = 0; index < palletColors.length; index += 1) {
    palletColors[index].addEventListener('click', colorSelect);
  }
};

const pixelColor = (event) => {
  const selected = document.getElementsByClassName('selected')[0];
  const color = selected.style.backgroundColor;
  event.target.style.backgroundColor = color;
  saveBoard();
};

const pixelsEvent = () => {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', pixelColor);
  }
};

clear.addEventListener('click', () => {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
  saveBoard();
});

const generatePixels = () => {
  const value = sizeBoard.value;
  const newBoard = document.getElementById('pixel-board');
  for (let index = 0; index < value; index += 1) {
    for (let index1 = 0; index1 < value; index1 += 1) {
      const pixels1 = document.createElement('div');
      pixels1.className = 'pixel';
      pixels1.style.backgroundColor = 'white';
      newBoard.appendChild(pixels1);
    }
  }
  pixelsEvent();
};

const deletPixels = () => {
  const pixels = document.querySelectorAll('.pixel');
  const parent = pixels[0].parentNode;
  for (let index of pixels) {
    parent.removeChild(index);
  }
};

const numberVerify = () => {
  if (sizeBoard.value < 5) {
    sizeBoard.value = 5;
  } else if (sizeBoard.value > 50) {
    sizeBoard.value = 50;
  }
  localStorage.setItem('boardSize', sizeBoard.value);
};

generateBoard.addEventListener('click', () => {
  const value = sizeBoard.value;
  const main = document.getElementById('board-base');
  if (value) {
    numberVerify();
    deletPixels();
    generatePixels();
  } else {
    alert('Board inválido!');
  }
});

const saveMatrizChange = () => {
  if (localStorage.getItem('boardSize')) {
    const value = localStorage.getItem('boardSize');
    const newBoard = document.getElementById('pixel-board');
    for (let index = 0; index < value; index += 1) {
      for (let index1 = 0; index1 < value; index1 += 1) {
        const pixels1 = document.createElement('div');
        pixels1.className = 'pixel';
        pixels1.style.backgroundColor = 'white';
        newBoard.appendChild(pixels1);
      }
    }
    pixelsEvent();
  }
};

window.onload = () => {
  createH1();
  palletCreate();
  verify();

  if (localStorage.getItem('pixelBoard') === null && localStorage.getItem('boardSize') === null) {
    generateMatriz();
  } else if (localStorage.getItem('boardSize') > 5) {
    saveMatrizChange();
  } else {
    saveColorMatriz();
  }

  selectInitial();
  eventClickColors();
  pixelsEvent();
};