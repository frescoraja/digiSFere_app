DigiSFere.Views.ListingShow = Backbone.View.extend({
  template: JST['listings/show'],

  className: 'listing-show-view',

  events: {
    'click .go-back': 'toMain'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  toMain: function () {
    Backbone.history.navigate('', { trigger: true });
  },

  render: function () {
    var content = this.template({
      listing: this.model
    });
    this.$el.html(content);
    return this;
  }
});
