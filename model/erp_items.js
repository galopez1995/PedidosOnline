var app_angular= angular.module('PedidosOnline');

app_angular.service('Metodos_Items', ['Factory',function (Factory) {
 	Item = {};
    Item.insert = function(elem, callback) {
        db.insert('erp_items', elem, callback);
    }
  	Item.selectAll = function(handler,callback){
    	db.selectAll('erp_items').then(function(results) {
            for(var i=0; i < results.rows.length; i++) {
             	handler(results.rows.item(i));
            }
        });
    }
    Item.selectID = function(id,handler,callback){
        db.select('erp_items',{'rowid':id}).then(function(results) {
		    for(var i=0; i < results.rows.length; i++){
		    	handler(results.rows.item(i));
			}
	    })
    Item.Delete = function(id,callback){
        db.del('erp_items',{'rowid':id});
    } 
    Item.Update = function(elem, callback) {
        db.update('erp_items', elem, callback);
    }
}
    return Item;
}]);