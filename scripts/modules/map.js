define([
	'conditioner', 
	'knockout',
	// load maps async with async module for knockout
	'async!http://maps.google.com/maps/api/js?sensor=false'	
], function(conditioner, ko) {
	 return function() {
	 	var marker = new google.maps();
       	console.log(marker);
    };
});