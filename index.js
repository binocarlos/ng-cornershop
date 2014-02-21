var modulename = module.exports = 'ng-cornershop';
var CornerShop = require('cornershop');

angular
  .module(modulename, [
    require('ng-safe'),
    require('ng-randomid'),
    require('ng-country')
  ])

  .factory('$cornershop', function(){
    return CornerShop;
  })

  .factory('$paypaldesc', function(){
    return function(cart){
      var items = cart.items.map(function(item){
        return item.qty + ' x ' + item.name;
      })

      return items.join(" - ") + ' + shipping (' + (cart.getExtraTotal() || 0) + ')';
      //return qty + ' ' + title + (qty>1 ? 's' : '') + '(' + cart.getTotal() + ') + shipping (' + (cart.getExtraTotal() || 0) + ')';
    }
  })

  // the small desc for stripe
  .factory('$cartdesc', function(){
    return function(cart, title){
      var qty = 0;
      title = title || 'item';
      var items = cart.items.map(function(item){
        qty += item.qty;
      })

      return qty + ' ' + title + (qty>1 ? 's' : '') + '(' + cart.getTotal() + ') + shipping (' + (cart.getExtraTotal() || 0) + ')';
    }
  })

  .factory('$fullcartdesc', function(){
    return function(cart){
      var items = cart.items.map(function(item){
        return item.qty + ' x ' + item.desc;
      })

      items = items.concat(cart.getExtras().map(function(extra){
        return extra.id + ': ' + extra.name + ' ' + extra.price;
      }))

      return items.join("\n");  
    }
  })

  .directive('checkout', function($http, $cartdesc, $fullcartdesc, $paypaldesc){
    
    return {
      restrict:'EA',
      scope:{
        cart:'=',
        settings:'=',
        shipping:'=',
        labels:'='
      },
      template: require('./templates/checkout'),
      replace: true,
      link:function($scope, elem, $attr){

        $scope.stripedetails = null;
        $scope.paypaldetails = null;

        $scope.address = $scope.cart.setting('address') || {};

        $scope.$watch('address', function(address){
          $scope.cart.setting('address', address);
          $scope.cart.save();
        }, true)

        $scope.stripedetails = null;

        $scope.$on('payment:stripe', function($ev, details){
          $scope.stripedetails = details;
        })

        $scope.$on('payment:paypal', function($ev, details){
          $scope.paypaldetails = details;
        })

        $scope.stripedetails = null;

        $scope.$on('payment:error', function($ev, errortext){
          $scope.error = errortext;
        })

        // this is to send the stripe details to the server
        $scope.stripepurchase = function(){

          if(!$scope.stripedetails){
            return;
          }

          var errortext = null;

          ['name', 'line1', 'city', 'state', 'zip', 'country'].forEach(function(field){

            if(!$scope.address[field]){
              errortext = 'please enter the address - ' + field;
            }

          })

          if(errortext){
            $scope.error = errortext;
            return;
          }

          $scope.inprogress = true;

          $http({
            method: 'POST',
            url: $scope.settings.stripe_checkout_url,
            data:{
              notes:$fullcartdesc($scope.cart),
              desc:$paypaldesc($scope.cart),
              stripe:$scope.stripedetails,
              cart:$scope.cart.toJSON(),
              amount:Math.round($scope.cart.getTotal(true)*100)/100
            }
          })
          .success(function(data, status, headers, config) {
            //$scope.inprogress = false;
            document.location = '/checkout.html';
          })
          .error(function(data, status, headers, config) {
            $scope.inprogress = false;
            $scope.error = data || 'there was an error';
          })

        }
      }
    };
  })

  .directive('paypalButton', function($cartdesc, $fullcartdesc, $paypaldesc, $http){
    
    return {
      restrict:'EA',
      scope:{
        title:'@',
        settings:'=',
        cart:'=',
        address:'='
      },
      template: require('./templates/paypal_button'),
      replace: true,
      link:function($scope, elem, $attr){
        $scope.$cartdesc = $cartdesc;
        $scope.$paypaldesc = $paypaldesc;

        elem.attr('action', $scope.settings.paypal_link);

        $scope.dopaypal = function(){
          $http({
            method: 'POST',
            url: $scope.settings.paypal_stash_url,
            data:{
              notes:$fullcartdesc($scope.cart),
              desc:$cartdesc($scope.cart),
              cart:$scope.cart.toJSON(),
              amount:Math.round($scope.cart.getTotal(true)*100)/100
            }
          })
          .success(function(data, status, headers, config) {

            $scope.stashid = data.id;
            setTimeout(function(){
              $('#paypal_form').submit();
            }, 500)
            
          })
          .error(function(data, status, headers, config) {

            $scope.$emit('payment:error', data);
          })
        }

      }
    };
  })

  .directive('stripeButton', function($safeApply, $cartdesc){
    return {
      restrict:'EA',
      scope:{
        title:'@',
        settings:'=',
        cart:'=',
        address:'='
      },
      template: require('./templates/stripebutton'),
      replace: true,
      controller:function($scope){

        

        var stripe_handler = StripeCheckout.configure({
          key:$scope.settings.stripe_publish_key,
          token:function(token, args){
            $safeApply($scope, function(){
              $scope.$emit('payment:stripe', token);
              $scope.stripedetails = token;
            })
          }
        })

        $scope.clickstripe = function(){
          stripe_handler.open({
            name: $scope.settings.shop_name,
            description: $cartdesc($scope.cart),
            currency:'GBP',
            amount: Math.ceil($scope.cart.getTotal(true) * 100)
          });
        }



      }
    };
  })


  .directive('shippingOptions', function(){
    
    return {
      restrict:'EA',
      scope:{
        cart:'=',
        shipping_destinations:'=shipping'
      },
      template: require('./templates/shippingoptions'),
      replace: true,
      link:function($scope, $elem){

        $scope.choosenshipping = $scope.cart.setting('baseshipping') || null;

        if($scope.choosenshipping){
          $scope.choosencost = $scope.choosenshipping.price;  
        }

        $scope.$on('shipping:force', function(ev, shipping){
          $scope.setshipping(shipping);
        })
        
        $scope.setshipping = function(shipping){

          $scope.$emit('cart:shipping', shipping);
          $scope.choosenshipping = shipping;
          $scope.choosencost = shipping.price;
        }

        if(!$scope.choosenshipping){
          $scope.setshipping($scope.shipping_destinations[0]);
        }
      }
    };
  })

  .directive('cartDropdown', function(){
    
    return {
      restrict:'EA',
      scope:{
        cart:'='
      },
      template: require('./templates/cartdropdown'),
      replace: true,
      link:function($scope, elem, $attr){
        $scope.clear = function(){
          $scope.cart.items = [];
          $scope.cart.save();
          $scope.$emit('cart:message', 'cart cleared');
        }
      }
    };
  })


  .directive('cartSummary', function(){
    
    return {
      restrict:'EA',
      scope:{
        cart:'='
      },
      template: require('./templates/cartsummary'),
      replace: true,
      link:function($scope, elem, $attr){
        $scope.checkqty = function(item){
          if(item.qty<1){
            item.qty = 1;
          }
        }
      }
    };
  })

  .directive('checkoutSummary', function(){
    
    return {
      restrict:'EA',
      scope:{
        cart:'='
      },
      template: require('./templates/checkoutsummary'),
      replace: true
    };
  })

  .directive('costSummary', function(){
    
    return {
      restrict:'EA',
      scope:{
        cart:'='
      },
      template: require('./templates/costsummary'),
      replace: true
    };
  })

  .directive('contactForm', function($countries){
    
    return {
      restrict:'EA',
      scope:{
        public_key:'=',
        submit_url:'='
      },
      template: require('./templates/contactform'),
      replace: true,
      link:function($scope){

        $scope.$watch('public_key', function(key){
          if(key){
            Recaptcha.create(key,
            "recaptchaDiv",
            {
                  theme: "clean",
                  callback: Recaptcha.recaptcha_response_field
            }); 
          }
        })

      }
    };
  })

  .directive('addressForm', function($countries){
    
    return {
      restrict:'EA',
      scope:{
        address:'='
      },
      template: require('./templates/addressform'),
      replace: true,
      link:function($scope){
        $scope.countries = $countries;

        $scope.country = null;

        $scope.$watch('address.country', function(c){
          if(!c){
            return;
          }
          if(!$scope.country || $scope.country.name!=c.name){
            $scope.country = $countries.filter(function(c){
              if(!$scope.address){
                return false;
              }
              return c.name==$scope.address.country;
            })[0]
          }
        }, true)
        $scope.$watch('country', function(c){
          if(!c){
            return;
          }
          $scope.$emit('address:country', c);
          $scope.address.country = c.name;
        }, true);
      }
    };
  })

  .directive('completePurchase', function(){
    
    return {
      restrict:'EA',
      template: require('./templates/completepurchase'),
      replace: true
    };
  })



/*

  .controller('CartCheckoutCtrl', function($scope, $shopdata, $randomid, $window, $http){
    
    $scope.dopurchase = function(){
      
      var errors = 0;
      $scope.haserror = false;

      if(!$scope.carddetails){
        return;
      }

      ['name', 'address_line1', 'address_line2', 'address_city', 'address_state', 'address_zip', 'address_country'].forEach(function(field){

        var val = $scope.carddetails.card[field];
        var elem = $('#address_' + field);
        var group = elem.closest('.form-group');
        if(!val){
          errors++;
          group.addClass('has-error');
        }
        else{
          group.removeClass('has-error');
        }
      })

      if(errors>0){
        $scope.haserror = true;
        return;
      }

      $scope.submitted = true;
      $scope.inprogress = true;

      $http({
        method: 'POST',
        url: '/stripe_checkout',
        data:$scope.cart_data()
      })
      .success(function(data, status, headers, config) {
        $scope.inprogress = false;
        $window.document.location = '/checkout.html';
      })
      .error(function(data, status, headers, config) {
        $scope.submitted = false;
        $scope.inprogress = false;
        $scope.ordererror = data;
      })

    }

    $scope.dopaypal = function(){
      $http({
        method: 'POST',
        url: '/paypal_stash',
        data:$scope.cart_data()
      })
      .success(function(data, status, headers, config) {
        
        $scope.cartid = data.id;

        setTimeout(function(){
          $('#paypal_form').submit();
        }, 500)
        
      })
      .error(function(data, status, headers, config) {
        console.log('-------------------------------------------');
        console.log('paypal error');
        console.dir(data);
      })
    }

    
  })

  */