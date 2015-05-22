define([
	"knockout",
	"../modules/api-call-wikipedia"
], function (ko, result) {

	// subscribe to change in result model
	result.cityname.subscribe(function (newValue) {
		if (newValue) {
			console.log(result.citydata());
		}
	});

	// viewmodel
	var WikiPediaViewModel = function () {
		var self = this;
		self.title = ko.observable('joost');
		self.getTitle = function () {
			return self.title;
		};
	};

	return WikiPediaViewModel;
	   
});