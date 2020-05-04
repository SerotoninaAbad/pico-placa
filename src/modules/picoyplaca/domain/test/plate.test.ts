import { Plate } from '../plate';

describe('Plate', () => {
  test('Should not be empty', () => {
    const plate = Plate.create({ value: '' });
    expect(plate.isFailure).toBe(true);
    expect(plate.error).toBe(
      `Plate "" is invalid. Plate format example: ABG-3454`
    );
  });

  test('Should accept format AAA-9999', () => {
    const plateWithMoreLetters = Plate.create({ value: 'ABDD-9988' });
    expect(plateWithMoreLetters.isFailure).toBe(true);
    expect(plateWithMoreLetters.error).toBe(
      `Plate "ABDD-9988" is invalid. Plate format example: ABG-3454`
    );

    const plateWithMoreNumbers = Plate.create({ value: 'ABD-99883' });
    expect(plateWithMoreNumbers.isFailure).toBe(true);
    expect(plateWithMoreNumbers.error).toBe(
      `Plate "ABD-99883" is invalid. Plate format example: ABG-3454`
    );

    const plateWithLessLetters = Plate.create({ value: 'ab-9883' });
    expect(plateWithLessLetters.isFailure).toBe(true);
    expect(plateWithLessLetters.error).toBe(
      `Plate "AB-9883" is invalid. Plate format example: ABG-3454`
    );

    const plateWithLessNumbers = Plate.create({ value: 'abc-988' });
    expect(plateWithLessNumbers.isFailure).toBe(true);
    expect(plateWithLessNumbers.error).toBe(
      `Plate "ABC-988" is invalid. Plate format example: ABG-3454`
    );
  });

  test('ValueObject class should set props values', () => {
    const plate = Plate.create({
      value: 'ABG-3230'
    });
    expect(plate.getValue().props.value).toBe('ABG-3230');
  });
});
