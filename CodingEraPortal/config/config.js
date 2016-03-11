/**
 * Created by Yan on 16/3/9.
 */


'use strict';


var _ = require('lodash');
var glob = require('glob');


var resolvingConfig = function() {
    var conf = {};

    conf = _.extend(
        require('./gulp/allAssets')
    );

    return conf;
};


module.exports = resolvingConfig();

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
    // For context switching
    var _this = this;

    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // The output array
    var output = [];

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function(globPattern) {
            output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            glob(globPatterns, {
                sync: true
            }, function(err, files) {
                if (removeRoot) {
                    files = files.map(function(file) {
                        return file.replace(removeRoot, '');
                    });
                }

                output = _.union(output, files);
            });
        }
    }

    return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function() {
    var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');
    return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
    var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
    return output;
};