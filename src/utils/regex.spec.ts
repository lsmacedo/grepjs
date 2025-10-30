import { buildRegExp, RegExpFlags } from '@src/utils/regex';

describe('buildRegExp', () => {
  const flags: RegExpFlags = {
    caseInsensitive: false,
    wordMatch: false,
    lineMatch: false,
  };

  it('creates simple RegExp instance from pattern', () => {
    const regExp = buildRegExp('hello', flags);
    expect(regExp).toBeInstanceOf(RegExp);
    expect(regExp.test('hello world')).toBe(true);
    expect(regExp.test('goodbye world')).toBe(false);
  });

  describe('caseInsensitive flag', () => {
    it('ignores case when caseInsensitive flag is true', () => {
      const regExp = buildRegExp('hello', { ...flags, caseInsensitive: true });
      expect(regExp.test('HELLO')).toBe(true);
    });

    it('is case sensitive when caseInsensitive flag is false', () => {
      const regExp = buildRegExp('hello', flags);
      expect(regExp.test('hello')).toBe(true);
      expect(regExp.test('HELLO')).toBe(false);
    });
  });

  describe('wordMatch flag', () => {
    it('matches only whole words if wordMatch flag is true', () => {
      const regExp = buildRegExp('he', { ...flags, wordMatch: true });
      expect(regExp.test('he llo')).toBe(true);
      expect(regExp.test('hello')).toBe(false);
    });

    it('matches subset of a word when wordMatch flag is false', () => {
      const regExp = buildRegExp('he', flags);
      expect(regExp.test('hello')).toBe(true);
    });
  });

  describe('lineMatch flag', () => {
    it('matches only entire line if lineMatch flag is true', () => {
      const regExp = buildRegExp('hello', { ...flags, lineMatch: true });
      expect(regExp.test('hello')).toBe(true);
      expect(regExp.test('hello world')).toBe(false);
    });

    it('matches subset of line if lineMatch flag is false', () => {
      const regExp = buildRegExp('hello', flags);
      expect(regExp.test('hello world')).toBe(true);
    });
  });

  describe('multiple flags combined', () => {
    it('matches whole words while case insensitive', () => {
      const regExp = buildRegExp('he', {
        ...flags,
        caseInsensitive: true,
        wordMatch: true,
      });
      expect(regExp.test('HELLO')).toBe(false);
      expect(regExp.test('HE LLO')).toBe(true);
    });

    it('matches entire line while case insensitive', () => {
      const regExp = buildRegExp('Hello World', {
        ...flags,
        caseInsensitive: true,
        lineMatch: true,
      });
      expect(regExp.test('this is a hello world')).toBe(false);
      expect(regExp.test('hello world')).toBe(true);
    });
  });
});
