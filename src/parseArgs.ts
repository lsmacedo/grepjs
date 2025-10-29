import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { InvalidArgsError } from '@src/errors';

export const parseArgs = (argv = process.argv) => {
  return yargs(hideBin(argv))
    .usage('$0 <pattern> [files...]', 'Search for pattern in files')
    .positional('pattern', {
      describe: 'Regular expression pattern to search for',
      type: 'string',
      demandOption: true,
    })
    .positional('files', {
      describe: 'Files to search in',
      type: 'string',
      array: true,
      demandOption: true,
    })
    .exitProcess(false)
    .fail((msg, err) => {
      if (err) throw err;
      throw new InvalidArgsError(msg);
    })
    .parseSync();
};
