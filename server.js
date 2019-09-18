const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

const config = {
    name: 'dashboard-api-update',
    port: 3000,
    host: '127.0.0.1',
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// app.get('/', (req, res) => {
    // res.status(200).send('It works !!!');
// });

// JSON
// curl -d '{"name":"dod", "desc":"devPlateform"}' -H "Content-Type: application/json" http://127.0.0.1:3000/
// app.post('/jenkins/servers-json', function(req, res){
  // console.log(req.body);
// res.send(`aaa body aaa ${req.body.name} ${req.body.desc} aaa   aaa`);
// });

// http://127.0.0.1:3000/jenkins/servers?name=d0d&desc=devPlateform
// app.get('/jenkins/servers', function(req, res) {
  // var serverName = req.param('name');
  // var serverDescription = req.param('desc');

  // res.send(serverName + ' ' + serverDescription);
// });

// app.get('/', (req, res) => {
    // res.status(200).send('This works');
// });

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
	logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

var routes = require('./routes/appRoutes'); // Importing route
routes(app); // Register the route

// From https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4
// From https://www.codementor.io/julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2
