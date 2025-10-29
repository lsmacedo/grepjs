import { testPattern } from '@src/regex';

describe('testPattern', () => {
  it('returns true when pattern matches', () => {
    expect(testPattern('hello world', 'world')).toBe(true);
  });

  it('returns false when pattern does not match', () => {
    expect(testPattern('hello world', 'foo')).toBe(false);
  });

  it('matches case-sensitive', () => {
    expect(testPattern('Hello World', 'hello')).toBe(true);
  });

  it('matches partial word', () => {
    expect(testPattern('testing patterns', 'test')).toBe(true);
  });

  it('matches empty string pattern against any line', () => {
    expect(testPattern('any line', '')).toBe(true);
  });
});
