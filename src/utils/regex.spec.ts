import { buildRegExp, highlightMatches, RegExpFlags } from '@src/utils/regex';

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

describe('highlightMatches', () => {
  const bracketHighlight = (text: string) => `[${text}]`;

  it('highlights match at the beginning of text', () => {
    const text = 'hello world';
    const regex = /hello/g;
    const match = regex.exec(text);
    const matches = match ? [match] : [];

    const result = highlightMatches(text, matches, bracketHighlight);
    expect(result).toBe('[hello] world');
  });

  it('highlights match at the end of text', () => {
    const text = 'hello world';
    const regex = /world/g;
    const match = regex.exec(text);
    const matches = match ? [match] : [];

    const result = highlightMatches(text, matches, bracketHighlight);
    expect(result).toBe('hello [world]');
  });

  it('highlights multiple matches', () => {
    const text = 'the quick brown fox jumps over the lazy dog';
    const regex = /the/g;
    const matches: RegExpExecArray[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match);
    }

    const result = highlightMatches(text, matches, bracketHighlight);
    expect(result).toBe('[the] quick brown fox jumps over [the] lazy dog');
  });

  it('returns original text when matches array is empty', () => {
    const text = 'hello world';
    const matches: RegExpExecArray[] = [];

    const result = highlightMatches(text, matches, bracketHighlight);
    expect(result).toBe('hello world');
  });

  it('highlights entire text when fully matched', () => {
    const text = 'hello';
    const regex = /hello/g;
    const match = regex.exec(text);
    const matches = match ? [match] : [];

    const result = highlightMatches(text, matches, bracketHighlight);
    expect(result).toBe('[hello]');
  });
});
