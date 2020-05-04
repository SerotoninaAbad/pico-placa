import { PicoPlaca } from './picoPlaca';
import { Rule } from './rule';

export class PlateDateRule implements Rule {
  private _dayPlateRestriction = [
    [],
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 0],
    []
  ];

  public isRestricted(picoPlaca: PicoPlaca): boolean {
    const dayOfWeek = picoPlaca.getDayOfWeek();
    const lastDigit = picoPlaca.getLastDigit();
    const lastDigitsInDayArray: number[] = this._dayPlateRestriction[dayOfWeek];
    return lastDigitsInDayArray.includes(lastDigit);
  }
}
