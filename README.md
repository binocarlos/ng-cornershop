ng-cornershop
=============

Angular service for the cornershop shopping cart module

## installation

```
$ component install binocarlos/ng-cornershop
```

## usage

```

angular.module('myModule', [
	require('cornershop')
])

.controller('MyCtrl', function($scope, $cornershop){
	var cart = $cornershop('mycart');

	$scope.cartitems = cart.items;
})

```

## license

MIT