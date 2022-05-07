import { keyboardEN, keyboardRU } from './keyboard_codes.js';
// import { capsLockBehaviour } from './specKeysFunc.js';

const body = document.querySelector('body');
const textarea = document.createElement('textarea');
const keyboard = document.createElement('div');

keyboard.classList.add('keyboard');
body.appendChild(textarea);
body.appendChild(keyboard);

let lang = localStorage.getItem('lang') || 'en';
let keyboardCurrentLang;
let letterCase = 0;
let isCaps = false;

localStorage.setItem('lang', lang);

function getKeyboardCurrentLang() {
  if (lang === 'en') {
    keyboardCurrentLang = keyboardEN;
  } else {
    keyboardCurrentLang = keyboardRU;
  }
}

function insertKeysIntoKeyboard() {
  lang = localStorage.getItem('lang');

  getKeyboardCurrentLang();

  keyboard.innerHTML = ''; // очищаем клавиатуру

  for (const keyCode in keyboardCurrentLang) {
    const keyDiv = document.createElement('div');
    keyDiv.classList.add('key');

    if (keyCode === 'Backspace' || keyCode === 'CapsLock' || keyCode === 'Tab' || keyCode === 'Enter' || keyCode === 'Control' || keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      keyDiv.classList.add('key_big');
    }

    if (keyCode === 'Space') {
      keyDiv.classList.add('key_space');
    }

    keyDiv.setAttribute('data-code', keyCode);
    keyDiv.innerHTML = keyboardCurrentLang[keyCode][letterCase];
    keyboard.append(keyDiv);
  }
}

insertKeysIntoKeyboard();

// function capsLockBehaviour(event) {
//   if (event.target.dataset.code === 'CapsLock') {
//     event.target.classList.toggle('active');
//     setCase();
//     changeKeyText();
//     return;
//   }
// };

// -------------- СОБЫТИЯ КЛАВИАТУРЫ --------------

document.addEventListener('keydown', (event) => {
  // -------- CAPS LOCK -----------
  const keys = document.querySelectorAll('.key');

  if (event.code === 'CapsLock') {
    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toLowerCase();
        }
      });
    } else {
      keys.forEach((key) => {
        console.log(key.dataset.code);
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toUpperCase();
        }
      });
    }
    document.querySelector('[data-code=\'CapsLock\']').classList.toggle('active');
    return;
  }

  // -------- SHIFT -----------

  if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
    if (event.repeat) { return; }
    const shift = event.code;

    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
           key.innerText = keyboardCurrentLang[key.dataset.code][letterCase].join().toLowerCase();
        }
    });
    } else { 
      keys.forEach((key) => {
        console.log(key.dataset.code);
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toUpperCase();
        }
      });
    }

    document.querySelector(`[data-code='${shift}']`).classList.add('active');
  }

  document.querySelector(`[data-code='${event.code}']`).classList.add('active');
  textarea.focus();
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'CapsLock') {
    return;
  }

  if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
    setCase();
    changeKeyText();
  }

  document.querySelector(`[data-code='${event.code}']`).classList.remove('active');
});

textarea.innerHTML = '';

// -------------- СОБЫТИЯ МЫШИ --------------

keyboard.addEventListener('mousedown', (event) => {
  const data = event.target.dataset.code;

  // -------- CAPS LOCK -----------

  if (data === 'CapsLock') {
    const keys = document.querySelectorAll('.key');

    if (event.target.classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toLowerCase();
        }
      });
    } else {
      keys.forEach((key) => {
        console.log(key.dataset.code);
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toUpperCase();
        }
      });
    }
    event.target.classList.toggle('active');
    return;
  }

  // -------- SHIFT -----------

  if (data === 'ShiftRight' || data === 'ShiftLeft') {
    // document.querySelector(`[data-code='${data}']`).classList.toggle('active');
    event.target.classList.add('active');
    setCase();
    changeKeyText();
    return;
  }

  console.log(event.target);
  event.target.classList.add('active');

  textarea.focus();
  console.log(textarea.textHTML);
  textarea.value += keyboardCurrentLang[data][letterCase];
});

document.addEventListener('mouseup', (event) => {
  const data = event.target.dataset.code;
  if (data === 'CapsLock') {
    return;
  }

  if (data === 'ShiftRight' || data === 'ShiftLeft') {
    event.target.classList.remove('active');
    setCase();
    changeKeyText();
    return;
  }

  setTimeout(() => {
    event.target.classList.remove('active');
  }, 300);
});

// сохранить язык в local storage и переключить раскладку
function changeKeyText() {
  lang = localStorage.getItem('lang');
  const keys = document.querySelectorAll('.key');
  getKeyboardCurrentLang();

  keys.forEach((key) => {
    key.innerText = keyboardCurrentLang[key.dataset.code][letterCase];
  });
}

function runOnKeys(func, ...codes) {
  const pressed = new Set();

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);

    for (const code of codes) { // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();
    func();
    changeKeyText(); // вставляем новую раскладку с измененным языком
  });

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
}

function changeLangLocal() {
  if (localStorage.getItem('lang') === 'en') {
    localStorage.setItem('lang', 'ru');
  } else {
    localStorage.setItem('lang', 'en');
  }
}

runOnKeys(
  changeLangLocal,
  'ControlLeft',
  'AltLeft',
);

// клавиша CapsLock

function setCase() {
  if (!isCaps) {
    isCaps = true;
    letterCase = 1;
  } else {
    isCaps = false;
    letterCase = 0;
  }
}
