#!/usr/bin/env node

import { parseArgs } from '@src/parseArgs';
import { getFileStreams, processFileStream } from '@src/stream';
import { testPattern } from '@src/regex';
import { InvalidArgsError } from '@src/errors';

(async () => {
  try {
    const argv = parseArgs();

    if (!argv.pattern) {
      process.exit(0);
    }

    const streams = argv.files.length
      ? getFileStreams(argv.files)
      : [process.stdin];

    for (const stream of streams) {
      await processFileStream(stream, (line) =>
        testPattern(line, argv.pattern, console.log)
      );
    }
  } catch (err) {
    if (err instanceof InvalidArgsError) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
})();
