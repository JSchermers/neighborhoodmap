define([
	"knockout",
	"conditioner", 	
	// insert citiesViewModel as a dependency
	"../modules/cities-json"
], function (ko, conditioner, citiesViewModel) {	 

  	 	var citiesViewModelMap = citiesViewModel;

  	 	// create new extended object
  	 	var headerViewModel = function () {
			var self = this;
			self.cityName = ko.observable();
			
			self.sendCity = function () {
				var name = self.cityName();
				console.log(name);

				// clear input
				self.cityName("");
			}; 
 			// extend citiesviewmodelMap object
 			citiesViewModelMap.call(self);
  	 	};  	 	

	 	return headerViewModel;
	
});