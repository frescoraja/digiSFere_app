DigiSFere.Views.Main = Backbone.CompositeView.extend({
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
    this.addMapView();
    this.addListingsView();
    this.addFilterBarView();
  },

  addFilterBarView: function () {
    this.addSubview('.filterbar', this.filterBarView);
  },

  addListingsView: function () {
    this.addSubview('.listingsindex', this.listingsIndex);
  },

  addMapView: function () {
    this.addSubview('.map', this.mapView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
