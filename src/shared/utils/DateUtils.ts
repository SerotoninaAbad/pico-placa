export class DateUtils {
  public static isValidDate(date: string): boolean {
    if (!this.isValidDateFormat(date)) {
      return false;
    }

    const numberOfDaysPerMonth = [
      31,
      29,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ];
    const [year, month, day] = this.stringToArrayDate(date);
    if (month < 1 || month > 12) {
      return false;
    }
    if (
      month == 2 &&
      !(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) &&
      (day < 1 || day > 28)
    ) {
      return false;
    } else if (day < 1 || day > numberOfDaysPerMonth[month - 1]) {
      return false;
    }
    return true;
  }

  public static isValidDateFormat(date: string): boolean {
    const expression = /^[1-9]{1}[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    return expression.test(date);
  }

  public static stringToArrayDate(date: string): number[] {
    return date.split('-').map((item) => parseInt(item));
  }

  public static isValidTimeFormat(time: string): boolean {
    const expression = /^[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]$/;
    return expression.test(time);
  }

  public static stringToArrayTime(time: string): number[] {
    return time.split(':').map((item) => parseInt(item));
  }

  public static isValidTime(time: string): boolean {
    if (!this.isValidTimeFormat(time)) {
      return false;
    }

    const [hours, minutes] = this.stringToArrayTime(time);

    if (hours <= 23 && minutes <= 59) {
      return true;
    }

    return false;
  }
}
