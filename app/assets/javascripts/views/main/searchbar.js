DigiSFere.Views.SearchBar = Backbone.View.extend({
  template: JST['main/searchbar'],

  className: 'searchbar-view col-xs-10 col-xs-offset-1',

  events: {
    'click .banner-input-placeholder': 'hidePlaceholder',
    'blur .banner-input-field': 'revealPlaceholder',
    'submit .banner-input': 'triggerSearch',
    'click .banner-search-button': 'checkSearchParams',
    'keyup .banner-input-field': 'triggerSearch'
  },

  hidePlaceholder: function (event) {
    $(event.currentTarget).addClass('invisible');
    $('.banner-input-field').focus();
  },

  checkSearchParams: function (event) {
    event.preventDefault();
    if ($('.banner-input-field').val() === '') {
      return;
    } else {
      $('.banner-input').submit();
    }
  },

  revealPlaceholder: function () {
    if ($('.banner-input-field').val() === '') {
      $('.banner-input-placeholder').removeClass('invisible');
    }
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  triggerSearch: function (event) {
    event.preventDefault();
    var searchParams = $('.banner-input-field').val();
    this.collection.filterData.query = searchParams;
    this.collection.filter();
    if (event.type === 'keyup' && event.keyCode === 13) {
      $('.banner-input-field').blur();
      if ($('.content-main').length === 0) {
        Backbone.history.navigate('', { trigger: true });
      }
    } else if (event.type === 'submit') {
      if ($('.content-main').length === 0) {
        Backbone.history.navigate('', { trigger: true });
      }
    }
  }
});
