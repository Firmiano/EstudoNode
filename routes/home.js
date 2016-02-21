'use strict';

var pageHome = function(app){
	var home = app.controllers.home;
	app.get('/',home.index);
};

module.exports = pageHome; 	