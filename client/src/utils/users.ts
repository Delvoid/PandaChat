export function capFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
