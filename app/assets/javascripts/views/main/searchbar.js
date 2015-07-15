DigiSFere.Views.SearchBar = Backbone.View.extend({
  template: JST['main/searchbar'],

  className: 'searchbar-view col-xs-10 col-xs-offset-1',

  events: {
    'click .banner-input-placeholder': 'focusSearch',
    'focus .banner-input-field': 'hidePlaceholder',
    'blur .banner-input-field': 'revealPlaceholder',
    'submit .banner-input': 'triggerSearch',
    'click .banner-search-button': 'checkSearch'
  },

  checkSearch: function (event) {
    if ($('.banner-input-field').val() === '') {
      $('.banner-input-field').submit();
      $('.banner-input-field').blur();
    }
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
    var searchParams = $('.banner-input-field').val();
    this.collection.filterData.query = searchParams;
    this.collection.filter();
    if ($('.content-view').length === 0) {
      Backbone.history.navigate('', { trigger: true });
    }
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
