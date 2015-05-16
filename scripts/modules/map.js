define([
	"conditioner", 
	"knockout",
	// insert citiesviewmodel as dependency
	"../modules/cities-json",
	// make async call to google maps
	'async!http://maps.google.com/maps/api/js?sensor=true'
], function (conditioner, ko, citiesViewModel, gm) {
	 	

	 	var citiesViewModelMap = new citiesViewModel();

	 	// console.log(citiesViewModelMap.citiesList());

	 	var googleViewModel = function () {
	 		var self = this;
	 		self.myMap = ko.observable({
					        	lat: ko.observable(55),
					        	lng: ko.observable(11)
					        });
	 	};
	 	// create map
	 	ko.bindingHandlers.googlemap = {
		    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		    	console.log(valueAccessor);
		        var mapObj = ko.utils.unwrapObservable(valueAccessor());
		        var latLng = new google.maps.LatLng(mapObj.lat, mapObj.lng);
		        var mapOptions = { center: latLng,
		                          zoom: 5, 
		                          mapTypeId: google.maps.MapTypeId.ROADMAP};

		        mapObj.googleMap = new google.maps.Map(element, mapOptions);
		    }
		};

		return {
	 		citiesList: citiesViewModelMap.citiesList(),
	 		googleModel: googleViewModel
	 	};
	 	
   
});