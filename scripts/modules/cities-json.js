//  load neightborhoodcities data via require json plugin
define([	
	"knockout",
	"json!models/cities.json?callback=define",
], function (ko, data) {
        //The data object will be the API response for the
        //JSONP data call.
       
        var City = function (data) {
    		this.name = ko.observable(data.name);
    		this.lat = ko.observable(data.lat);
    		this.lon = ko.observable(data.lon);
        };


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



