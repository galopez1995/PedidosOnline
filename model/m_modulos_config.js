"use strict";
var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}
directory.dao.m_modulos_configDAO=function(db){
	this.db=db;
};
_.extend(directory.dao.m_modulos_configDAO.prototype,{
	Save:function(modelo){
		debugger;
		db.transaction(
			function(tx){
				var query="insert into m_modulos_config values  (null,"+
					"'"+modelo.modulo+
					"','"+modelo.campo+
					"','"+modelo.ind_ocultar+
					"','"+modelo.valor_defecto+
					"','"+modelo.usuario_creacion+
					"','"+modelo.fecha_creacion+
					"','"+modelo.usuario_modificacion+
					"','"+modelo.fecha_modificacion+"')";
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
				var query ="select*from m_modulos_config";
				tx.executeSql(query,[],function(tx,results){
					Guardar_Modulos.reset();
					var len=results.rows.length;
					console.log(len);
					for (var i =0; i<len; i++) {
						var llenarModelo=new directory.models.m_modulos_config({
							rowid:results.rows.item(i).rowid,
							modulo:results.rows.item(i).modulo,
							campo:results.rows.item(i).campo,
							ind_ocultar:results.rows.item(i).ind_ocultar,
							valor_defecto:results.rows.item(i).valor_defecto,
							usuario_creacion:results.rows.item(i).usuario_creacion,
							fecha_creacion:results.rows.item(i).fecha_creacion,
							usuario_modificacion:results.rows.item(i).usuario_modificacion,
							fecha_modificacion:results.rows.item(i).fecha_modificacion
						})	
						Guardar_Modulos.add(llenarModelo);
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
				var query="delete from m_modulos_config where rowid="+id+"";
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
				var query="update m_modulos_config set "+
				"modulo='"+modelo.attributes.modulo+"',"+
				"campo='"+modelo.attributes.campo+"',"+
				"ind_ocultar='"+modelo.attributes.ind_ocultar+"',"+
				"valor_defecto='"+modelo.attributes.valor_defecto+"',"+
				"usuario_creacion='"+modelo.attributes.usuario_creacion+"',"+
				"fecha_creacion='"+modelo.attributes.fecha_creacion+"',"+
				"usuario_modificacion='"+modelo.attributes.usuario_modificacion+"',"+
				"fecha_modificacion='"+modelo.attributes.fecha_modificacion+"' "+
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




directory.models.m_modulos_config=Backbone.Model.extend({
	dao:directory.dao.m_modulos_configDAO,
	initialize:function(){
	}
});


directory.models.m_modulos_configCollection=Backbone.Collection.extend({
	dao: directory.dao.m_modulos_configDAO,
	model:directory.models.m_modulos_config,
	FindAll:function(){
		var m_modulos_config=new directory.dao.m_modulos_configDAO(directory.db),
			self=this;
		m_modulos_config.FindAll(function(data){
			self.reset(data);
		});
	},
	Delete:function(key){
		var m_modulos_config=new directory.dao.m_modulos_configDAO(directory.db),
			self=this;
		m_modulos_config.Delete(key,function(data){
			self.reset(data);
		});
	},
	Save:function(items){
		var m_modulos_config=new directory.dao.m_modulos_configDAO(directory.db),
		self=this;
		m_modulos_config.Save(items);
	},
	Update:function(items){
		var m_modulos_config=new directory.dao.m_modulos_configDAO(directory.db),
		self=this;
		m_modulos_config.Update(items);
	}
});



var Guardar_Modulos=new directory.models.m_modulos_configCollection();

directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.m_modulos_config,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_Modulos.FindAll();	
	}
})

var Listar=new directory.models.EjecutarColection();


directory.models.View_m_modulos=Backbone.View.extend({
	model:new directory.models.m_modulos_config(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.modulos-list-template').html())
	},
	events:{
		'click .edit-modulos': 'edit',
		'click .update-modulos': 'update',
		'click .cancel-modulos': 'cancel',
		'click .delete-modulos':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-modulos').hide();
		$('.delete-modulos').hide();
		this.$('.update-modulos').show();
		this.$('.cancel-modulos').show();
		
		var rowid=this.$('.rowid').html();
		var modulo=this.$('.modulo').html();
		var campo=this.$('.campo').html();
		var ind_ocultar=this.$('.ind_ocultar').html();
		var valor_defecto=this.$('.valor_defecto').html();
		var usuario_creacion=this.$('.usuario_creacion').html();
		var fecha_creacion=this.$('.fecha_creacion').html();
		var usuario_modificacion=this.$('.usuario_modificacion').html();
		var fecha_modificacion=this.$('.fecha_modificacion').html();
			
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.modulo').html('<input type="text" class="form-control modulo-update" value="' + modulo + '">');
		this.$('.campo').html('<input type="text" class="form-control campo-update" value="' + campo + '">');
		this.$('.ind_ocultar').html('<input type="text" class="form-control ind_ocultar-update" value="' + ind_ocultar + '">');
		this.$('.valor_defecto').html('<input type="text" class="form-control valor_defecto-update" value="' + valor_defecto + '">');
		this.$('.usuario_creacion').html('<input type="text" class="form-control usuario_creacion-update" value="' + usuario_creacion + '">');
		this.$('.fecha_creacion').html('<input type="text" class="form-control fecha_creacion-update" value="' + fecha_creacion + '">');
		this.$('.usuario_modificacion').html('<input type="text" class="form-control usuario_modificacion-update" value="' + usuario_modificacion + '">');
		this.$('.fecha_modificacion').html('<input type="text" class="form-control fecha_modificacion-update" value="' + fecha_modificacion + '">');
		
	},
	update: function() {

		var ModificarModulos=new directory.models.m_modulos_config({
			rowid:$('.rowid-update').val(),
			modulo:$('.modulo-update').val(),
			campo:$('.campo-update').val(),
			ind_ocultar:$('.ind_ocultar-update').val(),
			valor_defecto:$('.valor_defecto-update').val(),
			usuario_creacion:$('.usuario_creacion-update').val(),
			fecha_creacion:$('.fecha_creacion-update').val(),
			usuario_modificacion:$('.usuario_modificacion-update').val(),
			fecha_modificacion:$('.fecha_modificacion-update').val()
			
		})
		Guardar_Modulos.Update(ModificarModulos);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllModulo();
	},
	cancel: function() {

		var Listar=new directory.models.AllModulo();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_Modulos.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllModulo();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllModulo= Backbone.View.extend({
	model:Guardar_Modulos,
	el: $('.modulos-list'),
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
			self.$el.append((new directory.models.View_m_modulos({model: modelo})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllModulo();



$(document).ready(function() {
	$('.guardar').on('click', function() {
		var m_modulos=new directory.models.m_modulos_configCollection();
		m_modulos.Save({
			modulo:$('#modulo').val(),
			campo:$('#campo').val(),
			ind_ocultar:$('#ind_ocultar').val(),
			valor_defecto:$('#valor_defecto').val(),
			usuario_creacion:$('#usuario_creacion').val(),
			fecha_creacion:$('#fecha_creacion').val(),
			usuario_modificacion:$('#usuario_modificacion').val(),
			fecha_modificacion:$('#fecha_modificacion').val()
		})

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllModulo();
	});
})


















