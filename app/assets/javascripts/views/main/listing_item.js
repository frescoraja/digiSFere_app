DigiSFere.Views.ListingItem = Backbone.View.extend({
  template: JST['listings/item'],

  tagName: 'li',

  className: 'listing-item-view',

  events: {
    'click .list-item': 'gotoShow'
  },

  initialize: function () {
    if (this.model.get('title').length > 75) {
      var words = this.model.get('title').slice(0, 75);
      words = words.split(' ');
      words = words.slice(0, words.length - 1);
      this.listTitle = words.join(' ').concat('...');
    } else {
      this.listTitle = this.model.get('title');
    }
    this.listenTo(this.model, 'sync', this.render);
  },

  checkNewListings: function () {
    var time = parseInt(Date.parse(this.model.get('updated_at')));
    var now = parseInt(new Date().getTime());
    if ((now - time) < 86400000) {
      $new = $('<span>').text("New!").css('color', 'red').addClass('new-item');
      this.$el.find('.category-title').append($new);
    }
  },

  gotoShow: function (event) {
    event.preventDefault();
    var listingId = $(event.currentTarget).data('id');
    Backbone.history.navigate('listings/' + listingId, { trigger: true });
  },

  render: function () {
    var content = this.template({
      listing: this.model,
      title: this.listTitle
    });
    this.$el.html(content);
    this.checkNewListings();
    return this;
  }
});
