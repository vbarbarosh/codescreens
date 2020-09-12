<?php

# Rounding errors in PHP

# docker run --rm -i php:5.6 php < php_math_float_error.php
# docker run --rm -i php:7.1 php < php_math_float_error.php
# docker run --rm -i php:7.2 php < php_math_float_error.php
# docker run --rm -i php:7.3 php < php_math_float_error.php

define('FLOAT_ERROR', 0.00001);

$a = 4.99998;
$b = 4.99999;

var_dump(($b - $a) <= FLOAT_ERROR);
# false

var_dump(($b*1E6 - $a*1E6) <= FLOAT_ERROR*1E6);
# true
