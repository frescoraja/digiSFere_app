DigiSFere.Views.ListingsIndex = Backbone.SortedSubview.extend({
	className: 'listingsindex-view',

	template: JST['listings/index'],

	events: {
		'mouseenter .list-item': 'toggleBounce',
		'mouseleave .list-item': 'toggleBounce',
		// 'click .change-page': 'updatePage' // Paginated results
	},

	initialize: function (options) {
		// this.page = this.collection.filterData.page;
		this._map = options.map;
		this.listenTo(this.collection, 'sort filter', this.render);
    this.listenTo(this.collection, 'add', this.addListing);
    this.listenTo(this.collection, 'remove', this.removeListing);
		this.collection.each(this.addListing.bind(this));
	},

	addListing: function (listing) {
		var listingItemView = new DigiSFere.Views.ListingItem({
			model: listing
		});
		this.addSubview('.listings-list', listingItemView);
    this.collection.trigger('sort');
	},

	removeListing: function (listing) {
		this.removeModelSubview('.listings-list', listing);
	},

	toggleBounce: function (event) {
		var listingId = $(event.currentTarget).data('id');
		this._map.toggleBounce(listingId);
	},

  updateCategories: function () {
		var categories = ['Jobs','Startups','Events','Workspaces','Companies'];
		var headingStrings = [];
		var self = this;
		categories.forEach(function (cat, idx) {
			if (self.collection.filterData.category.indexOf(idx + 1) === -1) {
				headingStrings.push(cat);
			}
		});
		headingStrings = headingStrings.join(', ');
		$('.list-item-header-content').append(headingStrings);

    return this;
	},

	updateCounts: function () {
    var size = this.collection.size();
    var counts = this.collection._counts;
    var total = counts ? counts.whitelisted : 0;
    $('.idxcount').text(size);
    $('.total').text(total);
    if (size === 0) {
      $('.list-item-header-content')
        .text('No results found...');
    }

    return this;
	},

	updateHeader: function () {
    this.updateCategories().updateCounts();
  },

	// updatePage: function () {
	// 	var totalPgs = Math.ceil(this.total / 10);
	// 	for (var i = 1; i <= totalPgs; i++) {
	// 		var idStr = String("pg" + i);
	// 		$pgLink = $('<a>').attr('id', idStr).text(i);
	// 		if (this.page === i) {
	// 			$pgLink.addClass('current-page');
	// 		}
	// 		$('.change-page').append($pgLink);
	// 	}
	// },

	render: function () {
		var content = this.template();
		this.$el.html(content);
    this.updateHeader();
		this.attachSubviewsSorted(DigiSFere._SORTBY);
		return this;
	}
});
