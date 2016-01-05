/**
 * Created by dev10 on 12/23/2015.
 */
var app = angular.module('PedidosOnline',['ngResource','ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when("/",{
            //controller: "ReposController",
            templateUrl: 'view/home/index.html'
        }).
        when('/pedido/', {
            //controller: 'VentasController',
            templateUrl: 'view/ventas/t_pedido.html'
        }).
        when('/mi_cuenta/', {
            //controller: 'VentasController',
            templateUrl: 'view/configuracion/mi_cuenta.html'
        }).
        when('/calendario/', {
            //controller: 'VentasController',
            templateUrl: 'view/crm/calendario.html'
        }).
        when('/login/', {
            //controller: 'VentasController',
            templateUrl: 'login.html'
        }).
        otherwise("/");//este sirve para que encaso que la url a utilizar no este definida utilice
    }]);

app.controller('ControllerMenu', function () {

});

//CONTROLADOR DE MENU
app.controller('menuController', function($scope){
    $scope.menuList = [
        {nombre_opcion:'Ventas',url:'#', isSubmenu: true, icono:'icon-bar-chart',
            submenu: [{nombre_opcion: 'Pedidos', url:'#pedido'}]
        },
        {nombre_opcion:'Configuracion',url:'#', isSubmenu: true, icono:'icon-cog',
            submenu: [{nombre_opcion: 'Mi Cuenta', url:'#mi_cuenta'}, {nombre_opcion: 'Cambiar Clave'}]
        }
    ];
});