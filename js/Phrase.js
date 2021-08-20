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
      const phraseDiv = document.getElementById('phrase').querySelector('ul');
      const phraseArr = this.phrase.split('');
      phraseArr.forEach(letter => {
         const li = document.createElement('li');
         const isLetter = /\w/.test(letter);
         if (isLetter) {
            li.classList.add('hide', 'letter', `'${letter}'`);
            li.textContent = letter;
         } else if (letter === ' ') {
            li.classList.add('space');
            li.textContent = ' ';
         }
         phraseDiv.append(li);
      });

   }

   /**
    * Checks to see if the letter selectedby the player matches
    * a letter in the phrase
    */
   checkLetter() {

   }

   /**
    * Reveals the letter(s) on the board that match the 
    * player's selection
    */
   showMatchedLetter() {

   }
};