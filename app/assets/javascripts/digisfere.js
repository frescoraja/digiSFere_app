window.DigiSFere = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Welcome to digiSFere!');

    var $rootEl = $('#content');
    var listings = new DigiSFere.Collections.Listings();
    listings.fetch();

    new DigiSFere.Routers.Router({
      $rootEl: $rootEl,
      listings: listings
    });


    var searchBarView = new DigiSFere.Views.SearchBar({
      collection: listings,
      $results: $('.content-main')
    });

    $('#searchbar').html(searchBarView.render().$el);

    Backbone.history.start();
  }
};
