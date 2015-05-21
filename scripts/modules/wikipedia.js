define([
	"knockout",
	// mappoint needs to be here first
	"../modules/mappoint",
	// make async call to wikipedia
	"async!http://maps.google.com/maps/api/js?sensor=true"
], function (ko) {

	// subscribe to custom event
	document.addEventListener("getTitle", getWikipedia, false);

	// call function
	function getWikipedia (e) {
		console.log(e.detail.title);
	}

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