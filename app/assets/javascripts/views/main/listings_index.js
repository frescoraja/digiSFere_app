DigiSFere.Views.ListingsIndex = Backbone.CompositeView.extend({
	className: 'listingsindex-view',

	template: JST['listings/index'],

	events: {
		'mouseenter .list-item': 'startBounce',
		'mouseleave .list-item': 'stopBounce'
	},

	initialize: function (options) {
		this.map = options.map;
		this.listenTo(this.collection, 'add', this.addListing);
		this.listenTo(this.collection, 'remove', this.removeListing);
		this.listenTo(this.collection, 'sync', this.render);
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

	startBounce: function (event) {
		var listingId = $(event.currentTarget).data('id');
		this.map.startBounce(listingId);
	},

	stopBounce: function (event) {
		var listingId = $(event.currentTarget).data('id');
		this.map.stopBounce(listingId);
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		this.onRender();
		return this;
	}
});
