/**
 * Created by dev10 on 12/23/2015.
 */
var app_angular = angular.module('PedidosOnline',['ngResource','ngRoute']);

app_angular.config(['$routeProvider',//'$locationProvider',
    function($routeProvider) {
    //, $locationProvider) {
        $routeProvider
        .when("/",{
            controller:'appController',
            templateUrl: "view/home/home.html"
        })
        .when("/:modulo/:url",{
            controller:'appController',
            templateUrl: function(urlattr){
                if(urlattr.modulo=='pagina_Actual')
                    return '#'+ urlattr.url;
                if(urlattr.modulo=='' || urlattr.url=='') {
                    urlattr.modulo = 'home';
                    urlattr.urlurl = 'home';
                }
                //angular.element('#titulo').html( urlattr.urlurl);
                return 'view/'+ urlattr.modulo+'/' + urlattr.url + '.html';
            }
        })
        .otherwise("/");
        // use the HTML5 History API
        //$locationProvider.html5Mode(true);
    }
]);

//CONTROLADOR DE GENERAL
app_angular.controller('appController', function($scope,$routeParams){
    //===== Sidebar Search (Demo Only) =====//
    angular.element(document).ready(function() {

        /*$scope.modulo = $routeParams.modulo;
        $scope.url = $routeParams.url;*/

        try{angular.element('#titulo').html($routeParams.url);}
        catch(excepcion){}

        App.init(); // Init layout and core plugins
        Plugins.init(); // Init all plugins
        FormComponents.init(); // Init all form-specific plugins

        angular.element('select').select2();

        angular.element('.sidebar-search').submit(function (e) {
            //e.preventDefault(); // Prevent form submitting (browser redirect)

            angular.element('.sidebar-search-results').slideDown(200);
            return false;
        });

        angular.element('.sidebar-search-results .close').click(function () {
            angular.element('.sidebar-search-results').slideUp(200);
        });

        //===== .row .row-bg Toggler =====//
        angular.element('.row-bg-toggle').click(function (e) {
            e.preventDefault(); // prevent redirect to #

            angular.element('.row.row-bg').each(function () {
                $(this).slideToggle(200);
            });
        });

        //===== Sparklines =====//
        angular.element("#sparkline-bar").sparkline('html', {
            type: 'bar',
            height: '35px',
            zeroAxis: false,
            barColor: App.getLayoutColorCode('red')
        });

        angular.element("#sparkline-bar2").sparkline('html', {
            type: 'bar',
            height: '35px',
            zeroAxis: false,
            barColor: App.getLayoutColorCode('green')
        });

        //===== Refresh-Button on Widgets =====//
        angular.element('.widget .toolbar .widget-refresh').click(function () {
            var el = $(this).parents('.widget');

            App.blockUI(el);
            window.setTimeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Widget updated.</strong>',
                    type: 'success',
                    timeout: 1000
                });
            }, 1000);
        });

        //===== Fade In Notification (Demo Only) =====//
        setTimeout(function () {
            angular.element('#sidebar .notifications.demo-slide-in > li:eq(1)').slideDown(500);
        }, 3500);

        setTimeout(function () {
            angular.element('#sidebar .notifications.demo-slide-in > li:eq(0)').slideDown(500);
        }, 7000);


        // Sample Data
        var d1 = [[1262304000000, 0], [1264982400000, 500], [1267401600000, 700], [1270080000000, 1300], [1272672000000, 2600], [1275350400000, 1300], [1277942400000, 1700], [1280620800000, 1300], [1283299200000, 1500], [1285891200000, 2000], [1288569600000, 1500], [1291161600000, 1200]];

        var data1 = [
            { label: "Total Ventas", data: d1, color: App.getLayoutColorCode('blue') }
        ];

        $.plot("#chart_filled_blue", data1, $.extend(true, {}, Plugins.getFlotDefaults(), {
            xaxis: {
                min: (new Date(2009, 12, 1)).getTime(),
                max: (new Date(2010, 11, 2)).getTime(),
                mode: "time",
                tickSize: [1, "month"],
                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                tickLength: 0
            },
            series: {
                lines: {
                    fill: true,
                    lineWidth: 1.5
                },
                points: {
                    show: true,
                    radius: 2.5,
                    lineWidth: 1.1
                },
                grow: { active: true, growings:[ { stepMode: "maximum" } ] }
            },
            grid: {
                hoverable: true,
                clickable: true
            },
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            }
        }));

    });
});

//CONTROLADOR DE MENU
app_angular.controller('menuController', function($scope){
    $scope.menuList = [
        {nombre_opcion:'Ventas',url:'#/', isSubmenu: true, icono:'icon-bar-chart',
            submenu: [{nombre_opcion: 'Pedidos', url:'#/ventas/pedidos_ingresados'}
        ]
        },
        {nombre_opcion:'Configuracion',url:'#/', isSubmenu: true, icono:'icon-cog',
            submenu: [{nombre_opcion: 'Mi Cuenta', url:'#/configuracion/mi_cuenta'}, {nombre_opcion: 'Cambiar Clave',url:'#/'}]
        }
    ];
});

//CONTROLADOR DE PANTALLA DE CALENDARIO
app_angular.controller('calendarioController', function($scope){
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var h = {};

    if (angular.element('#calendar').width() <= 400) {
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

    angular.element('#calendar').fullCalendar({
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