# Canvas (RenderingContext2D) fillText extension

- CSS support on fillText call

## Supported CSS properties

1. `letter-spacing: 1[px]`
2. `line-height: 1[px]` (TODO)
3. `word-spacing: 0.5em` (TODO)

## Okay, how?

Include this script:

	<script src="dist/canvas.fillText.js></script>

and use it like this:

	var canvas = document.getElementById('world');
	var context = canvas.getContext('2d');

	var css = 'letter-spacing: 1em;';
	context.fillText('Hello World', 0, 0, css);

And watch it render.

## How to contribute

There are many more (font-related) CSS properties which are not supported yet,
if you wish to include some, please fork and send me a pull request with
*test cases*, otherwise pull won't be considered.

Same goes for bugs. Please provide test cases either via pull request or on
jsfiddle.net


