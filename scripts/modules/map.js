define([
	'conditioner', 
	'knockout',
	// load maps async with async module for knockout
	'../modules/cities-json'
], function(conditioner, ko) {
	 return function() {
	 	var marker = new google.maps();
       	console.log(marker);
    };
});