import { Result } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { DateTime } from '../../domain/datetime';
import { PicoPlaca } from '../../domain/picoPlaca';
import { Plate } from '../../domain/plate';
import { Rule } from '../../domain/rule';
import { IsCarRestrictedDTO } from './IsCarRestrictedDTO';

export class IsCarRestrictedUseCase
  implements UseCase<IsCarRestrictedDTO, Result<boolean>> {
  private rules: Rule[];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  private _createPicoPlaca(req: IsCarRestrictedDTO): Result<PicoPlaca> {
    const dateTimeOrError = DateTime.create({ date: req.date, time: req.time });
    const plateOrError = Plate.create({ value: req.plate });

    const dtoResult = Result.combine([plateOrError, dateTimeOrError]);

    if (dtoResult.isFailure) {
      return Result.fail<PicoPlaca>(
        typeof dtoResult.error === 'string'
          ? dtoResult.error
          : 'Error creating plate'
      );
    }

    const picoPlaca = PicoPlaca.create({
      dateTime: dateTimeOrError.getValue(),
      plate: plateOrError.getValue()
    });

    return picoPlaca;
  }

  public execute(req: IsCarRestrictedDTO): Result<boolean> {
    const picoPlaca = this._createPicoPlaca(req);

    if (picoPlaca.isFailure) {
      return Result.fail<boolean>(
        typeof picoPlaca.error === 'string'
          ? picoPlaca.error
          : 'Error creating pico y placa'
      );
    }

    const isRestricted = this.rules.reduce(
      (accum, current) => accum && current.isRestricted(picoPlaca.getValue()),
      true
    );

    if (isRestricted) {
      return Result.ok<boolean>(true);
    }
    return Result.ok<boolean>(false);
  }
}
