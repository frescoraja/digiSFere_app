DigiSFere.Views.Map = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this._icons = ["marker0.png",
                   "marker1.png",
                   "marker2.png",
                   "marker3.png",
                   "marker4.png",
                   "marker5.png"];
    this._markers = {};

    this._genStyles();
  },

  addMarker: function (listing) {
    if (this._markers[listing.id]) { return; }
    var view = this;
    var iconPath = this._icons[listing.get('category')];
    var model = listing;

    var marker = new google.maps.Marker({
      position: { lat: listing.get('latitude'), lng: listing.get('longitude') },
      map: this._map,
      title: listing.get('title'),
      icon: "/assets/" + iconPath
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      this.infoWindow && this.infoWindow.close();
      view.showMarkerInfo(event, marker, model);
    }.bind(this));
    this._markers[listing.id] = marker;
  },


  closeInfoWindow: function() {
    this.infoWindow && this.infoWindow.close();
  },

  removeMarker: function (listing) {
    var marker = this._markers[listing.id];
    marker.setMap(null);
    delete this._markers[listing.id];
  },

  setBounds: function () {
    var bounds = this._map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    this.collection.filterData.lat = [sw.lat(), ne.lat()];
    this.collection.filterData.lng = [sw.lng(), ne.lng()];
		this.collection.filter();
	},

  showMarkerInfo: function (event, marker, model) {
    var mapInfoView = new DigiSFere.Views.MapInfo({
      model: model
    });

    this.infoWindow = new google.maps.InfoWindow({
      content: mapInfoView.render().$el.html(),
      maxWidth: 240
    });

    this.infoWindow.open(this._map, marker);
  },

  showMap: function () {
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 14,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };
    this._map = new window.google.maps.Map(this.el, mapOptions);
    this._map.mapTypes.set('map_style', this._styledMap);
    this._map.setMapTypeId('map_style');
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    this.listenTo(this._map, 'click', this.closeInfoWindow.bind(this));
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
    google.maps.event.addListener(this._map, 'idle', this.setBounds.bind(this));
  },

  startBounce: function (id) {
    var marker = this._markers[id];
    marker.setAnimation(google.maps.Animation.BOUNCE);
  },

  stopBounce: function (id) {
    var marker = this._markers[id];
    marker.setAnimation(null);
  },

  _genStyles: function () {
    this._styles = [
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#9aa8e6" },
          { "lightness": 5 },
          { "saturation": 18 },
          { "gamma": 0.88 }
        ]
      },{
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          { "saturation": -49 },
          { "color": "#f6f7ff" },
          { "gamma": 0.96 },
          { "lightness": -3 },
          { "visibility": "on" }
        ]
      },{
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#8080a1" },
          { "lightness": 94 }
        ]
      },{
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#efeff0" },
          { "lightness": 13 },
          { "gamma": 0.43 }
        ]
      },{
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#ffffff" },
          { "lightness": 38 },
          { "visibility": "on" }
        ]
      },{
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
          { "saturation": 100 },
          { "color": "#ffffff" },
          { "visibility": "off" }
        ]
      },{
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#c8c8d8" }
        ]
      },{
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "elementType": "labels.text.stroke",
        "stylers": [
          { "visibility": "on" },
          { "color": "#808080" },
          { "weight": 0.3 }
        ]
      },{
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
      }
    ];

    this._styledMap = new google.maps.StyledMapType(this._styles,
                                                    { name: 'Styled Map'});
  }

});
