import { PicoPlaca } from '../picoPlaca';
import { Plate } from '../plate';
import { DateTime } from '../datetime';

describe('PicoPlaca', () => {
  test('Should retrieve last digit', () => {
    const dateTime = DateTime.create({ date: '2020-02-24', time: '20:00' });
    const plate = Plate.create({ value: 'ABG-9290' });
    const picoPlaca = PicoPlaca.create({
      dateTime: dateTime.getValue(),
      plate: plate.getValue()
    });
    expect(picoPlaca.getValue().getLastDigit()).toBe(0);
  });

  test('Should retrieve day of week', () => {
    const dateTime = DateTime.create({ date: '2020-05-04', time: '20:00' });
    const plate = Plate.create({ value: 'ABG-9290' });
    const picoPlaca = PicoPlaca.create({
      dateTime: dateTime.getValue(),
      plate: plate.getValue()
    });
    expect(picoPlaca.getValue().getDayOfWeek()).toBe(1);
  });

  test('Should retrieve hours', () => {
    const dateTime = DateTime.create({ date: '2020-05-04', time: '20:00' });
    const plate = Plate.create({ value: 'ABG-9290' });
    const picoPlaca = PicoPlaca.create({
      dateTime: dateTime.getValue(),
      plate: plate.getValue()
    });
    expect(picoPlaca.getValue().getHours()).toBe(20);
  });

  test('Should retrieve minutes', () => {
    const dateTime = DateTime.create({ date: '2020-05-04', time: '20:32' });
    const plate = Plate.create({ value: 'ABG-9290' });
    const picoPlaca = PicoPlaca.create({
      dateTime: dateTime.getValue(),
      plate: plate.getValue()
    });
    expect(picoPlaca.getValue().getMinutes()).toBe(32);
  });
});
