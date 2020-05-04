import { isCarRestrictedAdapter } from './modules/picoyplaca/useCases/isCarRestricted/';
import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { prompt } = require('enquirer');

class Mycli extends Command {
  static description = 'describe the command here';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    plate: flags.string({
      char: 'p',
      description:
        'License plate: Three uppercase letters, one dash (-), and four numbers. Ex: ABF-2934'
    }),
    date: flags.string({
      char: 'd',
      description:
        'Circulation Date: Four numbers for year, one dash (-), two numbers for month (00-12), one dash, and two numbers for day (00-31). Ex: 2020-05-04'
    }),
    time: flags.string({
      char: 't',
      description:
        'Circulation Time: Two numbers for hours (01-24), one colon (:) , and two numbers for minutes (00-59). Ex. 14:20 '
    })
  };

  async run() {
    const { flags } = this.parse(Mycli);
    if (typeof flags.plate === 'undefined') {
      flags.plate = await prompt({
        type: 'input',
        name: 'plate',
        message: `What is your ${chalk.bold.green(
          'license plate'
        )}? I.e. ABG-4954`
      })
        .then(({ plate }: { plate: string }) => plate)
        .catch(console.error);
    }

    if (typeof flags.date === 'undefined') {
      flags.date = await prompt({
        type: 'input',
        name: 'date',
        message: `What ${chalk.bold.green('date')}? I.e. 2020-05-04`
      })
        .then(({ date }: { date: string }) => date)
        .catch(console.error);
    }

    if (typeof flags.time === 'undefined') {
      flags.time = await prompt({
        type: 'input',
        name: 'time',
        message: `What ${chalk.bold.green('time')}? I.e. 08:30`
      })
        .then(({ time }: { time: string }) => time)
        .catch(console.error);
    }

    const { plate = '', date = '', time = '' } = flags;

    const result = isCarRestrictedAdapter.execute({
      plate,
      date,
      time
    });
    this.log(result);
  }
}

export = Mycli;
