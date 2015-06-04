//  load neightborhoodcities data via require json plugin
define([	
	"knockout",
    "async!http://maps.google.com/maps/api/js?sensor=true"
], function (ko) {
        //The data object will be the API response for the
        //JSONP data call.
       	
        // found in js fiddle how to create a map with knockout http://jsfiddle.net/t9wcC/
        // Point object for storing cityname , lat, lon + markers with events
        function Point (name, lat, lon, coat_of_arms, mapObj ) {
            var self = this;
            this.name = name;
            this.lat = ko.observable(lat);
            this.lon = ko.observable(lon);
            
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lon),
                title: name,
                map: mapObj,
                icon: coat_of_arms,
                animation: google.maps.Animation.DROP,
                draggable: false
               });

            // set id to reference it for adding customEvent
            // marker.set("id", marker.title);

            // remove marker objects
            self.removeMarker = function () {
                marker.setMap(null);
                marker = null;
            };

            // get Map
            self.getMap = function () {
                var map = marker.map;
                return map;
            };
   
            google.maps.event.addListener(marker, 'click', function() {
                // get current clicked title and send it to wikipedia
                var title = marker.title;

                //create custom event to subscript to (i could not find any knockout specific way to do so)
                var newCity = document.createEvent("CustomEvent"); 
                newCity.initCustomEvent("getTitle", true, true, {
                        title : title
                });
                // dispatch custom event, to be listened to by Wikipedia Model
                window.dispatchEvent(newCity); 
           }.bind(this));         
        }

        return Point;

      
    }
);



