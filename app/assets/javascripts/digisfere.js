window.DigiSFere = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this._SORTBY = [1,2,3,4,5];
    var $rootEl = $('#content');
    /* Center point for San Francisco, CA
     * and default zoom level for Google Map
     * which encompasses most of SF proper.
     */
    DigiSFere.center = {
      lat: 37.783,
      lng: -122.4167
    };
    DigiSFere.zoom = 14;

    var listings = new DigiSFere.Collections.Listings();
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
