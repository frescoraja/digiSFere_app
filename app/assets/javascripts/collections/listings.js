DigiSFere.Collections.Listings = Backbone.Collection.extend({
  url: '/api/listings/search',

  model: DigiSFere.Models.Listing,

  initialize: function (){
    this.filterData = {
      lat: [],
      lng: [],
      query: "",
      category: []
    };
  },

  parse: function(response) {
    var listings = response.listings;
    this._bound_listings = response.bound_listings;
    this._counts = response.counts;
    return listings;
  },

  filter: function () {
    var collection = this;

    this.fetch({
      data: { filter_data: this.filterData },
      success: function(req, res, xhr) {
        collection.trigger('filter');
      }
    });
  },

  getOrFetch: function (id) {
    var listing = this.get(id),
      listings = this;
    if (!listing) {
      listing = new DigiSFere.Models.Listing({ id: id});
      listing.fetch({
        success: function () {
          listings.add(listing);
        }
      });
    } else {
      listing.fetch();
    }

    return listing;
  }
});
