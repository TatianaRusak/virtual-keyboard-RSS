import { keyboardEN, keyboardRU } from './keyboard_codes.js';

const body = document.querySelector('body');
const textarea = document.createElement('textarea');
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
body.appendChild(textarea);
body.appendChild(keyboard);

let lang = localStorage.getItem('lang') || 'en';
let keyboardCurrentLang;
if (lang === 'en') {
  keyboardCurrentLang = keyboardEN;
} else {
  keyboardCurrentLang = keyboardRU;
}

localStorage.setItem('lang', lang);

function insertKeysIntoKeyboard() {
  lang = localStorage.getItem('lang');

  for (let keyCode in keyboardCurrentLang) {
    const keyDiv = document.createElement('div');
    keyDiv.classList.add('key');

    if (keyCode == 'Backspace' || keyCode == 'CapsLock' || keyCode == 'Tab' || keyCode == 'Enter' || keyCode == 'Control' || keyCode == 'ShiftLeft' || keyCode == 'ShiftRight') { 
      keyDiv.classList.add('key_big');
    }

    if (keyCode == 'Space') { 
      keyDiv.classList.add('key_space');
    }

    keyDiv.setAttribute('data-code', keyCode);
    keyDiv.innerHTML =keyboardCurrentLang[keyCode][0];
    keyboard.append(keyDiv);
  }
}

insertKeysIntoKeyboard();

document.addEventListener('keydown', event => {
  document.querySelector(`[data-code='${event.code}']`).classList.add('active');
});

document.addEventListener('keyup', event => {
  setTimeout(() => { 
    document.querySelector(`[data-code='${event.code}']`).classList.remove('active');
  }, 300)
});

textarea.innerHTML = '';

document.addEventListener('mousedown', event => {
  event.target.classList.add('active');
  let data = event.target.dataset.code;
  textarea.innerHTML += keyboardCurrentLang[data][0];
});

document.addEventListener('mouseup', event => {
  setTimeout(() => { 
    event.target.classList.remove('active');
  }, 300)
});


// сохранить язык в local storage

function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    for (let code of codes) { // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    func();
    insertKeysIntoKeyboard();
  });

  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });

}

function changeLangLocal() { 
  if (lang === 'en') {
    localStorage.setItem('lang', 'ru');
  } else { 
    localStorage.setItem('lang', 'en');
  }
}

runOnKeys(
  changeLangLocal,
  "ControlLeft",
  "AltLeft"
);