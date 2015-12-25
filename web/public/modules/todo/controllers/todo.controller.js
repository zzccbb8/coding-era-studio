'use strict';

angular.module('todo').controller('todoCtrl', ['$scope', '$uibModal', '$log', 'TodoService', 'TodoCustomService', 'uibDatepickerPopupConfig',
    function ($scope, $uibModal, $log, TodoService, TodoCustomService, uibDatepickerPopupConfig) {

        $scope.isCollapsed = true;
        $scope.showCollapsed = function(){
            console.log('Jason test showCollapsed', 1);
            $scope.isCollapsed = false;
        };
        $scope.hideCollapsed = function(){
            console.log('Jason test hideCollapsed', 1);
            $scope.isCollapsed = true;
        };

        //Date
        $scope.status = {
            opened: false
        };
        $scope.open = function($event) {
            $scope.status.opened = !$scope.status.opened;
        };
        // TRANSLATION 日期空间国际化临时解决方案
        uibDatepickerPopupConfig.currentText = '今天';
        uibDatepickerPopupConfig.clearText = '清空';
        uibDatepickerPopupConfig.closeText = '确定';

        //Popover
        $scope.dynamicPopover = {
            content: 'Hello, World!',
            templateUrl: 'myPopoverTemplate.html',
            title: 'Title'
        };

        //Task
        $scope.task = TodoCustomService.createTask();

        $scope.addTask = function () {
            TodoCustomService.addTask($scope.task);
            $scope.task = TodoCustomService.createTask();
        };
        $scope.cleanTask = function () {
            //$scope.tasks = [];
            //TodoCustomService.tasks.length = 0;
            $scope.tasks.length = 0;
        };

        /**
         * 用于接收$rootScope.$broadcast('tasks.update')传播的数据:
         * see: http://blog.csdn.net/dm_vincent/article/details/38705099
         *
         * 循环最少也会运行两次，即使在listener函数中并没有改变任何model.它会多运行一次来确保models没有变化.
         * 在当前的一次循环结束后，它会再执行一次循环用来检查是否有models发生了变化。
         * 这就是脏检查(Dirty Checking)，它用来处理在listener函数被执行时可能引起的model变化。
         * 因此，$digest循环会持续运行直到model不再发生变化，或者$digest循环的次数达到了10次。
         * 因此，尽可能地不要在listener函数中修改model。
         */
        $scope.$on('tasks.update', function (event) {
            //$scope.tasks = TodoCustomService.tasks;
            //$scope.$apply();
            $scope.$apply(function(){
                $scope.tasks = TodoCustomService.tasks;
            });
        });

        $scope.tasks = TodoCustomService.tasks;


    }]);
