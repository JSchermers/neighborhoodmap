//  load neightborhoodcities data via require json plugin
define([	
	"knockout",
	// call locally stored json file
	"json!models/cities.json?callback=define",
], function (ko, data) {
        //The data object will be the API response for the
        //JSONP data call.
       	
       	// create observable object
        var City = function (data) {
    		this.name = ko.observable(data.name);
    		this.lat = ko.observable(data.lat);
    		this.lon = ko.observable(data.lon);
        };

        // viewmodel module literal while no new instances are needed, just return the object
    	var citiesViewModel = {
    		citiesList : ko.observableArray([]),
			cityName : ko.observable()		
		};

		citiesViewModel.sendCity = function sendCity () {
				var city = citiesViewModel.cityName();
				citiesViewModel.cityName("");
				return city;			
		}; 

		data.children.forEach(function (city){
				citiesViewModel.citiesList.push(new City(city));
		});

    	return citiesViewModel;
    },
    function (error) {
		alert (error);
    }
);



