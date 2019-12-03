const QueryData = require('./QueryData');

test("Create object QueryData", () => {
    const datetime = Date.now();
    const testingQueryString = 'testing string';
    const query = new QueryData(testingQueryString, datetime);
    expect(query.queryString).toBe(testingQueryString);
    expect(query.datetimes).toEqual([datetime]);
    expect(query.prev).toBeNull();
    expect(query.next).toBeNull();
})

test('Get last time value is correct', () => {
    const datetime = Date.now();
    const testingQueryString = 'testing string';
    const query = new QueryData(testingQueryString, datetime);
    expect(query.getLastDateTime()).toBe(datetime);
})

test("Create object with default datetime value", () => {
    const testingQueryString = 'testing string';
    const query = new QueryData(testingQueryString);
    const datetime = query.getLastDateTime();
    expect(datetime).not.toBeNull();
    expect(datetime).toBeLessThanOrEqual(Date.now());
})

test("Add new dateTime", () => {
    const testingQueryString = 'testing string';
    const query = new QueryData(testingQueryString);
    const datetime = query.getLastDateTime();
    expect(datetime).not.toBeNull();
    expect(query.getLastDateTime()).toBe(datetime);
    query.addDate(datetime + 100);
    expect(query.getLastDateTime()).not.toBeNull();
    expect(query.getLastDateTime()).toBe(datetime + 100);
    expect(query.datetimes.length).toBe(2);
})

test("Removing old dateTimes", (done) => {
    const testingQueryString = 'testing string';
    const query = new QueryData(testingQueryString);
    const datetime = query.getLastDateTime();
    const minimum = datetime + 10;

    setTimeout(()=>{
        query.clearOldDateTimes(minimum);
        expect(query.isShouldBeRemoved()).toBeTruthy();
        done();         
    }, 20);    
    
})