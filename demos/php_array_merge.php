<?php

// https://stackoverflow.com/a/2071048/1478566
set_error_handler(function ($code, $message, $filename, $lineno) {
    throw new ErrorException($message, $code, 0, $filename, $lineno);
});

$a = [1 => 'a', 2 => 'b', 3 => 'c', 'str' => 'hello'];
$b = [          2 => 'x',           4 => 'y'];
$c = ['str' => 'welcome'];

// Prefer existed values. Main use case is for adding default values:
// function foo($options) {
//     $options += ['tag' => 'car', 'page' => 1];
// }
print_r($a + $b + $c);
// 1=a 2=b 3=c str=hello 4=y

// Prefer new values
print_r(array_replace($a, $b, $c));
// 1=a 2=x 3=c str=welcome 4=y

// Prefer new values for string keys, append for numeric keys
print_r(array_merge($a, $b, $c));
// 0=a 1=b 2=c str=welcome 3=x 4=y
