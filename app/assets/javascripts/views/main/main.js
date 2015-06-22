DigiSFere.Views.Main = Backbone.View.extend({
  template: JST['main/main'],

  className: 'content-view',

  initialize: function () {
    this.mapView = new DigiSFere.Views.Map({
      collection: this.collection
    });
    this.listingsIndex = new DigiSFere.Views.ListingsIndex({
      collection: this.collection,
      map: this.mapView
    });
    this.filterBarView = new DigiSFere.Views.FilterBar({
      collection: this.collection
    });
    this.mapView.showMap();
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
    this.$('.map').html(this.mapView.$el);
    this.$('.listingsindex').html(this.listingsIndex.$el);
    this.$('.filterbar').html(this.filterBarView.$el);
    this.listingsIndex.render();
    this.filterBarView.render();
    return this;
  }
});
