"use strict";
var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}
directory.dao.l_log_eventosDAO=function(db){
	this.db=db;
};
_.extend(directory.dao.l_log_eventosDAO.prototype,{
	Save:function(modelo){
		debugger;
		db.transaction(
			function(tx){
				var query="insert into l_log_eventos values  (null,"+
					"'"+modelo.rowid_empresa+
					"','"+modelo.id_log+
					"','"+modelo.id_tipo_entidad+
					"','"+modelo.rowid_entidad+
					"','"+modelo.nombre_campo+
					"','"+modelo.valor_campo+
					"','"+modelo.observaciones+
					"','"+modelo.fechacreacion+
					"','"+modelo.usuariocreacion+"')";
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
				var query ="select*from l_log_eventos";
				tx.executeSql(query,[],function(tx,results){
					Guardar_Eventos.reset();
					var len=results.rows.length;
					console.log(len);
					for (var i =0; i<len; i++) {
						var llenarModelo=new directory.models.l_log_eventos({
							rowid:results.rows.item(i).rowid,
							rowid_empresa:results.rows.item(i).rowid_empresa,
							id_log:results.rows.item(i).id_log,
							id_tipo_entidad:results.rows.item(i).id_tipo_entidad,
							rowid_entidad:results.rows.item(i).rowid_entidad,
							nombre_campo:results.rows.item(i).nombre_campo,
							valor_campo:results.rows.item(i).valor_campo,
							observaciones:results.rows.item(i).observaciones,
							fechacreacion:results.rows.item(i).fechacreacion,
							usuariocreacion:results.rows.item(i).usuariocreacion
						})	
						Guardar_Eventos.add(llenarModelo);
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
				var query="delete from l_log_eventos where rowid="+id+"";
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
				var query="update l_log_eventos set "+
				"rowid_empresa='"+modelo.attributes.rowid_empresa+"',"+
				"id_log='"+modelo.attributes.id_log+"',"+
				"id_tipo_entidad='"+modelo.attributes.id_tipo_entidad+"',"+
				"rowid_entidad='"+modelo.attributes.rowid_entidad+"',"+
				"nombre_campo='"+modelo.attributes.nombre_campo+"',"+
				"valor_campo='"+modelo.attributes.valor_campo+"',"+
				"observaciones='"+modelo.attributes.observaciones+"',"+
				"fechacreacion='"+modelo.attributes.fechacreacion+"',"+
				"usuariocreacion='"+modelo.attributes.usuariocreacion+"' "+
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




directory.models.l_log_eventos=Backbone.Model.extend({
	dao:directory.dao.l_log_eventosDAO,
	initialize:function(){
	}
});


directory.models.l_log_eventosCollection=Backbone.Collection.extend({
	dao: directory.dao.l_log_eventosDAO,
	model:directory.models.l_log_eventos,
	FindAll:function(){
		var l_log_eventos=new directory.dao.l_log_eventosDAO(directory.db),
			self=this;
		l_log_eventos.FindAll(function(data){
			self.reset(data);
		});
	},
	Delete:function(key){
		var l_log_eventos=new directory.dao.l_log_eventosDAO(directory.db),
			self=this;
		l_log_eventos.Delete(key,function(data){
			self.reset(data);
		});
	},
	Save:function(items){
		var l_log_eventos=new directory.dao.l_log_eventosDAO(directory.db),
		self=this;
		l_log_eventos.Save(items);
	},
	Update:function(items){
		var l_log_eventos=new directory.dao.l_log_eventosDAO(directory.db),
		self=this;
		l_log_eventos.Update(items);
	}
});



var Guardar_Eventos=new directory.models.l_log_eventosCollection();

directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.l_log_eventos,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_Eventos.FindAll();	
	}
})

var Listar=new directory.models.EjecutarColection();


directory.models.View_l_log_eventos=Backbone.View.extend({
	model:new directory.models.l_log_eventos(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.eventos-list-template').html())
	},
	events:{
		'click .edit-eventos': 'edit',
		'click .update-eventos': 'update',
		'click .cancel-eventos': 'cancel',
		'click .delete-eventos':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-eventos').hide();
		$('.delete-eventos').hide();
		this.$('.update-eventos').show();
		this.$('.cancel-eventos').show();
		
		var rowid=this.$('.rowid').html();
		var rowid_empresa=this.$('.rowid_empresa').html();
		var id_log=this.$('.id_log').html();
		var id_tipo_entidad=this.$('.id_tipo_entidad').html();
		var rowid_entidad=this.$('.rowid_entidad').html();
		var nombre_campo=this.$('.nombre_campo').html();
		var valor_campo=this.$('.valor_campo').html();
		var observaciones=this.$('.observaciones').html();
		var fechacreacion=this.$('.fechacreacion').html();
		var usuariocreacion=this.$('.usuariocreacion').html();
			
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.rowid_empresa').html('<input type="text" class="form-control rowid_empresa-update" value="' + rowid_empresa + '">');
		this.$('.id_log').html('<input type="text" class="form-control id_log-update" value="' + id_log + '">');
		this.$('.id_tipo_entidad').html('<input type="text" class="form-control id_tipo_entidad-update" value="' + id_tipo_entidad + '">');
		this.$('.rowid_entidad').html('<input type="text" class="form-control rowid_entidad-update" value="' + rowid_entidad + '">');
		this.$('.nombre_campo').html('<input type="text" class="form-control nombre_campo-update" value="' + nombre_campo + '">');
		this.$('.valor_campo').html('<input type="text" class="form-control valor_campo-update" value="' + valor_campo + '">');
		this.$('.observaciones').html('<input type="text" class="form-control observaciones-update" value="' + observaciones + '">');
		this.$('.fechacreacion').html('<input type="text" class="form-control fechacreacion-update" value="' + fechacreacion + '">');
		this.$('.usuariocreacion').html('<input type="text" class="form-control usuariocreacion-update" value="' + usuariocreacion + '">');
	},
	update: function() {

		var Modificar=new directory.models.l_log_eventos({
			rowid:$('.rowid-update').val(),
			rowid_empresa:$('.rowid_empresa-update').val(),
			id_log:$('.id_log-update').val(),
			id_tipo_entidad:$('.id_tipo_entidad-update').val(),
			rowid_entidad:$('.rowid_entidad-update').val(),
			nombre_campo:$('.nombre_campo-update').val(),
			valor_campo:$('.valor_campo-update').val(),
			observaciones:$('.observaciones-update').val(),
			fechacreacion:$('.fechacreacion-update').val(),
			usuariocreacion:$('.usuariocreacion-update').val()
			
		})
		Guardar_Eventos.Update(Modificar);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllEventos();
	},
	cancel: function() {

		var Listar=new directory.models.AllEventos();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_Eventos.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllEventos();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllEventos= Backbone.View.extend({
	model:Guardar_Eventos,
	el: $('.eventos-list'),
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
			self.$el.append((new directory.models.View_l_log_eventos({model: modelo})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllEventos();



$(document).ready(function() {
	$('.guardar').on('click', function() {
		var m_modulos=new directory.models.l_log_eventosCollection();
		m_modulos.Save({
			rowid_empresa:$('#rowid_empresa').val(),
			id_log:$('#id_log').val(),
			id_tipo_entidad:$('#id_tipo_entidad').val(),
			rowid_entidad:$('#rowid_entidad').val(),
			nombre_campo:$('#nombre_campo').val(),
			valor_campo:$('#valor_campo').val(),
			observaciones:$('#observaciones').val(),
			fechacreacion:$('#fechacreacion').val(),
			usuariocreacion:$('#usuariocreacion').val()
		})

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllEventos();

	});
})


















