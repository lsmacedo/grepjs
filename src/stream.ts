import fs from 'fs';
import readline from 'readline';

export const getFileStreams = (files: string[]): NodeJS.ReadableStream[] => {
  return files.map((file) => fs.createReadStream(file));
};

type ProcessFileStreamOptions = {
  forEachLine: (line: string) => void;
};

export const processStream = async (
  stream: NodeJS.ReadableStream,
  options: ProcessFileStreamOptions
) => {
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  return new Promise((resolve, reject) => {
    rl.on('line', options.forEachLine);
    rl.on('close', resolve);
    rl.on('error', reject);
  });
};
