var app_angular= angular.module('PedidosOnline');

app_angular.service('Metodos_l_log_eventos', ['Factory',function (Factory) {
 	Eventos = {};
    Eventos.insert = function(elem, callback) {
        db.insert('l_log_eventos', elem, callback);
    }
  	Eventos.selectAll = function(handler,callback){
    	db.selectAll('l_log_eventos').then(function(results) {
            for(var i=0; i < results.rows.length; i++) {
             	handler(results.rows.item(i));
            }
        });
    }
    Eventos.selectID = function(id,handler,callback){
        db.select('l_log_eventos',{'rowid':id}).then(function(results) {
		    for(var i=0; i < results.rows.length; i++){
		    	handler(results.rows.item(i));
			}
	    })
    Eventos.Delete = function(id,callback){
        db.del('l_log_eventos',{'rowid':id});
    } 
    Eventos.Update = function(elem, callback) {
        db.update('l_log_eventos', elem, callback);
    }
}
    return Eventos;
}])
;