import { PicoPlaca } from './picoPlaca';
import { Rule } from './rule';

export class TimeRule implements Rule {
  private _timeRestriction = [
    {
      from: {
        hours: 7,
        minutes: 0
      },
      to: {
        hours: 9,
        minutes: 30
      }
    },
    {
      from: {
        hours: 16,
        minutes: 0
      },
      to: {
        hours: 19,
        minutes: 30
      }
    }
  ];

  private _baseDate = Date.now();

  private _getTimeInMilliseconds(hours: number, minutes: number): number {
    const date = new Date(this._baseDate);
    date.setHours(hours, minutes, 0);
    return date.getTime();
  }

  public isRestricted(picoPlaca: PicoPlaca): boolean {
    const time = this._getTimeInMilliseconds(
      picoPlaca.getHours(),
      picoPlaca.getMinutes()
    );

    let inRange = false;

    this._timeRestriction.forEach((range) => {
      const lowRange = this._getTimeInMilliseconds(
        range.from.hours,
        range.from.minutes
      );

      const highRange = this._getTimeInMilliseconds(
        range.to.hours,
        range.to.minutes
      );

      if (lowRange <= time && highRange >= time) {
        inRange = true;
      }
    });

    return inRange;
  }
}
