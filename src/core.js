/*jslint devel: true, browser: true, es5: true, maxerr: 50, indent: 2 */

(function (window, parse) {
  'use strict';

// Log

  var log = window.log || function () {
    if (window.console) {
      window.console.log(Array.prototype.slice.call(arguments));
    }
  },

    IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0],

// Copy reference to previous fillText operation
  
    document = window.document,
    canvas = document.createElement('canvas'),
    fillText = canvas.getContext('2d').fillText,

// Reference to commonly used methods
  
    slice = Array.prototype.slice,
    splice = Array.prototype.splice,
    join = Array.prototype.join,
    reverse = Array.prototype.reverse,
    split = String.prototype.split;

//
// The new fillText(text, x, y, [css...]);
// @param text  {string}  Text to render on canvas
// @param x     {number}  x-component of the cordinate to start from
// @param y     {number}  y-component of the cordinate to start from
// @param [css] {string}  CSS-style properties
// @usage   
//  context.fillText('Apple', 0, 50, 'letter-spacing: 5px');

  CanvasRenderingContext2D.prototype.fillText = function (text, x, y) {
    log(this, arguments);

// Argument type checking

    text = String(text);
    x = parseInt(x, 10);
    y = parseInt(y, 10);

// Extract css properties

    var css = {}, //parse.apply(parse, splice.call(slice.call(arguments), 3)),
      prop, 
      i,
      matrix = IDENTITY_MATRIX,
      chars = split.call(text, ''),
      charlen = chars.length,
      c,
      transform;

    log('Applying CSS to matrix', matrix);

    for (prop in css) {
      if (css.hasOwnProperty(prop)) {

// CSS detected, so modify rendering procedure

        if (prop === 'letterSpacing') {
          matrix[4] = parseFloat(css[prop]);
        }
        
      }
    }

    log('Matrix formed', matrix);

    for (i = 0; i < charlen; i + 1) {
      transform = slice.call(matrix);
      c = chars[i];
      transform[4] += this.measureText(c).width;
      fillText.call(this, c, x, y);
      this.transform.apply(this, transform);
    }
  };
}(this, window.parse));
