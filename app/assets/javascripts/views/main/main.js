DigiSFere.Views.Main = Backbone.CompositeView.extend({
  template: JST['main/main'],

  className: 'content-view',

  initialize: function () {
    this.addMapView();
    this.addListingsView();
    this.addFilterBarView();
  },

  addFilterBarView: function () {
    this.filterBarView = new DigiSFere.Views.FilterBar({
      collection: this.collection
    });
    this.addSubview('.filterbar', this.filterBarView);
  },

  addListingsView: function () {
    this.listingsIndex = new DigiSFere.Views.ListingsIndex({
      collection: this.collection,
      map: this.mapView
    });
    this.addSubview('.listingsindex', this.listingsIndex);
  },

  addMapView: function () {
    this.mapView = new DigiSFere.Views.Map({
      collection: this.collection
    });
    this.addSubview('.map', this.mapView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.mapView.createMap();
    return this;
  }
});
