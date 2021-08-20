const body = document.querySelector('body');
const theme = document.getElementById('theme');
const themeSlct = document.getElementById('theme_btns');
const themeBtns = themeSlct.children;
const startBtn = document.getElementById('btn__reset');
const phraseList = document.getElementById('phrase').firstElementChild;
const letters = phraseList.childNodes;
const keyBtns = document.getElementsByClassName('key');
let game = null;

themeSlct.addEventListener('click', (e) => {
   const choice = e.target.id;
   themeSlct.querySelector(`#${choice}`).classList.add('chosen');
   // sets the background theme
   body.classList.add(choice)
   for (let btn of themeBtns) {
      if (btn.id !== choice) {
         btn.classList.remove('chosen');
         body.classList.remove(btn.id);
      }
   }
});

startBtn.addEventListener('click', () => {
   // set new instance
   game = new Game();
   game.startGame();
});

/**
 * Adds listeners on each key button
 */
for (let key of keyBtns) {
   key.addEventListener('click', (e) => {
      game.handleInteraction(keyBtns, e.target.textContent);
      key.setAttribute('disabled', true);
   });
}

/**
 * Listens for keyboard input
 */
document.addEventListener('keyup', (evt) => {
   const isLetter = /\w/.test(evt.key);
   if (isLetter) {
      game.handleInteraction(keyBtns, evt.key);
      for (let key of keyBtns) {
         if (key.textContent === evt.key) {
            key.setAttribute('disabled', true);
         }
      }
   }
});