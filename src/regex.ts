export const testPattern = (text: string, pattern: string) => {
  const regExp = new RegExp(pattern);
  return regExp.test(text);
};
