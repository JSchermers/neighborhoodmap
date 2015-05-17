define([
	"conditioner", 
	"knockout",
	// insert citiesviewmodel as dependency
	"../modules/cities-json",
	// make async call to google maps
	"async!http://maps.google.com/maps/api/js?sensor=true"
], function (conditioner, ko, citiesViewModel) {
	 	
	 	var citiesViewModelMap = new citiesViewModel();

	 	// var to be accessed in Point object for displaying a marker on the map.
	 	var mapObj = '';
	 	
	 	// custom binding for handling a google map
	 	ko.bindingHandlers.googlemap = {
		    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		           	mapObj = ko.utils.unwrapObservable(valueAccessor());
			        var latLng = new google.maps.LatLng(
			            ko.utils.unwrapObservable(mapObj.lat),
			            ko.utils.unwrapObservable(mapObj.lng));
			        var mapOptions = { center: latLng,
			                          zoom: 8, 
			                          mapTypeId: google.maps.MapTypeId.ROADMAP};

                  	// create new map
			        mapObj.googleMap = new google.maps.Map(element, mapOptions);			        

		        	// use citiesViewModel for the citiesList
			        var citiesList = citiesViewModelMap.citiesList();

			        // create new observableArray
					self.googleMapPoints = ko.observableArray([]);
					
					// add new Points + markers to observableArray	
					citiesList.forEach(function (city){
						self.googleMapPoints.push(new Point(city.name(), city.lat(), city.lon()));
					});
					
					// stop ko double dependency binding
			        return { controlsDescendantBindings: true };
		        
		    }
		};

	 	// found in js fiddle how to create a map with knockout http://jsfiddle.net/t9wcC/
	 	// Point object for storing cityname , lat, lon + markers with events
	 	var Point = function (name, lat, lon) {
	 		var self = this;
 			this.name = name;
 			this.lat = ko.observable(lat);
 			this.lon = ko.observable(lon);

		    var marker = new google.maps.Marker({
		        position: new google.maps.LatLng(lat, lon),
		        title: name,
		        map: mapObj.googleMap,
		        animation: google.maps.Animation.DROP,
		        draggable: true
		    });

	     	//if you need the poition while dragging
		    google.maps.event.addListener(marker, 'drag', function() {
		        var pos = marker.getPosition();
		        this.lat(pos.lat());
		        this.lon(pos.lng());
		    }.bind(this));

		    //if you just need to update it when the user is done dragging
		    google.maps.event.addListener(marker, 'dragend', function() {
		        var pos = marker.getPosition();
		        this.lat(pos.lat());
		        this.lon(pos.lng());
		    }.bind(this));
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