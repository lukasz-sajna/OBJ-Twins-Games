import { PlayerInfo } from 'src/app/models/player-info';
import { Match } from 'src/app/models/match';
import { MatchDetails } from 'src/app/models/match-details';

export interface StatsState {
    matches: Match[];
    matchDetails: MatchDetails;
    isLoading: boolean;
}
