//  load neightborhoodcities data via require json plugin
define([	
	"knockout",
	// call locally stored json file
	"json!models/cities.json?callback=define",
], function (ko, data) {
        //The data object will be the API response for the
        //JSONP data call.
       	
       	// create opbject for google maps
        var City = function (data) {
    		this.name = ko.observable(data.name);
    		this.lat = ko.observable(data.lat);
    		this.lon = ko.observable(data.lon);
        };

        // viewmodel module
    	var citiesViewModel = function () {
    		var self = this;
    		this.citiesList = ko.observableArray([]);

    		data.children.forEach(function (city){
				self.citiesList.push(new City(city));
    		});

    	};
    	return citiesViewModel;
    }
);



