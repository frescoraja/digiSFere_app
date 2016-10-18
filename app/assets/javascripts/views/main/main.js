DigiSFere.Views.Main = Backbone.CompositeView.extend({
  template: JST['main/main'],

  className: 'content-view',

  initialize: function () {
    this.addSearchBarView();
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

  addSearchBarView: function() {
    this.searchBarView = new DigiSFere.Views.SearchBar({
      collection: this.collection
    });
    this.addSubview('#searchbar', this.searchBarView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.mapView.createMap();
    return this;
  }
});
