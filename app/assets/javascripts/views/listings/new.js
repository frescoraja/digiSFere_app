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
    'click .new-listing-backdrop': 'remove',
    'change #category': 'changeButton',
  },

  addNewListing: function (event) {
    event.preventDefault();
    var $form = $('.new-listing'),
        opts = {
          lines: 13,
          length: 28,
          width: 14,
          radius: 42,
          scale: 0.5,
          corners: 1.0,
          opacity: 0.25,
          rotate: 0,
          direction: 1,
          speed: 1,
          trail: 60,
          fps: 20,
          zIndex: 10000,
          className: 'spinner',
          top: '50%',
          left: '50%',
          shade: true,
          hwaccel: true,
          position: 'absolute'
        },
        spinner = new Spinner(opts).spin(),
        $spinner = spinner.el;
    var newListing = new DigiSFere.Models.Listing(),
        listings = this.collection;
    var params = $form.serializeJSON().listing;
    var formHTML = $('.new-listing-form-container');
    var $modal = $('.new-listing-modal');
    formHTML.remove();
    $modal.append($spinner);
    newListing.set(params);
    newListing.save({}, {
      success: function () {
        listings.add(newListing);
        this.remove();
      }.bind(this),
      error: function(err, text) {
        console.log(err, text);
        this.remove();
      }.bind(this)
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

  newListingImg: function (event) {
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
