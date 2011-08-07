
/**
 * Some module system
 */

(function () {
  var slice = Array.prototype.slice,
      forEach = Array.prototype.forEach,
      split = String.prototype.split;

  var properties = {
    parse: function () {
      var styles = slice.call(arguments);
      forEach.call(styles, function (style) {
        var properties = split.call(style, ';');
        forEach.call(properties, function (property) {
          var pair = split.call(property, ':').map(function (s) { return s.trim(); });
          console.log(pair);
        });
      });
    }
  };
}());
