DigiSFere.Views.Map = Backbone.View.extend({
  initialize: function () {
    this._colors = ['#eeeeee',
                    '#5297ff',
                    '#e74848',
                    '#c481ff',
                    '#79faa1',
                    '#ffe663'];
    this._markers = {};
    this._genStyles();
  },

  id: 'map-canvas',

  template: JST['map/map'],

  addMarker: function (listing) {
    if (this._markers[listing.id]) { return; }
    var view = this;
    var mColor = this._colors[listing.get('category')];
    var marker = new google.maps.Marker({
      position: { lat: listing.get('latitude'), lng: listing.get('longitude') },
      map: this._map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: mColor,
        fillColor: mColor,
        fillOpacity: 0.8,
        strokeWeight: 9,
        strokeOpacity: 0.35,
      }
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.infoWindow && view.infoWindow.close();
      view.showMarkerInfo(event, marker, listing);
    });

    this._markers[listing.id] = marker;
  },

  closeInfoWindow: function() {
    this.infoWindow && this.infoWindow.close();
  },

  removeMarker: function (listing) {
    var marker = this._markers[listing.id];
    if (marker) {
      marker.setMap(null);
      delete this._markers[listing.id];
    }
  },

  /*
   * When the user stops moving the map,
   * the bounds of the new map position are
   * used to filter the collection.
   */
  setBounds: function () {
    /*
     * Set new center point and zoom level
     * on DigiSFere global object, so the
     * map position is stored in state
     */
    DigiSFere.center = {
      lat: this._map.getCenter().lat(),
      lng: this._map.getCenter().lng()
    };
    DigiSFere.zoom = this._map.zoom;

    // Get map's corner coordinates - NE and SW
    var bounds = this._map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    // Set new map boundary filters
    this.collection.filterData.lat = [sw.lat(), ne.lat()];
    this.collection.filterData.lng = [sw.lng(), ne.lng()];

    // Then fetch collection based on filters
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

  createMap: function () {
    var mapOptions = {
      disableDefaultUI: true,
      panControl: false,
      zoomControl: true,
      scaleControl: true,
      center: DigiSFere.center,
      zoom: DigiSFere.zoom,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };
    this._map = new window.google.maps.Map(this.el, mapOptions);
    this._map.mapTypes.set('map_style', this._styledMap);
    this._map.setMapTypeId('map_style');
    this.attachMapListeners();
    this.collection.forEach(function (listing) {
      this.addMarker(listing);
    }.bind(this));
  },

  render: function () {
    var content= this.template();
    this.$el.html(content);
    return this;
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'click', this.closeInfoWindow.bind(this));
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
    google.maps.event.addListener(this._map, 'idle', this.setBounds.bind(this));
  },

  toggleBounce: function (id) {
    var marker = this._markers[id];
    if (marker.getAnimation()) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  },

  _genStyles: function () {
    this._styles = [
      {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
          { 'visibility': 'on' },
          { 'color': '#9aa8e6' },
          { 'lightness': 5 },
          { 'saturation': 18 },
          { 'gamma': 0.88 }
        ]
      },{
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          { 'saturation': -49 },
          { 'color': '#f6f7ff' },
          { 'gamma': 0.96 },
          { 'lightness': -3 },
          { 'visibility': 'on' }
        ]
      },{
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
          { 'visibility': 'on' },
          { 'color': '#8080a1' },
          { 'lightness': 94 }
        ]
      },{
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.fill',
        'stylers': [
          { 'visibility': 'on' },
          { 'color': '#efeff0' },
          { 'lightness': 13 },
          { 'gamma': 0.43 }
        ]
      },{
        'featureType': 'road.arterial',
        'elementType': 'geometry.fill',
        'stylers': [
          { 'color': '#ffffff' },
          { 'lightness': 38 },
          { 'visibility': 'on' }
        ]
      },{
        'featureType': 'road.arterial',
        'elementType': 'geometry.stroke',
        'stylers': [
          { 'visibility': 'off' }
        ]
      },{
        'featureType': 'road.local',
        'elementType': 'geometry.stroke',
        'stylers': [
          { 'saturation': 100 },
          { 'color': '#ffffff' },
          { 'visibility': 'off' }
        ]
      },{
        'featureType': 'poi',
        'elementType': 'geometry.fill',
        'stylers': [
          { 'visibility': 'on' },
          { 'color': '#c8c8d8' }
        ]
      },{
        'featureType': 'poi',
        'elementType': 'labels.text',
        'stylers': [
          { 'visibility': 'off' }
        ]
      },{
        'elementType': 'labels.text.stroke',
        'stylers': [
          { 'visibility': 'on' },
          { 'color': '#808080' },
          { 'weight': 0.3 }
        ]
      },{
        'featureType': 'poi',
        'elementType': 'labels.icon',
        'stylers': [
          { 'visibility': 'off' }
        ]
      },{
      }
    ];

    this._styledMap = new google.maps.StyledMapType(this._styles,
                                                    { name: 'Styled Map'});
  }

});
