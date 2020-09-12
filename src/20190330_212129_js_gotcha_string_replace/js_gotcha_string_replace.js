// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
//     Global_Objects/String/replace#Specifying_a_string_as_a_parameter

// I faced with this problem trying to insert user input into html
// document:
//
//     template_html.replace('{{{xxx}}}', html_escape(input))
//
// ls | grep -E '\.(jpg|png|gif)$'              original
// ls | grep -E &#39;\.(jpg|png|gif)$&#39;      after html escape
//                                  ^^
//
// Instead of seeing the above string in my html, I saw this:
//
// ls | grep -E &#39;\.(jpg|png|gif){{{xxx}}}#39;
//                                  ^^^^^^^^^
//
// I completely forgot about special chars in replacement strings: $$,
// $&, $`, $', $n.

// Using this method you should replace all `$` chars by `$$` in
// replacement strings.
console.log('abc{{{xxx}}}def'.replace('{{{xxx}}}', '--$&--'));
// abc--{{{xxx}}}--def

// This method allows use replacement strings without modifications.
console.log('abc{{{xxx}}}def'.split('{{{xxx}}}').join('--$&--'));
// abc--$&--def
