DigiSFere.signout = function () {
  var idleTime = 0;

  $('#sign-out').click(function (e) {
    signOut();
  });

  var idleInterval = setInterval(timerCount, 60000);

  $(this).mousemove(function (e) {
    idleTime = 0;
  });

  $(this).keypress(function (e) {
    idleTime = 0;
  });

  function timerCount () {
    if (++idleTime > 9) {
      signOut();
      clearInterval(idleInterval);
    }
  }

  function signOut () {
  $.ajax({
    type: 'post',
    url: '/session',
    data: {'_method':'delete'},
    complete: function () {
      location.href = '/';
    }
  });
  }
};
