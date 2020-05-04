import { IsCarRestrictedUseCase } from './IsCarRestrictedUseCase';
import { IsCarRestrictedDTO } from './IsCarRestrictedDTO';
import chalk from 'chalk';

export class IsCarRestrictedAdapter {
  private useCase: IsCarRestrictedUseCase;

  constructor(useCase: IsCarRestrictedUseCase) {
    this.useCase = useCase;
  }

  public execute(req: IsCarRestrictedDTO): string {
    const result = this.useCase.execute(req);

    if (result.isFailure) {
      let error;
      if (typeof result.error === 'string') {
        error = result.error;
      } else {
        error = 'Unexpected error';
      }
      return chalk.bold.red(error);
    }

    const isCarRestricted = result.getValue();
    if (isCarRestricted) {
      return chalk.bgRed.black("The car can't be on the road");
    }
    return chalk.bgGreen.black('The car can be on the road');
  }
}
