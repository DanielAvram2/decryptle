export const isLetter = (character: string) => {
  return character.length === 1 && character.match(/[a-z]/i);
}

export const isUpperCase = (str: string) => {
  return str.toUpperCase() == str;
}