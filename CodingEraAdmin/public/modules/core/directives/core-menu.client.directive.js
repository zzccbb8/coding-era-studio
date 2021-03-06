/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core')
    .factory('Menus', ['$injector',
        function($injector) {
            var items=[];
            var service={};

            // Define a set of default roles
            this.defaultRoles = ['*'];

            // 目录显示权限控制
            service.shouldRender = function() {
                if(this.isPublic === true){
                    return true;
                }
                //存在roles属性则优先校验
                var Authentication = $injector.get("Authentication");
                if(this.roles) {
                    return Authentication.hasRole(this.roles);
                }
                return Authentication.checkPermission(this.secured);
            };

            service.getMenus=function(){
                return items;
            };

            service.addMenus=function(_items){
                items.splice(items.length,0,_items);
            };

            //生成主菜单(父级菜单)
            service.genMenu=function(newMenus){

                //父
                newMenus.shouldRender = service.shouldRender;



                var _getMenus=function(){
                    return  newMenus;
                };

                var setOrder=function(order){
                    newMenus.order=order;
                };

                return {
                    genMenu:service.genMenu,
                    getMenus:_getMenus,
                    setOrder:setOrder
                };
            };



            //根据route获取当前菜单
            service.getMenusByRoute = function(route){
                for(var index = 0 ; index<items.length ; index++){
                    var menu = items[index];
                    if(typeof menu.route !== 'undefined'){
                        if(menu.route === route){
                            return menu;
                        }
                    }else if(typeof menu.items !== 'undefined'){
                        for(var i = 0 ; i< menu.items.length ; i++){
                            var node_menu = menu.items[i];
                            if(node_menu.route === route ){
                                return node_menu;
                            }
                        }
                    }
                }
                return null;
            };



            return service;
        }])
    .directive('ceMenu', ['$window', 'Authentication',
    function($window, Authentication) {
        var menu={
            restrict:'EA',
            template:[
                '<div class="ce-menu"  >',
                    '<a ',
                        ' ng-repeat="item in items | orderBy: \'order\' "',
                        ' data-ng-if="item.shouldRender();"',
                        ' ui-sref-active="active"',
                        ' ui-sref="{{item.route}}"',
                        ' ui-sref-opts="{reload:true}"',
                    ' >',
                        '<span class="glyphicon glyphicon-{{item.icon}}" aria-hidden="true" ></span>{{item.name}}',
                    '</a>',
                '</div>',
            ].join(''),
            replace:true,
            controller:[
                '$scope', '$log', 'Menus',
                function($scope, $log, Menus) {
                    $scope.items=Menus.getMenus();
            }],
            link: function(scope, ele) {
                //引用了 jquery 所有不能使用 jqLite 了
                var headHeight = $('.ce-side-head').height();//angular.element(document.querySelector('.ce-side-head')).height();
                scope.onResize = function() {
                    var contentHeight = $('.ce-content').height();//angular.element(document.querySelector('.ce-content')).height();
                    var height = $window.innerHeight;
                    if(contentHeight > height){
                        ele.css({height:contentHeight+"px"});
                    }else{
                        ele.css({height:height - headHeight+"px"});
                    }
                };
                scope.onResize();
                angular.element($window).bind('resize', function() {
                    scope.onResize();
                });
                angular.element($window).bind('scroll', function() {
                    scope.onResize();
                });

            }
        };


        return menu;
    }]);