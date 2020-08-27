import { Match } from 'src/app/models/match';
import { MatchDetails } from 'src/app/models/match-details';

export interface MatchState {
    allMatches: Match[];
    matchDetails: MatchDetails;
    isLoading: boolean;
}
