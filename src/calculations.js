import { 
    PRONOUNS,
    SETTINGS, 
} from './data';

const {
    AVG_READING_TIME,
    X_LIMIT,
} = SETTINGS;


export function getNumofChars(str) {
    return str.length;
}

export function getNumofWords(str) {
    const words = str.match(/\S+/g);
    return words.length !== 0 ? words.length : 0
}

export function getLongestWord(str) {
    const words = str.match(/\S+/g);
    let longest;

    if (words.length !== 0) {
      longest = words.reduce((a, b) => (a.length >= b.length ? a : b));
    } else {
      longest = '';
    }
    return longest;
}

export function getNumofPronouns(str) {
    const normalizedPronouns = PRONOUNS.map((prn) => prn.toLowerCase());
    const normalizedString = str.toLowerCase();

    const locatedPronouns = normalizedString.match(
      new RegExp(`\\b(${normalizedPronouns.join('|')})\\b`, 'g')
    );
    
    return locatedPronouns ? locatedPronouns.length : 0
}

export function getReadTime(str) {
    const words = str.match(/\S+/g);    
    const avgReadingTime = AVG_READING_TIME / 60;

    if (words.length !== 0) {
      const timeInSeconds = words.length / avgReadingTime;
      const timeString = `${(timeInSeconds / 60) | 0} mins and ${
        timeInSeconds % 60 | 0
      } secs`;
      return timeString;
    } else {
      return '';
    }
}

export function getNumofSentences(str) {
    const sentences = str.match(/\w[.?!](\s|$)/g);
    return sentences 
      ? sentences.length
      : 0
}

export function getNumofParagraphs(str) {
    const paragraphs = str.match(/^(.+?)\n\s*\n/gm);
    return paragraphs 
      ? paragraphs.length + 1
      : 0
}

export function isOverXLimit(charLength) {
    return charLength >= X_LIMIT    
}