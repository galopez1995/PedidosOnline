var app_angular= angular.module('PedidosOnline');

app_angular.service('Metodos_erp_terceros', ['Factory',function (Factory) {
 	Terceros = {};
    Terceros.insert = function(elem, callback) {
        db.insert('erp_terceros', elem, callback);
    }
  	Terceros.selectAll = function(handler,callback){
    	db.selectAll('erp_terceros').then(function(results) {
            for(var i=0; i < results.rows.length; i++) {
             	handler(results.rows.item(i));
            }
        });
    }
    Terceros.selectID = function(id,handler,callback){
        db.select('erp_terceros',{'rowid':id}).then(function(results) {
		    for(var i=0; i < results.rows.length; i++){
		    	handler(results.rows.item(i));
			}
	    })
    }
    Terceros.Delete = function(id,callback){
        db.del('erp_terceros',{'rowid':id});
    } 
    Terceros.Update = function(elem, callback) {
        db.update('erp_terceros', elem, callback);
    }

    return Terceros;
}]);