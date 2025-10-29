import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { InvalidArgsError } from '@src/errors';

export type CliParsedArgs = Awaited<
  ReturnType<typeof grepCommandBuilder>['argv']
>;

const grepCommandBuilder = (builder: ReturnType<typeof yargs>) => {
  return builder
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
    .exitProcess(false)
    .fail((msg, err) => {
      if (err) throw err;
      throw new InvalidArgsError(msg);
    })
    .parseAsync();
};
