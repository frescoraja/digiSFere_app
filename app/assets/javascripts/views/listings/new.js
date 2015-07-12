DigiSFere.Views.NewListing = Backbone.View.extend({
  template: JST['listings/new'],

  className: 'new-listing-modal',

  initialize: function () {
    this._colors = ['categories', '#5297ff',
                    '#e74848', '#c481ff',
                    '#79faa1', '#ffe663'];
  },

  events: {
    'click .submit': 'addNewListing',
    'click .img-upload': 'newListingImg',
    'click .new-listing-backdrop': 'dismiss',
    'change #category': 'changeButton',
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
        DigiSFere.TOTAL++;
        this.remove();
      }.bind(this),
      error: function (model, response) {
        $errs = $('<ul>').addClass("errors");
        $('body').prepend($errs);
        response.responseJSON.forEach(function (error) {
          $errs.append($('<li>').text(error));
        });
        setTimeout(function () {
          $('.errors').remove();
        }, 2000);
      }
    });
  },

  changeButton: function () {
    var cValue = this._colors[$('#category').val()];
    $submitBtn = $('.new-listing-submit-button');
    $submitBtn.removeClass('disabled');
    $submitBtn.addClass('submit');
    $submitBtn.css('color', '#444');
    $submitBtn.css('background-color', cValue);
    $submitBtn.find('span').css('color', cValue);
  },

  dismiss: function () {
    this.remove();
  },

  newListingImg: function () {
    event.preventDefault();
    cloudinary.openUploadWidget(window.CLOUDINARY_SETTINGS,
    function(error, result) {
      if (!error) {
        var url = result[0].url;
        $listingImg = $('.list-img').attr('src', url);
        $listingImg.load(function () {
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
