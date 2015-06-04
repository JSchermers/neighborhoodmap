define([
	"knockout",
	// mappoint needs to be here first for addEventListener
	"../modules/mappoint",
], function (ko) {

	// create result object
	var result = {
		cityname : ko.observable(''),
		citydata : ko.observableArray([])
	};

	// subscribe to custom event
	window.addEventListener("getTitle", getWikipedia, false);

	// use for jsonp call to wikipedia
	var city ='',

	// oldValue
	oldValue = '';

	// call function
	function getWikipedia (e) {
		
		// listen to custom event
		city = e.detail.title;

		// store data object
		var data = '';
	
		// if city equals old value do nothing
		if (city === oldValue) {

			// do something when element is clicked twice
			console.log("you have allready clicked this " + city + " marker");
		}

		// if city contains new value
		else {	

			// check if city is in LocalStorage
			if (localStorage[city]) {

				// get localstorage item and store it
				data = JSON.parse(localStorage[city]);

				// populate observables
				result.citydata([data]);
				result.cityname(city);				
			}

			else {
				// if no localstorage, sent request
				sentJSONPRequest(city);
			}

			// set city to old value
			oldValue = city;
		}
	}

	// found jsonp solution for wikipedia after trying it many times with xmlhttprequest and cors
	function jsonp(url, callback) {
	    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
	    
	    // create callback and delete it
	    window[callbackName] = function(data) {
	        delete window[callbackName];
	        document.body.removeChild(script);
	        callback(data);
	    };

	    // add script
	    var script = document.createElement('script');
	    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;

	    // simple error handling (works in firefox and chrome)
    	window.onerror = function (errorMsg, url, lineNumber) {
	   		alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
		};

	    document.body.appendChild(script);
	}

	// set api url
	var sentJSONPRequest = function (city) {
		
		// set url for jsonp request
		var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=?';
		
		// call jsonp request		
		jsonp(url, function(data) {

			// fill result with wikipedia object
			result.citydata([data[1]]);

			// use change in city for observable
			result.cityname(data[0]); 	

			// if localstorage support
			if (window.localStorage) {

				// store city object with data array
				localStorage[data[0]] = JSON.stringify(data[1]);
			}		

  		});
	};

  	return result;

});