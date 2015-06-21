DigiSFere.Views.NewListing = Backbone.View.extend({
  template: JST['listings/new'],

  className: 'new-listing-modal',

  events: {
    'click .new-listing-submit': 'addNewListing',
    'click .img-upload': 'newListingImg'
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

  newListingImg: function () {
    event.preventDefault();
    cloudinary.openUploadWidget(window.CLOUDINARY_SETTINGS,
    function(error, result) {
      if (!error) {
        var url = result[0].url;
        $listingImg = $('<img>').attr('src', url);
        $listingImg.load(function () {
          $('.listing-img-goes-here').append($listingImg);
          $('#listing-img_url').val(url);
        });
      } else {
        console.log(error);
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
