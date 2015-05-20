define([
	"knockout",
	"conditioner", 	
	// insert citiesviewmodel as dependency
	"../modules/cities",
	// point object
	"../modules/mappoint",
	// make async call to google maps
	"async!http://maps.google.com/maps/api/js?sensor=true"
], function (ko, conditioner, citiesViewModel, mapPoint) {
	 	
	 	// city viewmodel
	 	var citiesViewModelMap = citiesViewModel;

	 	// point function for adding points to observable array
	 	var Point = mapPoint;	 	

	 	// custom binding for handling a google map
	 	ko.bindingHandlers.googlemap = {
		    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		    		var self = this;
		           	self.mapObj = ko.utils.unwrapObservable(valueAccessor());
			        var latLng = new google.maps.LatLng(
			            ko.utils.unwrapObservable(mapObj.lat),
			            ko.utils.unwrapObservable(mapObj.lng));
			        var mapOptions = { center: latLng,
			                          zoom: 8, 
			                          mapTypeId: google.maps.MapTypeId.ROADMAP};

                  	// create new map
			        mapObj.googleMap = new google.maps.Map(element, mapOptions);

			        // use citiesViewModel for the citiesList
			        self.citiesList = citiesViewModelMap.citiesList();

			        // create new observableArray
					self.googleMapPoints = ko.observableArray([]);			        

					// add new Points + markers to observableArray	
					citiesList.forEach(function (city) {
						self.googleMapPoints.push(new Point(city.name(), city.lat(), city.lon(), self.mapObj.googleMap));
					});
			        				
					// stop ko double dependency binding
			        return { controlsDescendantBindings: true };
		    },

		    update : function () {
		    	// check if there's an update on the cityName
			        citiesViewModelMap.cityName.subscribe(function (newValue) {
			    		if (newValue) {
			    			// loop troough citiesList
			    			self.citiesList.forEach(function (city) {
			    				// check current value
		    					if (city.name() === newValue){
		    						// remove all existing points on the map
    								self.googleMapPoints().forEach(function (point) {
										point.setMarker(); 

										// empty existing array
										self.googleMapPoints([]);					
	    							});
    							// set new google marker object in array
								self.googleMapPoints.push(new Point(city.name(), city.lat(), city.lon(), mapObj.googleMap));
								
								}
							});
			    		}
			    });
		    }
		};

	 	// viewModel to be used by google map
	 	var googleViewModel = function () {
	 		var self = this;	

	 		// position the of the map (the Netherlands), used in view		
	 		self.myMap = ko.observable({
					        	lat: ko.observable(52.5),
					        	lng: ko.observable(5.75),				        	
					        });	 
	 	};

	 	// return object for binding to view
		return {
	 		googleModel: googleViewModel()
	 	};

	 	
   
}, function (err) {
	// error logging
	console.log(err + "google maps not loaded ok");
});