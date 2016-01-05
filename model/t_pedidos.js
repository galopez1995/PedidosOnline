"use strict";

var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}

directory.dao.t_pedidosDAO=function(db){
	this.db=db;
};

_.extend(directory.dao.t_pedidosDAO.prototype,{
	SaveT_Pedidos:function(pedido){
		db.transaction(
			function(tx){
				var query="insert into t_pedidos values (null,"
					+pedido.rowid_empresa+","
					+pedido.id_cia+","
					+pedido.rowid_cliente_facturacion+","
					+pedido.rowid_cliente_despacho+","
					+pedido.rowid_lista_precios+","
					+pedido.rowid_bodega+",'"
					+pedido.fecha_pedido+"','"
					+pedido.fecha_entrega+"','"
					+pedido.fecha_solicitud+"','"
					+pedido.id_punto_envio+"','"
					+pedido.observaciones+"','"
					+pedido.observaciones2+"','"
					+pedido.orden_compra+"','"
					+pedido.referencia+"',"
					+pedido.valor_base+","
					+pedido.valor_descuento+","
					+pedido.valor_impuesto+","
					+pedido.valor_total+","
					+pedido.id_estado+",'"
					+pedido.numpedido_erp+"','"
					+pedido.numfactura_erp+"','"
					+pedido.estado_erp+"',"
					+pedido.valor_facturado+",'"
					+pedido.id_cond_especial+"','"
					+pedido.fechacreacion+"','"
					+pedido.usuariocreacion+"','"
					+pedido.fechamod+"','"
					+pedido.usuariomod+"','"
					+pedido.tipo_doc+"','"
					+pedido.id_vendedor+"','"
					+pedido.id_cond_pago+"','"
					+pedido.numremision_erp+"','"
					+pedido.id_co+"','"
					+pedido.transporte_conductor_cc+"','"
					+pedido.transporte_conductor_nombre+"','"
					+pedido.transporte_placa+"','"
					+pedido.fecha_anulacion+"','"
					+pedido.usuario_anulacion+"',"
					+pedido.id_nota+",'"
					+pedido.criterio_clasificacion+"')";
				console.log(query);
				tx.executeSql(query)

			},
			function(tx,error){
				alert('Error al insertar ' +error );
			}
		)
	},
	FindAll:function(callback){
		db.transaction(
			function(tx){
				var query="SELECT*FROM t_pedidos";
				tx.executeSql(query,[],function(tx,results){
					Guardar_t_pedidos.reset();
					var len=results.rows.length;
					console.log(len)
					for (var i = 0; i<len; i++) {
						var LlenarModelo=new directory.models.t_pedidos({
							rowid:results.rows.item(i).rowid,
							rowid_empresa:results.rows.item(i).rowid_empresa,
							id_cia:results.rows.item(i).id_cia,
							rowid_cliente_facturacion:results.rows.item(i).rowid_cliente_facturacion,
							rowid_cliente_despacho:results.rows.item(i).rowid_cliente_despacho,
							rowid_lista_precios:results.rows.item(i).rowid_lista_precios,
							rowid_bodega:results.rows.item(i).rowid_bodega,
							fecha_pedido:results.rows.item(i).fecha_pedido,
							fecha_entrega:results.rows.item(i).fecha_entrega,
							fecha_solicitud:results.rows.item(i).fecha_solicitud,
							id_punto_envio:results.rows.item(i).id_punto_envio,
							observaciones:results.rows.item(i).observaciones,
							observaciones2:results.rows.item(i).observaciones2,
							orden_compra:results.rows.item(i).orden_compra,
							referencia:results.rows.item(i).referencia,
							valor_base:results.rows.item(i).valor_base,
							valor_descuento:results.rows.item(i).valor_descuento,
							valor_impuesto:results.rows.item(i).valor_impuesto,
							valor_total:results.rows.item(i).valor_total,
							id_estado:results.rows.item(i).id_estado,
							numpedido_erp:results.rows.item(i).numpedido_erp,
							numfactura_erp:results.rows.item(i).numfactura_erp,
							estado_erp:results.rows.item(i).estado_erp,
							valor_facturado:results.rows.item(i).valor_facturado,
							id_cond_especial:results.rows.item(i).id_cond_especial,
							fechacreacion:results.rows.item(i).fechacreacion,
							usuariocreacion:results.rows.item(i).usuariocreacion,
							fechamod:results.rows.item(i).fechamod,
							usuariomod:results.rows.item(i).usuariomod,
							tipo_doc:results.rows.item(i).tipo_doc,
							id_vendedor:results.rows.item(i).id_vendedor,
							id_cond_pago:results.rows.item(i).id_cond_pago,
							numremision_erp:results.rows.item(i).numremision_erp,
							id_co:results.rows.item(i).id_co,
							transporte_conductor_cc:results.rows.item(i).transporte_conductor_cc,
							transporte_conductor_nombre:results.rows.item(i).transporte_conductor_nombre,
							transporte_placa:results.rows.item(i).transporte_placa,
							fecha_anulacion:results.rows.item(i).fecha_anulacion,
							usuario_anulacion:results.rows.item(i).usuario_anulacion,
							id_nota:results.rows.item(i).id_nota,
							criterio_clasificacion:results.rows.item(i).criterio_clasificacion
						})
						Guardar_t_pedidos.add(LlenarModelo)

					};
				});
			},

			function(tx,error){
				alert('Error en sentencia ' +error);
			}
		)
	},
	

	UpdateT_Pedidos:function(pedido){
		debugger;
		db.transaction(
			function(tx){
				var query="update t_pedidos set rowid_empresa="+
				pedido.attributes.rowid_empresa+",id_cia="+
				pedido.attributes.id_cia+",rowid_cliente_facturacion="+
				pedido.attributes.rowid_cliente_facturacion+",rowid_cliente_despacho="+
				pedido.attributes.rowid_cliente_despacho+",rowid_lista_precios="+
				pedido.attributes.rowid_lista_precios+",rowid_bodega="+
				pedido.attributes.rowid_bodega+",fecha_pedido='"+
				pedido.attributes.fecha_pedido+"',fecha_entrega='"+
				pedido.attributes.fecha_entrega+"',fecha_solicitud='"+
				pedido.attributes.fecha_solicitud+"',id_punto_envio='"+
				pedido.attributes.id_punto_envio+"',observaciones='"+
				pedido.attributes.observaciones+"',observaciones2='"+
				pedido.attributes.observaciones2+"',orden_compra='"+
				pedido.attributes.orden_compra+"',referencia='"+
				pedido.attributes.referencia+"',valor_base="+
				pedido.attributes.valor_base+",valor_descuento="+
				pedido.attributes.valor_descuento+",valor_impuesto="+
				pedido.attributes.valor_impuesto+",valor_total="+
				pedido.attributes.valor_total+",id_estado="+
				pedido.attributes.id_estado+",numpedido_erp='"+
				pedido.attributes.numpedido_erp+"',numfactura_erp='"+
				pedido.attributes.numfactura_erp+"',estado_erp='"+
				pedido.attributes.estado_erp+"',valor_facturado="+
				pedido.attributes.valor_facturado+",id_cond_especial='"+
				pedido.attributes.id_cond_especial+"',fechacreacion='"+
				pedido.attributes.fechacreacion+"',usuariocreacion='"+
				pedido.attributes.usuariocreacion+"',fechamod='"+
				pedido.attributes.fechamod+"',usuariomod='"+
				pedido.attributes.usuariomod+"',tipo_doc='"+
				pedido.attributes.tipo_doc+"',id_vendedor='"+
				pedido.attributes.id_vendedor+"',id_cond_pago='"+
				pedido.attributes.id_cond_pago+"',numremision_erp='"+
				pedido.attributes.numremision_erp+"',id_co='"+
				pedido.attributes.id_co+"',transporte_conductor_cc='"+
				pedido.attributes.transporte_conductor_cc+"',transporte_conductor_nombre='"+
				pedido.attributes.transporte_conductor_nombre+"',transporte_placa='"+
				pedido.attributes.transporte_placa+"',fecha_anulacion='"+
				pedido.attributes.fecha_anulacion+"',usuario_anulacion='"+
				pedido.attributes.usuario_anulacion+"',id_nota="+
				pedido.attributes.id_nota+",criterio_clasificacion='"+
				pedido.attributes.criterio_clasificacion+"' where  rowid="+pedido.attributes.rowid+"";
				console.log(query)
				tx.executeSql(query);
			},
			function(tx,error){
				alert('Error al hacer el update '+error);
			}
		)
	},
	FindByID:function(key,callback){
		db.transaction(
			function(tx){
				var query="select*from t_pedidos where rowid="+key+"";
				tx.executeSql(query,[],function(tx,results){
					
				});
			},
			function(tx,error){
				alert('Error al consultar ' + error);
			}
		);
	},
	Delete:function(key){
		db.transaction(
			function(tx){
				var query="delete from t_pedidos where rowid="+key+"";
				tx.executeSql(query);
			},
			function(tx,error){
				alert('Error al eliminar ' + error);
			}
		);
	}

})




Backbone.sync=function(method,model,options){
	var dao=new model.dao(directory.db);
	if (method==="read") {
		if (model.id) {
			dao.FindByID(model.rowid,function(data){
				options.success(data);
			})
		}else {
			dao.FindAll(function(data){
				options.success(data);
			});
		}
	};
}




//---------------MODELO t_pedidos----------------------------------//

directory.models.t_pedidos=Backbone.Model.extend({
	dao:directory.dao.t_pedidosDAO,
	initialize:function(){
	}
});


directory.models.t_pedidosCollection=Backbone.Collection.extend({
	dao: directory.dao.t_pedidosDAO,
	model:directory.models.t_pedidos,
	FindAll:function(){
		var t_pedidosDAO=new directory.dao.t_pedidosDAO(directory.db),
			self=this;
		t_pedidosDAO.FindAll(function(data){
			self.reset(data);
		});
	},
	FindByID:function(key){
		var t_pedidosDAO=new directory.dao.t_pedidosDAO(directory.db),
			self=this;
		t_pedidosDAO.FindAll(key,function(data){
			self.reset(data);
		});
	},

	SaveT_Pedidos:function(Pedido){
		var t_pedidosDAO=new directory.dao.t_pedidosDAO(directory.db),
		self=this;
		t_pedidosDAO.SaveT_Pedidos(Pedido);
	},
	UpdateT_Pedidos:function(Pedido){
		var t_pedidosDAO=new directory.dao.t_pedidosDAO(directory.db),
		self=this;
		t_pedidosDAO.UpdateT_Pedidos(Pedido);
	},
	Delete:function(key){
		var t_pedidosDAO=new directory.dao.t_pedidosDAO(directory.db),
		self=this;
		t_pedidosDAO.Delete(key);
	}
});




var Guardar_t_pedidos=new directory.models.t_pedidosCollection();

directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.erp_terceros,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_t_pedidos.FindAll();	
	}
})

var loadCollection=new directory.models.EjecutarColection();

directory.models.View_t_pedidos=Backbone.View.extend({
	model:new directory.models.t_pedidos(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.pedidos-list-template').html())
	},
	events:{
		'click .edit-pedido': 'edit',
		'click .update-pedido': 'update',
		'click .cancel': 'cancel',
		'click .delete-pedido':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-pedido').hide();
		$('.delete-pedido').hide();
		this.$('.update-pedido').show();
		this.$('.cancel').show();
		
		var rowid=this.$('.rowid').html();
		var rowid_empresa=this.$('.rowid_empresa').html();
		var id_cia=this.$('.id_cia').html();
		var rowid_cliente_facturacion=this.$('.rowid_cliente_facturacion').html();
		var rowid_cliente_despacho=this.$('.rowid_cliente_despacho').html();
		var rowid_lista_precios=this.$('.rowid_lista_precios').html();
		var rowid_bodega=this.$('.rowid_bodega').html();
		var fecha_pedido=this.$('.fecha_pedido').html();
		var fecha_entrega=this.$('.fecha_entrega').html();
		var fecha_solicitud=this.$('.fecha_solicitud').html();
		var id_punto_envio=this.$('.id_punto_envio').html();
		var observaciones=this.$('.observaciones').html();
		var observaciones2=this.$('.observaciones2').html();
		var orden_compra=this.$('.orden_compra').html();
		var referencia=this.$('.referencia').html();
		var valor_base=this.$('.valor_base').html();
		var valor_descuento=this.$('.valor_descuento').html();
		var valor_impuesto=this.$('.valor_impuesto').html();
		var valor_total=this.$('.valor_total').html();
		var id_estado=this.$('.id_estado').html();
		var numpedido_erp=this.$('.numpedido_erp').html();
		var numfactura_erp=this.$('.numfactura_erp').html();
		var estado_erp=this.$('.estado_erp').html();
		var valor_facturado=this.$('.valor_facturado').html();
		var id_cond_especial=this.$('.id_cond_especial').html();
		var fechacreacion=this.$('.fechacreacion').html();
		var usuariocreacion=this.$('.usuariocreacion').html();
		var fechamod=this.$('.fechamod').html();
		var usuariomod=this.$('.usuariomod').html();
		var tipo_doc=this.$('.tipo_doc').html();
		var id_vendedor=this.$('.id_vendedor').html();
		var id_cond_pago=this.$('.id_cond_pago').html();
		var numremision_erp=this.$('.numremision_erp').html();
		var id_co=this.$('.id_co').html();
		var transporte_conductor_cc=this.$('.transporte_conductor_cc').html();
		var transporte_conductor_nombre=this.$('.transporte_conductor_nombre').html();
		var transporte_placa=this.$('.transporte_placa').html();
		var fecha_anulacion=this.$('.fecha_anulacion').html();
		var usuario_anulacion=this.$('.usuario_anulacion').html();
		var id_nota=this.$('.id_nota').html();
		var criterio_clasificacion=this.$('.criterio_clasificacion').html();
		
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.rowid_empresa').html('<input type="text" class="form-control rowid_empresa-update" value="' + rowid_empresa + '">');
		this.$('.id_cia').html('<input type="text" class="form-control id_cia-update" value="' + id_cia + '">');
		this.$('.rowid_cliente_facturacion').html('<input type="text" class="form-control rowid_cliente_facturacion-update" value="' + rowid_cliente_facturacion + '">');
		this.$('.rowid_cliente_despacho').html('<input type="text" class="form-control rowid_cliente_despacho-update" value="' + rowid_cliente_despacho + '">');
		this.$('.rowid_lista_precios').html('<input type="text" class="form-control rowid_lista_precios-update" value="' + rowid_lista_precios + '">');
		this.$('.rowid_bodega').html('<input type="text" class="form-control rowid_bodega-update" value="' + rowid_bodega + '">');
		this.$('.fecha_pedido').html('<input type="text" class="form-control fecha_pedido-update" value="' + fecha_pedido + '">');
		this.$('.fecha_entrega').html('<input type="text" class="form-control fecha_entrega-update" value="' + fecha_entrega + '">');
		this.$('.fecha_solicitud').html('<input type="text" class="form-control fecha_solicitud-update" value="' + fecha_solicitud + '">');
		this.$('.id_punto_envio').html('<input type="text" class="form-control id_punto_envio-update" value="' + id_punto_envio + '">');
		this.$('.observaciones').html('<input type="text" class="form-control observaciones-update" value="' + observaciones + '">');
		this.$('.observaciones2').html('<input type="text" class="form-control observaciones2-update" value="' + observaciones2 + '">');
		this.$('.orden_compra').html('<input type="text" class="form-control orden_compra-update" value="' + orden_compra + '">');
		this.$('.referencia').html('<input type="text" class="form-control referencia-update" value="' + referencia + '">');
		this.$('.valor_base').html('<input type="text" class="form-control valor_base-update" value="' + valor_base + '">');
		this.$('.valor_descuento').html('<input type="text" class="form-control valor_descuento-update" value="' + valor_descuento + '">');
		this.$('.valor_impuesto').html('<input type="text" class="form-control valor_impuesto-update" value="' + valor_impuesto + '">');
		this.$('.valor_total').html('<input type="text" class="form-control valor_total-update" value="' + valor_total + '">');
		this.$('.id_estado').html('<input type="text" class="form-control id_estado-update" value="' + id_estado + '">');
		this.$('.numpedido_erp').html('<input type="text" class="form-control numpedido_erp-update" value="' + numpedido_erp + '">');
		this.$('.numfactura_erp').html('<input type="text" class="form-control numfactura_erp-update" value="' + numfactura_erp + '">');
		this.$('.estado_erp').html('<input type="text" class="form-control estado_erp-update" value="' + estado_erp + '">');
		this.$('.valor_facturado').html('<input type="text" class="form-control valor_facturado-update" value="' + valor_facturado + '">');
		this.$('.id_cond_especial').html('<input type="text" class="form-control id_cond_especial-update" value="' + id_cond_especial + '">');
		this.$('.fechacreacion').html('<input type="text" class="form-control fechacreacion-update" value="' + fechacreacion + '">');
		this.$('.usuariocreacion').html('<input type="text" class="form-control usuariocreacion-update" value="' + usuariocreacion + '">');
		this.$('.fechamod').html('<input type="text" class="form-control fechamod-update" value="' + fechamod + '">');
		this.$('.usuariomod').html('<input type="text" class="form-control usuariomod-update" value="' + usuariomod + '">');
		this.$('.tipo_doc').html('<input type="text" class="form-control tipo_doc-update" value="' + tipo_doc + '">');
		this.$('.id_vendedor').html('<input type="text" class="form-control id_vendedor-update" value="' + id_vendedor + '">');
		this.$('.id_cond_pago').html('<input type="text" class="form-control id_cond_pago-update" value="' + id_cond_pago + '">');
		this.$('.numremision_erp').html('<input type="text" class="form-control numremision_erp-update" value="' + numremision_erp + '">');
		this.$('.id_co').html('<input type="text" class="form-control id_co-update" value="' + id_co + '">');
		this.$('.transporte_conductor_cc').html('<input type="text" class="form-control transporte_conductor_cc-update" value="' + transporte_conductor_cc + '">');
		this.$('.transporte_conductor_nombre').html('<input type="text" class="form-control transporte_conductor_nombre-update" value="' + transporte_conductor_nombre + '">');
		this.$('.transporte_placa').html('<input type="text" class="form-control transporte_placa-update" value="' + transporte_placa + '">');
		this.$('.fecha_anulacion').html('<input type="text" class="form-control fecha_anulacion-update" value="' + fecha_anulacion + '">');
		this.$('.usuario_anulacion').html('<input type="text" class="form-control usuario_anulacion-update" value="' + usuario_anulacion + '">');
		this.$('.id_nota').html('<input type="text" class="form-control id_nota-update" value="' + id_nota + '">');
		this.$('.criterio_clasificacion').html('<input type="text" class="form-control criterio_clasificacion-update" value="' + criterio_clasificacion + '">');

	},
	update: function() {

		var ModificarPedido=new directory.models.t_pedidos({
			rowid:$('.rowid-update').val(),
			rowid_empresa:$('.rowid_empresa-update').val(),
			id_cia:$('.id_cia-update').val(),
			rowid_cliente_facturacion:$('.rowid_cliente_facturacion-update').val(),
			rowid_cliente_despacho:$('.rowid_cliente_despacho-update').val(),
			rowid_lista_precios:$('.rowid_lista_precios-update').val(),
			rowid_bodega:$('.rowid_bodega-update').val(),
			fecha_pedido:$('.fecha_pedido-update').val(),
			fecha_entrega:$('.fecha_entrega-update').val(),
			fecha_solicitud:$('.fecha_solicitud-update').val(),
			id_punto_envio:$('.id_punto_envio-update').val(),
			observaciones:$('.observaciones-update').val(),
			observaciones2:$('.observaciones2-update').val(),
			orden_compra:$('.orden_compra-update').val(),
			referencia:$('.referencia-update').val(),
			valor_base:$('.valor_base-update').val(),
			valor_descuento:$('.valor_descuento-update').val(),
			valor_impuesto:$('.valor_impuesto-update').val(),
			valor_total:$('.valor_total-update').val(),
			id_estado:$('.id_estado-update').val(),
			numpedido_erp:$('.numpedido_erp-update').val(),
			numfactura_erp:$('.numfactura_erp-update').val(),
			estado_erp:$('.estado_erp-update').val(),
			valor_facturado:$('.valor_facturado-update').val(),
			id_cond_especial:$('.id_cond_especial-update').val(),
			fechacreacion:$('.fechacreacion-update').val(),
			usuariocreacion:$('.usuariocreacion-update').val(),
			fechamod:$('.fechamod-update').val(),
			usuariomod:$('.usuariomod-update').val(),
			tipo_doc:$('.tipo_doc-update').val(),
			id_vendedor:$('.id_vendedor-update').val(),
			id_cond_pago:$('.id_cond_pago-update').val(),
			numremision_erp:$('.numremision_erp-update').val(),
			id_co:$('.id_co-update').val(),
			transporte_conductor_cc:$('.transporte_conductor_cc-update').val(),
			transporte_conductor_nombre:$('.transporte_conductor_nombre-update').val(),
			transporte_placa:$('.transporte_placa-update').val(),
			fecha_anulacion:$('.fecha_anulacion-update').val(),
			usuario_anulacion:$('.usuario_anulacion-update').val(),
			id_nota:$('.id_nota-update').val(),
			criterio_clasificacion:$('.criterio_clasificacion-update').val()
		})
		Guardar_t_pedidos.UpdateT_Pedidos(ModificarPedido);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllPedidos();
	},
	cancel: function() {

		var Listar=new directory.models.AllPedidos();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_t_pedidos.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllPedidos();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllPedidos = Backbone.View.extend({
	model:Guardar_t_pedidos,
	el: $('.pedidos-list'),
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
			self.$el.append((new directory.models.View_t_pedidos({model: pedidos})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllPedidos();





















$(document).ready(function() {
	$('.guardar').on('click', function() {
		var t_pedido=new directory.models.t_pedidosCollection();
		t_pedido.SaveT_Pedidos({
			rowid_empresa:$('#rowid_empresa').val(),
			id_cia:$('#id_cia').val(),
			rowid_cliente_facturacion:$('#rowid_cliente_facturacion').val(),
			rowid_cliente_despacho:$('#rowid_cliente_despacho').val(),
			rowid_lista_precios:$('#rowid_lista_precios').val(),
			rowid_bodega:$('#rowid_bodega').val(),
			fecha_pedido:$('#fecha_pedido').val(),
			fecha_entrega:$('#fecha_entrega').val(),
			fecha_solicitud:$('#fecha_solicitud').val(),
			id_punto_envio:$('#id_punto_envio').val(),
			observaciones:$('#observaciones').val(),
			observaciones2:$('#observaciones2').val(),
			orden_compra:$('#orden_compra').val(),
			referencia:$('#referencia').val(),
			valor_base:$('#valor_base').val(),
			valor_descuento:$('#valor_descuento').val(),
			valor_impuesto:$('#valor_impuesto').val(),
			valor_total:$('#valor_total').val(),
			id_estado:$('#id_estado').val(),
			numpedido_erp:$('#numpedido_erp').val(),
			numfactura_erp:$('#numfactura_erp').val(),
			estado_erp:$('#estado_erp').val(),
			valor_facturado:$('#valor_facturado').val(),
			id_cond_especial:$('#id_cond_especial').val(),
			fechacreacion:$('#fechacreacion').val(),
			usuariocreacion:$('#usuariocreacion').val(),
			fechamod:$('#fechamod').val(),
			usuariomod:$('#usuariomod').val(),
			tipo_doc:$('#tipo_doc').val(),
			id_vendedor:$('#id_vendedor').val(),
			id_cond_pago:$('#id_cond_pago').val(),
			numremision_erp:$('#numremision_erp').val(),
			id_co:$('#id_co').val(),
			transporte_conductor_cc:$('#transporte_conductor_cc').val(),
			transporte_conductor_nombre:$('#transporte_conductor_nombre').val(),
			transporte_placa:$('#transporte_placa').val(),
			fecha_anulacion:$('#fecha_anulacion').val(),
			usuario_anulacion:$('#usuario_anulacion').val(),
			id_nota:$('#id_nota').val(),
			criterio_clasificacion:$('#criterio_clasificacion').val()
		});
		alert('INSERTADO CON EXITO');
		$('#rowid_empresa').val(''),
		$('#id_cia').val(''),
			$('#rowid_cliente_facturacion').val(''),
			$('#rowid_cliente_despacho').val(''),
			$('#rowid_lista_precios').val(''),
			$('#rowid_bodega').val(''),
			$('#fecha_pedido').val(''),
			$('#fecha_entrega').val(''),
			$('#fecha_solicitud').val(''),
			$('#id_punto_envio').val(''),
			$('#observaciones').val(''),
			$('#observaciones2').val(''),
			$('#orden_compra').val(''),
			$('#referencia').val(''),
			$('#valor_base').val(''),
			$('#valor_descuento').val(''),
			$('#valor_impuesto').val(''),
			$('#valor_total').val(''),
			$('#id_estado').val(''),
			$('#numpedido_erp').val(''),
			$('#numfactura_erp').val(''),
			$('#estado_erp').val(''),
			$('#valor_facturado').val(''),
			$('#id_cond_especial').val(''),
			$('#fechacreacion').val(''),
			$('#usuariocreacion').val(''),
			$('#fechamod').val(''),
			$('#usuariomod').val(''),
			$('#tipo_doc').val(''),
			$('#id_vendedor').val(''),
			$('#id_cond_pago').val(''),
			$('#numremision_erp').val(''),
			$('#id_co').val(''),
			$('#transporte_conductor_cc').val(''),
			$('#transporte_conductor_nombre').val(''),
			$('#transporte_placa').val(''),
			$('#fecha_anulacion').val(''),
			$('#usuario_anulacion').val(''),
			$('#id_nota').val(''),
			$('#criterio_clasificacion').val('')

	});
})




directory.Router = Backbone.Router.extend({

    routes: {
    },

    initialize: function() {
    },


});