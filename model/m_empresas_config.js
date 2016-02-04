var app_angular= angular.module('PedidosOnline');

app_angular.service('Metodos_m_empresas_config', ['Factory',function (Factory) {
 	Empresa = {};
    Empresa.insert = function(elem, callback) {
        db.insert('m_empresas_config', elem, callback);
    }
  	Empresa.selectAll = function(handler,callback){
    	db.selectAll('m_empresas_config').then(function(results) {
            for(var i=0; i < results.rows.length; i++) {
             	handler(results.rows.item(i));
            }
        });
    }
    Empresa.selectID = function(id,handler,callback){
        db.select('m_empresas_config',{'rowid':id}).then(function(results) {
		    for(var i=0; i < results.rows.length; i++){
		    	handler(results.rows.item(i));
			}
	    })
    Empresa.Delete = function(id,callback){
        db.del('m_empresas_config',{'rowid':id});
    } 
    Empresa.Update = function(elem, callback) {
        db.update('m_empresas_config', elem, callback);
    }
}
    return Empresa;
}])
;