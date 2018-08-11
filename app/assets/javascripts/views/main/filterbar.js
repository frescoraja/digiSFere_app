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
    $('.num-jobs').text(counts[1]);
    $('.num-startups').text(counts[2]);
    $('.num-events').text(counts[3]);
    $('.num-workspaces').text(counts[4]);
    $('.num-companies').text(counts[5]);
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
    this.checkFilters();
    return this;
  }
});
