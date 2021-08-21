const body = document.querySelector('body');
const theme = document.getElementById('theme');
const themes = ['hacker', 'nature', 'tropics', 'future'];
const themeSlct = document.getElementById('theme_btns');
const themeBtns = themeSlct.children;
let themeChoice = '';
const startBtn = document.getElementById('btn__reset');
const phraseList = document.getElementById('phrase').firstElementChild;
const letters = phraseList.childNodes;
const keyBtns = document.getElementsByClassName('key');
const startScrn = document.getElementById('overlay');
const heading = startScrn.querySelector('h1');
const titleHeader = document.querySelector('.header');
const phraseBank = ["I'll be back", "Luke, I am your father", "Release the Kraken!", "Bond, James Bond", "Say hello to my little friend!"];
let fontFam = '';
let textColor = '';
// initial state = no winner
let winner = false;
let game = null;

themeSlct.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      themeChoice = e.target.id;
      themeSlct.querySelector(`#${themeChoice}`).classList.add('chosen');

      for (let btn of themeBtns) {
         if (btn.id !== themeChoice) {
            btn.classList.remove('chosen');
            body.classList.remove(btn.id);
         }
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