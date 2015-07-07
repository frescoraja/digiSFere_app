DigiSFere.Views.FilterBar = Backbone.View.extend({
  className: 'filterbar-view',

  attributes: {
    id: 'filterbar'
  },

  template: JST['main/filterbar'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.count);
  },

  events: {
    'click .category': 'categoryFilter',
    'click .new-listing-tile': 'showNewListingModal'
  },

  count: function () {
    this._counts = this.collection.countBy('category');
    $('.num-jobs').text(this._counts[1] || 0);
    $('.num-startups').text(this._counts[2] || 0);
    $('.num-events').text(this._counts[3] || 0);
    $('.num-workspaces').text(this._counts[4] || 0);
    $('.num-companies').text(this._counts[5] || 0);
  },

  categoryFilter: function (event) {
    var $filterTile = $(event.currentTarget);
    $filterTile.toggleClass('clicked');
    var filter = $filterTile.data('id'),
      filters = this.collection.filterData.category,
      idx = filters.indexOf(filter);
    if (idx === -1) {
      this.collection.filterData.category.push(filter);
    } else {
      filters.splice(idx, 1);
    }
    this.collection.filter();
  },

  showNewListingModal: function () {
    this.modalView = this.modalView ||
      new DigiSFere.Views.NewListing({
        collection: this.collection
      });
    $('body').append(this.modalView.render().$el);
    this.modalView.delegateEvents();
  },

  render: function () {
    var content = this.template({
      listings: this.collection
    });
    this.$el.html(content);
    this.count();
    return this;
  }
});
