/**
 * {{eachfile}} by Jeremie Patonnier
 * http://github.com/JeremiePat
 * Copyright (c) 2014 Jeremie Patonnier
 * MIT License
 */

var fs = require('fs');

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports.register = function (Handlebars, options) {
  var eachfileOptions = options;

  /**
   * iterate through files inside a directory
   * Directory path must start at the root of the working directory
   * @example:
   *   {{#eachfile dirpath}}
   *     * {{filename}}
   *   {{eachfile}}
   */
  Handlebars.registerHelper('eachfile', function (path, options) {
    if (typeof path !== 'string') {
      console.warn('Expect a string as parameter');
      return 'elseFn' in options ? options.elseFn() : '';
    }

    var i, l;
    var files  = fs.readdirSync('.' + (path.indexOf("/") === 0 ? '' : '/') + path);
    var buffer = [];

    if (Array.isArray(files)) {
      // files = files.slice(2);

      for (i = 0, l = files.length; i < l; i++) {
        buffer.push(options.fn({
          filename: files[i],
          subname : files[i].substr(0, files[i].lastIndexOf('.')),
          name    : files[i].substr(0, files[i].lastIndexOf('.'))
                            .replace('/_-/g',' ')
                            .capitalize()
        }));
      }
   
      // return the finished buffer
      return buffer.join('');
    }

    else if ('elseFn' in options) {
      return options.elseFn();
    }
    
    return '';
  });
};