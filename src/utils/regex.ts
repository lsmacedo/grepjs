import { pipe } from '@src/utils/functional';

export type RegExpFlags = {
  caseInsensitive: boolean;
  wordMatch: boolean;
  lineMatch: boolean;
};

export const buildRegExp = (pattern: string, flags: RegExpFlags) => {
  const applyWordMatch = (p: string) => (flags.wordMatch ? `\\b${p}\\b` : p);
  const applyLineMatch = (p: string) => (flags.lineMatch ? `^${p}$` : p);

  return new RegExp(
    pipe(pattern, applyWordMatch, applyLineMatch),
    flags.caseInsensitive ? 'gi' : 'g'
  );
};

export const highlightMatches = (
  text: string,
  matches: RegExpExecArray[],
  highlightFn: (match: string) => string
) => {
  const [result, lastIndex] = matches.reduce(
    ([acc, lastIndex], match) => [
      acc + text.slice(lastIndex, match.index) + highlightFn(match[0]),
      match.index + match[0].length,
    ],
    ['', 0] as [string, number]
  );
  return result + text.slice(lastIndex);
};
