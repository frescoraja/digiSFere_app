DigiSFere.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
		this.searchbar = options.searchbar;
		this.listings = this.searchbar.collection;
	},

	routes: {
		"": "main",
		"listings/:id": "showListing"
	},

	main: function () {
		DigiSFere._SORTBY = [1,2,3,4,5];
		var mainView = new DigiSFere.Views.Main({
			collection: this.listings
		});

		this._swapView(mainView);
	},

	showListing: function (id) {
		var listing = this.listings.getOrFetch(id);
		var showView = new DigiSFere.Views.ListingShow({
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
