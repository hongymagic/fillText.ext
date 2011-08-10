var 

// Testing parser module

  parse = require('../src/parser.js').parse,
  assert = require('assert'),

// Sample test CSS

  sample = '';

sample += 'font: regular regular 1em/1.5em Helvetica, Arial, sans-serif;';
sample += 'line-height: 1.5em;';
sample += 'letter-spacing: 1.5;';
sample += 'word-spacing: 125.5%;';
sample += 'word-wrap: none;';
sample += 'text-align: center';

// Self-initialising function for test setup

  var css = parse(sample, 'text-decoration: underline');

module.exports = {
  'Property is camelCased': function () {
    assert.isDefined(css.letterSpacing);
    assert.isDefined(css['textAlign']);
  },

  'Property name/value pairs are preserved': function () {
    assert.equal('center', css.textAlign);
    assert.equal('underline', css.textDecoration);
  },

  'Units are preserved': function () {
    assert.equal('125.5%', css.wordSpacing);
  },

  'Default unit is pixels': function () {
    assert.equal('1.5px', css.letterSpacing);
  }
};

