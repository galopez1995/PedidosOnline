var app_angular= angular.module('PedidosOnline');

app_angular.controller("PedidosIngresadosController",['Metodos_t_pedidos','$scope',function (Metodos_t_pedidos,$scope) {
	// body...
	$scope.pedidos = [];
    Pedido.selectAll(function(elem) {$scope.pedidos.push(elem)});
}]);

app_angular.controller("NewController_t_pedidos",['Metodos_t_pedidos','$scope','$location',function (Metodos_t_pedidos,$scope,$location) {
	//$scope.title="Crear t_pedidos";
	$scope.pedidos=[];
	$scope.GuardarPedido=function(){
		Pedido.insert($scope.pedidos)
		//$location.path("/");
	}
}]);

app_angular.controller("EditController_t_pedidos",['Metodos_t_pedidos','$scope','$routeParams','$location',function (Metodos_t_pedidos,$scope,$routeParams,$location) {
	$scope.pedidos=[];
	$scope.title="Modificar t_pedidos";
	Pedido.selectID($routeParams.id,function(elem) {$scope.pedidos.push(elem)})
	$scope.Actualizar=function(){
		Pedido.Update($scope.pedidos[0],{rowid:$routeParams.id})
		$location.path("/");
	}
	$scope.Eliminar=function(){
		Pedido.Delete($routeParams.id);
		$location.path('/');
	}
}]);