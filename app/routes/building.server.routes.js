'use strict';

module.exports = function(app) {
	// Routing logic   
	var buildings = require('../../app/controllers/buildings');
	app.route('/building').get(buildings.find);
};