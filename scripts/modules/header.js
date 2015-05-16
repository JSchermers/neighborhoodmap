define([
	"knockout",
	"conditioner", 	
	"../modules/cities-json"
], function (ko, conditioner, citiesViewModel) {	 

  	 	var citiesViewModelMap = new citiesViewModel();

  	 	console.log(citiesViewModelMap.citiesList());

	 	return {
	 		citiesList : citiesViewModelMap.citiesList()
	 	};
});