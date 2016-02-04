var app_angular= angular.module('PedidosOnline');

app_angular.service('Metodos_t_pedidos_detalle', ['Factory',function (Factory) {
 	Pedido_Detalle = {};
    Pedido_Detalle.insert = function(elem, callback) {
        db.insert('t_pedidos_detalle', elem, callback);
    }
  	Pedido_Detalle.selectAll = function(handler,callback){
    	db.selectAll('t_pedidos_detalle').then(function(results) {
            for(var i=0; i < results.rows.length; i++) {
             	handler(results.rows.item(i));
            }
        });
    }
    Pedido_Detalle.selectID = function(id,handler,callback){
        db.select('t_pedidos_detalle',{'rowid':id}).then(function(results) {
		    for(var i=0; i < results.rows.length; i++){
		    	handler(results.rows.item(i));
			}
	    })
    }
    Pedido_Detalle.Delete = function(id,callback){
        db.del('t_pedidos_detalle',{'rowid':id});
    } 
    Pedido_Detalle.Update = function(elem, callback) {
        db.update('t_pedidos_detalle', elem, callback);
    }

    return Pedido_Detalle;
}]);