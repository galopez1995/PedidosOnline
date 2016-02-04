var app_angular= angular.module('PedidosOnline');

app_angular.service('Metodos_s_opcionmenu', ['Factory',function (Factory) {
 	Menu = {};
    Menu.insert = function(elem, callback) {
        db.insert('s_opcionmenu', elem, callback);
    }
  	Menu.selectAll = function(handler,callback){
    	db.selectAll('s_opcionmenu').then(function(results) {
            for(var i=0; i < results.rows.length; i++) {
             	handler(results.rows.item(i));
            }
        });
    }
    Menu.selectID = function(id,handler,callback){
        db.select('s_opcionmenu',{'rowid':id}).then(function(results) {
		    for(var i=0; i < results.rows.length; i++){
		    	handler(results.rows.item(i));
			}
	    })
    Menu.Delete = function(id,callback){
        db.del('s_opcionmenu',{'rowid':id});
    } 
    Menu.Update = function(elem, callback) {
        db.update('s_opcionmenu', elem, callback);
    }
}
    return Menu;
}])
;