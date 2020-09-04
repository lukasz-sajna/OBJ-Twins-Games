import { Match } from 'src/app/models/match';
import { MatchDetails } from 'src/app/models/match-details';
import { MatchFilter } from 'src/app/models/match-filter';

export interface MatchState {
    allMatches: Match[];
    filteredMatches: Match[];
    filter: MatchFilter;
    matchDetails: MatchDetails;
    isLoading: boolean;
}
