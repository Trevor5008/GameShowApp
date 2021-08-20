const startBtn = document.getElementById('btn__reset');
const keyBtns = document.getElementsByClassName('key');
const game = new Game();

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
})

startBtn.addEventListener('click', () => {
   game.startGame();
});

