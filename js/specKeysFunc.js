function capsLockBehaviour(event) { 
  const data = event.target.dataset.code;
    if (data === 'CapsLock') { 
      event.target.classList.toggle('active');
      setCase();
      changeKeyText();
      return;
  }
};

export {capsLockBehaviour};