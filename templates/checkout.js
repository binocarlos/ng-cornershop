module.exports = '<div class="container">\n    <div class="row">\n\n        <div class="col-md-12 acc-wizard">\n\n        	<div class="col-xs-3" style="background-color:#fff; border:1px solid #EEE;" >\n\n        		<h4>Checkout</h4>\n        		<hr>\n        		<ol class="acc-wizard-sidebar">\n				  <li class="acc-wizard-todo"><a href="#order">Order</a></li>\n                  <li class="acc-wizard-todo"><a href="#shipping">Shipping</a></li>\n				  <li class="acc-wizard-todo"><a href="#address">Address</a></li>\n				  <li class="acc-wizard-todo"><a href="#payment">Payment</a></li>\n				  \n				</ol>\n			\n				<div>\n            	   <checkout-summary cart="cart" />\n                </div>\n\n\n			</div>\n        	<div class="panel-group col-xs-9 " id="cartAccordian">\n                <div class="panel panel-default" style="background-color:#f5f5f5;padding:5px;">\n                    <a data-toggle="collapse" data-parent="#cartAccordian" href="#order">\n                    <div class="panel-heading" style="margin-bottom:5px;">\n                        <h4 class="panel-title">\n                            \n                            1. Order\n                            \n                        </h4>\n                    </div>\n                    </a>\n                    <div id="order" class="panel-collapse collapse in">\n                        <div class="panel-body" style="background-color:#fff;">\n\n                                <div>\n                                    <cart-summary cart="cart" />\n                                </div>\n\n                                <div style="margin-top:30px;">\n                                    <a href="#shipping" class="btn btn-success btn-xs pull-right" style="color:#fff;">Next &raquo;</a>\n                                </div>\n\n                        </div>\n                    </div>\n                </div>\n\n                <div class="panel panel-default" style="background-color:#f5f5f5;padding:5px;">\n                    <a data-toggle="collapse" data-parent="#cartAccordian" href="#shipping">\n                    <div class="panel-heading" style="margin-bottom:5px;">\n                        <h4 class="panel-title">\n                            \n                            2. Shipping\n                            \n                        </h4>\n                    </div>\n                    </a>\n                    <div id="shipping" class="panel-collapse collapse">\n                        <div class="panel-body" style="background-color:#fff;">\n\n                            <div>{{ labels.shipping_notes }}</div>\n                                    \n                            <div>\n                                <shipping-options shipping="shipping" cart="cart" />\n                            </div>\n\n                            <div>\n                                {{ cart.qty() }} item{{ (cart.qty()>1?\'s\':\'\') }} = {{ cart.getExtraTotal() | currency:"£" }}\n                            </div>\n\n                            <div style="margin-top:30px;">\n                                <a href="#order" class="btn btn-xs btn-success pull-left" style="color:#fff;">&laquo; Back</a>\n                                <a href="#address" class="btn btn-xs btn-success pull-right" style="color:#fff;">Next &raquo;</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                        \n\n                <div class="panel panel-default" style="background-color:#f5f5f5;padding:5px;">\n                    <a data-toggle="collapse" data-parent="#cartAccordian" href="#address">\n                    <div class="panel-heading" style="margin-bottom:5px;">\n                        <h4 class="panel-title">\n                            \n                            3. Address\n                            \n                        </h4>\n                    </div>\n                    </a>\n                    <div id="address" class="panel-collapse collapse ">\n                        <div class="panel-body" style="background-color:#fff;">\n\n                            <div>\n                    		  <address-form address="address" />\n                            </div>\n\n                            <div style="margin-top:30px;">\n                                <a href="#shipping" class="btn btn-xs btn-success pull-left" style="color:#fff;">&laquo; Back</a>\n                                <a href="#payment" class="btn btn-xs btn-success pull-right" style="color:#fff;">Next &raquo;</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \n\n                <div class="panel panel-default" style="background-color:#f5f5f5;padding:5px;">\n                    <a id="paymentlink" data-toggle="collapse" data-parent="#cartAccordian" href="#payment">\n                    <div class="panel-heading" style="margin-bottom:5px;">\n                        <h4 class="panel-title">\n                            \n                            4. Payment\n                            \n                        </h4>\n                    </div>\n                    </a>\n                    <div id="payment" class="panel-collapse collapse">\n                        <div class="panel-body" style="background-color:#fff;">\n 							\n                            <div class="col-sm-6" ng-hide="stripedetails">\n                                <paypal-button settings="settings" cart="cart" address="address" />\n                                <p>Visit Paypal to complete your purchase</p>\n                                <p><img src ="images/payment_pp.png"></p>\n                            </div>\n                            <div class="col-sm-6">\n                                <stripe-button settings="settings" cart="cart" address="address" />\n                                	<p>Complete your purchase directly on Funkybod </p>\n                                    <p><img src ="images/payment1.png"></p>\n                                    <p><badge>1 </badge>Emter your card details</strong></p>\n                                    <p><badge>2 </badge>Click on Make Purchase</strong></p>\n\n                            \n                            </div>\n\n                            <div ng-show="stripedetails">\n\n                                <hr />\n\n                                <button ng-hide="inprogress" ng-click="stripepurchase()" class="btn btn-primary">Make Purchase</button>\n\n                                <div ng-show="error">\n                                    <span class="label label-danger">{{ error }}</span>\n                                </div>\n                                <div ng-show="inprogress">\n                                    <span class="label label-info">processing order...</span>\n                                </div>\n\n                            </div>\n\n                            <div style="margin-top:30px;">\n                                <a href="#address" class="btn btn-xs btn-success pull-left" style="color:#fff;">&laquo; Back</a>\n                                <a href="#complete" class="btn btn-xs btn-success pull-right" style="color:#fff;">Next &raquo;</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n            \n        </div>\n\n    </div>\n</div>';