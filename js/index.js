/* eslint-disable import/extensions */
import { keyboardEN, keyboardRU } from './keyboard_codes.js';

const body = document.querySelector('body');


const textarea = document.createElement('textarea');
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

const text = document.createElement('div');
text.classList.add('text');
text.innerHTML = 'The keyboard was created in <span>Windows</span>.<br> Press left <span>Ctrl+Alt</span> to change language.';

body.appendChild(textarea);
body.appendChild(keyboard);
body.appendChild(text);

let lang = localStorage.getItem('lang') || 'en';
let keyboardCurrentLang;
const letterCase = 0;

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

    const bigKeyCodeArr = ['Backspace', 'CapsLock', 'Tab', 'Enter', 'Control', 'ShiftLeft', 'ShiftRight'];

    if (bigKeyCodeArr.includes(keyCode)) {
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

// -------------- СОБЫТИЯ КЛАВИАТУРЫ  keydown --------------

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
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toUpperCase();
        }
      });
    }
    document.querySelector('[data-code=\'CapsLock\']').classList.toggle('active');
    return;
  }

  document.querySelector(`[data-code='${event.code}']`).classList.add('active'); // подсвечивание клавиши при нажатии

  // -------- SHIFT -----------

  if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
    if (event.repeat) { return; } // отменяем автоповтор
    // const shift = event.code;
    // setCase();
    event.preventDefault();

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
    return;
  }

  // -------- CTRL, ATL, WIN -----------
  const specKeyCodeArr = ['ControlLeft', 'ControlRight', 'AltRight', 'AltLeft', 'OSLeft', 'ContextMenu'];

  if (specKeyCodeArr.includes(event.code)) {
    event.preventDefault();
    return;
  }

  // -------- SPACE -----------

  if (event.code === 'Space') {
    textarea.value += ' ';
  }

  // -------- ENTER -----------

  if (event.code === 'Enter') {
    return;
  }

  // -------- Backspace -----------

  if (event.code === 'Backspace') {
    const str = textarea.value;
    const cursorPos = textarea.selectionEnd;

    const a = str.slice(0, cursorPos);
    const b = str.slice(cursorPos);

    textarea.value = a + b;
    return;
  }

  // -------- TAB -----------

  if (event.code === 'Tab') {
    event.preventDefault();
    textarea.setRangeText('\t', textarea.selectionStart, textarea.selectionEnd, 'end');
    return;
  }

  //---------------------
  event.preventDefault();
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
    }

    document.querySelector(`[data-code='${shift}']`).classList.remove('active');
    return;
  }

  document.querySelector(`[data-code='${event.code}']`).classList.remove('active');
});

// -------------- СОБЫТИЯ МЫШИ  mousedown --------------

keyboard.addEventListener('mousedown', (event) => {
  const data = event.target.dataset.code;
  const keys = document.querySelectorAll('.key');

  if (event.target.dataset.code === undefined) {
    return;
  }

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
    }
    event.target.classList.toggle('active');
    return;
  }

  //---------------------------
  event.target.classList.add('active');

  // -------- CTRL, ATL, WIN -----------

  const specKeyCodeArr = ['ControlLeft', 'ControlRight', 'AltRight', 'AltLeft', 'OSLeft', 'ContextMenu'];

  if (specKeyCodeArr.includes(data)) {
    return;
  }

  // -------- SPACE -----------

  if (data === 'Space') {
    textarea.value += ' ';
  }

  // -------- ENTER -----------

  if (data === 'Enter') {
    textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
    return;
  }

  // -------- Backspace -----------

  if (data === 'Backspace') {
    if (textarea.selectionStart === textarea.selectionEnd) {
      textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, 'end');
      return;
    }
    textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
    return;
  }

  // -------- TAB -----------

  if (data === 'Tab') {
    textarea.setRangeText('\t', textarea.selectionStart, textarea.selectionEnd, 'end');
    return;
  }

  // -------------------

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
    }
  }
  textarea.focus();

  event.target.classList.remove('active');
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
