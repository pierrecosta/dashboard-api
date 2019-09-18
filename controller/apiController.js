'use strict';

var Task = require('../model/apiModel');

exports.entry = function(req, res) {
	console.log('res', 'OK !');
    res.status(200).send('This works !!!');
});

exports.listjsonServer = function(req, res) {
	console.log('res', 'Json !');
	res.send(`Body content is : ${req.body.name} and ${req.body.desc}`);
  
	//handles null error 
	if(!req.body.name || !req.body.desc){
		res.status(400).send({ error:true, message: 'Please send all required values as Body and Desc'});
	}
	else{
		res.send(`Body content is : ${req.body.name} and ${req.body.desc}`);
	}
};

exports.listServer = function(req, res) {
	console.log('res', 'Get !');
	Task.getlistServer(req.body, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};
