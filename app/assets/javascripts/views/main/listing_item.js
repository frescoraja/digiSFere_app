DigiSFere.Views.ListingItem = Backbone.View.extend({
  template: JST['listings/item'],

  tagName: 'li',

  className: 'listing-item-view clearfix',

  events: {
    'click .list-item': 'gotoShow'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  gotoShow: function (event) {
    event.preventDefault();
    var listingId = $(event.currentTarget).data('id');
    console.log(listingId);
    console.log(event.currentTarget);
    Backbone.history.navigate('listings/' + listingId, { trigger: true });
  },

  render: function () {
    var content = this.template({
      listing: this.model
    });
    this.$el.html(content);
    return this;
  }
});
