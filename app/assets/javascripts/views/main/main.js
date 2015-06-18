DigiSFere.Views.Main = Backbone.CompositeView.extend({
  template: JST['main/main'],

  className: 'content-view',

  initialize: function () {
    this.addFilterView();
    this.addListingsIndexView();
    this.addMapView();
  },

  addFilterView: function () {
    var filterView = new DigiSFere.Views.FilterBar({
      collection: this.collection
    });

  },

  addListingsIndexView: function () {

  },

  addMapView: function () {

  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    this.onRender();
    return this;
  }
});
