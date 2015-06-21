DigiSFere.Views.ListingShow = Backbone.View.extend({
  template: JST['listings/show'],

  className: 'listing-show-view',

  events: {
    'click .map-view': 'getLocation'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  getLocation: function (event) {
    event.preventDefault();
    console.log(event);
  },

  render: function () {
    var content = this.template({
      listing: this.model
    });
    this.$el.html(content);
    return this;
  }
});
