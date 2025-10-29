export const testPattern = (
  line: string,
  pattern: string,
  onMatch: (line: string) => void
) => {
  const regExp = new RegExp(pattern);
  if (regExp.test(line)) {
    onMatch(line);
  }
};
