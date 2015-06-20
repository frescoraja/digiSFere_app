DigiSFere.Views.Main = Backbone.CompositeView.extend({
  template: JST['main/main'],

  className: 'content-view',

  initialize: function () {
    this.addListingsView();
    this.addFilterBarView();
    this.addMapView();
  },

  addFilterBarView: function () {
    var filterBarView = new DigiSFere.Views.FilterBar({
      collection: this.collection
    });
    this.addSubview('.filterbar', filterBarView);
  },

  addListingsView: function () {
    var listingsView = new DigiSFere.Views.ListingsIndex({
      collection: this.collection
    });
    this.addSubview('.listingsindex', listingsView);
  },

  addMapView: function () {
    var mapView = new DigiSFere.Views.Map({
      collection: this.collection
    });
    this.addSubview('.map', mapView);
    mapView.showMap();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  }
});
