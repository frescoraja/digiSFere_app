window.DigiSFere = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var listings = new DigiSFere.Collections.Listings();

    new DigiSFere.Routers.Router({
      $rootEl: $rootEl,
      listings: listings
    });

    var searchBarView = new DigiSFere.Views.SearchBar({
      collection: listings
    });

    $('#searchbar').html(searchBarView.render().$el);

    Backbone.history.start();
  },

  welcome: function () {
    $('.enter-site').click(function () {
      $('.new-session-form').addClass('visible');
    });

    $('#password').keyup(function () {
      var passwordLength = $(this).val().length;
      if (passwordLength <= 5 && passwordLength > 0) {
        $('#password').css('color','red');
        $('.error')
          .text('Password too short. Must be 6 characters or longer.');
      } else if (passwordLength > 5){
        $('#password').css('color', 'white');
        $('.error').empty();
      }
    });

    $('.toggle-form').click(function () {
      $('.new-session-form').removeClass('visible');
      $('.new-user-form').addClass('visible');
    });

    $('body').click(function (event) {
      var posX = event.pageX,
          posY = event.pageY,
          width = $(window).width()-185;
      if (posX > 300 && posX < width || (posX > width && posY > 53)) {
        $('.visible').removeClass('visible');
        $('.errors').empty();
        $('input').empty();
      }
    });
  }
};
