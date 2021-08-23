class Game {
   constructor() {
      this.missed = 0;
      // transforms array of strings into array of phrase objects
      this.phrases = phraseBank.map(phrase => new Phrase(phrase));
      this.activePhrase = null;
   }

   /**
    * Helper function used for customizable theme
    * @param {string} theme - global theme setting
    * chosen at start menu
    */
   themeStyler(theme) {
      // Set theme
      if (theme === 'future') {
         fontFam = `'Audiowide', cursive`;
         textColor = '#566aee';
      } else if (theme === 'tropics') {
         fontFam = `'Nanum Pen Script', cursive`;
         textColor = '#fdff93';
      } else if (theme === 'nature') {
         fontFam = `'Cinzel', serif`;
       
      } else if (theme === 'hacker') {
         fontFam = `'Permanent Marker', cursive`;
         textColor = '#ff26ee';
      } 
      // sets the background theme
      body.classList.add(themeChoice);

      titleHeader.style.fontFamily = fontFam;
      titleHeader.style.color = textColor;
      // style keys with chosen theme
      for (let key of keyBtns) {
         key.style.fontFamily = fontFam;
      }
   }

   startGame() {
      for (let key of keyBtns) {
         key.classList.add('key');
      }
      winner = false;
      theme.style.display = 'block';
      startScrn.classList.remove('win', 'lose');
      // short-circuit eval to set randomized default theme (if not selected)
      themeChoice = themeChoice || this.randomizer(themes, themes.length);
      // use helper method to apply custom styles
      this.themeStyler(themeChoice);

      const hearts = document.getElementsByClassName('tries');
      for (let heart of hearts) {
         heart.firstElementChild.setAttribute('src', 'images/liveHeart.png');
      }
      // hide the start screen overlay
      startScrn.style.display = 'none';
      // sets activePhrase to one of the 5 phrases
      const phrase = this.getRandomPhrase();
      this.activePhrase = phrase;
      this.activePhrase.addPhraseToDisplay();
      // activate chosen theme
      for (let letter of letters) {
         letter.style.fontFamily = fontFam;
      }
   }
   /**
    * Helper method used in getRandomPhrase() and w/in startGame()
    * @param {Array} collection - source of data to randomize 
    * @param {Number} length - length of collection being evaluated
    * @returns - randomized value from source collection
    */
   randomizer(collection, length) {
      const idx = Math.floor(Math.random() * length);
      return collection[idx];
   }

   getRandomPhrase() {
      const length = this.phrases.length;
      return this.randomizer(this.phrases, length);
   }

   /**
    * Checks to see if the button clicked by the player matches a letter in the activePhrase
    */
   handleInteraction(keys, letter) {   
      const phraseObj = this.activePhrase; 
      const phraseTxt = phraseObj.phrase;
      if (!phraseTxt.includes(letter)) {
         for (let key of keys) {
            if (key.textContent === letter) {
               key.classList.add('wrong');
               key.setAttribute('disabled', true);
            }
         }
         this.removeLife();
      } else {
         for (let key of keys) {
            if (key.textContent === letter) {
               key.classList.add('chosen');
               key.setAttribute('disabled', true);
               phraseObj.showMatchedLetter(letter);
               winner = this.checkForWin();
               if (winner) {
                  this.gameOver();
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
         this.gameOver();
      }
   }

   /**
    * Checks to see if the player has revealed all of the letters 
    * in the active phrase.
    */
   checkForWin() {
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
    * Helper used inside of gameOver()
    */
   resetBoard() {
       // clear out any li child nodes on phrase ul node
       while (phraseList.firstChild) {
         phraseList.removeChild(phraseList.firstChild);
       }
 
       // Enable all the onscreen kb buttons, and update to use 'key'
       // class (not 'chosen' or 'wrong' classes)
       for (let key of keyBtns) {
          key.classList.remove('wrong');
          key.classList.remove('chosen');
          key.removeAttribute('disabled');
          key.classList.add('key');
       }
       // reset keys chosen
       keysChosen = [];
   }
   /**
    * Displays the original start screen overlay, along with the 
    * outcome of the last game.
    */
   gameOver() {
      this.resetBoard();
      theme.style.display = 'none';
      // display the start screen overlay
      startScrn.style.display = 'block';
      startScrn.classList.remove('start');
      // conditionally set text and class
      heading.textContent = winner ? "You Win!" : "You Lost :(";
      startScrn.classList.add(`${winner ? 'win' : 'lose'}`);
      startBtn.textContent = 'Play again';
   }
}