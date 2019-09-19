'use strict';
module.exports = function(app) {
	var list = require('../controller/apiController');

	app.route('/')
		.get(list.entry);
   
	app.route('/jenkins/servers')
		.post(list.listJsonServer)
		.get(list.listServer)
};