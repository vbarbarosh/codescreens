<?php

// Clone an object, then alter it a little
//
// Object Cloning
// http://php.net/manual/en/language.oop5.cloning.php
//
// Magic Methods
// http://www.php.net/manual/en/language.oop5.magic.php

class State
{
	public function __clone()
	{
		...
	}

	# Clone an object, then alter it a little.
	public function alt($diff)
	{
		$clone = clone $this;
		foreach ($diff as $key => $value) {
			$clone->{$key} = $value;
		}
		return $clone;
	}
}
