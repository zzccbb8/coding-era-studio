'use strict';

angular.module('article').controller('articlePublishCtrl',['$scope','$log','$state','$stateParams','ArticleService', 'ceUtil','TagService','$resource',
function ($scope, $log,$state,$stateParams,ArticleService,ceUtil,TagService,$resource){


    $scope.article = {};

    if(!angular.isUndefined($stateParams.articleId)){
        $scope.article = ArticleService.getArticleById($stateParams.articleId);
    }

    //发布&保存
    $scope.onPublishClick = function(status){
        $scope.article.status = status;
        ArticleService.saveArticle($scope.article).success(function(res){
            ceUtil.toast('发布成功');
            $state.go('articleManage.list',{status:status});
        });
    };

    //录入新标签事件
    $scope.tagTransform = function (str){
        return {
            id:null,
            name:str
        };
    };

    //获取所有标签
    function getTageList(){
        TagService.getAllTags().success(function(res){
            $scope.itemArray = res.data;
        });
    }
    getTageList();
    $scope.itemArray = [];



           
}]);
