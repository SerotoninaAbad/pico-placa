import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/Result';

interface PlateProps {
  value: string;
}

export class Plate extends ValueObject<PlateProps> {
  private constructor(props: PlateProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  private static isValid(plate: string): boolean {
    const expression = /^(A|B|C|E|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z){1}[A-Z]{2}-[0-9]{4}$/;
    return expression.test(plate);
  }

  public static create(props: PlateProps): Result<Plate> {
    props.value = props.value.toUpperCase();
    const isValidPlate = this.isValid(props.value);

    if (!isValidPlate) {
      return Result.fail<Plate>(
        `Plate "${props.value}" is invalid. Plate format example: ABG-3454`
      );
    }

    return Result.ok<Plate>(new Plate(props));
  }
}
