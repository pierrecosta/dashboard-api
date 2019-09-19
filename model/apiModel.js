'user strict';
//var sql = require('./db');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getListServer = function (inputQuery, result){
	console.log('res', 'Inside db !');
	console.log(inputQuery.name);

	result(null, inputQuery.name);
};           

Task.getListJsonServer = function (inputBody, result){
	console.log('res', 'Inside db !');
	console.log(inputBody.name);

	result(null, inputBody.name);
};  


module.exports = Task;
