var modulename = module.exports = 'ng-cornershop';
var CornerShop = require('cornershop');

angular
  .module(modulename, [])

  .run(['$rootScope', function($rootScope){
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('cornershop init');
  }])

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


  .directive('paypalButton', function(){
    
    return {
      restrict:'EA',
      template: require('./templates/paypal_button'),
      replace: true
    };
  })

  .directive('stripeButton', function($safeApply){
    return {
      restrict:'EA',
      template: require('./templates/stripebutton'),
      replace: true,
      controller:function($scope){
        var stripe_handler = StripeCheckout.configure({
          key:'pk_test_npUDT7hoMCMbr16LZBGEyhsM',
          token:function(token, args){
            $safeApply($scope, function(){
              $scope.$emit('card', token);
            })
          }
        })

        $scope.$on('clickstripe', function($ev){
          stripe_handler.open({
            name: 'FunkyBod Order',
            description: $scope.cart_description(),
            currency:'GBP',
            amount: Math.ceil($scope.getTotal() * 100)
          });
        })
      }
    };
  })


  .directive('cartDropdown', function(){
    
    return {
      restrict:'EA',
      template: require('./templates/cartdropdown'),
      replace: true
    };
  })


  .directive('addressForm', function(){
    
    return {
      restrict:'EA',
      template: require('./templates/addressform'),
      replace: true
    };
  })

  .directive('completePurchase', function(){
    
    return {
      restrict:'EA',
      template: require('./templates/completepurchase'),
      replace: true
    };
  })

  .directive('costSummary', function(){
    
    return {
      restrict:'EA',
      template: require('./templates/costsummary'),
      replace: true
    };
  })
