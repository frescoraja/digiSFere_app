DigiSFere.Views.ListingShow = Backbone.View.extend({
  template: JST['listings/show'],

  className: 'listing-show-view',

  initialize: function (options) {
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
