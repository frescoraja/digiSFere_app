window.DigiSFere = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var listings = new DigiSFere.Collections.Listings();
    var searchbar = new DigiSFere.Views.SearchBar({
      collection: listings
    });

    $('#searchbar').html(searchbar.render().$el);

    new DigiSFere.Routers.Router({
      $rootEl: $rootEl,
      listings: listings,
      searchbar: searchbar
    });

    listings.fetch({
      success: function () {
        DigiSFere.TOTAL = listings.size();
      }
    });
    
    Backbone.history.start();
  }
};
