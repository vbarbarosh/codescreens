<?php

# Default options in functions

function foobar($opt = [])
{
    $opt += [
        'name' => 'default_name',
        'title' => 'Default Title',
    ];

    echo 'name: ', $opt['name'], PHP_EOL;
    echo 'title: ', $opt['title'], PHP_EOL;
}

# name: default_name
# title: Default Title
foobar();

# name: custom_name
# title: Default title
foobar(['name' => 'custom_name']);
