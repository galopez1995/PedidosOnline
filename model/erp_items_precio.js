"use strict";






var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}

directory.dao.erp_items_preciosDAO=function(db){
	this.db=db;
};


_.extend(directory.dao.erp_items_preciosDAO.prototype,{

	Save:function(items_precio){
		debugger;
		db.transaction(
			function(tx){
				var query="insert into erp_items_precios values  (null,"+
					"'"+items_precio.rowid_empresa+
					"','"+items_precio.id_cia+
					"','"+items_precio.id_lista_precios+
					"','"+items_precio.rowid_item+
					"','"+items_precio.rowid_item_ext+
					"','"+items_precio.id_unidad+
					"','"+items_precio.precio_lista+
					"','"+items_precio.fechacreacion+
					"','"+items_precio.usuariocreacion+
					"','"+items_precio.fechamod+
					"','"+items_precio.usuariomod+"')";
				console.log(query);
				tx.executeSql(query);
			},
			function(tx,error){
				console.log('error al insertar ' + error);
			}
		)
	},
	FindAll:function(){
		db.transaction(
			function(tx){
				var query ="select*from erp_items_precios";
				tx.executeSql(query,[],function(tx,results){
					Guardar_Item.reset();
					var len=results.rows.length;
					console.log(len);
					for (var i =0; i<len; i++) {
						var llenarModelo=new directory.models.erp_items_precios({
							rowid:results.rows.item(i).rowid,
							rowid_empresa:results.rows.item(i).rowid_empresa,
							id_cia:results.rows.item(i).id_cia,
							id_lista_precios:results.rows.item(i).id_lista_precios,
							rowid_item:results.rows.item(i).rowid_item,
							rowid_item_ext:results.rows.item(i).rowid_item_ext,
							id_unidad:results.rows.item(i).id_unidad,
							precio_lista:results.rows.item(i).precio_lista,
							fechacreacion:results.rows.item(i).fechacreacion,
							usuariocreacion:results.rows.item(i).usuariocreacion,
							fechamod:results.rows.item(i).fechamod,
							usuariomod:results.rows.item(i).usuariomod
						})	
						Guardar_Item.add(llenarModelo);
					}
				})				
			},
			function(tx,error){
				console.log('error al consultar' + error);
			}
		)
	},
	Delete:function(id){
		db.transaction(
			function(tx){
				var query="delete from erp_items_precios where rowid="+id+"";
				tx.executeSql(query);
			},
			function(tx,error){
				console.log('error al eliminar ' + error);
			}
		)
	},
	Update:function(items_precio){
		debugger;
		db.transaction(
			function(tx){
				var query="update erp_items_precios set "+
				"rowid_empresa="+items_precio.attributes.rowid_empresa+","+
				"id_cia="+items_precio.attributes.id_cia+","+
				"id_lista_precios='"+items_precio.attributes.id_lista_precios+"',"+
				"rowid_item="+items_precio.attributes.rowid_item+","+
				"rowid_item_ext="+items_precio.attributes.rowid_item_ext+","+
				"id_unidad='"+items_precio.attributes.id_unidad+"',"+
				"precio_lista="+items_precio.attributes.precio_lista+","+
				"fechacreacion='"+items_precio.attributes.fechacreacion+"',"+
				"usuariocreacion='"+items_precio.attributes.usuariocreacion+"',"+
				"fechamod='"+items_precio.attributes.fechamod+"',"+
				"usuariomod='"+items_precio.attributes.usuariomod+"' "+
				"where rowid="+items_precio.attributes.rowid+"";
				console.log(query);
				tx.executeSql(query);


			},
			function(tx,error){
			console.log('error al ejecutar update '+ error)
			}
		)
	}
})




directory.models.erp_items_precios=Backbone.Model.extend({
	dao:directory.dao.erp_items_preciosDAO,
	initialize:function(){
	}
});


directory.models.erp_items_preciosCollection=Backbone.Collection.extend({
	dao: directory.dao.erp_items_preciosDAO,
	model:directory.models.erp_items,
	FindAll:function(){
		var erp_itemsDAO=new directory.dao.erp_items_preciosDAO(directory.db),
			self=this;
		erp_itemsDAO.FindAll(function(data){
			self.reset(data);
		});
	},
	Delete:function(key){
		var erp_itemsDAO=new directory.dao.erp_items_preciosDAO(directory.db),
			self=this;
		erp_itemsDAO.Delete(key,function(data){
			self.reset(data);
		});
	},
	Save:function(items){
		var erp_itemsDAO=new directory.dao.erp_items_preciosDAO(directory.db),
		self=this;
		erp_itemsDAO.Save(items);
	},
	Update:function(items){
		var erp_itemsDAO=new directory.dao.erp_items_preciosDAO(directory.db),
		self=this;
		erp_itemsDAO.Update(items);
	}
});



var Guardar_Item=new directory.models.erp_items_preciosCollection();

directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.erp_items,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_Item.FindAll();	
	}
})

var Listar=new directory.models.EjecutarColection();


directory.models.View_Item_precios=Backbone.View.extend({
	model:new directory.models.erp_items_precios(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.item-list-template').html())
	},
	events:{
		'click .edit-item': 'edit',
		'click .update-item': 'update',
		'click .cancel-item': 'cancel',
		'click .delete-item':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-item').hide();
		$('.delete-item').hide();
		this.$('.update-item').show();
		this.$('.cancel-item').show();
		
		var rowid=this.$('.rowid').html();
		var rowid_empresa=this.$('.rowid_empresa').html();
		var id_cia=this.$('.id_cia').html();
		var id_lista_precios=this.$('.id_lista_precios').html();
		var rowid_item=this.$('.rowid_item').html();
		var rowid_item_ext=this.$('.rowid_item_ext').html();
		var id_unidad=this.$('.id_unidad').html();
		var precio_lista=this.$('.precio_lista').html();
		var fechacreacion=this.$('.fechacreacion').html();
		var usuariocreacion=this.$('.usuariocreacion').html();
		var fechamod=this.$('.fechamod').html();
		var usuariomod=this.$('.usuariomod').html();
			
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.rowid_empresa').html('<input type="text" class="form-control rowid_empresa-update" value="' + rowid_empresa + '">');
		this.$('.id_cia').html('<input type="text" class="form-control id_cia-update" value="' + id_cia + '">');
		this.$('.id_lista_precios').html('<input type="text" class="form-control id_lista_precios-update" value="' + id_lista_precios + '">');
		this.$('.rowid_item').html('<input type="text" class="form-control rowid_item-update" value="' + rowid_item + '">');
		this.$('.rowid_item_ext').html('<input type="text" class="form-control rowid_item_ext-update" value="' + rowid_item_ext + '">');
		this.$('.id_unidad').html('<input type="text" class="form-control id_unidad-update" value="' + id_unidad + '">');
		this.$('.precio_lista').html('<input type="text" class="form-control precio_lista-update" value="' + precio_lista + '">');
		this.$('.fechacreacion').html('<input type="text" class="form-control fechacreacion-update" value="' + fechacreacion + '">');
		this.$('.usuariocreacion').html('<input type="text" class="form-control usuariocreacion-update" value="' + usuariocreacion + '">');
		this.$('.fechamod').html('<input type="text" class="form-control fechamod-update" value="' + fechamod + '">');
		this.$('.usuariomod').html('<input type="text" class="form-control usuariomod-update" value="' + usuariomod + '">');
		
	},
	update: function() {

		var ModificarItem=new directory.models.erp_items_precios({
			rowid:$('.rowid-update').val(),
			rowid_empresa:$('.rowid_empresa-update').val(),
			id_cia:$('.id_cia-update').val(),
			id_lista_precios:$('.id_lista_precios-update').val(),
			rowid_item:$('.rowid_item-update').val(),
			rowid_item_ext:$('.rowid_item_ext-update').val(),
			id_unidad:$('.id_unidad-update').val(),
			precio_lista:$('.precio_lista-update').val(),
			fechacreacion:$('.fechacreacion-update').val(),
			usuariocreacion:$('.usuariocreacion-update').val(),
			fechamod:$('.fechamod-update').val(),
			usuariomod:$('.usuariomod-update').val()
			
		})
		Guardar_Item.Update(ModificarItem);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllItem();
	},
	cancel: function() {

		var Listar=new directory.models.AllItem();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_Item.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllItem();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllItem = Backbone.View.extend({
	model:Guardar_Item,
	el: $('.item-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(item) {
			self.$el.append((new directory.models.View_Item_precios({model: item})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllItem();



$(document).ready(function() {
	$('.guardar').on('click', function() {
		var erp_items=new directory.models.erp_items_preciosCollection();
		erp_items.Save({
			rowid_empresa:$('#rowid_empresa').val(),
			id_cia:$('#id_cia').val(),
			id_lista_precios:$('#id_lista_precios').val(),
			rowid_item:$('#rowid_item').val(),
			rowid_item_ext:$('#rowid_item_ext').val(),
			id_unidad:$('#id_unidad').val(),
			precio_lista:$('#precio_lista').val(),
			fechacreacion:$('#fechacreacion').val(),
			usuariocreacion:$('#usuariocreacion').val(),
			fechamod:$('#fechamod').val(),
			usuariomod:$('#usuariomod').val()
		})

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllItem();
	});
})


















