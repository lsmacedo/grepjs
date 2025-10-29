import fs from 'fs';
import readline from 'readline';

export const getFileStreams = (files: string[]): NodeJS.ReadableStream[] => {
  return files.map((file) => fs.createReadStream(file));
};

export const processFileStream = async (
  stream: NodeJS.ReadableStream,
  onLine: (line: string) => void
) => {
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  return new Promise((resolve, reject) => {
    rl.on('line', onLine);
    rl.on('close', resolve);
    rl.on('error', reject);
  });
};
