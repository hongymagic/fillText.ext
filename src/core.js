
/**
 * # All new fillText #
 *
 * An extension to `CanvasRenderingContext2D.prototype.fillText` to render text
 * with CSS font, letter or word level properties such as:
 *
 *  - `letter-spacing`
 *  - `word-spacing`
 *  - `text-align`
 * 
 * and much more! (coming)
 *
 * @param window  {object}    global object
 * @param parse   {function}  a method which converts CSS-property strings into a JSON object
 */
(function (window, parse) {
  'use strict';

/* TODO: intro.js */

  var log = window.log || function () {
      if (window.console) {
        window.console.log(Array.prototype.slice.call(arguments));
      }
    },

/* Copy reference to previous fillText operation */
  
    fillText = window.CanvasRenderingContext2D.prototype.fillText,

/* TODO: intro.js */
/* Reference to commonly used methods */
  
    slice = Array.prototype.slice,
    splice = Array.prototype.splice,
    join = Array.prototype.join,
    reverse = Array.prototype.reverse,
    split = String.prototype.split;

/*
 * The new `fillText(text, x, y, [css...]);`
 *
 * @param text  {string}  Text to render on canvas
 * @param x     {number}  x-component of the cordinate to start from
 * @param y     {number}  y-component of the cordinate to start from
 * @param [css] {string}  CSS-style properties
 * @usage context.fillText('Apple', 0, 50, 'letter-spacing: 5px');
 */

  window.CanvasRenderingContext2D.prototype.fillText = function (text, x, y) {

// Argument type checking

    text = String(text);
    x = parseInt(x, 10);
    y = parseInt(y, 10);

// Extract css properties

    var css = parse.apply(parse, splice.call(slice.call(arguments), 3)),
      prop, 
      i,
      chars = split.call(text, ''),
      charlen = chars.length,
      c,
      charAdvancement,

/**
 * Firefox 6's measureText([single char]) is different to Chrome, Safari, IE9+
 * see [Bugzilla](563758)
 */
      letterSpacing = 0,
      wordSpacing;

    this.current = {
      x: x, 
      y: y
    };

/* Apply CSS properties recognised by this extension to canvas */

    if (css.font) {
      this.font = css.font;
    }

    if (css.letterSpacing) {
      letterSpacing += parseFloat(css.letterSpacing);
    }


    if (css.letterSpacing !== 0) {

/* Render, character by character if CSS was given */

      for (i = 0; i < charlen; i += 1) {
        fillText.call(this, c, x, y);
        charAdvancement = this.measureText(x).width + letterSpacing;
        this.current.x += charAdvancement;
      }
    } else {

/* No CSS was given, so render it normally */

      fillText.call(this, text, x, y);
      this.current.x += this.measureText(x).width;
    }

  };
}(this, window.parse));

