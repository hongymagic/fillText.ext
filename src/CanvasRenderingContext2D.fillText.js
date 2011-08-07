(function (window, extensions) {
  'use strict';

  var context = window.CanvasRenderingContext2D;

// We require CanvasRenderingContext2D.extensions namespace

  if (!extensions) {
    throw new 'Extensions required';
  }

// Copy reference to previous fillText operation
  
  var fillText = context.fillText;

// Reference to commonly used methods
  
  var slice = Array.prototype.slice,
      splice = Array.prototype.splice,
      join = Array.prototype.join,
      reverse = Array.prototype.reverse;

// The new fillText(text, x, y, [css...]);
// @param text  {string}  Text to render on canvas
// @param x     {number}  x-component of the cordinate to start from
// @param y     {number}  y-component of the cordinate to start from
// @param [css] {string}  CSS-style properties
// @usage   
//  context.fillText('Apple', 0, 50, 'letter-spacing: 5px');

  CanvasRenderingContext2D.fillText = function (text, x, y) {

// Argument type checking

    text = String(text);
    x = parseInt(x, 10);
    y = parseInt(y, 10);

// Extract css properties

    var css = context.extensions.css.parse(splice.call(slice.call(arguments), 3)),
        prop;

    for (prop in css) {
      if (hasOwnProperty.call(css, prop)) {

// CSS detected, so modify rendering procedure

        void 0;
      }
    }
  };
}(window, CanvasExtensions));
