import { runCli } from '@src/cli';
import { InvalidArgsError } from '@src/errors';

describe('runCli', () => {
  const bin = ['/path/to/nodejs', '/path/to/grepjs'] as const;

  it('throws if pattern is missing', async () => {
    const handler = jest.fn();
    expect(() => runCli(handler, [...bin])).toThrow(InvalidArgsError);
    expect(handler).not.toHaveBeenCalled();
  });

  it('parses pattern without files', async () => {
    const handler = jest.fn();
    runCli(handler, [...bin, 'test-pattern']);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        pattern: 'test-pattern',
        files: [],
      })
    );
  });

  it('parses single file along with pattern', async () => {
    const handler = jest.fn();
    runCli(handler, [...bin, 'test-pattern', 'file1.txt']);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        pattern: 'test-pattern',
        files: ['file1.txt'],
      })
    );
  });

  it('parses multiple files along with pattern', async () => {
    const handler = jest.fn();
    runCli(handler, [
      ...bin,
      'test-pattern',
      'file1.txt',
      'file2.txt',
      'file3.txt',
    ]);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        pattern: 'test-pattern',
        files: ['file1.txt', 'file2.txt', 'file3.txt'],
      })
    );
  });
});
