window.DigiSFere = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this._SORTBY = [1,2,3,4,5];
    var $rootEl = $('#content');
    var listings = new DigiSFere.Collections.Listings();
    var searchbar = new DigiSFere.Views.SearchBar({
      collection: listings
    });

    $('#searchbar').html(searchbar.render().$el);

    new DigiSFere.Routers.Router({
      $rootEl: $rootEl,
      searchbar: searchbar,
      listings: listings
    });

    Backbone.history.start();
  }
};
