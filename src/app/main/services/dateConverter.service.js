export default class DateService {
    constructor($filter) {
        this.$filter = $filter;
    }

    convertDate(date, type) {
        date = new Date(date);
        let dateTime = date.getTime();

        return this.$filter('date')(dateTime, type);
    }

    subtractDaysFromDate(date, daysNumber) {
        date = new Date(date);

        return date.setDate(date.getDate() - daysNumber);
    }

    addDaysToDate(date, daysNumber) {
        date = new Date(date);

        return date.setDate(date.getDate() + daysNumber);
    }
}