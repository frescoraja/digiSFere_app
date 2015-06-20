DigiSFere.Views.MapInfo = Backbone.View.extend({
  template: JST['map/info'],

  className: 'map-info-view',

  render: function () {
    var content = this.template({
      listing: this.model
    });
    this.$el.html(content);
    return this;
  }
});
