const LinkedList = require('./LinkedList');
const QueryData = require('./QueryData');

test("Insert 2 queries", () => {
    let linkedList = new LinkedList();
    expect(linkedList.length).toBe(0);
    linkedList.setLast(new QueryData('test'));
    expect(linkedList.length).toBe(1);
    linkedList.setLast(new QueryData('test2'));
    expect(linkedList.length).toBe(2);
})