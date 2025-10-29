#!/usr/bin/env node

import { CliParsedArgs, runCli } from '@src/cli';
import { getFileStreams, processStream } from '@src/stream';
import { testPattern } from '@src/regex';
import { runWithErrorHandler as runWithErrorHandling } from '@src/errors';

const main = async (args: CliParsedArgs) => {
  const streams = args.files.length
    ? getFileStreams(args.files)
    : [process.stdin];

  for (const stream of streams) {
    await processStream(stream, {
      forEachLine: (line) => {
        if (testPattern(line, args.pattern)) {
          console.log(line);
        }
      },
    });
  }
};

void runWithErrorHandling(runCli(main));
