const startBtn = document.getElementById('btn__reset');
const keyBtns = document.getElementsByClassName('key');
const game = new Game();

for (let key of keyBtns) {
   key.addEventListener('click', (e) => {
      game.handleInteraction(keyBtns, e.target.textContent);
      key.setAttribute('disabled', true);
   });
   // TODO: would like to add ability to type letter, in addition to using mouse
}

startBtn.addEventListener('click', () => {
   game.startGame();
});

