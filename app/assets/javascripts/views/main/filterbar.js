DigiSFere.Views.FilterBar = Backbone.View.extend({
  className: 'filterbar-view',

  tagName: 'ul',

  attributes: {
    id: 'filterbar'
  },

  template: JST['main/filterbar'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.count);
    var view = this;
    this.$el.sortable({
      items: '> li',
      helper: 'clone',
      opacity: 1,
      tolerance: 'pointer',
      containment: 'parent',
      cursor: 'move',
      stop: function (event, obj) {
        var sortBy = [];
        _.forEach($('li.category'), (function (li) {
          sortBy.push($(li).data('id'));
        }));
        DigiSFere._SORTBY = sortBy;
        view.collection.trigger('sort');
      }
    });
  },

  events: {
    'click .category': 'categoryFilter',
    'click .new-listing-tile': 'showNewListingModal'
  },

  checkFilters: function () {
    var filters = this.collection.filterData.category;
    var view = this;
    filters.forEach(function (categoryId) {
      _.forEach(view.$('.category'), function (tile) {
         if (categoryId === $(tile).data('id')) {
           $(tile).addClass('clicked');
         }
      });
    });
  },

  count: function () {
    var counts = this.collection.countBy('category');
    var categoryFilter = this.collection.filterData.category;
    var jobCount = categoryFilter.indexOf(1) >= 0 ? '' : counts[1] || 0;
    var startupCount = categoryFilter.indexOf(2) >= 0 ? '' : counts[2] || 0;
    var eventCount = categoryFilter.indexOf(3) >= 0 ? '' : counts[3] || 0;
    var workspaceCount = categoryFilter.indexOf(4) >= 0 ? '' : counts[4] || 0;
    var companyCount = categoryFilter.indexOf(5) >= 0 ? '' : counts[5] || 0;
    $('.num-jobs').text(jobCount);
    $('.num-startups').text(startupCount);
    $('.num-events').text(eventCount);
    $('.num-workspaces').text(workspaceCount);
    $('.num-companies').text(companyCount);
  },

  categoryFilter: function (event) {
    event.preventDefault();
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

  sortTiles: function() {
    var tiles = this.$el.find('li');
    var newTiles = [];
    var sortOrder = DigiSFere._SORTBY;
    var selector = '';
    var self = this;
    sortOrder.forEach(function(order) {
      selector = 'li[data-id=' + order + ']';
      newTiles.push(self.$el.find(selector));
    });
    newTiles.push(this.$el.find('.new-listing-tile'));
    this.$el.html(newTiles);
  },

  render: function () {
    this.$el.html(this.template());
    this.sortTiles();
    this.count();
    return this;
  }
});
