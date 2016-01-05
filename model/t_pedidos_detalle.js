"use strict";

var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}


directory.dao.t_pedidos_detalleDAO=function(db){
	this.db=db;
};


_.extend(directory.dao.t_pedidos_detalleDAO.prototype,{
	Savet_pedidos_detalle:function(t_pedidos_detalle){
		debugger;
		db.transaction(
			function(tx){
				var query="insert into t_pedidos_detalle values (null,"
					+t_pedidos_detalle.rowid_pedido+","
					+t_pedidos_detalle.rowid_bodega+","
					+t_pedidos_detalle.rowid_item+",'"
					+t_pedidos_detalle.linea_descripcion+"','"
					+t_pedidos_detalle.id_unidad+"',"
					+t_pedidos_detalle.cantidad+","
					+t_pedidos_detalle.factor+","
					+t_pedidos_detalle.cantidad_base+","
					+t_pedidos_detalle.precio_unitario+",'"
					+t_pedidos_detalle.id_motivo+"',"
					+t_pedidos_detalle.stock+","
					+t_pedidos_detalle.valor_base+","
					+t_pedidos_detalle.valor_impuesto+","
					+t_pedidos_detalle.porcen_descuento+","
					+t_pedidos_detalle.valor_porcen_descuento+","
					+t_pedidos_detalle.valor_descuento+","
					+t_pedidos_detalle.valor_total_linea+",'"
					+t_pedidos_detalle.fechacreacion+"','"
					+t_pedidos_detalle.usuariocreacion+"','"
					+t_pedidos_detalle.fechamod+"','"
					+t_pedidos_detalle.usuariomod+"',"
					+t_pedidos_detalle.rowid_item_ext+",'"
					+t_pedidos_detalle.item_ext1+"','"
					+t_pedidos_detalle.item_ext2+"','"
					+t_pedidos_detalle.num_lote+"','"
					+t_pedidos_detalle.fecha_anulacion+"','"
					+t_pedidos_detalle.usuario_anulacion+"')";
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
				var query="select*from t_pedidos_detalle";
				tx.executeSql(query,[],function(tx,results){
					Guardar_Detalle.reset();
					var len=results.rows.length;
					console.log('Cantidad de columnas encontradas en el select All ' + len)
					for (var i = 0; i<len; i++) {
						var Llenar_Detalle=new directory.models.t_pedidos_detalle({
							rowid:results.rows.item(i).rowid,
							rowid_pedido:results.rows.item(i).rowid_pedido,
							rowid_bodega:results.rows.item(i).rowid_bodega,
							rowid_item:results.rows.item(i).rowid_item,
							linea_descripcion:results.rows.item(i).linea_descripcion,
							id_unidad:results.rows.item(i).id_unidad,
							cantidad:results.rows.item(i).cantidad,
							factor:results.rows.item(i).factor,
							cantidad_base:results.rows.item(i).cantidad_base,
							precio_unitario:results.rows.item(i).precio_unitario,
							id_motivo:results.rows.item(i).id_motivo,
							stock:results.rows.item(i).stock,
							valor_base:results.rows.item(i).valor_base,
							valor_impuesto:results.rows.item(i).valor_impuesto,
							porcen_descuento:results.rows.item(i).porcen_descuento,
							valor_porcen_descuento:results.rows.item(i).valor_porcen_descuento,
							valor_descuento:results.rows.item(i).valor_descuento,
							valor_total_linea:results.rows.item(i).valor_total_linea,
							fechacreacion:results.rows.item(i).fechacreacion,
							usuariocreacion:results.rows.item(i).usuariocreacion,
							fechamod:results.rows.item(i).fechamod,
							usuariomod:results.rows.item(i).usuariomod,
							rowid_item_ext:results.rows.item(i).rowid_item_ext,
							item_ext1:results.rows.item(i).item_ext1,
							item_ext2:results.rows.item(i).item_ext2,
							num_lote:results.rows.item(i).num_lote,
							fecha_anulacion:results.rows.item(i).fecha_anulacion,
							usuario_anulacion:results.rows.item(i).usuario_anulacion
						})
						Guardar_Detalle.add(Llenar_Detalle);
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
				var query="select*from t_pedidos_detalle where rowid="+id+""
				tx.executeSql(query,[],function(tx,results){

				})
			},
			function(tx,error){
				alert('Error al consultar por id: '+ id);
			}
		)
	},
	Delete:function(id,callback){
		db.transaction(
			function(tx){
				var query="delete from  t_pedidos_detalle where rowid="+id+"";
				tx.executeSql(query)
			},
			function(tx,error){
				alert('Error eliminar por la  id: '+ id);
			}
		)
	},

	UpdateT_Pedidos:function(t_pedidos_detalle){
		db.transaction(
			function(tx){
				var query="update t_pedidos_detalle set rowid_pedido="+t_pedidos_detalle.attributes.rowid_pedido+
				", rowid_bodega="+t_pedidos_detalle.attributes.rowid_bodega+
				",rowid_item="+t_pedidos_detalle.attributes.rowid_item+
				",linea_descripcion='"+t_pedidos_detalle.attributes.linea_descripcion+
				"',id_unidad='"+t_pedidos_detalle.attributes.id_unidad+
				"',cantidad="+t_pedidos_detalle.attributes.cantidad+
				",factor="+t_pedidos_detalle.attributes.factor+
				",cantidad_base="+t_pedidos_detalle.attributes.cantidad_base+
				",precio_unitario="+t_pedidos_detalle.attributes.precio_unitario+
				",id_motivo='"+t_pedidos_detalle.attributes.id_motivo+
				"',stock="+t_pedidos_detalle.attributes.stock+
				",valor_base="+t_pedidos_detalle.attributes.valor_base+
				",valor_impuesto="+t_pedidos_detalle.attributes.valor_impuesto+
				",porcen_descuento="+t_pedidos_detalle.attributes.porcen_descuento+
				",valor_porcen_descuento="+t_pedidos_detalle.attributes.valor_porcen_descuento+
				",valor_descuento="+t_pedidos_detalle.attributes.valor_descuento+
				",valor_total_linea="+t_pedidos_detalle.attributes.valor_total_linea+
				",fechacreacion='"+t_pedidos_detalle.attributes.fechacreacion+
				"',usuariocreacion='"+t_pedidos_detalle.attributes.usuariocreacion+
				"',fechamod='"+t_pedidos_detalle.attributes.fechamod+
				"',usuariomod='"+t_pedidos_detalle.attributes.usuariomod+
				"',rowid_item_ext="+t_pedidos_detalle.attributes.rowid_item_ext+
				",item_ext1='"+t_pedidos_detalle.attributes.item_ext1+
				"',item_ext2='"+t_pedidos_detalle.attributes.item_ext2+
				"',num_lote='"+t_pedidos_detalle.attributes.num_lote+
				"',fecha_anulacion='"+t_pedidos_detalle.attributes.fecha_anulacion+
				"',usuario_anulacion='"+t_pedidos_detalle.attributes.usuario_anulacion+
				"' where rowid="+t_pedidos_detalle.attributes.rowid+" ";
				console.log(query);
				tx.executeSql(query);
			},
			function(tx,error){
				alert('Error al realizar el update '+ error);
			}
		)
	}
});





directory.models.t_pedidos_detalle=Backbone.Model.extend({
	dao:directory.dao.t_pedidos_detalleDAO,
	initialize:function(){
	}
});


directory.models.t_pedidos_detalleCollection=Backbone.Collection.extend({
	dao: directory.dao.t_pedidos_detalleDAO,
	model:directory.models.t_pedidos_detalle,
	FindAll:function(){
		var t_pedidosDAO=new directory.dao.t_pedidos_detalleDAO(directory.db),
			self=this;
		t_pedidosDAO.FindAll(function(data){
			self.reset(data);
		});
	},
	FindByID:function(key){
		var t_pedidosDAO=new directory.dao.t_pedidos_detalleDAO(directory.db),
			self=this;
		t_pedidosDAO.FindAll(key,function(data){
			self.reset(data);
		});
	},
	Delete:function(key){
		var t_pedidosDAO=new directory.dao.t_pedidos_detalleDAO(directory.db),
			self=this;
		t_pedidosDAO.Delete(key,function(data){
			self.reset(data);
		});
	},

	SaveT_Pedidos:function(Pedido){
		var t_pedidosDAO=new directory.dao.t_pedidos_detalleDAO(directory.db),
		self=this;
		t_pedidosDAO.Savet_pedidos_detalle(Pedido);
	},
	UpdateT_Pedidos:function(Pedido){
		var t_pedidosDAO=new directory.dao.t_pedidos_detalleDAO(directory.db),
		self=this;
		t_pedidosDAO.UpdateT_Pedidos(Pedido);
	}
});



var Guardar_Detalle=new directory.models.t_pedidos_detalleCollection();

directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.t_pedidos_detalle,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_Detalle.FindAll();	
	}
})

var Listar=new directory.models.EjecutarColection();


directory.models.View_t_pedidos_detalle=Backbone.View.extend({
	model:new directory.models.t_pedidos_detalle(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.detalle-list-template').html())
	},
	events:{
		'click .edit-detalle': 'edit',
		'click .update-detalle': 'update',
		'click .cancel': 'cancel',
		'click .delete-detalle':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-detalle').hide();
		$('.delete-detalle').hide();
		this.$('.update-detalle').show();
		this.$('.cancel').show();
		
		var rowid=this.$('.rowid').html();
		var rowid_pedido=this.$('.rowid_pedido').html();
		var rowid_bodega=this.$('.rowid_bodega').html();
		var rowid_item=this.$('.rowid_item').html();
		var linea_descripcion=this.$('.linea_descripcion').html();
		var id_unidad=this.$('.id_unidad').html();
		var cantidad=this.$('.cantidad').html();
		var factor=this.$('.factor').html();
		var cantidad_base=this.$('.cantidad_base').html();
		var precio_unitario=this.$('.precio_unitario').html();
		var id_motivo=this.$('.id_motivo').html();
		var stock=this.$('.stock').html();
		var valor_base=this.$('.valor_base').html();
		var valor_impuesto=this.$('.valor_impuesto').html();
		var porcen_descuento=this.$('.porcen_descuento').html();
		var valor_porcen_descuento=this.$('.valor_porcen_descuento').html();
		var valor_descuento=this.$('.valor_descuento').html();
		var valor_total_linea=this.$('.valor_total_linea').html();
		var fechacreacion=this.$('.fechacreacion').html();
		var usuariocreacion=this.$('.usuariocreacion').html();
		var fechamod=this.$('.fechamod').html();
		var usuariomod=this.$('.usuariomod').html();
		var rowid_item_ext=this.$('.rowid_item_ext').html();
		var item_ext1=this.$('.item_ext1').html();
		var item_ext2=this.$('.item_ext2').html();
		var num_lote=this.$('.num_lote').html();
		var fecha_anulacion=this.$('.fecha_anulacion').html();
		var usuario_anulacion=this.$('.usuario_anulacion').html();
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.rowid_pedido').html('<input type="text" class="form-control rowid_pedido-update" value="' + rowid_pedido + '">');
		this.$('.rowid_bodega').html('<input type="text" class="form-control rowid_bodega-update" value="' + rowid_bodega + '">');
		this.$('.rowid_item').html('<input type="text" class="form-control rowid_item-update" value="' + rowid_item + '">');
		this.$('.linea_descripcion').html('<input type="text" class="form-control linea_descripcion-update" value="' + linea_descripcion + '">');
		this.$('.id_unidad').html('<input type="text" class="form-control id_unidad-update" value="' + id_unidad + '">');
		this.$('.cantidad').html('<input type="text" class="form-control cantidad-update" value="' + cantidad + '">');
		this.$('.factor').html('<input type="text" class="form-control factor-update" value="' + factor + '">');
		this.$('.cantidad_base').html('<input type="text" class="form-control cantidad_base-update" value="' + cantidad_base + '">');
		this.$('.precio_unitario').html('<input type="text" class="form-control precio_unitario-update" value="' + precio_unitario + '">');
		this.$('.id_motivo').html('<input type="text" class="form-control id_motivo-update" value="' + id_motivo + '">');
		this.$('.stock').html('<input type="text" class="form-control stock-update" value="' + stock + '">');
		this.$('.valor_base').html('<input type="text" class="form-control valor_base-update" value="' + valor_base + '">');
		this.$('.valor_impuesto').html('<input type="text" class="form-control valor_impuesto-update" value="' + valor_impuesto + '">');
		this.$('.porcen_descuento').html('<input type="text" class="form-control porcen_descuento-update" value="' + porcen_descuento + '">');
		this.$('.valor_porcen_descuento').html('<input type="text" class="form-control valor_porcen_descuento-update" value="' + valor_porcen_descuento + '">');
		this.$('.valor_descuento').html('<input type="text" class="form-control valor_descuento-update" value="' + valor_descuento + '">');
		this.$('.valor_total_linea').html('<input type="text" class="form-control valor_total_linea-update" value="' + valor_total_linea + '">');
		this.$('.fechacreacion').html('<input type="text" class="form-control fechacreacion-update" value="' + fechacreacion + '">');
		this.$('.usuariocreacion').html('<input type="text" class="form-control usuariocreacion-update" value="' + usuariocreacion + '">');
		this.$('.fechamod').html('<input type="text" class="form-control fechamod-update" value="' + fechamod + '">');
		this.$('.usuariomod').html('<input type="text" class="form-control usuariomod-update" value="' + usuariomod + '">');
		this.$('.rowid_item_ext').html('<input type="text" class="form-control rowid_item_ext-update" value="' + rowid_item_ext + '">');
		this.$('.item_ext1').html('<input type="text" class="form-control item_ext1-update" value="' + item_ext1 + '">');
		this.$('.item_ext2').html('<input type="text" class="form-control item_ext2-update" value="' + item_ext2 + '">');
		this.$('.num_lote').html('<input type="text" class="form-control num_lote-update" value="' + num_lote + '">');
		this.$('.fecha_anulacion').html('<input type="text" class="form-control fecha_anulacion-update" value="' + fecha_anulacion + '">');
		this.$('.usuario_anulacion').html('<input type="text" class="form-control usuario_anulacion-update" value="' + usuario_anulacion + '">');

		
	},
	update: function() {

		var ModificarPedido=new directory.models.t_pedidos_detalle({
			rowid:$('.rowid-update').val(),
			rowid_pedido:$('.rowid_pedido-update').val(),
			rowid_bodega:$('.rowid_bodega-update').val(),
			rowid_item:$('.rowid_item-update').val(),
			linea_descripcion:$('.linea_descripcion-update').val(),
			id_unidad:$('.id_unidad-update').val(),
			cantidad:$('.cantidad-update').val(),
			factor:$('.factor-update').val(),
			cantidad_base:$('.cantidad_base-update').val(),
			precio_unitario:$('.precio_unitario-update').val(),
			id_motivo:$('.id_motivo-update').val(),
			stock:$('.stock-update').val(),
			valor_base:$('.valor_base-update').val(),
			valor_impuesto:$('.valor_impuesto-update').val(),
			porcen_descuento:$('.porcen_descuento-update').val(),
			valor_porcen_descuento:$('.valor_porcen_descuento-update').val(),
			valor_descuento:$('.valor_descuento-update').val(),
			valor_total_linea:$('.valor_total_linea-update').val(),
			fechacreacion:$('.fechacreacion-update').val(),
			usuariocreacion:$('.usuariocreacion-update').val(),
			fechamod:$('.fechamod-update').val(),
			usuariomod:$('.usuariomod-update').val(),
			rowid_item_ext:$('.rowid_item_ext-update').val(),
			item_ext1:$('.item_ext1-update').val(),
			item_ext2:$('.item_ext2-update').val(),
			num_lote:$('.num_lote-update').val(),
			fecha_anulacion:$('.fecha_anulacion-update').val(),
			usuario_anulacion:$('.usuario_anulacion-update').val()
		})
		Guardar_Detalle.UpdateT_Pedidos(ModificarPedido);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllDetalle();
	},
	cancel: function() {

		var Listar=new directory.models.AllDetalle();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_Detalle.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllDetalle();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllDetalle = Backbone.View.extend({
	model:Guardar_Detalle,
	el: $('.detalle-list'),
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
		_.each(this.model.toArray(), function(pedidos) {
			self.$el.append((new directory.models.View_t_pedidos_detalle({model: pedidos})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllDetalle();






$(document).ready(function() {
	$('.guardar').on('click', function() {
		var t_pedidos_detalle=new directory.models.t_pedidos_detalleCollection();
		t_pedidos_detalle.SaveT_Pedidos({
			rowid_pedido:$('#rowid_pedido').val(),
			rowid_bodega:$('#rowid_bodega').val(),
			rowid_item:$('#rowid_item').val(),
			linea_descripcion:$('#linea_descripcion').val(),
			id_unidad:$('#id_unidad').val(),
			cantidad:$('#cantidad').val(),
			factor:$('#factor').val(),
			cantidad_base:$('#cantidad_base').val(),
			precio_unitario:$('#precio_unitario').val(),
			id_motivo:$('#id_motivo').val(),
			stock:$('#stock').val(),
			valor_base:$('#valor_base').val(),
			valor_impuesto:$('#valor_impuesto').val(),
			porcen_descuento:$('#porcen_descuento').val(),
			valor_porcen_descuento:$('#valor_porcen_descuento').val(),
			valor_descuento:$('#valor_descuento').val(),
			valor_total_linea:$('#valor_total_linea').val(),
			fechacreacion:$('#fechacreacion').val(),
			usuariocreacion:$('#usuariocreacion').val(),
			fechamod:$('#fechamod').val(),
			usuariomod:$('#usuariomod').val(),
			rowid_item_ext:$('#rowid_item_ext').val(),
			item_ext1:$('#item_ext1').val(),
			item_ext2:$('#item_ext2').val(),
			num_lote:$('#num_lote').val(),
			fecha_anulacion:$('#fecha_anulacion').val(),
			usuario_anulacion:$('#usuario_anulacion').val()
		});
		
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllDetalle();

	});
})




directory.Router = Backbone.Router.extend({

    routes: {
    },

    initialize: function() {
    },


});
