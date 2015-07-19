(function () {
  if (typeof DigiSFere === 'undefined') {
    window.DigiSFere = {};
  }

  var welcome = DigiSFere.welcome = function () {
    $('.enter-site').click(function () {
      $('.error').empty();
      $('#new-password').val('');
      $('#new-username').val('');
      $('.new-session-form').addClass('visible');
    });

    $('#guestsubmit').click(function (event) {
      event.preventDefault();
      $userInput = $('#login-username');
      $pwInput = $('#login-password');
      autoTyper("Guest", $userInput, function () {
        autoTyper("password", $pwInput, function () {
          $('#sign-in-btn').click();
        });
      });

      function autoTyper (word, $el, callback) {
        var typer = setInterval(function () {
          $el.val($el.val() + word.slice(0,1));
          word = word.substr(1);
          if (word.length === 0) {
            clearInterval(typer);
            callback();
          }
        }, 50);
      }
    });

    $('#new-password').keyup(function () {
      var passwordLength = $(this).val().length;
      if (passwordLength <= 5 && passwordLength > 0) {
        $('#new-password').css('color','red');
        $('.error')
          .text('Password too short. Must be 6 characters or longer.');
      } else if (passwordLength > 5){
        $('#new-password').css('color', 'white');
        $('.error').empty();
      }
    });

    $('.toggle-form').click(function () {
      $('.new-session-form').toggleClass('visible');
      $('.new-user-form').toggleClass('visible');
    });

    $('body').click(function (event) {
      var posX = event.pageX,
          posY = event.pageY,
          width = $(window).width()-185;
      if (posX > 300 && posX < width || (posX > width && posY > 53)) {
        $('.visible').removeClass('visible');
        $('.main').removeClass('moved-right');
        $('.errors').empty();
        $('input').empty();
      }
    });
  };

})();
