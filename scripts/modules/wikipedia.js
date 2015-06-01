define([
	"knockout",
	"../modules/api-call-wikipedia"
], function (ko, result) {

	// city info object for observableArray
	var CityInfo = function (cityinfo, url) {
		this.title = ko.observable(cityinfo);
		this.url = ko.observable(url);
	};

	// return object WikiPediaViewModel
	return function WikiPediaViewModel () {
		var self = this;
		self.cityResults = ko.observableArray([]);
		self.toggle = ko.observable("hide");

		// subscribe to change in result model
		result.cityname.subscribe(function (newValue) {
			
			// create wikipedia url
			var wiki = "http://en.wikipedia.org/wiki/";
			
			// store result data in array
			var arr = result.citydata();

			if (newValue) {

				// empty cityResults observable
				self.cityResults([]);

				self.toggle("hide");

				// loop trough all items in array and create new object
				arr[0].forEach(function (cityinfo) {

					// create url for wikipedia
					url = wiki + cityinfo;

					// store CityInfo object in cityResults observable
					self.cityResults.push(new CityInfo(cityinfo, url));

					self.toggle("show");

				});
			}
		});
	};	   
});