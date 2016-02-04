app_angular= angular.module('PedidosOnline');

app_angular.service('Metodos_erp_entidades_master', ['Factory',function (Factory) {
 	Entidad = {};
    Entidad.insert = function(elem, callback) {
        db.insert('erp_entidades_master', elem, callback);
    }
  	Entidad.selectAll = function(handler,callback){
    	db.selectAll('erp_entidades_master').then(function(results) {
            for(var i=0; i < results.rows.length; i++) {
             	handler(results.rows.item(i));
            }
        });
    }
    Entidad.selectID = function(id,handler,callback){
        db.select('erp_entidades_master',{'rowid':id}).then(function(results) {
		    for(var i=0; i < results.rows.length; i++){
		    	handler(results.rows.item(i));
			}
	    })
        Entidad.Delete = function(id,callback){
            db.del('erp_entidades_master',{'rowid':id});
        }
        Entidad.Update = function(elem, callback) {
            db.update('erp_entidades_master', elem, callback);
        }
    }
    return Entidad;
}]);