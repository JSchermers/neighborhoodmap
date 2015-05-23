//  load neightborhoodcities data via require json plugin
define([	
	"knockout",
    "async!http://maps.google.com/maps/api/js?sensor=true"
], function (ko) {
        //The data object will be the API response for the
        //JSONP data call.
       	
        // found in js fiddle how to create a map with knockout http://jsfiddle.net/t9wcC/
        // Point object for storing cityname , lat, lon + markers with events
        function Point (name, lat, lon, mapObj, markerId) {
            var self = this;
            this.name = name;
            this.lat = ko.observable(lat);
            this.lon = ko.observable(lon);
            
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lon),
                title: name,
                map: mapObj,
                animation: google.maps.Animation.DROP,
                draggable: true,
                id: "gmimap" + markerId
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

    /*        //if you need the poition while dragging
            google.maps.event.addListener(marker, 'drag', function() {
                var pos = marker.getPosition();
                this.lat(pos.lat());
                this.lon(pos.lng());
            }.bind(this));

            //if you just need to update it when the user is done dragging
            google.maps.event.addListener(marker, 'dragend', function() {
                var pos = marker.getPosition();
                this.lat(pos.lat());
                this.lon(pos.lng());
            }.bind(this));  

            google.maps.event.addListener(marker, 'mouseover', function() {
                var pos = marker.getPosition();
                this.lat(pos.lat());
                this.lon(pos.lng());
            }.bind(this));   */

            google.maps.event.addListener(marker, 'click', function() {
                // get current clicked title and send it to wikipedia
                var title = marker.title,
                markerId = marker.id;

                //create custom event to subscript to (i could not find any knockout specific way to do so)
                var newCity = new CustomEvent("getTitle", {
                    detail: {
                        title : title,                        
                    },
                    bubbles: true,
                    cancelable: true
                });

                // dispatch custom event, to be listened to by Wikipedia Model
                document.getElementById(markerId).dispatchEvent(newCity);            
            }.bind(this));         
        }

        return Point;

      
    }
);



