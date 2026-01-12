export function fuzzyMatch(input: string, candidate: string): boolean {
  if (input === '') return true;
  if (candidate === '') return false;

  const search = input.toLowerCase();
  const text = candidate.toLowerCase();

  let searchIndex = 0;
  let textIndex = 0;

  while (searchIndex < search.length && textIndex < text.length) {
    if (search[searchIndex] === text[textIndex]) {
      searchIndex++;
    }
    textIndex++;
  }

  return searchIndex === search.length;
}

export function fuzzyScore(input: string, candidate: string): number {
  if (input === '') return 0;
  const search = input.toLowerCase();
  const text = candidate.toLowerCase();
  
  if (search === text) return 1000;
  
  let score = 0;
  let searchIdx = 0;
  let textIdx = 0;
  let prevMatchIdx = -1;
  
  while (searchIdx < search.length && textIdx < text.length) {
    if (search[searchIdx] === text[textIdx]) {
        score += 10; // Base match
        
        if (prevMatchIdx !== -1 && textIdx === prevMatchIdx + 1) {
            score += 20; // Consecutive bonus
        }
        
        if (textIdx === 0) {
            score += 15; // Start of string bonus
        }
        
        prevMatchIdx = textIdx;
        searchIdx++;
    }
    textIdx++;
  }
  
  if (searchIdx < search.length) return -1000; // No full match
  
  // Penalize for unused characters (length difference)
  score -= (text.length - search.length);
  
  return score;
}
