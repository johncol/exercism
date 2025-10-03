//
// This is only a SKELETON file for the 'Scrabble Score' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const SCORE_TO_LETTERS = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z'],
}

const LETTER_TO_SCORE = (() => {
  const map = new Map();

  Object.entries(SCORE_TO_LETTERS).forEach(([score, letters]) => {
    letters.forEach(letter => {
      map.set(letter, Number(score));
    })
  });
  
  return map;
})()

export const score = (word) => {
  const initialScore = 0;
  const addLeterScoreFn = (totalScore, letterScore) => {
    return totalScore + letterScore;
  };
  return word.toUpperCase().split('')
    .map(letter => LETTER_TO_SCORE.get(letter))
    .reduce(addLeterScoreFn, initialScore)
};
