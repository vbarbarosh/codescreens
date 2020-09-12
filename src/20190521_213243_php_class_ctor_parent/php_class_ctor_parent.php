<?php

# Generic way to call base class constructor

class Foo
{
    public function __construct()
    {
        echo "FOO\n";
    }
}

class Bar extends Foo
{
	public function __construct()
	{
		call_user_func_array([$this, 'parent::__construct'], func_get_args());
        echo "BAR\n";
	}
}

new Foo();
# FOO

new Bar();
# FOO
# BAR
