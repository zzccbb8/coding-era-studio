'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	chalk = require('chalk');


// Init the express application
var app = require('./config/express')();

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
if (process.env.NODE_ENV === 'secure') {
	console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');
