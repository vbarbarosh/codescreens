<?php

# Create an alias to a function

function foobar($a)
{
	echo 'hello ', $a, PHP_EOL;
}

function foobar_alias()
{
	return call_user_func_array('foobar', func_get_args());
}

foobar(555);
foobar_alias(555);
