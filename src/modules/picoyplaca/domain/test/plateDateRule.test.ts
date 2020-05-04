import { DateTime } from '../datetime';
import { PicoPlaca } from '../picoPlaca';
import { Plate } from '../plate';
import { PlateDateRule } from '../plateDateRule';

describe('PlateDateRule', () => {
  test('Should restrict last digit', () => {
    const plate = Plate.create({ value: 'ABG-9281' });
    const dateTime = DateTime.create({ date: '2020-05-04', time: '09:00' });
    const picoPlaca = PicoPlaca.create({
      plate: plate.getValue(),
      dateTime: dateTime.getValue()
    });
    const plateDateRule = new PlateDateRule();
    const isLastDigitRestrictedInDay = plateDateRule.isRestricted(
      picoPlaca.getValue()
    );
    expect(isLastDigitRestrictedInDay).toBe(true);
  });

  test('Should not restrict last digit', () => {
    const plate = Plate.create({ value: 'ABG-9289' });
    const dateTime = DateTime.create({ date: '2020-05-07', time: '09:00' });
    const picoPlaca = PicoPlaca.create({
      plate: plate.getValue(),
      dateTime: dateTime.getValue()
    });
    const plateDateRule = new PlateDateRule();
    const isLastDigitRestrictedInDay = plateDateRule.isRestricted(
      picoPlaca.getValue()
    );
    expect(isLastDigitRestrictedInDay).toBe(false);
  });
});
