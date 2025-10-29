import { parseArgs } from '@src/args';
import { InvalidArgsError } from '@src/errors';

describe('parseArgs', () => {
  const bin = ['/path/to/nodejs', '/path/to/grepjs'] as const;

  it('throws if pattern is missing', () => {
    expect(() => parseArgs([...bin])).toThrow(InvalidArgsError);
  });

  it('parses pattern without files', () => {
    const result = parseArgs([...bin, 'test-pattern']);
    expect(result.pattern).toBe('test-pattern');
    expect(result.files).toEqual([]);
  });

  it('parses pattern when provided', () => {
    const result = parseArgs([...bin, 'test-pattern']);
    expect(result.pattern).toBe('test-pattern');
  });

  it('parses single file along with pattern', () => {
    const result = parseArgs([...bin, 'test-pattern', 'file1.txt']);
    expect(result.pattern).toBe('test-pattern');
    expect(result.files).toEqual(['file1.txt']);
  });

  it('parses multiple files along with pattern', () => {
    const result = parseArgs([
      ...bin,
      'test-pattern',
      'file1.txt',
      'file2.txt',
      'file3.txt',
    ]);
    expect(result.pattern).toBe('test-pattern');
    expect(result.files).toEqual(['file1.txt', 'file2.txt', 'file3.txt']);
  });
});
