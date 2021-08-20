const startBtn = document.getElementById('btn__reset');
const phraseList = document.getElementById('phrase').firstElementChild;
const letters = phraseList.childNodes;
const keyBtns = document.getElementsByClassName('key');
let game = null;

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
      key.setAttribute('disabled', true);
   }
});