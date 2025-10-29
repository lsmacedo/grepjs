import { testPattern } from '@src/regex';

describe('testPattern', () => {
  let mockOnMatch: jest.Mock;

  beforeEach(() => {
    mockOnMatch = jest.fn();
  });

  it('calls onMatch when pattern matches', () => {
    testPattern('hello world', 'world', mockOnMatch);

    expect(mockOnMatch).toHaveBeenCalledTimes(1);
    expect(mockOnMatch).toHaveBeenCalledWith('hello world');
  });

  it('does not call onMatch when pattern does not match', () => {
    testPattern('hello world', 'foo', mockOnMatch);

    expect(mockOnMatch).not.toHaveBeenCalled();
  });

  it('matches case-sensitive', () => {
    testPattern('Hello World', 'hello', mockOnMatch);

    expect(mockOnMatch).not.toHaveBeenCalled();
  });

  it('matches partial word', () => {
    testPattern('testing patterns', 'test', mockOnMatch);

    expect(mockOnMatch).toHaveBeenCalledTimes(1);
  });

  it('matches empty string pattern against any line', () => {
    testPattern('any line', '', mockOnMatch);

    expect(mockOnMatch).toHaveBeenCalledTimes(1);
  });
});
