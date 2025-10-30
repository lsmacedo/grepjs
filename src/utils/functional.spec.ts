import { pipe } from '@src/utils/functional';

describe('pipe', () => {
  it('returns original value when no functions are provided', () => {
    const result = pipe('hello');
    expect(result).toBe('hello');
  });

  it('applies function to value', () => {
    const uppercase = (s: string) => s.toUpperCase();
    const result = pipe('hello', uppercase);
    expect(result).toBe('HELLO');
  });

  it('applies multiple functions in left-to-right order', () => {
    const uppercase = (s: string) => s.toUpperCase();
    const addExclamation = (s: string) => `${s}!`;
    const repeat = (s: string) => `${s} ${s}`;

    const result = pipe('hello', uppercase, addExclamation, repeat);
    expect(result).toBe('HELLO! HELLO!');
  });
});
