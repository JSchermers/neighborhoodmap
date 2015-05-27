define([
	"knockout",
	// point object
	"../modules/cities"
], function (ko, cities) {
	 	
 	var listModel = function () {
 		var self = this;
 		self.list = cities.citiesList();
 	};

 	return listModel;
	

   
});