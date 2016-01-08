"use strict";
var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}
directory.dao.s_parametrosDAO=function(db){
	this.db=db;
};
_.extend(directory.dao.s_parametrosDAO.prototype,{
	Save:function(modelo){
		debugger;
		db.transaction(
			function(tx){
				var query="insert into s_parametros values  (null,"+
					"'"+modelo.rowid_empresa+
					"','"+modelo.cod_parametro+
					"','"+modelo.nombre_parametro+
					"','"+modelo.valor_parametro+"')";
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
				var query ="select*from s_parametros";
				tx.executeSql(query,[],function(tx,results){
					Guardar_Parametros.reset();
					var len=results.rows.length;
					console.log(len);
					for (var i =0; i<len; i++) {
						var llenarModelo=new directory.models.s_parametros({
							rowid:results.rows.item(i).rowid,
							rowid_empresa:results.rows.item(i).rowid_empresa,
							cod_parametro:results.rows.item(i).cod_parametro,
							nombre_parametro:results.rows.item(i).nombre_parametro,
							valor_parametro:results.rows.item(i).valor_parametro
						})	
						Guardar_Parametros.add(llenarModelo);
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
				var query="delete from s_parametros where rowid="+id+"";
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
				var query="update s_parametros set "+
				"rowid_empresa='"+modelo.attributes.rowid_empresa+"',"+
				"cod_parametro='"+modelo.attributes.cod_parametro+"',"+
				"nombre_parametro='"+modelo.attributes.nombre_parametro+"',"+
				"valor_parametro='"+modelo.attributes.valor_parametro+"' "+
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




directory.models.s_parametros=Backbone.Model.extend({
	dao:directory.dao.s_parametrosDAO,
	initialize:function(){
	}
});


directory.models.s_parametrosCollection=Backbone.Collection.extend({
	dao: directory.dao.s_parametrosDAO,
	model:directory.models.s_parametros,
	FindAll:function(){
		var s_parametrosDAO=new directory.dao.s_parametrosDAO(directory.db),
			self=this;
		s_parametrosDAO.FindAll(function(data){
			self.reset(data);
		});
	},
	Delete:function(key){
		var s_parametrosDAO=new directory.dao.s_parametrosDAO(directory.db),
			self=this;
		s_parametrosDAO.Delete(key,function(data){
			self.reset(data);
		});
	},
	Save:function(items){
		var s_parametrosDAO=new directory.dao.s_parametrosDAO(directory.db),
		self=this;
		s_parametrosDAO.Save(items);
	},
	Update:function(items){
		var s_parametrosDAO=new directory.dao.s_parametrosDAO(directory.db),
		self=this;
		s_parametrosDAO.Update(items);
	}
});



var Guardar_Parametros=new directory.models.s_parametrosCollection();

directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.s_parametros,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_Parametros.FindAll();	
	}
})

var Listar=new directory.models.EjecutarColection();


directory.models.View_s_parametros=Backbone.View.extend({
	model:new directory.models.s_parametros(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.parametros-list-template').html())
	},
	events:{
		'click .edit-parametros': 'edit',
		'click .update-parametros': 'update',
		'click .cancel-parametros': 'cancel',
		'click .delete-parametros':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-parametros').hide();
		$('.delete-parametros').hide();
		this.$('.update-parametros').show();
		this.$('.cancel-parametros').show();
		
		var rowid=this.$('.rowid').html();
		var rowid_empresa=this.$('.rowid_empresa').html();
		var cod_parametro=this.$('.cod_parametro').html();
		var nombre_parametro=this.$('.nombre_parametro').html();
		var valor_parametro=this.$('.valor_parametro').html();
			
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.rowid_empresa').html('<input type="text" class="form-control rowid_empresa-update" value="' + rowid_empresa + '">');
		this.$('.cod_parametro').html('<input type="text" class="form-control cod_parametro-update" value="' + cod_parametro + '">');
		this.$('.nombre_parametro').html('<input type="text" class="form-control nombre_parametro-update" value="' + nombre_parametro + '">');
		this.$('.valor_parametro').html('<input type="text" class="form-control valor_parametro-update" value="' + valor_parametro + '">');
		
	},
	update: function() {

		var Modificar=new directory.models.s_parametros({
			rowid:$('.rowid-update').val(),
			rowid_empresa:$('.rowid_empresa-update').val(),
			cod_parametro:$('.cod_parametro-update').val(),
			nombre_parametro:$('.nombre_parametro-update').val(),
			valor_parametro:$('.valor_parametro-update').val()
			
		})
		Guardar_Parametros.Update(Modificar);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllParametros();
	},
	cancel: function() {

		var Listar=new directory.models.AllParametros();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_Parametros.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllParametros();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllParametros= Backbone.View.extend({
	model:Guardar_Parametros,
	el: $('.parametros-list'),
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
			self.$el.append((new directory.models.View_s_parametros({model: modelo})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllParametros();



$(document).ready(function() {
	$('.guardar').on('click', function() {
		var m_modulos=new directory.models.s_parametrosCollection();
		m_modulos.Save({
			rowid_empresa:$('#rowid_empresa').val(),
			cod_parametro:$('#cod_parametro').val(),
			nombre_parametro:$('#nombre_parametro').val(),
			valor_parametro:$('#valor_parametro').val()
		})

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllParametros();
	});
})


















