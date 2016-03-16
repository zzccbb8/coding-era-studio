/**
 * 贤哥超强封装ajax
 */
"use strict";

angular.module('core')
    .factory('ceAjax', ['$rootScope','$http','Authentication','ceConfig','ceUtil',
        function($rootScope,$http,Authentication,ceConfig,ceUtil) {
        var ceAjaxService = {};
        var token = Authentication.user.accessToken || "none";

        var customService = function(processObj){
            var selfService ={};
            selfService.successCallback = null;
            selfService.success = function(callback){
                selfService.successCallback =callback;
                return processObj;
            };
            selfService.errorCallback = null;
            selfService.error = function(callback){
                selfService.errorCallback = callback;
                return processObj;
            };
            selfService.completeCallback = null;
            selfService.complete = function(callback){
                selfService.completeCallback = callback;
                return processObj;
            };
            return selfService;
        };

        //post,get等共同调用
        var commentService = function (selfService,options){
            angular.extend(options.data,{access_token: token});
            angular.extend(options,{url:ceConfig.apiUrl+options.url});
            $rootScope.$emit("startLoading");
            $http(options).success(function(res){
                $rootScope.$emit("stopLoading");
                if(res.result==='success'){
                    selfService.successCallback(res);
                }else{
                    if(typeof selfService.errorCallback !== 'undefined'){
                        selfService.errorCallback(res);
                    }else{
                        ceUtil.toast(res.message);
                    }
                }
            }).error(function(){
                $rootScope.$emit("stopLoading");
            });
        };

        ceAjaxService.delete = function(options){
            var self = this;
            var selfService = customService(self);
            angular.extend(options.data, {method:'DELETE'});
            commentService(selfService,options);
            return selfService;
        };

        ceAjaxService.get = function(options){
            var self = this;
            var selfService = customService(self);
            angular.extend(options, {method:'get'});
            commentService(selfService,options);
            return selfService;
        };

        ceAjaxService.post = function(options){
            var self = this;
            var selfService = customService(self);
            angular.extend(options, {method:'post'});
            commentService(selfService,options);
            return selfService;
        };




    return ceAjaxService;
} ]);