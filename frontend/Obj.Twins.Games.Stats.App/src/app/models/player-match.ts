import { MatchResult } from './match-result.enum';
import { Match } from './match';

export interface PlayerMatch extends Match {
    result: MatchResult;
}
