(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['emojione'] };
  }

  define('emojione', [], vendorModule);
})();
