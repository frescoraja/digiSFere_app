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
    var bounds = this._map.getBounds()
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
      zoom: 14
    };
    this._map = new window.google.maps.Map(this.el, mapOptions);
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    this.listenTo(this._map, 'click', this.closeInfoWindow.bind(this));
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
    google.maps.event.addListener(this._map, 'idle', this.setBounds.bind(this));
  }
});
