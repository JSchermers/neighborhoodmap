//  load neightborhoodcities data via require json plugin

require(['json!models/cities.json?callback=define'], function(data) {

        //The data object will be the API response for the
        //JSONP data call.
        console.log(data);

});