#!/usr/bin/env node

import { CliParsedArgs, runCli } from '@src/cli';
import { getFileStreams, processStream } from '@src/utils/stream';
import { buildRegExp, highlightMatches } from '@src/utils/regex';

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
        const matches = Array.from(line.matchAll(regExp));

        if (Boolean(matches.length) === args.invertMatch) {
          return;
        }

        console.log(
          args.invertMatch
            ? line
            : highlightMatches(
                line,
                matches,
                (match) => `\x1b[31m${match}\x1b[0m`
              )
        );
      },
    });
  }
};

void runCli(main);
