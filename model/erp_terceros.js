"use strict";

var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}


directory.dao.erp_tercerosDAO = function(db) {
    this.db = db;
};

_.extend(directory.dao.erp_tercerosDAO.prototype,{
	SaveErpTerceros:function(Terceros){
		db.transaction(
			function(tx){
				var query="insert into erp_terceros values (null,"
					+Terceros.rowid_empresa+","
					+Terceros.id_cia+","
					+Terceros.rowid_interno+","
					+Terceros.identificacion+",'"
					+Terceros.tipo_identificacion+"','"
					+Terceros.razonsocial+"','"
					+Terceros.nombre_comercial+"','"
					+Terceros.codigo_erp+"','"
					+Terceros.ind_activo+"','"
					+Terceros.es_vendedor+"','"
					+Terceros.es_cliente+"','"
					+Terceros.es_proveedor+"','"
					+Terceros.fechacreacion+"','"
					+Terceros.usuariocreacion+"','"
					+Terceros.fechamod+"','"
					+Terceros.usuariomod+"','"
					+Terceros.id_impuesto+"')";
				
				tx.executeSql(query);
			},
			function(tx,error){
				alert('Error en insert ' +error);
			}
		)
	},
	FindAll:function(callback){
		db.transaction(
			function(tx){
				var query="SELECT*FROM erp_terceros";
				tx.executeSql(query,[],function(tx,results){
					Guardar_erp_terceros.reset();

					var len=results.rows.length;
					console.log(len);
					for (var i =0; i <len; i++) {
						var LlenarModelo=new directory.models.erp_terceros({
							rowid:results.rows.item(i).rowid,
							rowid_empresa:results.rows.item(i).rowid_empresa,
							id_cia:results.rows.item(i).id_cia,
							rowid_interno:results.rows.item(i).rowid_interno,
							identificacion:results.rows.item(i).identificacion,
							tipo_identificacion:results.rows.item(i).tipo_identificacion,
							razonsocial:results.rows.item(i).razonsocial,
							nombre_comercial:results.rows.item(i).nombre_comercial,
							codigo_erp:results.rows.item(i).codigo_erp,
							ind_activo:results.rows.item(i).ind_activo,
							es_vendedor:results.rows.item(i).es_vendedor,
							es_cliente:results.rows.item(i).es_cliente,
							es_proveedor:results.rows.item(i).es_proveedor,
							fechacreacion:results.rows.item(i).fechacreacion,
							usuariocreacion:results.rows.item(i).usuariocreacion,
							fechamod:results.rows.item(i).fechamod,
							usuariomod:results.rows.item(i).usuariomod,
							id_impuesto:results.rows.item(i).id_impuesto,

						})
						Guardar_erp_terceros.add(LlenarModelo);

					};
					
				});
			},

			function(tx,error){
				alert('Error en sentencia ' +error);
			}
		)
	},
	

	UpdateErp_terceros:function(terceros){
		db.transaction(
			function(tx){
				var query="update erp_terceros set rowid_empresa="
				+terceros.attributes.rowid_empresa+",id_cia="
				+terceros.attributes.id_cia+",rowid_interno="
				+terceros.attributes.rowid_interno+",identificacion="
				+terceros.attributes.identificacion+",tipo_identificacion='"
				+terceros.attributes.tipo_identificacion+"',razonsocial='"
				+terceros.attributes.razonsocial+"',nombre_comercial='"
				+terceros.attributes.nombre_comercial+"',codigo_erp='"
				+terceros.attributes.codigo_erp+"',ind_activo="
				+terceros.attributes.ind_activo+",es_vendedor='"
				+terceros.attributes.es_vendedor+"',es_cliente='"
				+terceros.attributes.es_cliente+"',es_proveedor='"
				+terceros.attributes.es_proveedor+"',fechacreacion='"+
				terceros.attributes.fechacreacion+"',usuariocreacion='"
				+terceros.attributes.usuariocreacion+"',fechamod='"
				+terceros.attributes.fechamod+"',usuariomod='"
				+terceros.attributes.usuariomod+"',id_impuesto="
				+terceros.attributes.id_impuesto+" where rowid="+terceros.attributes.rowid+" ";
				console.log(query);
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
				var query="select*from erp_terceros where rowid=?";
				tx.executeSql(query,['%' + key + '%'],function(tx,results){
					var len=results.rows.length,
						terceros=[],
						i=0;
					for (;i<len ;i++) {
							terceros[i]=results.rows.item(i);
					};
					callback(terceros);	
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
				var query="delete from  erp_terceros where rowid="+key+"";
				console.log(query);
				tx.executeSql(query);
			},
			function(tx,error){
				alert(error);
			}
		)
	}

})




//---------------MODELO erp_terceros----------------------------------//

directory.models.erp_terceros=Backbone.Model.extend({
	dao:directory.dao.erp_tercerosDAO,
	initialize:function(){
	}
});


directory.models.erp_tercerosCollection=Backbone.Collection.extend({
	dao: directory.dao.erp_tercerosDAO,
	model:directory.models.erp_terceros,

	FindAll:function(){
		console.log('consulta');
		var erp_tercerosDAO=new directory.dao.erp_tercerosDAO(directory.db),
			self=this;
			erp_tercerosDAO.FindAll(function(data){
			self.reset(data);
		});
	},
	FindByID:function(key){
		var erp_terceros=new directory.dao.erp_tercerosDAO(directory.db),
			self=this;
		erp_terceros.FindByID(key,function(data){
			self.reset(data);
		});
	},
	Delete:function(key){
		var erp_terceros=new directory.dao.erp_tercerosDAO(directory.db),
			self=this;
		erp_terceros.Delete(key,function(data){
			self.reset(data);
		});	
	},

	SaveErpTerceros:function(Terceros){
		var erp_terceros=new directory.dao.erp_tercerosDAO(directory.db),
		self=this;
		erp_terceros.SaveErpTerceros(Terceros);
	},
	UpdateErp_terceros:function(Terceros){
		var erp_terceros=new directory.dao.erp_tercerosDAO(directory.db),
		self=this;
		erp_terceros.UpdateErp_terceros(Terceros);
	}
});

var Guardar_erp_terceros=new directory.models.erp_tercerosCollection();


directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.erp_terceros,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_erp_terceros.FindAll();	
	}
})

var LoadListar=new directory.models.EjecutarColection();


directory.models.View_erp_terceros=Backbone.View.extend({
	model:new directory.models.erp_terceros(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.terceros-list-template').html())
	},
	events:{
		'click .edit-tercero': 'edit',
		'click .update-tercero': 'update',
		'click .cancel': 'cancel',
		'click .delete-tercero':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-tercero').hide();
		$('.delete-tercero').hide();
		this.$('.update-tercero').show();
		this.$('.cancel').show();

		var rowid=this.$('.rowid').html();
		var id_cia = this.$('.id_cia').html();
		var rowid_empresa = this.$('.rowid_empresa').html();
		var rowid_interno = this.$('.rowid_interno').html();
		var identificacion = this.$('.identificacion').html();
		var tipo_identificacion = this.$('.tipo_identificacion').html();
		var razonsocial = this.$('.razonsocial').html();
		var nombre_comercial = this.$('.nombre_comercial').html();
		var codigo_erp = this.$('.codigo_erp').html();
		var ind_activo = this.$('.ind_activo').html();
		var es_vendedor = this.$('.es_vendedor').html();
		var es_cliente = this.$('.es_cliente').html();
		var es_proveedor = this.$('.es_proveedor').html();
		var fechacreacion = this.$('.fechacreacion').html();
		var usuariocreacion = this.$('.usuariocreacion').html();
		var fechamod = this.$('.fechamod').html();
		var usuariomod = this.$('.usuariomod').html();
		var id_impuesto = this.$('.id_impuesto').html();
		
		this.$('.id_cia').html('<input type="text" class="form-control id_cia-update" value="' + id_cia + '">');
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.rowid_empresa').html('<input type="text" class="form-control rowid_empresa-update" value="' + rowid_empresa + '">');
		this.$('.rowid_interno').html('<input type="text" class="form-control rowid_interno-update" value="' + rowid_interno + '">');
		this.$('.identificacion').html('<input type="text" class="form-control identificacion-update" value="' + identificacion + '">');
		this.$('.tipo_identificacion').html('<input type="text" class="form-control tipo_identificacion-update" value="' + tipo_identificacion + '">');
		this.$('.razonsocial').html('<input type="text" class="form-control razonsocial-update" value="' + razonsocial + '">');
		this.$('.nombre_comercial').html('<input type="text" class="form-control nombre_comercial-update" value="' + nombre_comercial + '">');
		this.$('.codigo_erp').html('<input type="text" class="form-control codigo_erp-update" value="' + codigo_erp + '">');
		this.$('.ind_activo').html('<input type="text" class="form-control ind_activo-update" value="' + ind_activo + '">');
		this.$('.es_vendedor').html('<input type="text" class="form-control es_vendedor-update" value="' + es_vendedor + '">');
		this.$('.es_cliente').html('<input type="text" class="form-control es_cliente-update" value="' + es_cliente + '">');
		this.$('.es_proveedor').html('<input type="text" class="form-control es_proveedor-update" value="' + es_proveedor + '">');
		this.$('.fechacreacion').html('<input type="text" class="form-control fechacreacion-update" value="' + fechacreacion + '">');
		this.$('.usuariocreacion').html('<input type="text" class="form-control usuariocreacion-update" value="' + usuariocreacion + '">');
		this.$('.fechamod').html('<input type="text" class="form-control fechamod-update" value="' + fechamod + '">');
		this.$('.usuariomod').html('<input type="text" class="form-control usuariomod-update" value="' + usuariomod + '">');
		this.$('.id_impuesto').html('<input type="text" class="form-control id_impuesto-update" value="' + id_impuesto + '">');


	},
	update: function() {

		var ModificarTercero=new directory.models.erp_terceros({
			rowid:$('.rowid-update').val(),
			id_cia:$('.id_cia-update').val(),
			rowid_empresa:$('.rowid_empresa-update').val(),
			rowid_interno:$('.rowid_interno-update').val(),
			identificacion:$('.identificacion-update').val(),
			tipo_identificacion:$('.tipo_identificacion-update').val(),
			razonsocial:$('.razonsocial-update').val(),
			nombre_comercial:$('.nombre_comercial-update').val(),
			codigo_erp:$('.codigo_erp-update').val(),
			ind_activo:$('.ind_activo-update').val(),
			es_vendedor:$('.es_vendedor-update').val(),
			es_cliente:$('.es_cliente-update').val(),
			es_proveedor:$('.es_proveedor-update').val(),
			fechacreacion:$('.fechacreacion-update').val(),
			usuariocreacion:$('.usuariocreacion-update').val(),
			fechamod:$('.fechamod-update').val(),
			usuariomod:$('.usuariomod-update').val(),
			id_impuesto:$('.id_impuesto-update').val()
		})
		Guardar_erp_terceros.UpdateErp_terceros(ModificarTercero);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllTerceros();
	},
	cancel: function() {

		var Listar=new directory.models.AllTerceros();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_erp_terceros.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllTerceros();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllTerceros = Backbone.View.extend({
	model:Guardar_erp_terceros,
	el: $('.terceros-list'),
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
		_.each(this.model.toArray(), function(terceros) {
			self.$el.append((new directory.models.View_erp_terceros({model: terceros})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllTerceros();



$(document).ready(function() {
	$('.guardar').on('click', function() {
		var erp_terceros=new directory.models.erp_tercerosCollection();
		
		erp_terceros.SaveErpTerceros({
			rowid_empresa:$('#rowid_empresa').val(),
			id_cia:$('#id_cia').val(),
			rowid_interno:$('#rowid_interno').val(),
      	    identificacion:$('#identificacion').val(),
     	    tipo_identificacion:$('#tipo_identificacion').val(),
            razonsocial:$('#razonsocial').val(),
            nombre_comercial:$('#nombre_comercial').val(),
            codigo_erp:$('#codigo_erp').val(),
            ind_activo:$('#ind_activo').val(),
            es_vendedor:$('#es_vendedor').val(),
            es_cliente:$('#es_cliente').val(),
            es_proveedor:$('#es_proveedor').val(),
            fechacreacion:$('#fechacreacion').val(),
            usuariocreacion:$('#usuariocreacion').val(),
            fechamod:$('#fechamod').val(),
            usuariomod:$('#usuariomod').val(),

            id_impuesto:$('#id_impuesto').val()

		}
		);
		$('#rowid_empresa').val(''),
		$('#id_cia').val(''),
		$('#rowid_interno').val(''),
		$('#identificacion').val(''),
		$('#tipo_identificacion').val(''),
		$('#razonsocial').val(''),
		$('#nombre_comercial').val(''),
		$('#codigo_erp').val(''),
		$('#ind_activo').val(''),
		$('#es_vendedor').val(''),
        $('#es_cliente').val(''),
        $('#es_proveedor').val(''),
        $('#fechacreacion').val(''),
        $('#usuariocreacion').val(''),
      	$('#fechamod').val(''),
        $('#usuariomod').val(''),

         $('#id_impuesto').val(''),
		alert('INSERTADO CON EXITO');
		erp_terceros.FindAll();
		var listarTerceros=new directory.models.AllTerceros();
	});
})


directory.Router = Backbone.Router.extend({

    routes: {
    },

    initialize: function() {
    },


});