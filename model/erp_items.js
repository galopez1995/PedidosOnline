"use strict";

var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}


directory.dao.erp_itemsDAO=function(db){
	this.db=db;
};


_.extend(directory.dao.erp_itemsDAO.prototype,{
	SaveErp_items:function(items){
		debugger;
		db.transaction(
			function(tx){
				var query="insert into erp_items values (null,'"
					+items.rowid_empresa+"','"
					+items.id_cia+"','"
					+items.rowid_item_erp+"','"
					+items.rowid_item_ext+"','"
					+items.id_item+"','"
					+items.item_referencia+"','"
					+items.item_codigo+"','"
					+items.item_descripcion+"','"
					+items.item_linea+"','"
					+items.item_ext1+"','"
					+items.item_ext2+"','"
					+items.id_unidad+"','"
					+items.id_unidad_venta+"',"
					+items.ind_estado+",'"
					+items.descripcion_extensa+"','"
					+items.fechacreacion+"','"
					+items.usuariocreacion+"','"
					+items.fechamod+"','"
					+items.usuariomod+"','"
					+items.item_custom1+"','"
					+items.impuesto_id+"','"
					+items.impuesto_porcentaje+"','"
					+items.descripcion_adicional+"','"
					+items.cantidad_embalaje+"')";
				console.log(query);
				tx.executeSql(query);

			},
			function(tx,error){
				alert('Error al realizar el insert '+error);
			}
		)
	},

	FindAll:function(callback){
		db.transaction(
			function(tx){
				var query="select*from erp_items";
				tx.executeSql(query,[],function(tx,results){
					Guardar_Item.reset();
					var len=results.rows.length;
					console.log(len)
					for (var i = 0; i <len; i++) {
						var LlenarModelo=new directory.models.erp_items({
							rowid:results.rows.item(i).rowid,
							rowid_empresa:results.rows.item(i).rowid_empresa,
							id_cia:results.rows.item(i).id_cia,
							rowid_item_erp:results.rows.item(i).rowid_item_erp,
							rowid_item_ext:results.rows.item(i).rowid_item_ext,
							id_item:results.rows.item(i).id_item,
							item_referencia:results.rows.item(i).item_referencia,
							item_codigo:results.rows.item(i).item_codigo,
							item_descripcion:results.rows.item(i).item_descripcion,
							item_linea:results.rows.item(i).item_linea,
							item_ext1:results.rows.item(i).item_ext1,
							item_ext2:results.rows.item(i).item_ext2,
							id_unidad:results.rows.item(i).id_unidad,
							id_unidad_venta:results.rows.item(i).id_unidad_venta,
							ind_estado:results.rows.item(i).ind_estado,
							descripcion_extensa:results.rows.item(i).descripcion_extensa,
							fechacreacion:results.rows.item(i).fechacreacion,
							usuariocreacion:results.rows.item(i).usuariocreacion,
							fechamod:results.rows.item(i).fechamod,
							usuariomod:results.rows.item(i).usuariomod,
							item_custom1:results.rows.item(i).item_custom1,
							impuesto_id:results.rows.item(i).impuesto_id,
							impuesto_porcentaje:results.rows.item(i).impuesto_porcentaje,
							descripcion_adicional:results.rows.item(i).descripcion_adicional,
							cantidad_embalaje:results.rows.item(i).cantidad_embalaje
						})
						Guardar_Item.add(LlenarModelo);
					};
				});	
			},
			function(tx,error){
				alert('Error al consultar '+error);
			}
			

		)
	},
	FindByID:function(id,callback){
		db.transaction(
			function(tx){
				var query="select*from erp_items where rowid=:id"
				tx.executeSql(query,[id],function(tx,results){
					callback(results.rows.lenght===1 ? results.rows.item(0) : null);
				})
			},
			function(tx,error){
				alert('Error al consultar por id: '+ id);
			}
		)
	},

	UpdateErp_items:function(items){
		db.transaction(
			function(tx){
				var query="update erp_items set "+
				"rowid_empresa="+items.attributes.rowid_empresa+","+
				"id_cia="+items.attributes.id_cia+","+
				"rowid_item_erp="+items.attributes.rowid_item_erp+","+
				"rowid_item_ext="+items.attributes.rowid_item_ext+","+
				"id_item="+items.attributes.id_item+","+
				"item_referencia='"+items.attributes.item_referencia+"',"+
				"item_codigo='"+items.attributes.item_codigo+"',"+
				"item_descripcion='"+items.attributes.item_descripcion+"',"+
				"item_linea='"+items.attributes.item_linea+"',"+
				"item_ext1='"+items.attributes.item_ext1+"',"+
				"item_ext2='"+items.attributes.item_ext2+"',"+
				"id_unidad='"+items.attributes.id_unidad+"',"+
				"id_unidad_venta='"+items.attributes.id_unidad_venta+"',"+	
				"ind_estado="+items.attributes.ind_estado+","+
				"descripcion_extensa='"+items.attributes.descripcion_extensa+"',"+
				"fechacreacion='"+items.attributes.fechacreacion+"',"+
				"usuariocreacion='"+items.attributes.usuariocreacion+"',"+
				"fechamod='"+items.attributes.fechamod+"',"+
				"usuariomod='"+items.attributes.usuariomod+"',"+
				"item_custom1='"+items.attributes.item_custom1+"',"+
				"impuesto_id='"+items.attributes.impuesto_id+"',"+
				"impuesto_porcentaje="+items.attributes.impuesto_porcentaje+","+
				"descripcion_adicional='"+items.attributes.descripcion_adicional+"',"+
				"cantidad_embalaje="+items.attributes.cantidad_embalaje+" "+
				"where rowid="+items.attributes.rowid+"";
				console.log(query)
				tx.executeSql(query);
			},
			function(tx,error){
				alert('Error al realizar el update '+ error);
			}
		)
	},
	Delete:function(id){
		db.transaction(
			function(tx){
				var query="delete from erp_items where rowid="+id+""
				tx.executeSql(query)
			},
			function(tx,error){
				alert('Error al eliminar por id: '+ id);
			}
		)
	}
});




directory.models.erp_items=Backbone.Model.extend({
	dao:directory.dao.erp_itemsDAO,
	initialize:function(){
	}
});


directory.models.erp_itemsCollection=Backbone.Collection.extend({
	dao: directory.dao.erp_itemsDAO,
	model:directory.models.erp_items,
	FindAll:function(){
		var erp_itemsDAO=new directory.dao.erp_itemsDAO(directory.db),
			self=this;
		erp_itemsDAO.FindAll(function(data){
			self.reset(data);
		});
	},
	FindByID:function(key){
		var erp_itemsDAO=new directory.dao.erp_itemsDAO(directory.db),
			self=this;
		erp_itemsDAO.FindAll(key,function(data){
			self.reset(data);
		});
	},
	Delete:function(key){
		var erp_itemsDAO=new directory.dao.erp_itemsDAO(directory.db),
			self=this;
		erp_itemsDAO.Delete(key,function(data){
			self.reset(data);
		});
	},
	SaveErp_items:function(items){
		var erp_itemsDAO=new directory.dao.erp_itemsDAO(directory.db),
		self=this;
		erp_itemsDAO.SaveErp_items(items);
	},
	UpdateErp_items:function(items){
		var erp_itemsDAO=new directory.dao.erp_itemsDAO(directory.db),
		self=this;
		erp_itemsDAO.UpdateErp_items(items);
	}
});



var Guardar_Item=new directory.models.erp_itemsCollection();

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


directory.models.View_Item=Backbone.View.extend({
	model:new directory.models.erp_items(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.item-list-template').html())
	},
	events:{
		'click .edit-item': 'edit',
		'click .update-item': 'update',
		'click .cancel': 'cancel',
		'click .delete-item':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-item').hide();
		$('.delete-item').hide();
		this.$('.update-item').show();
		this.$('.cancel').show();
		
		var rowid=this.$('.rowid').html();
		var rowid_empresa=this.$('.rowid_empresa').html();
		var id_cia=this.$('.id_cia').html();
		var rowid_item_erp=this.$('.rowid_item_erp').html();
		var rowid_item_ext=this.$('.rowid_item_ext').html();
		var id_item=this.$('.id_item').html();
		var item_referencia=this.$('.item_referencia').html();
		var item_codigo=this.$('.item_codigo').html();
		var item_descripcion=this.$('.item_descripcion').html();
		var item_linea=this.$('.item_linea').html();
		var item_ext1=this.$('.item_ext1').html();
		var item_ext2=this.$('.item_ext2').html();
		var id_unidad=this.$('.id_unidad').html();
		var id_unidad_venta=this.$('.id_unidad_venta').html();
		var ind_estado=this.$('.ind_estado').html();
		var descripcion_extensa=this.$('.descripcion_extensa').html();
		var fechacreacion=this.$('.fechacreacion').html();
		var usuariocreacion=this.$('.usuariocreacion').html();
		var fechamod=this.$('.fechamod').html();
		var usuariomod=this.$('.usuariomod').html();
		var item_custom1=this.$('.item_custom1').html();
		var impuesto_id=this.$('.impuesto_id').html();
		var impuesto_porcentaje=this.$('.impuesto_porcentaje').html();
		var descripcion_adicional=this.$('.descripcion_adicional').html();
		var cantidad_embalaje=this.$('.cantidad_embalaje').html();
	
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.rowid_empresa').html('<input type="text" class="form-control rowid_empresa-update" value="' + rowid_empresa + '">');
		this.$('.id_cia').html('<input type="text" class="form-control id_cia-update" value="' + id_cia + '">');
		this.$('.rowid_item_erp').html('<input type="text" class="form-control rowid_item_erp-update" value="' + rowid_item_erp + '">');
		this.$('.rowid_item_ext').html('<input type="text" class="form-control rowid_item_ext-update" value="' + rowid_item_ext + '">');
		this.$('.id_item').html('<input type="text" class="form-control id_item-update" value="' + id_item + '">');
		this.$('.item_referencia').html('<input type="text" class="form-control item_referencia-update" value="' + item_referencia + '">');
		this.$('.item_codigo').html('<input type="text" class="form-control item_codigo-update" value="' + item_codigo + '">');
		this.$('.item_descripcion').html('<input type="text" class="form-control item_descripcion-update" value="' + item_descripcion + '">');
		this.$('.item_linea').html('<input type="text" class="form-control item_linea-update" value="' + item_linea + '">');
		this.$('.item_ext1').html('<input type="text" class="form-control item_ext1-update" value="' + item_ext1 + '">');
		this.$('.item_ext2').html('<input type="text" class="form-control item_ext2-update" value="' + item_ext2 + '">');
		this.$('.id_unidad').html('<input type="text" class="form-control id_unidad-update" value="' + id_unidad + '">');
		this.$('.id_unidad_venta').html('<input type="text" class="form-control id_unidad_venta-update" value="' + id_unidad_venta + '">');
		this.$('.ind_estado').html('<input type="text" class="form-control ind_estado-update" value="' + ind_estado + '">');
		this.$('.descripcion_extensa').html('<input type="text" class="form-control descripcion_extensa-update" value="' + descripcion_extensa + '">');
		this.$('.fechacreacion').html('<input type="text" class="form-control fechacreacion-update" value="' + fechacreacion + '">');
		this.$('.usuariocreacion').html('<input type="text" class="form-control usuariocreacion-update" value="' + usuariocreacion + '">');
		this.$('.fechamod').html('<input type="text" class="form-control fechamod-update" value="' + fechamod + '">');
		this.$('.usuariomod').html('<input type="text" class="form-control usuariomod-update" value="' + usuariomod + '">');
		this.$('.item_custom1').html('<input type="text" class="form-control item_custom1-update" value="' + item_custom1 + '">');
		this.$('.impuesto_id').html('<input type="text" class="form-control impuesto_id-update" value="' + impuesto_id + '">');
		this.$('.impuesto_porcentaje').html('<input type="text" class="form-control impuesto_porcentaje-update" value="' + impuesto_porcentaje + '">');
		this.$('.descripcion_adicional').html('<input type="text" class="form-control descripcion_adicional-update" value="' + descripcion_adicional + '">');
		this.$('.cantidad_embalaje').html('<input type="text" class="form-control cantidad_embalaje-update" value="' + cantidad_embalaje + '">');
		
	},
	update: function() {
		var ModificarItem=new directory.models.erp_items({
			rowid:$('.rowid-update').val(),
			rowid_empresa:$('.rowid_empresa-update').val(),
			id_cia:$('.id_cia-update').val(),
			rowid_item_erp:$('.rowid_item_erp-update').val(),
			rowid_item_ext:$('.rowid_item_ext-update').val(),
			id_item:$('.id_item-update').val(),
			item_referencia:$('.item_referencia-update').val(),
			item_codigo:$('.item_codigo-update').val(),
			item_descripcion:$('.item_descripcion-update').val(),
			item_linea:$('.item_linea-update').val(),
			item_ext1:$('.item_ext1-update').val(),
			item_ext2:$('.item_ext2-update').val(),
			id_unidad:$('.id_unidad-update').val(),
			id_unidad_venta:$('.id_unidad_venta-update').val(),
			ind_estado:$('.ind_estado-update').val(),
			descripcion_extensa:$('.descripcion_extensa-update').val(),
			fechacreacion:$('.fechacreacion-update').val(),
			usuariocreacion:$('.usuariocreacion-update').val(),
			fechamod:$('.fechamod-update').val(),
			usuariomod:$('.usuariomod-update').val(),
			item_custom1:$('.item_custom1-update').val(),
			impuesto_id:$('.impuesto_id-update').val(),
			impuesto_porcentaje:$('.impuesto_porcentaje-update').val(),
			descripcion_adicional:$('.descripcion_adicional-update').val(),
			cantidad_embalaje	:$('.cantidad_embalaje-update').val()
		})
		Guardar_Item.UpdateErp_items(ModificarItem);
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
			self.$el.append((new directory.models.View_Item({model: item})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllItem();

$(document).ready(function() {
	$('.guardar').on('click', function() {
		var erp_items=new directory.models.erp_itemsCollection();
		erp_items.SaveErp_items({
			rowid_empresa:$('#rowid_empresa').val(),
			id_cia:$('#id_cia').val(),
			rowid_item_erp:$('#rowid_item_erp').val(),
			rowid_item_ext:$('#rowid_item_ext').val(),
			id_item:$('#id_item').val(),
			item_referencia:$('#item_referencia').val(),
			item_codigo:$('#item_codigo').val(),
			item_descripcion:$('#item_descripcion').val(),
			item_linea:$('#item_linea').val(),
			item_ext1:$('#item_ext1').val(),
			item_ext2:$('#item_ext2').val(),
			id_unidad:$('#id_unidad').val(),
			id_unidad_venta:$('#id_unidad_venta').val(),
			ind_estado:$('#ind_estado').val(),
			descripcion_extensa:$('#descripcion_extensa').val(),
			fechacreacion:$('#fechacreacion').val(),
			usuariocreacion:$('#usuariocreacion').val(),
			fechamod:$('#fechamod').val(),
			usuariomod:$('#usuariomod').val(),
			item_custom1:$('#item_custom1').val(),
			impuesto_id:$('#impuesto_id').val(),
			impuesto_porcentaje:$('#impuesto_porcentaje').val(),
			descripcion_adicional:$('#descripcion_adicional').val(),
			cantidad_embalaje	:$('#cantidad_embalaje').val()
		})
		alert('INSERTADO CON EXITO');
	});
})




directory.Router = Backbone.Router.extend({

    routes: {
    },

    initialize: function() {
    },


});
