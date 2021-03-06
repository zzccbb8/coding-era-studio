'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    passport = require('passport'),
    config = require('../../../config/config'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    crypto = require('crypto');
var request = require('../request.server.controller.js');
var querystring = require('querystring');

/**
 * smtp email
 */
var smtpTransport = nodemailer.createTransport(config.mailer.options);

/**
 * Forgot for reset password (forgot POST)
 * 发送重设密码邮件瀑布流
 */
exports.forgot = function (req, res, next) {
    async.waterfall([
        // Generate random token
        function (done) {
            crypto.randomBytes(20, function (err, buffer) {
                var token = buffer.toString('hex');
                done(err, token);
            });
        },
        // Lookup user by username
        function (token, done) {
            if (req.body.username) {
                var data = {
                    token: token,
                    expires: Date.now() + 3600000, // 1 hour
                    username : req.body.username
                };
                var url = config.codingera.apiURL + '/open/user/password?action=saveToken';
                request.post(url, data, function (err, result) {
                    if(errorHandler.apiErrorHandle(err, result, res)) {
                        done(err, token, result.data);
                    }
                });
            } else {
                return res.status(400).send({
                    message: 'Username field must not be blank'
                });
            }
        },
        function (token, user, done) {
            if(!(!!user.email)){
                return res.status(400).send({
                    message: '你扑街了,没有邮箱!'
                });
            }
            res.render('templates/reset-password-email', {
                name: user.displayName,
                appName: config.app.title,
                url: 'http://' + req.headers.host + '/open/#!/password/reset/' + token
            }, function (err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
            var mailOptions = {
                to: user.email,
                from: config.mailer.from,
                subject: 'Password Reset',
                html: emailHTML
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                if (!err) {
                    res.send({
                        message: 'An email has been sent to ' + user.email + ' with further instructions.'
                    });
                } else {
                    return res.status(400).send({
                        message: 'Failure sending email'
                    });
                }

                done(err);
            });
        }
    ], function (err) {
        if (err) return next(err);
    });
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function (req, res) {
    var contents = querystring.stringify({
        resetToken : req.params.token
    });
    var url = config.codingera.apiURL + '/open/user/password?action=validateToken' + '&' +  contents;
    request.get(url, function (err, result) {
        if(errorHandler.apiErrorHandle(err, result, res)){
            if (!result.data) {
                return res.redirect('/#!/password/reset/invalid');
            }
            res.redirect('/#!/password/reset/' + req.params.token);
        }
    });
};

/**
 * Reset password POST from email token
 */
exports.reset = function (req, res, next) {
    // Init Variables
    var passwordDetails = req.body;

    async.waterfall([
        function (done) {
            if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                var data = {
                    newPassword:passwordDetails.newPassword,
                    verifyPassword:passwordDetails.verifyPassword,
                    resetToken : req.params.token
                };
                var url = config.codingera.apiURL + '/open/user/password?action=reset';
                request.post(url, data, function (err, result) {
                    if(errorHandler.apiErrorHandle(err, result, res)){
                        done(err, result.data);
                    }
                });
            } else {
                return res.status(400).send({
                    message: 'Passwords do not match'
                });
            }
        },
        function (user, done) {
            if(user){
                res.render('templates/reset-password-confirm-email', {
                    name: user.displayName,
                    appName: config.app.title
                }, function (err, emailHTML) {
                    done(err, emailHTML, user);
                });
            }
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
            var mailOptions = {
                to: user.email,
                from: config.mailer.from,
                subject: 'Your password has been changed',
                html: emailHTML
            };

            smtpTransport.sendMail(mailOptions, function (err) {
                if (!err) {
                    res.send({
                        message: 'Your password has been changed.'
                    });
                } else {
                    return res.status(400).send({
                        message: 'Failure sending email'
                    });
                }
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
    });
};

/**
 * Change Password
 */
exports.changePassword = function (req, res) {
    // Init Variables
    var passwordDetails = req.body;

    if (req.user) {
        if (passwordDetails.newPassword) {
            User.findById(req.user.id, function (err, user) {
                if (!err && user) {
                    if (user.authenticate(passwordDetails.currentPassword)) {
                        if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                            user.password = passwordDetails.newPassword;

                            user.save(function (err) {
                                if (err) {
                                    return res.status(400).send({
                                        message: errorHandler.getErrorMessage(err)
                                    });
                                } else {
                                    req.login(user, function (err) {
                                        if (err) {
                                            res.status(400).send(err);
                                        } else {
                                            res.send({
                                                message: 'Password changed successfully'
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(400).send({
                                message: 'Passwords do not match'
                            });
                        }
                    } else {
                        res.status(400).send({
                            message: 'Current password is incorrect'
                        });
                    }
                } else {
                    res.status(400).send({
                        message: 'User is not found'
                    });
                }
            });
        } else {
            res.status(400).send({
                message: 'Please provide a new password'
            });
        }
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};
