import fs from 'fs';
import { Readable } from 'stream';
import { getFileStreams, processFileStream } from '@src/stream';

jest.mock('fs');

describe('getFileStreams', () => {
  const mockCreateReadStream = jest.mocked(fs.createReadStream);

  beforeEach(() => {
    mockCreateReadStream.mockClear();
  });

  it('creates read streams for each file', () => {
    const result = getFileStreams(['file1.txt', 'file2.txt', 'file3.txt']);
    const calls = mockCreateReadStream.mock.results;

    expect(mockCreateReadStream).toHaveBeenCalledTimes(3);
    expect(mockCreateReadStream).toHaveBeenNthCalledWith(1, 'file1.txt');
    expect(mockCreateReadStream).toHaveBeenNthCalledWith(2, 'file2.txt');
    expect(mockCreateReadStream).toHaveBeenNthCalledWith(3, 'file3.txt');

    expect(result).toHaveLength(3);
    expect(result[0]).toBe(calls[0].value);
    expect(result[1]).toBe(calls[1].value);
    expect(result[2]).toBe(calls[2].value);
  });

  it('creates read stream for single file', () => {
    getFileStreams(['single-file.txt']);

    expect(mockCreateReadStream).toHaveBeenCalledTimes(1);
    expect(mockCreateReadStream).toHaveBeenCalledWith('single-file.txt');
  });

  it('returns empty array when given an empty array', () => {
    const result = getFileStreams([]);

    expect(mockCreateReadStream).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});

describe('processFileStream', () => {
  const createMockStream = (lines: string[]): NodeJS.ReadableStream => {
    return new Readable({
      read() {
        lines.forEach((line) => this.push(line + '\n'));
        this.push(null);
      },
    });
  };

  it('calls onLine for each line in the stream', async () => {
    const lines = ['line 1', 'line 2', 'line 3'];
    const stream = createMockStream(lines);
    const mockOnLine = jest.fn();

    await processFileStream(stream, mockOnLine);

    expect(mockOnLine).toHaveBeenCalledTimes(3);
    expect(mockOnLine).toHaveBeenNthCalledWith(1, 'line 1');
    expect(mockOnLine).toHaveBeenNthCalledWith(2, 'line 2');
    expect(mockOnLine).toHaveBeenNthCalledWith(3, 'line 3');
  });

  it('handles empty stream', async () => {
    const stream = createMockStream([]);
    const mockOnLine = jest.fn();

    await processFileStream(stream, mockOnLine);

    expect(mockOnLine).not.toHaveBeenCalled();
  });

  it('rejects when stream emits error', async () => {
    const stream: NodeJS.ReadableStream = new Readable({
      read() {
        this.emit('error', new Error('Stream error'));
      },
    });

    const mockOnLine = jest.fn();

    await expect(processFileStream(stream, mockOnLine)).rejects.toThrow(
      'Stream error'
    );
  });
});
