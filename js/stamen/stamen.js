(function(exports) {

/*
 * tile.stamen.js v1.3.0
 */

var SUBDOMAINS = "a. b. c. d.".split(" "),
    MAKE_PROVIDER = function(layer, type, minZoom, maxZoom) {
        return {
            //"url":          ["http://{S}tile.stamen.com/", layer, "/{Z}/{X}/{Y}.", type].join(""),
			"url": ["https://tiles.stadiamaps.com/tiles/", layer, "/{Z}/{X}/{Y}.", type].join(""),

            "type":         type,
            "subdomains":   SUBDOMAINS.slice(),
            "minZoom":      minZoom,
            "maxZoom":      maxZoom,
            "attribution":  [
                // This attribution is overrided below
                'Map tiles by <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>, ',
                'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
                'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
            ].join("")
        };
    },
    PROVIDERS =  {
        "stamen_toner":        MAKE_PROVIDER("stamen_toner", "jpg", 0, 20),
        "stamen_terrain":      MAKE_PROVIDER("stamen_terrain", "jpg", 0, 18),
        "stamen_terrain_classic": MAKE_PROVIDER("stamen_terrain_classic", "png", 0, 18),
        "watercolor":   MAKE_PROVIDER("watercolor", "jpg", 1, 18),
        "trees-cabs-crime": {
            "url": "http://{S}.tiles.mapbox.com/v3/stamen.trees-cabs-crime/{Z}/{X}/{Y}.png",
            "type": "png",
            "subdomains": "a b c d".split(" "),
            "minZoom": 11,
            "maxZoom": 18,
            "extent": [
                {"lat": 37.853, "lon": -122.577},
                {"lat": 37.684, "lon": -122.313}
            ],
            "attribution": [
                'Design by Shawn Allen at <a href="http://stamen.com/">Stamen</a>.',
                'Data courtesy of <a href="http://fuf.net/">FuF</a>,',
                '<a href="http://www.yellowcabsf.com/">Yellow Cab</a>',
                '&amp; <a href="http://sf-police.org/">SFPD</a>.'
            ].join(" ")
        }
    };

//PROVIDERS["terrain-classic"].url = "http://{S}tile.stamen.com/terrain/{Z}/{X}/{Y}.png";
//don't do nothing because the only layer we use is the terrain one
PROVIDERS["stamen_terrain_classic"].url = "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.jpg";
// set up toner and terrain flavors
setupFlavors("stamen_toner", ["hybrid", "labels", "lines", "background", "lite"]);
setupFlavors("stamen_terrain", ["background", "labels", "lines"]);

// toner 2010
deprecate("stamen_toner", ["2010"]);

// toner 2011 flavors
deprecate("stamen_toner", ["2011", "2011-lines", "2011-labels", "2011-lite"]);

var odbl = [
    "stamen_toner",
    "stamen_toner_hybrid",
    "stamen_toner_labels",
    "stamen_toner_lines",
    "stamen_toner_background",
    "stamen_toner_lite",
    "stamen_terrain",
    "stamen_terrain_background",
    "stamen_terrain_lines",
    "stamen_terrain_labels",
    "stamen_terrain_classic"
];

for (var i = 0; i < odbl.length; i++) {
    var key = odbl[i];

    PROVIDERS[key].retina = true;
    PROVIDERS[key].attribution = [
        'Map tiles by <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> ',
        'and <a href="https://stamen.com/" target="_blank">Stamen Design</a>, ',
        'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
        'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, ',
        'under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    ].join("");
}

/*
 * Export stamen.tile to the provided namespace.
 */
exports.stamen = exports.stamen || {};
exports.stamen.tile = exports.stamen.tile || {};
exports.stamen.tile.providers = PROVIDERS;
exports.stamen.tile.getProvider = getProvider;

function deprecate(base, flavors) {
    var provider = getProvider(base);

    for (var i = 0; i < flavors.length; i++) {
        var flavor = [base, flavors[i]].join("_");
        PROVIDERS[flavor] = MAKE_PROVIDER(flavor, provider.type, provider.minZoom, provider.maxZoom);
        PROVIDERS[flavor].deprecated = true;
    }
};

/*
 * A shortcut for specifying "flavors" of a style, which are assumed to have the
 * same type and zoom range.
 */
function setupFlavors(base, flavors, type) {
    var provider = getProvider(base);
    for (var i = 0; i < flavors.length; i++) {
        var flavor = [base, flavors[i]].join("_");
        PROVIDERS[flavor] = MAKE_PROVIDER(flavor, type || provider.type, provider.minZoom, provider.maxZoom);
    }
}

/*
 * Get the named provider, or throw an exception if it doesn't exist.
 */
function getProvider(name) {
    if (name in PROVIDERS) {
        var provider = PROVIDERS[name];

        if (provider.deprecated && console && console.warn) {
            console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
        }

        return provider;
    } else {
        throw 'No such provider (' + name + ')';
    }
}

/*
 * StamenTileLayer for modestmaps-js
 * <https://github.com/modestmaps/modestmaps-js/>
 *
 * Works with both 1.x and 2.x by checking for the existence of MM.Template.
 */
if (typeof MM === "object") {
    var ModestTemplate = (typeof MM.Template === "function")
        ? MM.Template
        : MM.TemplatedMapProvider;
    MM.StamenTileLayer = function(name) {
        var provider = getProvider(name);
        this._provider = provider;
        MM.Layer.call(this, new ModestTemplate(provider.url, provider.subdomains));
        this.provider.setZoomRange(provider.minZoom, provider.maxZoom);
        this.attribution = provider.attribution;
    };

    MM.StamenTileLayer.prototype = {
        setCoordLimits: function(map) {
            var provider = this._provider;
            if (provider.extent) {
                map.coordLimits = [
                    map.locationCoordinate(provider.extent[0]).zoomTo(provider.minZoom),
                    map.locationCoordinate(provider.extent[1]).zoomTo(provider.maxZoom)
                ];
                return true;
            } else {
                return false;
            }
        }
    };

    MM.extend(MM.StamenTileLayer, MM.Layer);
}

/*
 * StamenTileLayer for Leaflet
 * <http://leaflet.cloudmade.com/>
 *
 * Tested with version 0.3 and 0.4, but should work on all 0.x releases.
 */
if (typeof L === "object") {
    L.StamenTileLayer = L.TileLayer.extend({
        initialize: function(name, options) {
            var provider = getProvider(name),
                url = provider.url.replace(/({[A-Z]})/g, function(s) {
                    return s.toLowerCase();
                }),
                opts = L.Util.extend({}, options, {
                    "minZoom":      provider.minZoom,
                    "maxZoom":      provider.maxZoom,
                    "subdomains":   provider.subdomains,
                    "scheme":       "xyz",
                    "attribution":  provider.attribution,
                    sa_id:          name
                });
            L.TileLayer.prototype.initialize.call(this, url, opts);
        }
    });

    /*
     * Factory function for consistency with Leaflet conventions
     */
    L.stamenTileLayer = function (options, source) {
        return new L.StamenTileLayer(options, source);
    };
}


})(typeof exports === "undefined" ? this : exports);
