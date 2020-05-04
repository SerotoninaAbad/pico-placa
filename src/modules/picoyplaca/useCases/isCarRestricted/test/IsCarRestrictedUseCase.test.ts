import { PlateDateRule } from '../../../domain/plateDateRule';
import { TimeRule } from '../../../domain/timeRule';
import { IsCarRestrictedUseCase } from '../IsCarRestrictedUseCase';
import { Rule } from '../../../domain/rule';

describe('IsCarRestrictedUseCase', () => {
  test('Should validate Inputs', () => {
    const plateDateRule = new PlateDateRule();
    const timeRule = new TimeRule();
    const rules: Rule[] = [plateDateRule, timeRule];
    const isCarRestrictedUseCase = new IsCarRestrictedUseCase(rules);
    const hasRestrictionOrError = isCarRestrictedUseCase.execute({
      plate: 'ABG-2032',
      date: '2020-14-04',
      time: '08:32'
    });
    expect(hasRestrictionOrError.isFailure).toBe(true);
    expect(hasRestrictionOrError.error).toBe(
      'Date "2020-14-04" is invalid. Date format example: 2020-05-31'
    );
  });

  test('Should tell if a car has mobility restrictions', () => {
    const plateDateRule = new PlateDateRule();
    const timeRule = new TimeRule();
    const rules: Rule[] = [plateDateRule, timeRule];
    const isCarRestrictedUseCase = new IsCarRestrictedUseCase(rules);
    const hasRestriction = isCarRestrictedUseCase.execute({
      plate: 'ABG-2032',
      date: '2020-05-04',
      time: '08:32'
    });
    expect(hasRestriction.getValue()).toBe(true);
  });

  test("Should tell if a car doesn't has mobility restrictions", () => {
    const plateDateRule = new PlateDateRule();
    const timeRule = new TimeRule();
    const rules: Rule[] = [plateDateRule, timeRule];
    const isCarRestrictedUseCase = new IsCarRestrictedUseCase(rules);
    const hasRestriction = isCarRestrictedUseCase.execute({
      plate: 'ABG-2030',
      date: '2020-05-04',
      time: '08:32'
    });
    expect(hasRestriction.getValue()).toBe(false);
  });
});
