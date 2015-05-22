define([
	"knockout",
	// mappoint needs to be here first for addEventListener
	"../modules/mappoint",
], function (ko, Q) {

	// create result object
	var result = {
		cityname : ko.observable(''),
		citydata : ko.observableArray([])
	};

	// subscribe to custom event
	document.addEventListener("getTitle", getWikipedia, false);

	// use for jsonp call to wikipedia
	var city ='';

	// call function
	function getWikipedia (e) {
		city = e.detail.title;
		if (city !== '') {
			sentJSONPRequest(city);
		}
	}

	// found jsonp solution for wikipedia after trying it many times with xmlhttprequest and cors
	function jsonp(url, callback) {
	    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
	    
	    window[callbackName] = function(data) {
	        delete window[callbackName];
	        document.body.removeChild(script);
	        callback(data);
	    };

	    var script = document.createElement('script');
	    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
	    document.body.appendChild(script);
	}

	// set api url
	var sentJSONPRequest = function (city) {
		// set url for jsonp request
		var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=?'
		// call jsonp request		
		jsonp(url, function(data) {

			// fill result with wikipedia object
			result.citydata([data]);

			// use change in city for observable
			result.cityname(data[0]); 			

  		});
	};

  	return result;

});