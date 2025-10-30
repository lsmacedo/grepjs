import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export type CliParsedArgs = Awaited<
  ReturnType<typeof grepCommandBuilder>['argv']
>;

const grepCommandBuilder = (builder: ReturnType<typeof yargs>) => {
  return builder
    .option('ignore-case', {
      description: 'Ignores case distinctions',
      type: 'boolean',
      alias: 'i',
      default: false,
    })
    .option('invert-match', {
      description:
        'Inverts the search, selecting all lines that do not contain the pattern',
      type: 'boolean',
      alias: 'v',
      default: false,
    })
    .option('word-regexp', {
      description: 'Matches only whole words',
      type: 'boolean',
      alias: 'w',
      default: false,
    })
    .option('line-regexp', {
      description:
        'Matches only if the pattern is an exact match for the entire line',
      type: 'boolean',
      alias: 'x',
      default: false,
    })
    .positional('pattern', {
      describe: 'Regular expression pattern to search for',
      type: 'string',
      demandOption: true,
    })
    .positional('files', {
      describe: 'Files to search in',
      type: 'string',
      array: true,
      default: [],
    });
};

export const runCli = (
  handler: (argv: CliParsedArgs) => Promise<void>,
  argv = process.argv
) => {
  return yargs(hideBin(argv))
    .command(
      '$0 <pattern> [files...]',
      'Search for pattern in files',
      grepCommandBuilder,
      handler
    )
    .exitProcess(process.env.NODE_ENV !== 'test')
    .parseAsync();
};
