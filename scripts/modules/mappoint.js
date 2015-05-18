//  load neightborhoodcities data via require json plugin
define([	
	"knockout",
    "async!http://maps.google.com/maps/api/js?sensor=true"
], function (ko) {
        //The data object will be the API response for the
        //JSONP data call.
       	
        // found in js fiddle how to create a map with knockout http://jsfiddle.net/t9wcC/
        // Point object for storing cityname , lat, lon + markers with events
        function Point (name, lat, lon, mapObj) {
            var self = this;
            this.name = name;
            this.lat = ko.observable(lat);
            this.lon = ko.observable(lon);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lon),
                title: name,
                map: mapObj,
                animation: google.maps.Animation.DROP,
                draggable: true
            });

            //if you need the poition while dragging
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
        }

        return Point;

      
    }
);



