<?php

# Use a function as an scope for variables

$foo = call_user_func(function () {
    $aa = 'Fusce vitae orci lorem.';
    $bb = 'In cursus nisi malesuada.';
    $cc = 'Etiam auctor, lectus eu lacinia condimentum.';
    return implode("\n", [$aa, $bb, $cc]);
});

var_dump(get_defined_vars());
