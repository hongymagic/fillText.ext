
/**
 * # CSS Parser method #
 *
 * @param   {string} Semi-colon delimitered CSS properties
 * @returns {object} JSON-style name/value pair
 * 
 * ## usage ##
 *
 * `parse('font-weight: 700; font-size: 1em', 'font-family: Verdana, sans-serif');`
 *
 * This is a pretty inefficient way of parsing CSS properties. The purpose here
 * is to just parse the damn thing and have it referenced like:
 *
 *  - `css.fontWeight`
 *  - `css.lineHeight`
 *  - `css.letterSpacing`
 *
 * DO WHATEVER LICENSE
 */
var parse = (function () {
  var slice = Array.prototype.slice,
    split = String.prototype.split,
    trim = String.prototype.trim,
    forEach = Array.prototype.forEach,
    replace = String.prototype.replace,
    map = Array.prototype.map,
    toUpperCase = String.prototype.toUpperCase,
        
/* `String.prototype.camelCase` (i.e., this == the string) */

    camelCase = function () {
      return replace.call(this, /-([a-z])/gi, function (s, c) {
        return toUpperCase.call(c);
      });
    },

/**
 * Determine if the given value requires a unit. If it does, attach default
 * unit of `'px'` and return in string format
 */

    unit_r = /^-*(\d+)+\.*(\d)*$/,
    DEFAULT_UNIT = 'px',

    defaultUnit = function (value) {
      if (unit_r.test(value)) {
        return value + DEFAULT_UNIT;
      }

      return String(value);
    };
    
  return function () {
    var styles = slice.call(arguments),
      css = {};

/* Some ugly shit. Look at it at your own pace */
        
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

/* For `node.js`, export parse method for testing */
if (typeof module.exports !== 'undefined') {
  module.exports.parse = parse;
}

