define([
	"knockout",
	"conditioner", 	
	// insert citiesViewModel as a dependency
	"../modules/cities"
], function (ko, conditioner, citiesViewModel) {	 

  	 	var headerViewModel = citiesViewModel;

  	 	// could extend the viewmodel here
  		
  		/* 	var headerViewModel = function () {
		
 			// extend citiesviewmodelMap object
 			citiesViewModelMap.call(self);
  	 	}; */ 	 	

	 	return headerViewModel;
	
});