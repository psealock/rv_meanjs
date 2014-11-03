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

var getAllData = function (action, query, cb) {
    var allData = '',
        error = null,
        options = requests.options(action, query),
        url = options.host + options.path;
        
    var req = http.get(url, function (res) {
        res.setEncoding('utf8');
        res.on('data', function(d) {
            allData += d;
        });
        res.on('end', function () {
            cb(error, allData);
        });
    });

    req.on('error', function (e) {
        error = e;
    });
};

var geoclientErrorHandling = function (building) {
    // var errors = [
    //     building.address.message,
    //     building.address.message2,
    //     building.message
    // ];
    // for (var i = 0; i < errors.length; i ++) {
    //     if(errors[i]) {
    //         return true;
    //     }
    // }
    if(building.address.message || building.address.message2 || building.message) {
        return true;
    }
    return false;
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
        console.log(building);

        if(geoclientErrorHandling(building)) {
            buildingData.geoclient = 'error';
            res.send(buildingData);
        }

        buildingData.geoclient = building.address;

        nextQuery = {
            'address': encodeURIComponent(houseNumber + ' ' + building.address.boePreferredStreetName),
            'borough': borough,
            'bin': building.address.buildingIdentificationNumber,
            'bbl': building.address.bbl
        };
        
        getAllData('allData', nextQuery, function (err, allData) {
            if (err) {
                console.log('there was an error: ', err);
            }
            
            allData = JSON.parse(allData);

            buildingData.allData = allData;

            res.send(buildingData);
        });
    });	
};








