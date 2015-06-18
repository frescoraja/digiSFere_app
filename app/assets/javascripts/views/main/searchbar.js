DigiSFere.Views.SearchBar = Backbone.View.extend({
  template: JST['main/searchbar'],
  
  className: 'searchbar-view',

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
