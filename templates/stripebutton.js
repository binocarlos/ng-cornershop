module.exports = '<div>\n	<div ng-hide="stripedetails">\n		<a href="" ng-click="$emit(\'clickstripe\')" class="btn btn-two">Pay With Stripe</a>\n	</div>\n	<div ng-show="stripedetails">\n\n		<table class="table-totals table-responsive">\n        <tbody>\n        	<tr>\n                <td><h5>card</h5></td>\n                <td><h4>{{ carddetails.card.type }}</h4></td>\n            </tr>\n            <tr>\n                <td><h5>number</h5></td>\n                <td><h4>****-****-****-{{ carddetails.card.last4 }}</h4></td>\n            </tr>\n            <tr>\n                <td><h5>expiry</h5></td>\n                <td><h4>{{ carddetails.card.exp_month }} / {{ carddetails.card.exp_year }}</h4></td>\n            </tr>\n            <tr>\n                <td><h5>email</h5></td>\n                <td><h4>{{ carddetails.email }}</h4></td>\n            </tr>\n        </tbody>\n    </table>\n	</div>\n\n</div>';