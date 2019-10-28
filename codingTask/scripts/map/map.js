
/**
 * Map class
 **/

function Map() { }

//Map creator
Map.prototype.initMap = function () {

    //Put data from marker to proper form input elements
    function getDataFromMarker(marker) {
        document.getElementById('lat-input').value = marker.getLngLat().lat;
        document.getElementById('long-input').value = marker.getLngLat().lng;
    }

    //map config
    tt.setProductInfo('TODO App', '1.0.0');
    var map = tt.map({
        key: 'KJy0hPSG3oYOycU209sVkFGX1GyhGc0r',
        container: 'map',
        style: 'tomtom://vector/1/basic-main',
    });
    var center = [4.899431, 52.379189];
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    var marker = null;

    //welcome popup
    var welcome = new tt.Popup({ className: 'tt-popup' })
        .setLngLat(center)
        .setHTML('<h3>Click anywhere on the map to leave a marker.</h3>')
        .addTo(map);

    map.on('click', function (event) {
        welcome.remove();
        //create marker if it doesn't exist
        if (!marker) {
            marker = new tt.Marker({ draggable: true })
                .setLngLat(event.lngLat)
                .addTo(map);
            getDataFromMarker(marker);
            marker.on('drag', function () {
                getDataFromMarker(marker);
            });
        }
    });
}

//Create instance and init map

const map = new Map();
map.initMap();