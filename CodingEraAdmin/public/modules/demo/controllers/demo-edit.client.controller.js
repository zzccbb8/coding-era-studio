'use strict';

/*
 Demo 编辑页面
 */
angular.module('demo').controller('demoEditCtrl', [
    '$scope', '$uibModalInstance', '$log', '$http', 'DemoService', 'ceUtil',
    function ($scope, $uibModalInstance, $log, $http, DemoService, ceUtil) {

        $scope.demo = {};

        $scope.ok = function () {
            DemoService.save({}, $scope.demo, function () {
                ceUtil.toast('保存成功');
                $uibModalInstance.close();
            });
        };


        //窗口点击取消
        $scope.cancel = function () {
            //angular-bootstarp-api默认关闭事件,不要问我为什么
            $uibModalInstance.dismiss('cancel');

        };


    }]);

