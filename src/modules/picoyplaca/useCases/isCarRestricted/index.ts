import { IsCarRestrictedAdapter } from './IsCarRestrictedAdapter';
import { IsCarRestrictedUseCase } from './IsCarRestrictedUseCase';
import { Rule } from '../../domain/rule';
import { PlateDateRule } from '../../domain/plateDateRule';
import { TimeRule } from '../../domain/timeRule';

const rules: Rule[] = [new PlateDateRule(), new TimeRule()];
const isCarRestrictedUseCase = new IsCarRestrictedUseCase(rules);
const isCarRestrictedAdapter = new IsCarRestrictedAdapter(
  isCarRestrictedUseCase
);

export { isCarRestrictedAdapter };
