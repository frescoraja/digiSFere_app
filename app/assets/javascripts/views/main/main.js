DigiSFere.Views.Main = Backbone.CompositeView.extend({
  template: JST['main/main'],

  className: 'content-view',

  initialize: function () {
    this.addMapView();
    this.addFilterBarView();
    this.addListingsView();
  },

  addFilterBarView: function () {
    var filterBarView = new DigiSFere.Views.FilterBar({
      collection: this.collection
    });
    this.addSubview('.filterbar', filterBarView);
  },

  addListingsView: function () {
    var listingsView = new DigiSFere.Views.ListingsIndex({
      collection: this.collection,
      map: this.mapView
    });
    this.addSubview('.listingsindex', listingsView);
  },

  addMapView: function () {
    this.mapView = new DigiSFere.Views.Map({
      collection: this.collection
    });
    this.addSubview('.map', this.mapView);
    this.mapView.showMap();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  }
});
