DigiSFere.Views.ListingsIndex = Backbone.CompositeView.extend({
	className: 'listingsindex-view',

	template: JST['listings/index'],

	initialize: function () {
		this.listenTo(this.collection, 'add', this.addListing);
		this.listenTo(this.collection, 'remove', this.removeListing);
		this.collection.each(this.addListing.bind(this));
	},

	addListing: function (listing) {
		var listingItemView = new DigiSFere.Views.ListingItem({
			model: listing
		});
		this.addSubview('.listings-list', listingItemView);
	},

	removeListing: function (listing) {
		this.removeModelSubview('.listings-list', listing);
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		this.onRender();
		return this;
	}
});
