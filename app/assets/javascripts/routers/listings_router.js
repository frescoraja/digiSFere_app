DigiSFere.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
		this.listings = options.listings;
	},

	routes: {
		"": "main",
		"listings/img": "newListingImg",
    "listings/new": "addNewListing",
		"listing/:id/": "showListing"
	},

	main: function () {
		this.listings.fetch();
		var mainView = new DigiSFere.Views.Main({
			collection: this.listings
		});

		this._swapView(mainView);
	},

	addNewListing: function () {
		var newListingView = new DigiSFere.Views.NewListing({
			collection: this.listings
		});

		this.$rootEl.find('.results-container').html(newListingView.render().$el);
	},

  newListingImg: function () {
    cloudinary.openUploadWidget(window.CLOUDINARY_SETTINGS,
    function(error, result) {
      if (!error) {
        var url = result[0].url;
        $listingImg = $('<img>').attr('src', url);
        $listingImg.load(function () {
          $('.listing-img-goes-here').append($listingImg);
          $('#listing-img_url').val(url);
        });
      } else {
        console.log(error);
      }
    });
	},

	showListing: function (id) {
		var listing = this.listings.getOrFetch(id);
		var showView = new DigiSFere.Views.ShowListing({
			model: listing
		});

		this._swapView(showView);
	},

	_swapView: function (view) {
		this._currentView && this._currentView.remove()
		this._currentView = view;
		this.$rootEl.html(view.$el);
		view.render();
	}
});
