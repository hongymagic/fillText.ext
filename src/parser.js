/*jslint devel: true, browser: true, es5: true, maxerr: 50, indent: 2 */

/// 
/// CSS Parser method
///
/// @param    css-properties {String} Semi-colon delimitered CSS properties
/// @returns                 {Object} JSON-style name/value pair
///
/// @usage:
///  parse('font-weight: 700; font-size: 1em', 'font-family: Verdana, sans-serif');
///
/// This is a pretty inefficient way of parsing CSS properties. The purpose here
/// is to just parse the damn thing and have it referenced like:
///  css.fontWeight;
///
var parse = (function () {
  var slice = Array.prototype.slice,
    split = String.prototype.split,
    trim = String.prototype.trim,
    forEach = Array.prototype.forEach,
    replace = String.prototype.replace,
    map = Array.prototype.map,
    toUpperCase = String.prototype.toUpperCase,
        
// String.prototype.camelCase (i.e., this == the string)

    camelCase = function () {
      return replace.call(this, /-([a-z])/gi, function (s, c) {
        return toUpperCase.call(c);
      });
    },

// Determin if the given value requires a unit. If it does, attach default
// unit of 'px' and return in string format

    unit_r = /^-*(\d+)+\.*(\d)*$/,
    DEFAULT_UNIT = 'px',

    defaultUnit = function (value) {
      if (unit_r.test(value)) {
        return value + DEFAULT_UNIT;
      }

      return value + '';
    };
    
  return function () {
    var styles = slice.call(arguments),
      css = {};
        
    forEach.call(styles, function (style) {
      var properties = split.call(style, ';');
      forEach.call(properties, function (property) {
        try {
          var pair = split.call(property, ':'),
            name = camelCase.call(trim.call(pair[0])),
            value = defaultUnit(trim.call(pair[1]));

          css[name] = value;
        } catch (propertyError) {
          console.error(propertyError);
        }
      });
    });
        
    return css;
  };
}());

exports.parse = parse;
