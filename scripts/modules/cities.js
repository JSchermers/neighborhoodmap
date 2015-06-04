//  load neightborhoodcities data via require json plugin
define([	
	"knockout",
	// call locally stored json file
	"json!models/cities.json?callback=define",
], function (ko, data) {

        // input for validation according to knockout documentation
       	ko.extenders.required = function(target, overrideMessage) {
            
            //add some sub-observables to our observable
            target.hasError = ko.observable();
            target.validationMessage = ko.observable();
            target.novalidCity = ko.observable();
            target.validCityMessage = ko.observable();

            //define a function to do validation
            function validate(newValue) {

                 if (newValue) {
                        // check if newvalue equals city name
                        citiesViewModel.citiesList().every(function (city) {
       
                            if (city.name() === newValue) {

                                // hide error message
                                target.novalidCity(false);

                                // set message to empty
                                target.validCityMessage("");
                                return false;
                            }
 
                            else {

                                // show error message
                                target.novalidCity(true);

                                // set message if text does not equal existing city
                                target.validCityMessage("City does not exist");
                                return true;
                            }
                        });
                    }
                
                // show error message
                target.hasError(newValue ? false : true);

                // set message if string is empty
                target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
            }

        //validate whenever the value changes
        target.subscribe(validate);

        //return the original observable
        return target;
        };

       	// create observable object
        var City = function (data) {
    		this.name = ko.observable(data.name);
    		this.lat = ko.observable(data.lat);
    		this.lon = ko.observable(data.lon);
            this.coatOfArms = ko.observable(data.url);
        };

        // viewmodel module literal while no new instances are needed, just return the object
    	var citiesViewModel = {
    		citiesList : ko.observableArray([]),
            googleMapPoints : ko.observableArray([]),     
            cityName : ko.observable().extend({ required: "Please enter a city name" })
		};

		citiesViewModel.sendCity = function sendCity () {
				var city = citiesViewModel.cityName();
				return city;			
		}; 

        // add all cities to citieslist
		data.children.forEach(function (city){
				citiesViewModel.citiesList.push(new City(city));
		});

    	return citiesViewModel;
    },
    function (error) {
		alert (error);
    }
);