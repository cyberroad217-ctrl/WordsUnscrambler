import { WORD_SET } from "./words";

export interface WordFilterOptions {
  startsWith?: string;
  endsWith?: string;
  contains?: string;
  includeRequired?: string;
  minLength?: number;
  maxLength?: number;
}

// Count character frequencies in a string
function countLetters(str: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const char of str.toLowerCase()) {
    if (/[a-z]/.test(char)) {
      counts[char] = (counts[char] || 0) + 1;
    }
  }
  return counts;
}

// Check if a word can be formed from available letters
function canFormWord(word: string, availableLetters: Record<string, number>): boolean {
  const wordLetters = countLetters(word);
  for (const [char, count] of Object.entries(wordLetters)) {
    if ((availableLetters[char] || 0) < count) {
      return false;
    }
  }
  return true;
}

// Find all valid words that can be formed from the given letters
export function findUnscrambledWords(
  letters: string,
  options?: WordFilterOptions
): string[] {
  if (!letters.trim()) {
    return [];
  }

  const availableLetters = countLetters(letters);
  const results: string[] = [];

  // Iterate through all words in dictionary
  for (const word of WORD_SET) {
    // Check if word can be formed from available letters
    if (!canFormWord(word, availableLetters)) {
      continue;
    }

    // Apply filters
    if (options) {
      // Filter by starting letter(s)
      if (options.startsWith && !word.startsWith(options.startsWith.toLowerCase())) {
        continue;
      }

      // Filter by ending letter(s)
      if (options.endsWith && !word.endsWith(options.endsWith.toLowerCase())) {
        continue;
      }

      // Filter by containing letter(s)
      if (options.contains) {
        const containsLetters = options.contains.toLowerCase();
        let hasAll = true;
        for (const char of containsLetters) {
          if (!word.includes(char)) {
            hasAll = false;
            break;
          }
        }
        if (!hasAll) {
          continue;
        }
      }

      // Filter by requiring specific letter(s)
      if (options.includeRequired) {
        const requiredLetters = options.includeRequired.toLowerCase();
        let hasRequired = true;
        for (const char of requiredLetters) {
          if (!word.includes(char)) {
            hasRequired = false;
            break;
          }
        }
        if (!hasRequired) {
          continue;
        }
      }

      // Filter by length
      if (options.minLength && word.length < options.minLength) {
        continue;
      }
      if (options.maxLength && word.length > options.maxLength) {
        continue;
      }
    }

    results.push(word);
  }

  // Sort by length (longest first) then alphabetically
  return results.sort((a, b) => {
    if (b.length !== a.length) {
      return b.length - a.length;
    }
    return a.localeCompare(b);
  });
}

// Get word statistics
export function getWordStats(words: string[]) {
  if (words.length === 0) {
    return { totalWords: 0, avgLength: 0, minLength: 0, maxLength: 0 };
  }

  const lengths = words.map(w => w.length);
  const totalLength = lengths.reduce((a, b) => a + b, 0);
  
  return {
    totalWords: words.length,
    avgLength: Math.round(totalLength / words.length * 10) / 10,
    minLength: Math.min(...lengths),
    maxLength: Math.max(...lengths),
  };
}
