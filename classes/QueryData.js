class QueryData {
    constructor(queryString, datetime = Date.now()){
        this.queryString = queryString;
        this.datetimes = [datetime];
        this.prev = null;
        this.next = null;
    }
    addDate(datetime) {
        this.datetimes.push(datetime);
    }
    getLastDateTime() {
        return this.datetimes[this.datetimes.length - 1];
    }
    clearOldDateTimes(minimumDateTime) {
        // TODO: n^2, need to optimize
        this.datetimes = this.datetimes.filter(datetime => datetime >= minimumDateTime);
    }
    isShouldBeRemoved(){
        return this.datetimes.length === 0;
    }
}

module.exports = QueryData;