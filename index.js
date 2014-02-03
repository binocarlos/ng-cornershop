var modulename = module.exports = 'ng-cornershop';

angular
  .module(modulename, [])

  .factory("$cornershop", require('cornershop'))
