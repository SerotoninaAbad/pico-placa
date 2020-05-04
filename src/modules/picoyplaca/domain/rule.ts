import { PicoPlaca } from './picoPlaca';

export interface Rule {
  isRestricted(picoPlaca: PicoPlaca): boolean;
}
