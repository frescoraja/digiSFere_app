DigiSFere.Views.SearchBar = Backbone.View.extend({
  template: JST['main/searchbar'],

  className: 'searchbar-view col-xs-10 col-xs-offset-1',

  events: {
    'click .banner-input-placeholder': 'focusSearch',
    'focus .banner-input-field': 'hidePlaceholder',
    'blur .banner-input-field': 'revealPlaceholder',
    'submit .banner-input': 'triggerSearch',
    'click .banner-search-button': 'triggerSearch'
  },

  hidePlaceholder: function (event) {
    $('.banner-input-placeholder').css('display','none');
  },

  focusSearch: function (event) {
    $('.banner-input-field').focus();
  },

  revealPlaceholder: function (event) {
    if ($('.banner-input-field').val() === '') {
      $('.banner-input-placeholder').css('display','block');
    }
  },

  triggerSearch: function (event) {
    event.preventDefault();
    var opts = {
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
          top: '20%',
          left: '50%',
          shade: true,
          hwaccel: true,
          position: 'absolute'
        },
        spinner = new Spinner(opts).spin(),
        $spinner = spinner.el,
        $list = $('.listingsindex-view');
    $list.empty();
    $list.append($spinner);
    var searchParams = $('.banner-input-field').val();
    this.collection.filterData.query = searchParams;
    this.collection.filter();
    if ($('.content-view').length === 0) {
      Backbone.history.navigate("", { trigger: true });
    }
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
