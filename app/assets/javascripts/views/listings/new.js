DigiSFere.Views.NewListing = Backbone.View.extend({
  template: JST['listings/new'],

  className: 'new-listing',

  events: {
    'click .new-listing-submit': 'addNewListing'
  },

  addNewListing: function (event) {
    event.preventDefault();
    var newListing = new DigiSFere.Models.Listing(),
      listings = this.collection;
    var params = $('.new-listing').serializeJSON().listing;
    newListing.set(params);
    newListing.save({}, {
      success: function () {
        listings.add(newListing);
        this.remove();
      }
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$('.address').geocomplete();
    return this;
  }
});
