DigiSFere.Views.MapInfo = Backbone.View.extend({
  template: JST['map/info'],

  className: 'map-info-view',

  initialize: function () {
    this.shortInfo = this.model.get('about');
    if (this.shortInfo.length > 130) {
      var words = this.shortInfo.substr(0, 130).split(' ');
      words.pop();
      this.shortInfo = words.join(' ').concat('...');
    }
  },

  render: function () {
    var content = this.template({
      listing: this.model,
      shortInfo: this.shortInfo
    });
    this.$el.html(content);
    return this;
  }
});
