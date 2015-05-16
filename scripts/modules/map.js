define([
	"conditioner", 
	"knockout",
	"../modules/cities-json"
], function (conditioner, ko, citiesViewModel) {
	 	
	 	var citiesViewModelMap = new citiesViewModel();

	 	return {
	 		citiesList : citiesViewModelMap.citiesList()
	 	};
	 	
   
});