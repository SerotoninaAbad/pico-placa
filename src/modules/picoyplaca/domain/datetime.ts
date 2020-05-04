import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/Result';
import { DateUtils } from '../../../shared/utils/DateUtils';

interface DateProps {
  value: Date;
}

interface DateStringProps {
  date: string;
  time: string;
}

export class DateTime extends ValueObject<DateProps> {
  private constructor(props: DateProps) {
    super(props);
  }

  get value(): Date {
    return this.props.value;
  }

  private static isValidDate(date: string): boolean {
    return DateUtils.isValidDate(date);
  }

  private static isValidTime(time: string): boolean {
    return DateUtils.isValidTime(time);
  }

  public static create(props: DateStringProps): Result<DateTime> {
    const isValidDate = this.isValidDate(props.date);

    if (!isValidDate) {
      return Result.fail<DateTime>(
        `Date "${props.date}" is invalid. Date format example: 2020-05-31`
      );
    }

    const isValidTime = this.isValidTime(props.time);

    if (!isValidTime) {
      return Result.fail<DateTime>(
        `Time "${props.time}" is invalid. Time format example: 20:15`
      );
    }

    const [year, month, day] = DateUtils.stringToArrayDate(props.date);
    const monthZeroBased = month - 1;
    const [hours, minutes] = DateUtils.stringToArrayTime(props.time);

    const classProps = {
      value: new Date(year, monthZeroBased, day, hours, minutes)
    };

    return Result.ok<DateTime>(new DateTime(classProps));
  }
}
