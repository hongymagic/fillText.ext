


(function (parser) {
  var props;

  //
  // Test
  // Simple usage example and camel casing conversion of property names
  props = parser.parse('font-weight: 700; line-height: 1.5em;');
  assert(props.fontWeight, 700);
  assert(props.lineHeight, '1.5em');

  // 
  // Test
  // Missing measurement units converted to pixels for certain properties
  props = parser.parse('font-size: 13; line-height: 15; letter-spacing: 1');
  assert(props.fontSize, '13px');
  assert(props.lineHeight, '13px');
  assert(props.letterSpacing, '13px');

  //
  // Test
  // Silent error treatment
  props = parser.parse('invalid-property;');
  assert(props.invalidProperty === undefined);

}(CSS.Parser.Properties));




