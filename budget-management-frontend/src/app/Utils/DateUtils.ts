import { DateRange } from "../model/interfaces/DateRange";

export class DateUtils {
    static isBetween(date: Date, dateRange: DateRange): boolean {
        if (dateRange == null) return false;

        if (dateRange.start && date < dateRange.start) {
            return false;
        }

        if (dateRange.end && date > dateRange.end) {
            return false;
        }

        return true;
    }
}
