'use strict';

angular.module('article').controller('articleListCtrl',['$scope','$log','$translate','$state','$stateParams','ArticleService',
    'ceUtil',
function ($scope, $log,$translate,$state,$stateParams,ArticleService,ceUtil){


    $scope.articleData = {};
    $scope.key = 'title';

    //分页参数
    var searchOptions = {
        page: 0,//当前页
        size: 10,//每页大小
        sort: null, //排序(没做!!!!)
        status:$stateParams.status
    };

    //搜索
    $scope.onSearch = function(){
        ArticleService.getArticles(searchOptions).success(function(res){
             $scope.articleData = res.data;
        });
    };
    $scope.onSearch();

    //编辑记录
    $scope.onEditClick = function(obj){
        $state.go('articleManage.publish',{articleId:obj.id});
    };

    //删除记录
    $scope.onDeleteClick = function(obj){
        ceUtil.confirmMessage('确认删除?').success(function(){
            ArticleService.deleteArticle({id:obj.id}).success(function(){
                ceUtil.toast('删除成功');
                $scope.onSearch();
            });
        });
    };

    //上一页
    $scope.previousPage = function(){
        searchOptions.page -= 1;
        $scope.onSearch();
    };

    //下一页
    $scope.nextPage = function(){
        searchOptions.page += 1;
        $scope.onSearch();

    };

           
}]);
