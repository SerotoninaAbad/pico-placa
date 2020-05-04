import { DateTime } from '../datetime';

describe('DateTime', () => {
  test('Date should not be empty', () => {
    const dateEmpty = DateTime.create({
      date: '',
      time: ''
    });
    expect(dateEmpty.isFailure).toBe(true);
    expect(dateEmpty.error).toBe(
      'Date "" is invalid. Date format example: 2020-05-31'
    );
  });

  test('Time should not be empty', () => {
    const dateEmpty = DateTime.create({
      date: '2020-12-21',
      time: ''
    });
    expect(dateEmpty.isFailure).toBe(true);
    expect(dateEmpty.error).toBe(
      'Time "" is invalid. Time format example: 20:15'
    );
  });

  test('Date should have YYYY-MM-DD format', () => {
    const dateTimeIncorrectFormat = DateTime.create({
      date: '2020-02-9',
      time: '12:20'
    });
    expect(dateTimeIncorrectFormat.isFailure).toBe(true);
    expect(dateTimeIncorrectFormat.error).toBe(
      'Date "2020-02-9" is invalid. Date format example: 2020-05-31'
    );

    const dateTimeIncorrectMonth = DateTime.create({
      date: '2020-14-09',
      time: '12:20'
    });
    expect(dateTimeIncorrectMonth.isFailure).toBe(true);
    expect(dateTimeIncorrectMonth.error).toBe(
      'Date "2020-14-09" is invalid. Date format example: 2020-05-31'
    );

    const dateTimeIncorrectDay = DateTime.create({
      date: '2020-12-32',
      time: '12:20'
    });
    expect(dateTimeIncorrectDay.isFailure).toBe(true);
    expect(dateTimeIncorrectDay.error).toBe(
      'Date "2020-12-32" is invalid. Date format example: 2020-05-31'
    );
  });

  test('ValueObject class should set props values', () => {
    const date = DateTime.create({
      date: '2020-12-31',
      time: '12:20'
    });
    expect(date.getValue().props.value.getTime()).toBe(
      new Date('2020-12-31 12:20').getTime()
    );
  });
});
