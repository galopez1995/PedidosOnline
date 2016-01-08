"use strict";
var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}
directory.dao.m_empresas_configDAO=function(db){
	this.db=db;
};
_.extend(directory.dao.m_empresas_configDAO.prototype,{
	Save:function(modelo){
		debugger;
		db.transaction(
			function(tx){
				var query="insert into m_empresas_config values  (null,"+
					"'"+modelo.id_tipo_erp+
					"','"+modelo.rowid_empresa+
					"','"+modelo.step+
					"','"+modelo.secuencia+
					"','"+modelo.tiporeg+
					"','"+modelo.parametros+
					"','"+modelo.ind_activo+
					"','"+modelo.fechacreacion+"')";
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
				var query ="select*from m_empresas_config";
				tx.executeSql(query,[],function(tx,results){
					Guardar_Empresa.reset();
					var len=results.rows.length;
					console.log(len);
					for (var i =0; i<len; i++) {
						var llenarModelo=new directory.models.m_empresas_config({
							rowid:results.rows.item(i).rowid,
							id_tipo_erp:results.rows.item(i).id_tipo_erp,
							rowid_empresa:results.rows.item(i).rowid_empresa,
							step:results.rows.item(i).step,
							secuencia:results.rows.item(i).secuencia,
							tiporeg:results.rows.item(i).tiporeg,
							parametros:results.rows.item(i).parametros,
							ind_activo:results.rows.item(i).ind_activo,
							fechacreacion:results.rows.item(i).fechacreacion
						})	
						Guardar_Empresa.add(llenarModelo);
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
				var query="delete from m_empresas_config where rowid="+id+"";
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
				var query="update m_empresas_config set "+
				"id_tipo_erp='"+items_precio.attributes.id_tipo_erp+"',"+
				"rowid_empresa='"+items_precio.attributes.rowid_empresa+"',"+
				"step='"+items_precio.attributes.step+"',"+
				"secuencia='"+items_precio.attributes.secuencia+"',"+
				"tiporeg='"+items_precio.attributes.tiporeg+"',"+
				"parametros='"+items_precio.attributes.parametros+"',"+
				"ind_activo='"+items_precio.attributes.ind_activo+"',"+
				"fechacreacion='"+items_precio.attributes.fechacreacion+"' "+
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




directory.models.m_empresas_config=Backbone.Model.extend({
	dao:directory.dao.erp_items_preciosDAO,
	initialize:function(){
	}
});


directory.models.m_empresas_configCollection=Backbone.Collection.extend({
	dao: directory.dao.m_empresas_configDAO,
	model:directory.models.m_empresas_config,
	FindAll:function(){
		var m_empresas_config=new directory.dao.m_empresas_configDAO(directory.db),
			self=this;
		m_empresas_config.FindAll(function(data){
			self.reset(data);
		});
	},
	Delete:function(key){
		var m_empresas_config=new directory.dao.m_empresas_configDAO(directory.db),
			self=this;
		m_empresas_config.Delete(key,function(data){
			self.reset(data);
		});
	},
	Save:function(items){
		var m_empresas_config=new directory.dao.m_empresas_configDAO(directory.db),
		self=this;
		m_empresas_config.Save(items);
	},
	Update:function(items){
		var m_empresas_config=new directory.dao.m_empresas_configDAO(directory.db),
		self=this;
		m_empresas_config.Update(items);
	}
});



var Guardar_Empresa=new directory.models.m_empresas_configCollection();

directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.m_empresas_config,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_Empresa.FindAll();	
	}
})

var Listar=new directory.models.EjecutarColection();


directory.models.View_m_empresa=Backbone.View.extend({
	model:new directory.models.m_empresas_config(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.empresa-list-template').html())
	},
	events:{
		'click .edit-empresa': 'edit',
		'click .update-empresa': 'update',
		'click .cancel-empresa': 'cancel',
		'click .delete-empresa':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-empresa').hide();
		$('.delete-empresa').hide();
		this.$('.update-empresa').show();
		this.$('.cancel-empresa').show();
		
		var rowid=this.$('.rowid').html();
		var id_tipo_erp=this.$('.id_tipo_erp').html();
		var rowid_empresa=this.$('.rowid_empresa').html();
		var step=this.$('.step').html();
		var secuencia=this.$('.secuencia').html();
		var tiporeg=this.$('.tiporeg').html();
		var parametros=this.$('.parametros').html();
		var ind_activo=this.$('.ind_activo').html();
		var fechacreacion=this.$('.fechacreacion').html();
			
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.rowid_empresa').html('<input type="text" class="form-control rowid_empresa-update" value="' + rowid_empresa + '">');
		this.$('.id_tipo_erp').html('<input type="text" class="form-control id_tipo_erp-update" value="' + id_tipo_erp + '">');
		this.$('.step').html('<input type="text" class="form-control step-update" value="' + step + '">');
		this.$('.secuencia').html('<input type="text" class="form-control secuencia-update" value="' + secuencia + '">');
		this.$('.tiporeg').html('<input type="text" class="form-control tiporeg-update" value="' + tiporeg + '">');
		this.$('.parametros').html('<input type="text" class="form-control parametros-update" value="' + parametros + '">');
		this.$('.ind_activo').html('<input type="text" class="form-control ind_activo-update" value="' + ind_activo + '">');
		this.$('.fechacreacion').html('<input type="text" class="form-control fechacreacion-update" value="' + fechacreacion + '">');
		
	},
	update: function() {

		var ModificarEmpresa=new directory.models.m_empresas_config({
			rowid:$('.rowid-update').val(),
			rowid_empresa:$('.rowid_empresa-update').val(),
			id_tipo_erp:$('.id_tipo_erp-update').val(),
			step:$('.step-update').val(),
			secuencia:$('.secuencia-update').val(),
			tiporeg:$('.tiporeg-update').val(),
			parametros:$('.parametros-update').val(),
			ind_activo:$('.ind_activo-update').val(),
			fechacreacion:$('.fechacreacion-update').val()
			
		})
		Guardar_Empresa.Update(ModificarEmpresa);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllEmpresa();
	},
	cancel: function() {

		var Listar=new directory.models.AllEmpresa();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_Empresa.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllEmpresa();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllEmpresa= Backbone.View.extend({
	model:Guardar_Empresa,
	el: $('.empresa-list'),
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
			self.$el.append((new directory.models.View_m_empresa({model: modelo})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllEmpresa();



$(document).ready(function() {
	$('.guardar').on('click', function() {
		var m_empresa=new directory.models.m_empresas_configCollection();
		m_empresa.Save({
			rowid_empresa:$('#rowid_empresa').val(),
			id_tipo_erp:$('#id_tipo_erp').val(),
			step:$('#step').val(),
			secuencia:$('#secuencia').val(),
			tiporeg:$('#tiporeg').val(),
			parametros:$('#parametros').val(),
			ind_activo:$('#ind_activo').val(),
			fechacreacion:$('#fechacreacion').val()
		})

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllEmpresa();
	});
})


















