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
    flags.caseInsensitive ? 'i' : ''
  );
};
