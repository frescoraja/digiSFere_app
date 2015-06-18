DigiSFere.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
		this.listings = options.listings;
	},

	routes: {
		"": "main"
	},

	main: function () {
		var mainView = new DigiSFere.Views.Main({
			collection: this.listings
		});

		this._swapView(mainView);
	},

	_swapView: function (view) {
		this._currentView && this._currentView.remove()
		this._currentView = view;
		this.$rootEl.html(view.$el);
		view.render();
	}
});
