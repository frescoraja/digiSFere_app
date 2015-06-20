DigiSFere.Views.ListingItem = Backbone.View.extend({
  template: JST['listings/item'],

  tagName: 'li',

  className: 'listing-item-view clearfix',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      listing: this.model
    });
    this.$el.html(content);
    return this;
  }
});
