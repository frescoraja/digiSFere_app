DigiSFere.Views.ListingsIndex = Backbone.CompositeView.extend({
	className: 'listingsindex-view',

	template: JST['listings/index'],

	events: {
		'mouseenter .list-item': 'toggleBounce',
		'mouseleave .list-item': 'toggleBounce'
	},

	initialize: function (options) {
		this._map = options.map;
		this.itemsArray = [];
		this.listenTo(this.collection, 'sort', this.render);
		this.listenTo(this.collection, 'add', this.addListing);
		this.listenTo(this.collection, 'remove', this.removeListing);
		this.collection.each(this.addListing.bind(this));
	},

	addListing: function (listing) {
		var listingItemView = new DigiSFere.Views.ListingItem({
			model: listing
		});
		this.itemsArray.push(listingItemView);
		this.addSubview('.listings-list', listingItemView);
	},

	removeListing: function (listing) {
		var idx = this.itemsArray.indexOf(listing);
		this.itemsArray.splice(idx, 1);
		this.removeModelSubview('.listings-list', listing);
	},

	toggleBounce: function (event) {
		var listingId = $(event.currentTarget).data('id');
		this._map.toggleBounce(listingId);
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviewsSorted();
		return this;
	}
});
