/**
 * Created by dev10 on 12/23/2015.
 */
var app = angular.module('PedidosOnline',['ngResource','ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when("/",{
            //controller: "ReposController",
            templateUrl: 'view/home/home.html'
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
            controller: 'calendarioController',
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
            submenu: [{nombre_opcion: 'Mi Cuenta', url:'#mi_cuenta'}, {nombre_opcion: 'Cambiar Clave',url:'#/'}]
        }
    ];
});

app.controller('calendarioController', function($scope){
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var h = {};

    if ($('#calendar').width() <= 400) {
        h = {
            left: 'title',
            center: '',
            right: 'prev,next'
        };
    } else {
        h = {
            left: 'prev,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }

    $('#calendar').fullCalendar({
        disableDragging: false,
        header: h,
        editable: true,
        events: [{
            title: 'All Day Event',
            start: new Date(y, m, 1),
            backgroundColor: App.getLayoutColorCode('yellow')
        }, {
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            end: new Date(y, m, d - 2),
            backgroundColor: App.getLayoutColorCode('green')
        }, {
            title: 'Repeating Event',
            start: new Date(y, m, d - 3, 16, 0),
            allDay: false,
            backgroundColor: App.getLayoutColorCode('red')
        }, {
            title: 'Repeating Event',
            start: new Date(y, m, d + 4, 16, 0),
            allDay: false,
            backgroundColor: App.getLayoutColorCode('green')
        }, {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false,
        }, {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            backgroundColor: App.getLayoutColorCode('grey'),
            allDay: false,
        }, {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            backgroundColor: App.getLayoutColorCode('purple'),
            allDay: false,
        }, {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            backgroundColor: App.getLayoutColorCode('yellow'),
            url: 'http://google.com/',
        }
        ]
    });
});