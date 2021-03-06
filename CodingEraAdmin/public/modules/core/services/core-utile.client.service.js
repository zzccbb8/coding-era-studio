/**
 * 请求事件
 */
"use strict";

angular.module('core')
    .factory('ceUtil', [
        '$rootScope', '$q', '$templateCache'  ,'$injector', 'ceConfig',
        function ($rootScope, $q, $templateCache,$injector, ceConfig) {

        var service = {};



        //弹出消息(默认5秒自动关闭)
        service.toast = function (message){
            //$rootScope.$emit("showToast",message);
            $rootScope.$emit("showToast",message);

        };

        //模态消息对话框(确认,取消)
        service.confirmMessage = function(message){
            var self = this;
            var selfService ={};
            var successCallback = null;
            selfService.success = function(callback){
                successCallback =callback;
                return self;
            };
            var $uibModal = $injector.get('$uibModal');
            var modalInstance = $uibModal.open({
                animation: true,
                size:'sm',
                templateUrl: '/modules/core/views/templates/core-confirm.client.template.html',
                controller:[
                    '$scope','$uibModalInstance',
                    function($scope,$uibModalInstance){
                        $scope.message = message;
                        $scope.cancel = function(){
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.ok = function(){
                            $uibModalInstance.close();
                            successCallback();
                        };
                    }
                ]
            });
            return selfService;
        };

        service.loadingStatus = false;

        //show Loading
        service.loading = function(){

            service.loadingStatus = !service.loadingStatus;
            if(service.loadingStatus){
                $rootScope.$emit("startLoading");
            }else{
                $rootScope.$emit("stopLoading");
            }
        };

        //生成uuid
        service.genUuid = function() {
            var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var chars = CHARS, uuid = new Array(36), rnd=0, r;
            for (var i = 0; i < 36; i++) {
                if (i===8 || i===13 ||  i===18 || i===23) {
                    uuid[i] = '-';
                } else if (i===14) {
                    uuid[i] = '4';
                } else {
                    if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return uuid.join('');
        };

        //合并Page<Object>数据,loadMore加载更多使用
        service.loadMoreData = function (src,res){
            src.content = src.content.concat(res.data.content);
            src.first = res.data.first;
            src.last = res.data.last;
            src.number = res.data.number;
            return src;
        };


        service.initPageParameter = function(options){
            var option = {
                    page: ceConfig.page,//当前页
                    size: ceConfig.size,//每页大小
                    sort: null
            };
            angular.extend(option,options);
            return option;
        };


        /**
         *
         * @param:
         * options:{
         *  route : 「 在 config.js 中配置的路由 」,
         *  data : 「 传递到该 modal 中 controller 参数 , controller 使用 data 接收 」
         * }
         */
        service.openModal = function (options){
            var errorPrefix = ' openModal 初始化错误 ';
            if(angular.isUndefined(options.route)){
                throw new Error( errorPrefix + ', 缺失 route 参数!');
            }
            var $state = $injector.get('$state');
            var stateParameter = $state.get(options.route);

            // 路由权限访问控制
            var expression = stateParameter.secured;
            var Authentication = $injector.get('Authentication');
            var hasPermission = Authentication.checkPermission(expression);
            if(!hasPermission){
                stateParameter = $state.get('unauthorized');
            }

            var option = {
                animation:true,
                controller:stateParameter.controller,
                templateUrl:stateParameter.templateUrl,
                resolve: {
                    data: function () {
                        return option.data || {};
                    }
                }
            };
            angular.extend(option,options);
            var $uibModal = $injector.get('$uibModal');
            var modalInstance = $uibModal.open(option);

            var deferred = $q.defer();
            var promise = deferred.promise;
            promise.success = function(func){
                promise.then(func);
                return promise;
            };
            promise.cancel = function(func){
                promise.then(null, func);
                return promise;
            };
            modalInstance.result.then(function (res) {
                deferred.resolve(res);
            }, function (res) {
                deferred.reject(res);
            });
            return promise;
        };

    return service;
} ]);