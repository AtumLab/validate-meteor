/*!
 * Validation Packages
 *
 * Copyright 2013 Hoang Le <particle4dev@gmail.com>
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 *
 * meteor test-packages ./
 */

Package.describe({
    summary: "validation data package",
    author: "Hoang Le <particle4dev@gmail.com>"
});

var both = ["client", "server"];

Package.on_use(function (api) {

    // depend packages
    api.use(["underscore"], both);
    
    api.add_files([
        'lib/_boot.js',
        'lib/namespace.js',

        'lib/type.js',
        'lib/singlepattern.js',
        'lib/complexpattern.js',
        'lib/error.js',

        'lib/optional.js',
        'lib/pattern.js',
        'lib/test.js',
        'lib/validate.js',
        'lib/element.js',
        'lib/model.js'
        ], both);
    
    if (typeof api.export !== 'undefined') {
    	api.export('validation', both);
    }
});

Package.on_test(function (api) {
  	api.use(['validation', 'tinytest', 'test-helpers'], both);
    //api.add_files('test/inherits.js', both);
    //api.add_files('test/optional.js', both);
    //api.add_files('test/test.js', both);
    //api.add_files('test/singlepattern.js', both);
    //api.add_files('test/complexpattern.js', both);
    //api.add_files('test/type.js', both);

    //api.add_files('test/validate.js', both);
    //api.add_files('test/style.js', both);
    //api.add_files('test/client_server.js', both);
    //api.add_files('test/namespace.js', both);
    //api.add_files('test/pattern.js', both);
    api.add_files('test/element.js', both);
    api.add_files('test/model.js', both);

});