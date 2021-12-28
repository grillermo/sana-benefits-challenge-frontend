// Pulled out from Geosuggest codebase
import predictions from './test.fixtures';

export default function googleStub() {
    var predictionStub = function (options, callback) {
        var suggestsGoogle = predictions_1.default().filter(function (prediction) {
            return prediction.terms.find(function (term) { return term.value.startsWith(options.input); });
        });
        var result = suggestsGoogle.length > 0 ? suggestsGoogle : null;
        callback(result);
    };
    var geocodeStub = function (query, callback) {
        if (query.address === '' || query.placeId === '') {
            callback([], 'ZERO_RESULTS');
            return;
        }
        callback([
            {
                geometry: {
                    location: {
                        lat: function () { return 0; },
                        lng: function () { return 0; }
                    }
                }
            }
        ], 'OK');
    };
    var placesStub = function (query, callback) {
        if (query.placeId === '') {
            callback({}, 'ZERO_RESULTS');
            return;
        }
        callback({
            geometry: {
                location: {
                    lat: function () { return 0; },
                    lng: function () { return 0; }
                }
            }
        }, 'OK');
    };
    var google = {
        maps: {
            Geocoder: function () {
                return {
                    geocode: geocodeStub
                };
            },
            GeocoderStatus: {
                OK: 'OK'
            },
            LatLng: function () { return true; },
            places: {
                AutocompleteService: function () {
                    return {
                        getPlacePredictions: predictionStub
                    };
                },
                AutocompleteSessionToken: function () {
                    return {
                        token: 'token'
                    };
                },
                PlacesService: function () {
                    return {
                        getDetails: placesStub
                    };
                },
                PlacesServiceStatus: {
                    OK: 'OK'
                }
            }
        }
    };
    return google;
}
