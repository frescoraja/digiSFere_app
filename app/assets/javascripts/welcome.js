(function () {
  if (typeof DigiSFere === 'undefined') {
    window.DigiSFere = {};
  }

  var welcome = DigiSFere.welcome = function () {
    $('.enter-site').click(function () {
      $('.new-session-form').addClass('visible');
    });

    $('#guestsubmit').click(function (event) {
      event.preventDefault();
      $('#login-username').val('Guest');
      $('#login-password').val('password');
      $('.sign-in-btn').click();
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
  };

})();
