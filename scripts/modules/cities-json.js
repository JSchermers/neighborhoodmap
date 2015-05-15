//  load neightborhoodcities data via require json plugin
define([	
	"knockout",
	"json!models/cities.json?callback=define",
], function (ko, data) {
        //The data object will be the API response for the
        //JSONP data call.
    	return data;
    }
);



