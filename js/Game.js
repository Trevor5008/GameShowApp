const startScrn = document.getElementById('overlay');
const phraseList = document.getElementById('phrase').firstElementChild;

class Game {
   constructor() {
      this.missed = 0;
      // array of five phrases to choose from
      this.phrases = ["I'll be back", "Luke, I am your father", "Release the Kraken!", "Bond, James Bond", "Say hello to my little friend!"];
      this.activePhrase = null;
   }

   startGame() {
      // clear out any li child nodes on phrase ul node
      while (phraseList.firstChild) {
         phraseList.removeChild(phraseList.firstChild);
      }

      const keyBtns = document.querySelectorAll('.key');
      // Enable all the onscreen kb buttons, and update to use 'key'
      // class (not 'chosen' or 'wrong' classes)
      for (let key of keyBtns) {
         key.classList.remove('wrong');
         key.classList.remove('chosen');
         key.removeAttribute('disabled');
         key.classList.add('key');
      }

      const hearts = document.getElementsByClassName('tries');
      for (let heart of hearts) {
         heart.firstElementChild.setAttribute('src', 'images/liveHeart.png');
      }
      // hide the start screen overlay
      startScrn.style.display = 'none';
      // sets activePhrase to one of the 5 phrases
      const phrase = this.getRandomPhrase();
      this.activePhrase = new Phrase(phrase);
      this.activePhrase.addPhraseToDisplay();
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
      const phraseObj = this.activePhrase; 
      const phraseTxt = phraseObj.phrase;
      if (!phraseTxt.includes(letter)) {
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
               phraseObj.showMatchedLetter(letter);
               const hasWon = this.checkForWin();
               if (hasWon) {
                  this.gameOver(true);
               }
            }
         }
      }
   }

   /**
    * Removes a life from the scoreboard, by replacing the liveHeart img,
    * with a lostHeart img... increments missed counter and checks for 5 misses
    */
   removeLife() {
      const hearts = document.querySelectorAll("img[src='images/liveHeart.png']")
      hearts[0].setAttribute('src', "images/lostHeart.png");
      this.missed++;
      if (this.missed === 5) {
         this.gameOver(false);
      }
   }

   /**
    * Checks to see if the player has revealed all of the letters 
    * in the active phrase.
    */
   checkForWin() {
      const letters = phraseList.childNodes;
      // iterate over li's
      for (let letter of letters) {
        if (letter.classList.contains('hide')) {
         // still hidden means game is not over  
          return false;
        }
      }
      return true;
   }

   /**
    * Displays the original start screen overlay, along with the 
    * outcome of the last game.
    */
   gameOver(hasWinner) {
      // display the start screen overlay
      startScrn.style.display = 'block';
      startScrn.classList.remove('start');
      if (hasWinner) {
         startScrn.querySelector('h1').textContent = "You Win!";
         startScrn.classList.add('win');
      } else {
         startScrn.querySelector('h1').textContent = "You lost :(";
         startScrn.classList.add('lose');
      }
   }
}