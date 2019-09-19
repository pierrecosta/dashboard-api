'use strict';

var Task = require('../model/apiModel');

exports.entry = function(req, res) {
	console.log('res', 'OK !');
    res.status(200).send('This works !!!');
};

exports.listJsonServer = function(req, res) {
	console.log('res', 'Json !');
	
	//handles null error 
	if(!req.body.name || !req.body.desc){
		res.status(400).send('Please send all required values as Body and Desc');
	}
	else{
		Task.getListJsonServer(req.body, function(err, task) {
			if (err)
				res.send(err);
			res.json(task);
		});
	}
};

exports.listServer = function(req, res) {
	console.log('res', 'Get !');

	Task.getListServer(req.query, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};
