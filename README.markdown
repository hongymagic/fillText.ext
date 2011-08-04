# Canvas (RenderingContext2D) fillText extension

- CSS support

## Supported CSS properties

1. `line-height: 1[unit]`
2. `font: regular regular 400 14px/12px Helvetica, sans-serif`
3. `font-size: 1.2em`
4. `font-weight: 800`
5. `word-spacing: 0.5em`

## Okay, how?

Include this script:

	<script src="dist/canvas.fillText.js></script>

and use it like this:

	var canvas = document.getElementById('world');
	var context = canvas.getContext('2d');

	var css = 'letter-spacing: 1em; font-weight: 800;';
	context.fillText('Hello World', 0, 0, css);

And watch it render.

## How to contribute

