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

// -------------- СОБЫТИЯ КЛАВИАТУРЫ  keydown --------------

document.addEventListener('keydown', (event) => {
  // -------- CAPS LOCK -----------
  const keys = document.querySelectorAll('.key');

  if (event.code === 'CapsLock') {
    isCaps = true;
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
    if (event.repeat) { return; }            // отменяем автоповтор
    const shift = event.code;
    setCase();

    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
           key.innerText = keyboardCurrentLang[key.dataset.code][1].join().toLowerCase();
        }
      });
    } else { 
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
           key.innerText = keyboardCurrentLang[key.dataset.code][1].join().toUpperCase();
        }
      });
    }

    document.querySelector(`[data-code='${shift}']`).classList.add('active');
  }

  //---------------------
  document.querySelector(`[data-code='${event.code}']`).classList.add('active');
  event.preventDefault()
  textarea.focus();
  textarea.value += document.querySelector(`[data-code='${event.code}']`).innerText;
});

// -------------- СОБЫТИЯ КЛАВИАТУРЫ  keyup --------------

document.addEventListener('keyup', (event) => {
  const keys = document.querySelectorAll('.key');

  if (event.code === 'CapsLock') {
    return;
  }

  // -------- SHIFT -----------

  if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
    const shift = event.code;
    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
           key.innerText = keyboardCurrentLang[key.dataset.code][0].join().toUpperCase();
        }
      });
    } else { 
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
           key.innerText = keyboardCurrentLang[key.dataset.code][0].join().toLowerCase();
        }
      });
    };

    document.querySelector(`[data-code='${shift}']`).classList.remove('active');
    return;
  }

  document.querySelector(`[data-code='${event.code}']`).classList.remove('active');
});

textarea.innerHTML = '';

// -------------- СОБЫТИЯ МЫШИ  mousedown --------------

keyboard.addEventListener('mousedown', (event) => {
  const data = event.target.dataset.code;
  const keys = document.querySelectorAll('.key');

  // -------- CAPS LOCK -----------

  if (data === 'CapsLock') {
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
    // const shift = event.code;
    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
           key.innerText = keyboardCurrentLang[key.dataset.code][1].join().toLowerCase();
        }
      });
    } else { 
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
           key.innerText = keyboardCurrentLang[key.dataset.code][1].join().toUpperCase();
        }
      });
    };
    event.target.classList.toggle('active');
    return;
  }


// -------------------
  console.log(event.target);
  event.target.classList.add('active');

  textarea.focus();
  console.log(event.target);
  textarea.value += document.querySelector(`[data-code=${data}]`).innerText;
});

// -------------- СОБЫТИЯ МЫШИ  mouseup --------------

document.addEventListener('mouseup', (event) => {
  const keys = document.querySelectorAll('.key');
  const data = event.target.dataset.code;
  if (data === 'CapsLock') {
    return;
  }

  if (data === 'ShiftRight' || data === 'ShiftLeft') {
    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
           key.innerText = keyboardCurrentLang[key.dataset.code][0].join().toUpperCase();
        }
      });
    } else { 
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
           key.innerText = keyboardCurrentLang[key.dataset.code][0].join().toLowerCase();
        }
      });
    };
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
