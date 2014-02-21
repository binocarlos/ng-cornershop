module.exports = '<li class="shopping-cart dropdown" ng-cloak>\n    <a href="#" title="View your shopping cart"><i class="fa fa-shopping-cart"></i><span class="amount">{{ cart.getTotal() | currency:"£" }}</span></a>\n\n    <ul class="sub-menu">     \n        <li>                                      \n            <div class="dropdown-cart">\n                <span class="cart-items">You have <strong>{{ cart.items.length }}</strong> items in your cart</span>\n                <table class="table table-cart">\n                    <tbody>\n                        <tr>\n                            <th colspan="2">Product</th>\n                            <th class="text-center">Qty</th>\n                            <th>Total</th>\n                        </tr>\n                    \n                        <tr ng-repeat="item in cart.items">\n                            <td><img ng-src="{{ item.image }}" class="img-center" alt=""></td>\n                            <td><a href="">{{ item.name }}</a></td>\n                            <td class="text-center">{{ item.qty }}</td>\n                            <td>{{ item.price * item.qty | currency:"£" }}</td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class="row">\n                    <div class="col-md-6">\n                        <a href="" ng-click="$emit(\'cart:view\')" class="btn btn-xs btn-three">Edit cart</a>\n                        <a href="" ng-click="$emit(\'cart:reset\')" class="btn btn-xs btn-three">Clear cart</a>\n                    </div>\n                    <div class="col-md-6">\n                        <a href="" ng-click="$emit(\'cart:checkout\')" class="btn btn-xs btn-two pull-right">Proceed to checkout</a>\n                        <span class="clearfix"></span>\n                    </div>\n                </div>\n            </div>\n        </li>                                                                                                    \n    </ul>                                                                                                          \n</li>';