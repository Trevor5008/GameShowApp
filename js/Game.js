class Game {
   constructor() {
      this.missed = 0;
      // array of five phrases to choose from
      this.phrases = ["I'll be back", "Luke, I am your father", "Release the Kraken!", "Bond, James Bond", "Say hello to my little friend!"];
      this.activePhrase = null;
   }

   startGame() {
      // hide the start screen overlay
      document.getElementById('overlay').style.display = 'none';
      // sets activePhrase to one of the 5 phrases
      const phrase = this.getRandomPhrase();
      this.activePhrase = new Phrase(phrase);
   }

   getRandomPhrase() {
      const idx = Math.floor(Math.random() * this.phrases.length);
      return this.phrases[idx];
   }

   /**
    * Checks to see if the button clicked by the player matches a 
    * letter in the activePhrase
    */
   handleInteraction(keys, letter) {   
      const phrase = this.activePhrase.phrase; 
      if (!phrase.includes(letter)) {
         for (let key of keys) {
            if (key.textContent === letter) {
               key.classList.add('wrong');
            }
         }
         this.removeLife();
      } else {
         for (let key of keys) {
            if (key.textContent === letter) {
               key.classList.add('chosen');
            }
         }
         this.showMatchedLetter();
         const hasWon = this.checkForWin();
         if (hasWon) {
            this.gameOver();
         }
      }
   }

   removeLife() {
      const hearts = document.querySelectorAll("img[src='images/liveHeart.png']")
      hearts[0].setAttribute('src', "images/lostHeart.png");
   }
}