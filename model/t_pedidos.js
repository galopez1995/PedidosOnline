var app_angular= angular.module('PedidosOnline');

app_angular.service('Metodos_t_pedidos', ['Factory',function (Factory) {
 	Pedido = {};
    Pedido.insert = function(elem, callback) {
        db.insert('t_pedidos', elem, callback);
    }
  	Pedido.selectAll = function(handler,callback){
    	db.selectAll('t_pedidos').then(function(results) {
            for(var i=0; i < results.rows.length; i++) {
             	handler(results.rows.item(i));
            }
        });
    }
    Pedido.selectID = function(id,handler,callback){
        db.select('t_pedidos',{'rowid':id}).then(function(results) {
		    for(var i=0; i < results.rows.length; i++){
		    	handler(results.rows.item(i));
			}
	    })
        Pedido.Delete = function(id,callback){
            db.del('t_pedidos',{'rowid':id});
        }
        Pedido.Update = function(elem, callback) {
            db.update('t_pedidos', elem, callback);
        }
    }

    return Pedido;
}]);