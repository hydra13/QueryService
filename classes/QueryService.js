const QueryData = require('./QueryData');
const LinkedList = require('./LinkedList');

class QueryService {
    constructor(timeLifeInSec = 120, maxLength = 100){
        this.timeLifeInMS = timeLifeInSec * 1000;
        this.maxLength = maxLength;
        this.queriesMap = new Map();
        this.queriesList = new LinkedList();
    }
    getTop100(timeInSec = 60) {
        if (timeInSec < 1) {
            timeInSec = 60;
        }
        const fromDateTime = Date.now() - timeInSec*1000;
        const results = [];
        let queryObj = this.queriesList.tail;
        while (results.length < 100 
                    && queryObj !== null && queryObj.getLastDateTime() >= fromDateTime) {
            results.push(queryObj.queryString);
            queryObj = queryObj.prev;
        }
        return results;
    }
    queryHandle(queryString) {
        if (!queryString || queryString.length === 0) {
            return;
        }
        if (this.queriesMap.has(queryString)) {
            const currentQueryObj = this.queriesMap.get(queryString);
            currentQueryObj.addDate(Date.now());
            this.queriesList.setLast(currentQueryObj);
        } else {
            const currentQueryObj = new QueryData(queryString);
            this.queriesList.setLast(currentQueryObj);
            this.queriesMap.set(queryString, currentQueryObj);
    
            // clearing by size
            if (this.queriesList.length > this.maxLength) {
                removeQueryObj(this.queriesList.head);
            }
        }
        
        //clearing by time
        this.clearOldQueries();
    }
    clearOldQueries() {
        const minDateTime = Date.now() - this.timeLifeInMS;
        let queryObj = this.queriesList.tail;
        while(queryObj) {
            const nextQueryObj = queryObj.prev;
            queryObj.clearOldDateTimes(minDateTime);
            if (queryObj.isShouldBeRemoved()) {
                removeQueryObj(queryObj);
            }
            queryObj = nextQueryObj;
        }
    }
    removeQueryObj(queryObj) {
        this.queriesMap.delete(queryObj.queryString);
        this.queriesList.remove(queryObj);
    }
    getLength() {
        return this.queriesList.length;
    }
}

module.exports = QueryService;