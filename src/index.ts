#!/usr/bin/env node

import { parseArgs } from '@src/args';
import { getFileStreams, processStream } from '@src/stream';
import { testPattern } from '@src/regex';
import { runWithErrorHandler } from '@src/errors';

const main = async () => {
  const argv = parseArgs();

  if (!argv.pattern) {
    process.exit(0);
  }

  const streams = argv.files.length
    ? getFileStreams(argv.files)
    : [process.stdin];

  for (const stream of streams) {
    await processStream(stream, {
      forEachLine: (line) => {
        if (testPattern(line, argv.pattern)) {
          console.log(line);
        }
      },
    });
  }
};

(async () => {
  await runWithErrorHandler(main);
})();
