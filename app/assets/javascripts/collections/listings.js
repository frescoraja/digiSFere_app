DigiSFere.Collections.Listings = Backbone.Collection.extend({
  url: '/api/listings/search',

  model: DigiSFere.Models.Listing,

	initialize: function (){
		this.filterData = {
			lat: [37.67767358309138, 37.8887756788066],
      lng: [-122.56501542968749, -122.26838457031249],
			query: "",
			category: []
		};
	},

  comparator: function (collection) {
    return(collection.get('updated_at'));
  },

	filter: function () {
		this.fetch({
			data: { filter_data: this.filterData },
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
