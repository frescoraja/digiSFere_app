window.DigiSFere = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this._SORTBY = [1,2,3,4,5];
    this.bounds = {
      lat: [37.67767358309138, 37.8887756788066],
      lng: [-122.56501542968749, -122.26838457031249]
    };
    var $rootEl = $('#content');
    var listings = new DigiSFere.Collections.Listings(this.bounds);
    var searchbar = new DigiSFere.Views.SearchBar({
      collection: listings
    });

    $('#searchbar').html(searchbar.render().$el);

    new DigiSFere.Routers.Router({
      $rootEl: $rootEl,
      listings: listings
    });

    Backbone.history.start();
  }
};
