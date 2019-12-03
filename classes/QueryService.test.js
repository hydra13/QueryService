const QueryService = require('./QueryService');

test('Try to handle 2 different queries', () => {
    const service = new QueryService();
    expect(service.getLength()).toBe(0);
    service.queryHandle('test1');
    expect(service.getLength()).toBe(1);
    service.queryHandle('test2');
    expect(service.getLength()).toBe(2);
})

test('Try to get top100 with 2 queries', () => {
    const service = new QueryService();
    expect(service.getLength()).toBe(0);
    service.queryHandle('test1');
    service.queryHandle('test2');
    expect(service.getLength()).toBe(2);
    const results = service.getTop100();
    console.log(results);
    expect(results).toEqual(['test2', 'test1']);
})