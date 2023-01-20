export const whoIsTyping = (names: string[]): string => {
  const [a, b, c] = names;
  switch (names.length) {
    case 0:
      return '';
    case 1:
      return `${a} is typing...`;
    case 2:
      return `${a} and ${b} are typing...`;
    case 3:
      return `${a}, ${b} and ${c} are typing...`;
    default:
      return `${a}, ${b} and ${names.length - 2} are typing...`;
  }
};
