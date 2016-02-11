Backbone.SortedSubview = Backbone.CompositeView.extend({
  attachSubviewsSorted: function (order) {
    var view = this;
    this.subviews().each(function (selectorSubviews, selector) {
      view.$(selector).empty();
      order.forEach(function (cat) {
        selectorSubviews.each(function (subview) {
          if (subview.model.get('category') === cat) {
            view.attachSubview(selector, subview);
          }
        });
      });
    });
  }
});
