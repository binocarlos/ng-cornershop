var modulename = module.exports = 'cornershop';

angular
  .module(modulename, [])

  .factory("$cornershop", require('cornershop'))
