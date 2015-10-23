DigiSFere.Views.ListingShow = Backbone.View.extend({
  template: JST['listings/show'],

  className: 'listing-show-view',

  events: {
    'click .moreinfo': 'openWindow',
    'click .go-back': 'goToMain'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.categories = ["nada", "job", "startup", "event", "workspace", "company"];
  },

  openWindow: function (event) {
    event.preventDefault();
    url = $('.web-url').attr('href');
    window.open(url);
  },

  goToMain: function (event) {
    Backbone.history.history.back();
  },

  highlightQuery: function () {
    var terms = $('.banner-input-field').val().split(" ");

    if (terms.length > 0) {
      for (var i in terms) {
        $(this.el).highlight(terms[i]);
      }
      var cat = this.categories[this.model.get('category')];
      $('.highlight').addClass(cat);
    }
  },

  shortenURL: function () {
    var urlstring = this.model.get('website');
    if (urlstring) {
      var idx = urlstring.indexOf('.com');
      if (idx != -1) {
        urlstring = urlstring.substr(0, idx + 4);
      }
      $('.website a').text(urlstring);
    }
  },

  render: function () {
    var content = this.template({
      listing: this.model
    });
    this.$el.html(content);
    this.shortenURL();
    this.highlightQuery();
    return this;
  }
});
