DigiSFere.Views.SearchBar = Backbone.View.extend({
  template: JST['main/searchbar'],

  className: 'searchbar-view',

  events: {
    "click .banner-input-placeholder": "hidePlaceholder",
    "blur .banner-input-field": "revealPlaceholder",
    "submit .banner-input": "triggerSearch",
    "click .banner-search-button": "initiateSearch"
  },

  hidePlaceholder: function (event) {
    $(event.currentTarget).addClass('invisible');
    $('.banner-input-field').focus();
  },

  initiateSearch: function (event) {
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
    $('.banner-input-field').blur();
    this.collection.filterData.query = searchParams;
    console.log(this.collection.filterData);
    this.collection.filter();
  }
});
