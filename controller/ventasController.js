/**
 * Created by dev10 on 1/7/2016.
 */
var app_angular = angular.module('PedidosOnline');


//CONTROLADOR DEL MOULO DE VENTAS
app_angular.controller("pedidoController",['Metodos_t_pedidos','Metodos_erp_terceros','$scope','$location','$http',function (Metodos_t_pedidos,Metodos_erp_terceros,$scope,$location,$http) {

    $scope.modulo=MODULO_PEDIDO_NUEVO;

    angular.element('select').select2();

    angular.element('ul.tabs li').click(function () {

        var tab_id = angular.element(this).find('a').data('tab');

        angular.element('ul.tabs li').removeClass('active');
        angular.element('.tab-pane').removeClass('active');

        angular.element(this).toggleClass('active');
        angular.element("#" + tab_id).toggleClass('active');
    });

    $scope.CambiarTab = function (tab_actual, accion) {
        var tab_id = null;

        if (tab_actual == '2' && accion == 'atras')
            tab_id = 'tab_1';
        else if (tab_actual == '2' && accion == 'siguiente')
            tab_id = 'tab_3';
        else if (tab_actual == '3' && accion == 'atras')
            tab_id = 'tab_2';

        angular.element('ul.tabs li').removeClass('active');
        angular.element('.tab-pane').removeClass('active');

        angular.element("ul.tabs").find("[data-tab='" + tab_id + "']").toggleClass('active');
        angular.element("#" + tab_id).toggleClass('active');
    };

    $scope.list_tercero = [];

    Terceros.selectAll(
        function(elem){
            $scope.list_tercero.push(elem.razonsocial)
        }
    );

    /*
    $http.get("https://api.github.com/users/codigofacilito/repos")
        .success(function (data) {
            for (var i = data.length - 1; i >= 0; i--) {
                var repo = data[i];
                //crea un arreglo unidimensional de los nombres, para poder ser manejado por el autocomplete
                $scope.list_tercero.push(repo.name);
            };
            console.log(data);
        })
        .error(function (err) {
            console.log("Error" + err);
        });
    */

    $scope.optionSelect = function (data) {//se encarga de manejar la seleccion del autocomplete
        $scope.$apply(function () {
            $scope.main_repo = data;//cuando se selecciona carga el valor en la variable main repo, que filtrara la lista
        })
    };

    $scope.pedidos=[];
    $scope.Add=function(){
        Pedido.insert($scope.pedidos);
    };

    angular.element('#ui-id-1').mouseover(function (){
        angular.element('#ui-id-1').show();
    });

}]);