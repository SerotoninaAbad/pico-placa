import { DateTime } from '../datetime';
import { PicoPlaca } from '../picoPlaca';
import { Plate } from '../plate';
import { TimeRule } from '../timeRule';

describe('TimeRule', () => {
  test('Should restrict time (first range)', () => {
    const plate = Plate.create({ value: 'ABG-9281' });
    const dateTime = DateTime.create({ date: '2020-05-04', time: '09:00' });
    const picoPlaca = PicoPlaca.create({
      plate: plate.getValue(),
      dateTime: dateTime.getValue()
    });
    const timeRule = new TimeRule();
    const isTimeRestricted = timeRule.isRestricted(picoPlaca.getValue());
    expect(isTimeRestricted).toBe(true);
  });

  test('Should restrict time (second range)', () => {
    const plate = Plate.create({ value: 'ABG-9281' });
    const dateTime = DateTime.create({ date: '2020-05-04', time: '16:02' });
    const picoPlaca = PicoPlaca.create({
      plate: plate.getValue(),
      dateTime: dateTime.getValue()
    });
    const timeRule = new TimeRule();
    const isTimeRestricted = timeRule.isRestricted(picoPlaca.getValue());
    expect(isTimeRestricted).toBe(true);
  });

  test('Should not restrict time', () => {
    const plate = Plate.create({ value: 'ABG-9281' });
    const dateTime = DateTime.create({ date: '2020-05-04', time: '13:02' });
    const picoPlaca = PicoPlaca.create({
      plate: plate.getValue(),
      dateTime: dateTime.getValue()
    });
    const timeRule = new TimeRule();
    const isTimeRestricted = timeRule.isRestricted(picoPlaca.getValue());
    expect(isTimeRestricted).toBe(false);
  });
});
