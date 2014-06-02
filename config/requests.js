/*jshint sub:true*/

'use strict';

var env = process.env.NODE_ENV || 'development',
    config = require('../config/config'),

    app_id = {
    	'geo': config.geoclient.app_id,
    	'api': config.apiKeys.app_id
    },
    app_key = {
    	'geo': config.geoclient.app_key,
    	'api': config.apiKeys.app_key
    },

    actions = {
    	'address': {
    		'path': '/geoclient/v1/address.json?',
    		'type': 'geo'
    	},
    	'cross streets': {
    		'path' : '/geoclient/v1/intersection.json?',
    		'type': 'geo'
    	},
    	'tax lot': {
    		'path': '/geoclient/v1/bbl.json?',
    		'type': 'geo'
    	},
    	'well known place': {
    		'path': '/geoclient/v1/place.json?',
    		'type': 'geo'
    	},
    	'street between': {
    		'path': '/geoclient/v1/blockface.json?',
    		'type': 'geo'
    	},
    	'service_requests' : {
    		'path': '/311/',
    		'type': 'api'
    	}
    },

    hosts = {
    	'geo': config.geoclientHost,
    	'api': config.apiPath
    },

    apiBoroughs = {
        'Manhattan': 'mn',
        'Brooklyn': 'bk',
        'Queens': 'qn',
        'Bronx': 'bx',
        'Staten Island': 'si'
    };

exports.options = function (action, query) {
	var options = {},
		key,
		path = actions[action].path,
		type = actions[action].type;

	if(app_id[type]){
		query['app_id'] = app_id[type];
	}

	if (app_key[type]){
		query['app_key'] = app_key[type];
	}

	if (type === 'geo') {
		for (key in query) {
			if (query.hasOwnProperty(key)) {
				path += key + '=' + query[key] + '&';
			}
		}		
	}else if (type === 'api') {
		for (key in query) {
            if (key === 'borough') {
                query[key] = apiBoroughs[query[key]];
            }
			path += query[key] + '/';
		}
	}
	
	path = path.substring(0, path.length - 1);

	options.host = hosts[type];
	options.path = path;

	return options;
};