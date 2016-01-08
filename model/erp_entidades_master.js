"use strict";
var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}
directory.dao.erp_entidades_masterDAO=function(db){
	this.db=db;
};
_.extend(directory.dao.erp_entidades_masterDAO.prototype,{
	Save:function(modelo){
		debugger;
		db.transaction(
			function(tx){
				var query="insert into erp_entidades_master values  (null,"+
					"'"+modelo.id_tipo_maestro+
					"','"+modelo.rowid_empresa+
					"','"+modelo.erp_id_cia+
					"','"+modelo.erp_rowid_maestro+
					"','"+modelo.erp_id_maestro+
					"','"+modelo.erp_descripcion+
					"','"+modelo.custom1+
					"','"+modelo.email+
					"','"+modelo.fechacreacion+
					"','"+modelo.usuariocreacion+
					"','"+modelo.fechamod+
					"','"+modelo.usuariomod+
					"','"+modelo.ind_disabled+
					"','"+modelo.custom2+
					"','"+modelo.custom3+"')";
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
				var query ="select*from erp_entidades_master";
				tx.executeSql(query,[],function(tx,results){
					Guardar_Entidad.reset();
					var len=results.rows.length;
					console.log(len);
					for (var i =0; i<len; i++) {
						var llenarModelo=new directory.models.erp_entidades_master({
							rowid:results.rows.item(i).rowid,
							id_tipo_maestro:results.rows.item(i).id_tipo_maestro,
							rowid_empresa:results.rows.item(i).rowid_empresa,
							erp_id_cia:results.rows.item(i).erp_id_cia,
							erp_rowid_maestro:results.rows.item(i).erp_rowid_maestro,
							erp_id_maestro:results.rows.item(i).erp_id_maestro,
							erp_descripcion:results.rows.item(i).erp_descripcion,
							custom1:results.rows.item(i).custom1,
							email:results.rows.item(i).email,
							fechacreacion:results.rows.item(i).fechacreacion,
							usuariocreacion:results.rows.item(i).usuariocreacion,
							fechamod:results.rows.item(i).fechamod,
							usuariomod:results.rows.item(i).usuariomod,
							ind_disabled:results.rows.item(i).ind_disabled,
							custom2:results.rows.item(i).custom2,
							custom3:results.rows.item(i).custom3
						})	
						Guardar_Entidad.add(llenarModelo);
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
				var query="delete from erp_entidades_master where rowid="+id+"";
				tx.executeSql(query);
			},
			function(tx,error){
				console.log('error al eliminar ' + error);
			}
		)
	},
	Update:function(modelo){
		debugger;
		db.transaction(
			function(tx){
				var query="update erp_entidades_master set "+
				"id_tipo_maestro='"+modelo.attributes.id_tipo_maestro+"',"+
				"rowid_empresa='"+modelo.attributes.rowid_empresa+"',"+
				"erp_id_cia='"+modelo.attributes.erp_id_cia+"',"+
				"erp_rowid_maestro='"+modelo.attributes.erp_rowid_maestro+"',"+
				"erp_id_maestro='"+modelo.attributes.erp_id_maestro+"',"+
				"erp_descripcion='"+modelo.attributes.erp_descripcion+"',"+
				"custom1='"+modelo.attributes.custom1+"',"+
				"email='"+modelo.attributes.email+"', "+
				"fechacreacion='"+modelo.attributes.fechacreacion+"' ,"+
				"usuariocreacion='"+modelo.attributes.usuariocreacion+"', "+
				"fechamod='"+modelo.attributes.fechamod+"' ,"+
				"usuariomod='"+modelo.attributes.usuariomod+"', "+
				"ind_disabled='"+modelo.attributes.ind_disabled+"', "+
				"custom2='"+modelo.attributes.custom2+"', "+
				"custom3='"+modelo.attributes.custom3+"' "+
				"where rowid="+modelo.attributes.rowid+"";
				console.log(query);
				tx.executeSql(query);


			},
			function(tx,error){
			console.log('error al ejecutar update '+ error)
			}
		)
	}
})




directory.models.erp_entidades_master=Backbone.Model.extend({
	dao:directory.dao.erp_entidades_masterDAO,
	initialize:function(){
	}
});


directory.models.erp_entidades_masterCollection=Backbone.Collection.extend({
	dao: directory.dao.erp_entidades_masterDAO,
	model:directory.models.erp_entidades_master,
	FindAll:function(){
		var erp_entidades_masterDAO=new directory.dao.erp_entidades_masterDAO(directory.db),
			self=this;
		erp_entidades_masterDAO.FindAll(function(data){
			self.reset(data);
		});
	},
	Delete:function(key){
		var erp_entidades_masterDAO=new directory.dao.erp_entidades_masterDAO(directory.db),
			self=this;
		erp_entidades_masterDAO.Delete(key,function(data){
			self.reset(data);
		});
	},
	Save:function(entidades){
		var erp_entidades_masterDAO=new directory.dao.erp_entidades_masterDAO(directory.db),
		self=this;
		erp_entidades_masterDAO.Save(entidades);
	},
	Update:function(entidades){
		var erp_entidades_masterDAO=new directory.dao.erp_entidades_masterDAO(directory.db),
		self=this;
		erp_entidades_masterDAO.Update(entidades);
	}
});



var Guardar_Entidad=new directory.models.erp_entidades_masterCollection();

directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.erp_entidades_master,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_Entidad.FindAll();	
	}
})

var Listar=new directory.models.EjecutarColection();


directory.models.View_Entidad=Backbone.View.extend({
	model:new directory.models.erp_entidades_master(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.entidades-list-template').html())
	},
	events:{
		'click .edit-entidades': 'edit',
		'click .update-entidades': 'update',
		'click .cancel-entidades': 'cancel',
		'click .delete-entidades':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-entidades').hide();
		$('.delete-entidades').hide();
		this.$('.update-entidades').show();
		this.$('.cancel-entidades').show();
		
		var rowid=this.$('.rowid').html();
		var id_tipo_maestro=this.$('.id_tipo_maestro').html();
		var rowid_empresa=this.$('.rowid_empresa').html();
		var erp_id_cia=this.$('.erp_id_cia').html();
		var erp_rowid_maestro=this.$('.erp_rowid_maestro').html();
		var erp_id_maestro=this.$('.erp_id_maestro').html();
		var erp_descripcion=this.$('.erp_descripcion').html();
		var custom1=this.$('.custom1').html();
		var email=this.$('.email').html();
		var fechacreacion=this.$('.fechacreacion').html();
		var usuariocreacion=this.$('.usuariocreacion').html();
		var fechamod=this.$('.fechamod').html();
		var usuariomod=this.$('.usuariomod').html();
		var ind_disabled=this.$('.ind_disabled').html();
		var custom2=this.$('.custom2').html();
		var custom3=this.$('.custom3').html();
			
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.id_tipo_maestro').html('<input type="text" class="form-control id_tipo_maestro-update" value="' + id_tipo_maestro + '">');
		this.$('.rowid_empresa').html('<input type="text" class="form-control rowid_empresa-update" value="' + rowid_empresa + '">');
		this.$('.erp_id_cia').html('<input type="text" class="form-control erp_id_cia-update" value="' + erp_id_cia + '">');
		this.$('.erp_rowid_maestro').html('<input type="text" class="form-control erp_rowid_maestro-update" value="' + erp_rowid_maestro + '">');
		this.$('.erp_id_maestro').html('<input type="text" class="form-control erp_id_maestro-update" value="' + erp_id_maestro + '">');
		this.$('.erp_descripcion').html('<input type="text" class="form-control erp_descripcion-update" value="' + erp_descripcion + '">');
		this.$('.custom1').html('<input type="text" class="form-control custom1-update" value="' + custom1 + '">');
		this.$('.email').html('<input type="text" class="form-control email-update" value="' + email + '">');
		this.$('.fechacreacion').html('<input type="text" class="form-control fechacreacion-update" value="' + fechacreacion + '">');
		this.$('.usuariocreacion').html('<input type="text" class="form-control usuariocreacion-update" value="' + usuariocreacion + '">');
		this.$('.fechamod').html('<input type="text" class="form-control fechamod-update" value="' + fechamod + '">');
		this.$('.usuariomod').html('<input type="text" class="form-control usuariomod-update" value="' + usuariomod + '">');
		this.$('.ind_disabled').html('<input type="text" class="form-control ind_disabled-update" value="' + ind_disabled + '">');
		this.$('.custom2').html('<input type="text" class="form-control custom2-update" value="' + custom2 + '">');
		this.$('.custom3').html('<input type="text" class="form-control custom3-update" value="' + custom3 + '">');
		

	},
	update: function() {

		var Modificar=new directory.models.erp_entidades_master({
			rowid:$('.rowid-update').val(),
			id_tipo_maestro:$('.id_tipo_maestro-update').val(),
			rowid_empresa:$('.rowid_empresa-update').val(),
			erp_id_cia:$('.erp_id_cia-update').val(),
			erp_rowid_maestro:$('.erp_rowid_maestro-update').val(),
			erp_id_maestro:$('.erp_id_maestro-update').val(),
			erp_descripcion:$('.erp_descripcion-update').val(),
			custom1:$('.custom1-update').val(),
			email:$('.email-update').val(),
			fechacreacion:$('.fechacreacion-update').val(),
			usuariocreacion:$('.usuariocreacion-update').val(),
			fechamod:$('.fechamod-update').val(),
			usuariomod:$('.usuariomod-update').val(),
			ind_disabled:$('.ind_disabled-update').val(),
			custom2:$('.custom2-update').val(),
			custom3:$('.custom3-update').val()
			
		})
		Guardar_Entidad.Update(Modificar);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllEntidad();
	},
	cancel: function() {

		var Listar=new directory.models.AllEntidad();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_Entidad.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllEntidad();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllEntidad= Backbone.View.extend({
	model:Guardar_Entidad,
	el: $('.entidades-list'),
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
		_.each(this.model.toArray(), function(modelo) {
			self.$el.append((new directory.models.View_Entidad({model: modelo})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllEntidad();



$(document).ready(function() {
	$('.guardar').on('click', function() {
		var m_entidad=new directory.models.erp_entidades_masterCollection();
		m_entidad.Save({
			id_tipo_maestro:$('#id_tipo_maestro').val(),
			rowid_empresa:$('#rowid_empresa').val(),
			erp_id_cia:$('#erp_id_cia').val(),
			erp_rowid_maestro:$('#erp_rowid_maestro').val(),
			erp_id_maestro:$('#erp_id_maestro').val(),
			erp_descripcion:$('#erp_descripcion').val(),
			custom1:$('#custom1').val(),
			email:$('#email').val(),
			fechacreacion:$('#fechacreacion').val(),
			usuariocreacion:$('#usuariocreacion').val(),
			fechamod:$('#fechamod').val(),
			usuariomod:$('#usuariomod').val(),
			ind_disabled:$('#ind_disabled').val(),
			custom2:$('#custom2').val(),
			custom3:$('#custom3').val()
		})

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllEntidad();
	});
})


















