if (typeof DigiSFere === 'undefined') {
  window.DigiSFere = {};
}

DigiSFere.welcome = function () {
  $('.enter-site').click(function () {
    $('.error').empty();
    $('#new-password').val('');
    $('#new-username').val('');
    $('.new-session-form').addClass('visible');
  });

  $('#guestsubmit').click(function (event) {
    event.preventDefault();
    var $userInput = $('#login-username');
    var $pwInput = $('#login-password');
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

  $('#create').click(function () {
    $username = $('#user_username').val();
    $pw = $('#user_password').val();
    var valid = true;
    if ($pw.length === 0) {
      $('.error').text("Please provide a password.");
      valid = false;
    }
    if ($username.length < 4) {
      $('.error').prepend("Username is too short, must be at least 4 characters long.");
      valid = false;
    }
    if (valid) {
      $("#new_user").submit();
    }
  });

  $('#user_password').keyup(function () {
    var passwordLength = $(this).val().length;
    if (passwordLength < 6 && passwordLength > 0) {
      $('#user_password').css('color','red');
      $('.error')
        .text('Password too short. Must be 6 characters or longer.');
    } else {
      $('#user_password').css('color', 'white');
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
    // user clicks outside entry button, dismisses login sidebar, resets forms
    if (posX > 300 && posX < width || (posX > width && posY > 53)) {
      $('.visible').removeClass('visible');
      $('.main').removeClass('moved-right');
      $('.errors').empty();
      $('input').empty();
    }
  });
};
