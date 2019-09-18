'use strict';
module.exports = function(app) {
	var list = require('../controller/apiController');
  // todoList Routes
  app.route('/')
     .get(list.entry);
   
  app.route('/jenkins/servers-json')
     .post(list.listjsonServer)
	 .get(list.listServer)
  
  app.route('/tasks/:taskId')
     .get(todoList.read_a_task)
     .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
    };