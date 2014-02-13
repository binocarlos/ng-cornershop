module.exports = '<form class="form" role="form">\n    <div class="form-group">\n        <label for="addressname">Your Name</label>\n        <input type="text" class="form-control" id="address_name" placeholder="Enter name" ng-model="carddetails.card.name">\n    </div>\n    <div class="form-group">\n        <label for="addressline1">Address Line 1</label>\n        <input type="text" class="form-control" id="address_address_line1" placeholder="Enter address" ng-model="carddetails.card.address_line1">\n    </div>\n    <div class="form-group">\n        <label for="addressline2">Address Line 2</label>\n        <input type="text" class="form-control" id="address_address_line2" placeholder="Enter address" ng-model="carddetails.card.address_line2">\n    </div>\n    <div class="form-group">\n        <label for="addressline2">City</label>\n        <input type="text" class="form-control" id="address_address_city" placeholder="Enter city" ng-model="carddetails.card.address_city">\n    </div>\n    <div class="form-group">\n        <label for="addressline2">Region</label>\n        <input type="text" class="form-control" id="address_address_state" placeholder="Enter region" ng-model="carddetails.card.address_state">\n    </div>\n    <div class="form-group">\n        <label for="addresspostcode">Postcode</label>\n        <input type="text" class="form-control" id="address_address_zip" placeholder="Enter postcode" ng-model="carddetails.card.address_zip">\n    </div>\n    <div class="form-group">\n        <label for="addresscountry">Country</label>\n        <input type="text" class="form-control" id="address_address_country" placeholder="Enter country" ng-model="carddetails.card.address_country">\n    </div>\n    <div class="form-group">\n        <label for="addressname">Notes</label>\n        <textarea class="form-control" id="notes" ng-model="address.notes"></textarea>\n    </div>\n</form>';