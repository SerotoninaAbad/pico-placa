import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { DateTime } from './datetime';
import { Plate } from './plate';

export interface PicoPlacaProps {
  dateTime: DateTime;
  plate: Plate;
}

export class PicoPlaca extends Entity<PicoPlacaProps> {
  private constructor(props: PicoPlacaProps) {
    super(props);
  }

  public getDayOfWeek(): number {
    return this.props.dateTime.value.getDay();
  }

  public getHours(): number {
    return this.props.dateTime.value.getHours();
  }

  public getMinutes(): number {
    return this.props.dateTime.value.getMinutes();
  }

  public getLastDigit(): number {
    const plateValue = this.props.plate.value;
    return parseInt(plateValue.slice(-1), 10);
  }

  public static create(props: PicoPlacaProps): Result<PicoPlaca> {
    const picoPlaca = new PicoPlaca(props);
    return Result.ok<PicoPlaca>(picoPlaca);
  }
}
