'user strict';
//var sql = require('./db');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getlistServer = function (dataJson, result){
	console.log('res', 'Inside db !');
	console.log(dataJson.name);
	console.log(dataJson.desc);

	result(null, dataJson.name);
});           

module.exports=Task;