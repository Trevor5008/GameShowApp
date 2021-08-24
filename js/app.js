const body = document.querySelector('body');
const theme = document.getElementById('theme');
const themes = ['hacker', 'nature', 'tropics', 'future'];
const themeSlct = document.getElementById('theme_btns');
const themeBtns = themeSlct.children;
const startBtn = document.getElementById('btn__reset');
const phraseList = document.getElementById('phrase').firstElementChild;
const letters = phraseList.childNodes;
const keyBtns = document.getElementsByClassName('key');
const startScrn = document.getElementById('overlay');
const heading = startScrn.querySelector('h1');
const titleHeader = document.querySelector('.header');
const phraseBank = ["I'll be back", "Luke, I am your father", "Release the Kraken!", "Bond, James Bond", "Say hello to my little friend!"];
let themeChoice = '';
let fontFam = '';
let textColor = '';
// tracks keys already selected
let keysChosen = [];
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
      if (game) {
         let key = e.target.textContent;
         // checks if key is previously selected
         if (!keysChosen.includes(key)) {
            // add to collection
            keysChosen.push(key);
            game.handleInteraction(keyBtns, e.target.textContent);
         }
      }
   });
}

/**
 * Listens for keyboard input
 */
document.addEventListener('keyup', (evt) => {
   const isLetter = /\w/.test(evt.key);
   if (game) {
      if (isLetter && !keysChosen.includes(evt.key)) {
         keysChosen.push(evt.key);
         game.handleInteraction(keyBtns, evt.key);
      }
   }
});