window.DigiSFere = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var listings = new DigiSFere.Collections.Listings();

    new DigiSFere.Routers.Router({
      $rootEl: $rootEl,
      listings: listings
    });

    var searchBarView = new DigiSFere.Views.SearchBar({
      collection: listings
    });

    $('#searchbar').html(searchBarView.render().$el);

    Backbone.history.start();
  }
};
