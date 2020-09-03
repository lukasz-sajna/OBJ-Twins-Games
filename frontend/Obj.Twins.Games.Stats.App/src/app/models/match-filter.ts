import { DateRange } from './date-range';
import { MapItem } from './map-item';

export interface MatchFilter {
    maps: MapItem[];
    dateRange: DateRange;
    isDefault: boolean;
}
