DigiSFere.Views.ListingShow = Backbone.View.extend({
  template: JST['listings/show'],

  className: 'listing-show-view',

  events: {
    'click .moreinfo': 'openWindow'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  openWindow: function (event) {
    event.preventDefault();
    url = $('.web-url').attr('href');
    window.open(url);
  },

  render: function () {
    var content = this.template({
      listing: this.model
    });
    this.$el.html(content);
    return this;
  }
});
