'use strict';

var env = process.env.NODE_ENV || 'development',
    requests = require('../../config/requests'),
    http = require('http'),
    https = require('https');

var loadGeoClientData = function (action, query, cb) {
    var building = '',
        error = null,
        options = requests.options(action, query);

    var req = https.get(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function(d) {
            building += d;
        });
        res.on('end', function () {
            cb(error, building);
        });
    });

    req.on('error', function (e) {
    	console.log(e);
        error = e;
    });

    req.end();
};

var getServiceRequests = function (action, query, cb) {
    var complaints = '',
        error = null,
        options = requests.options(action, query),
        url = options.host + options.path;
        
    var req = http.get(url, function (res) {
        res.setEncoding('utf8');
        res.on('data', function(d) {
            complaints += d;
        });
        res.on('end', function () {
            cb(error, complaints);
        });
    });

    req.on('error', function (e) {
        error = e;
    });
};

exports.find = function(req, res) {
	var buildingData = {},
	
		houseNumber = req.query.houseNumber,
		borough = req.query.borough,
		nextQuery;

	loadGeoClientData('address', req.query, function (err, building) {
        if (err){
            console.log('there was an error: ', err);
        }
        
        building = JSON.parse(building);

        buildingData.geoclient = building.address;

        nextQuery = {
        	'address': encodeURIComponent(houseNumber + ' ' + building.address.boePreferredStreetName),
        	'borough': borough
        };

        
        getServiceRequests('service_requests', nextQuery, function (err, service_requests) {
        	if (err) {
        		console.log('there was an error: ', err);
        	}
        	
        	service_requests = JSON.parse(service_requests);

        	buildingData.service_requests = service_requests;

	        res.send(buildingData);
        });
    });	
};








