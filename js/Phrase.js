class Phrase {
   constructor(phrase) {
      this.phrase = phrase.toLowerCase();
   }

   /**
    * Adds letter placeholders to the display
    * when the game starts (each letter represented
    * by an empty (li) box).
    */
   addPhraseToDisplay() {
      const phraseArr = this.phrase.split('');
      phraseArr.forEach(letter => {
         const li = document.createElement('li');
         const isLetter = /\w/.test(letter);
         if (isLetter) {
            li.classList.add('hide', 'letter', `'${letter}'`);
         } else {   
            li.classList.add('space');
         }
         li.textContent = isLetter ? letter
            : ' ';
         phraseList.append(li);
      });
   }

   /**
    * Checks to see if the letter selected by the player matches
    * a letter in the phrase
    */
   checkLetter(letter) {
      return this.phrase.includes(letter);
   }

   /**
    * Reveals the letter(s) on the board that match the 
    * player's selection
    */
   showMatchedLetter(letter) {
      for (let ltr of letters) {
         if (ltr.textContent === letter) {
            ltr.classList.remove('hide');
            ltr.classList.add('show');
         }
      }
   }
};