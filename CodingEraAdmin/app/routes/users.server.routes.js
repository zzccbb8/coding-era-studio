'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	//app.route('/users').put(users.update);
	//app.route('/users/accounts').delete(users.removeOAuthProvider);
    //
	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// Setting the github oauth routes
	app.route('/auth/github').get(passport.authenticate('github'));
	app.route('/auth/github/callback').get(users.oauthCallback('github'));

	// Finish by binding the user middleware
	//app.param('userId', users.userByID);

	// CodingEra SSO Login
	// Redirect the user to the OAuth 2.0 provider for authentication.  When
	// complete, the provider will redirect the user back to the application at
	//     /auth/provider/callback
	app.route('/auth/provider').get(
			passport.authenticate('oauth2',{
				scope: ['read', 'write']
			}));

	// The OAuth 2.0 provider has redirected the user back to the application.
	// Finish the authentication process by attempting to obtain an access
	// token.  If authorization was granted, the user will be logged in.
	// Otherwise, authentication has failed.
	app.route('/auth/provider/callback').get( users.oauthCallback('oauth2'));
	app.route('/auth/provider/refreshToken').get(users.refreshToken('oauth2'));
};
