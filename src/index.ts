#!/usr/bin/env node

import { CliParsedArgs, runCli } from '@src/cli';
import { getFileStreams, processStream } from '@src/utils/stream';
import { buildRegExp } from '@src/utils/regex';

const main = async (args: CliParsedArgs) => {
  const regExp = buildRegExp(args.pattern, {
    caseInsensitive: args.ignoreCase,
    wordMatch: args.wordRegexp,
    lineMatch: args.lineRegexp,
  });

  const streams = args.files.length
    ? getFileStreams(args.files)
    : [process.stdin];

  for (const stream of streams) {
    await processStream(stream, {
      forEachLine: (line) => {
        if (regExp.test(line) !== args.invertMatch) {
          console.log(line);
        }
      },
    });
  }
};

void runCli(main);
