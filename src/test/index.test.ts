import { test } from '@oclif/test';
import Mycli from '../index';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { prompt } = require('enquirer');
jest.mock('enquirer', () => ({
  prompt: () =>
    Promise.resolve({ plate: 'ABC-1234', date: '2020-05-04', time: '20:00' })
}));

describe('pico-placa command', () => {
  test
    .stdout()
    .do(() => Mycli.run(['-p', 'ABG-', '-d', '2020-02-24', '-t', '13:00']))
    .it('Should detect invalid plate', (ctx) => {
      expect(ctx.stdout).toBe(
        'Plate "ABG-" is invalid. Plate format example: ABG-3454\n'
      );
    });

  test
    .stdout()
    .do(() => Mycli.run(['-p', 'ABG-8280', '-d', '202002-24', '-t', '13:00']))
    .it('Should detect invalid date', (ctx) => {
      expect(ctx.stdout).toBe(
        'Date "202002-24" is invalid. Date format example: 2020-05-31\n'
      );
    });

  test
    .stdout()
    .do(() => Mycli.run(['-p', 'ABG-8280', '-d', '2020-02-24', '-t', '25:00']))
    .it('Should detect invalid time', (ctx) => {
      expect(ctx.stdout).toBe(
        'Time "25:00" is invalid. Time format example: 20:15\n'
      );
    });

  test
    .stdout()
    .do(() => Mycli.run(['-p', 'ABG-8280', '-d', '2020-02-24', '-t', '21:00']))
    .it('Should allow circulation', (ctx) => {
      expect(ctx.stdout).toBe('The car can be on the road\n');
    });

  test
    .stdout()
    .do(() => Mycli.run(['-p', 'ABG-8280', '-d', '2020-05-08', '-t', '19:00']))
    .it('Should restrict circulation', (ctx) => {
      expect(ctx.stdout).toBe("The car can't be on the road\n");
    });

  test
    .stdout()
    .do(() => {
      return Mycli.run(['-d', '2020-02-24', '-t', '13:00']);
    })
    .it('Should ask plate', (ctx) => {
      expect(ctx.stdout).toBe('The car can be on the road\n');
    });

  test
    .stdout()
    .do(() => {
      return Mycli.run(['-p', 'ABG-1234', '-t', '13:00']);
    })
    .it('Should ask date', (ctx) => {
      expect(ctx.stdout).toBe('The car can be on the road\n');
    });

  test
    .stdout()
    .do(() => {
      return Mycli.run(['-p', 'ABG-1234', '-d', '2020-02-24']);
    })
    .it('Should ask time', (ctx) => {
      expect(ctx.stdout).toBe('The car can be on the road\n');
    });
});
