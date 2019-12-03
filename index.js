const QueryService = require('./classes/QueryService')
const express = require('express');
const app = express();
const port = 3000;
const queryService = new QueryService();

const helloString = `
API:<br />
GET /request?query={queryString} - handling queryString<br />
GET /getTop100?timeInSec={timeInSec} - get top100 queries for period = timeInSec (default 60 sec)
`

app.get('/', (req, res) => res.send(helloString));

app.get('/request', (req, res) => {
    queryService.queryHandle(req.query.query);
    console.log({query: req.query.query, serviceSize: queryService.getLength()});
    res.send({query: req.query.query, serviceSize: queryService.getLength()})
})

app.get('/top100', (req, res) => {
    const results = queryService.getTop100(req.query.timeInSec);
    console.log({query: req.query.timeInSec, results});
    res.send({query: req.query.timeInSec, results})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));