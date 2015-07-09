DigiSFere.Views.ListingsIndex = Backbone.CompositeView.extend({
	className: 'listingsindex-view',

	template: JST['listings/index'],

	events: {
		'mouseenter .list-item': 'toggleBounce',
		'mouseleave .list-item': 'toggleBounce'
	},

	initialize: function (options) {
		this._map = options.map;
		this.listenTo(this.collection, 'sort sync', this.render);
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

	toggleBounce: function (event) {
		var listingId = $(event.currentTarget).data('id');
		this._map.toggleBounce(listingId);
	},

	updateCounts: function () {
		this.count = this.collection.size();
		$('.total').text(DigiSFere.TOTAL);
		$('.idxcount').text(this.count);
	},

	updateHeader: function () {
		var categories = ['Jobs','Startups','Events','Workspaces','Companies'];
		headingStrings = [];
		var self = this;
		categories.forEach(function (cat, idx) {
			if (self.collection.filterData.category.indexOf(idx + 1) === -1) {
				headingStrings.push(cat);
			}
		});
		headingStrings = headingStrings.join(', ');
		$('.list-item-header-content').append(headingStrings);
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviewsSorted();
		this.updateCounts();
		this.updateHeader();
		return this;
	}
});
