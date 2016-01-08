/**
 * Created by dev10 on 1/7/2016.
 */
var app= angular.module('PedidosOnline');


//CONTROLADOR DEL MOULO DE VENTAS
app.controller('pedidoController', function($scope,$http){

   /* angular.element('#tab_pedido a').click(function (e) {
        debugger;
        e.preventDefault()
        $(this).tab('show')
    });
*/
    $scope.GuardarEncabezadoPedido = function(e){

        alert('pedido guardado');
        /* PostResource.save({data:$scope.post},function(data){
         console.log(data);
         });*/
    };

    //$scope.CambioTab = function(tab){

    angular.element('ul.tabs li').click(function(){
        var tab_id = angular.element(this).find('a').data('tab');

        angular.element('ul.tabs li').removeClass('active');
        angular.element('.tab-pane').removeClass('active');

        angular.element(this).toggleClass('active');
        angular.element("#"+tab_id).toggleClass('active');
    });

/*
        alert('pedido guardado');
        /!* PostResource.save({data:$scope.post},function(data){
         console.log(data);
         });*!/
        $("#tab"+tab_id).addClass('current');

    };
*/



    $scope.list_tercero=[];
    $http.get("https://api.github.com/users/codigofacilito/repos")
/*    $http.get("http://edex.pedidosonline.co/SVC/ObtenerDatos?entidad=TERCEROS")*/
        .success(function(data){
            for(var i =data.length -1 ; i>=0; i--){
                var repo = data[i];
                //crea un arreglo unidimensional de los nombres, para poder ser manejado por el autocomplete
                /*$scope.list_tercero.push(repo.razonsocial);*/
                $scope.list_tercero.push(repo.name);
            };
            console.log(data);
        }).error(function(err){
        console.log("Error"+err);
    });

    $scope.optionSelect = function(data){//se encarga de manejar la seleccion del autocomplete
        $scope.$apply(function(){
            $scope.main_repo = data;//cuando se selecciona carga el valor en la variable main repo, que filtrara la lista
        })
    }
});


