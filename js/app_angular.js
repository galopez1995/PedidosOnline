/**
 * Created by dev10 on 12/23/2015.
 */
var app = angular.module('PedidosOnline',[]);


app.controller('ControllerMenu', function () {

});

//CONTROLADOR DE MENU
app.controller('menuController', function($scope){
    $scope.menuList = [
        {text:'learn angular', done:true, isSubmenu: true,
            submenu: [{text: 'hola niche'}, {text: 'no jodas mas'}]
        },
        {text:'build an angular app', done:false}];
});