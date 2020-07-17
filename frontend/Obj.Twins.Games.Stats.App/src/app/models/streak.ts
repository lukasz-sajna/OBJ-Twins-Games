import { MatchResult } from './match-result.enum';

export interface Streak {
    matchFinishedAt: Date;
    matchResult: MatchResult;
}
