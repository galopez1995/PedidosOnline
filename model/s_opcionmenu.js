"use strict";

var directory={
	models:{},
	views:{},
	utils:{},
	dao:{}
}


directory.dao.s_opcionmenuDAO=function(db){
	this.db=db;
};


_.extend(directory.dao.s_opcionmenuDAO.prototype,{
	SaveS_opcionmenu:function(opcionmenu){
		
		db.transaction(
			function(tx){
				var query="insert into s_opcionmenu values (null,'"
					+opcionmenu.rowid_opcionpadre+"','"
					+opcionmenu.nombre_opcion+"','"
					+opcionmenu.ind_activo+"','"
					+opcionmenu.numorden+"','"
					+opcionmenu.url_link+"','"
					+opcionmenu.texto_ayuda+"','"
					+opcionmenu.fechacreacion+"','"
					+opcionmenu.usuariocreacion+"','"
					+opcionmenu.fechamod+"','"
					+opcionmenu.usuariomod+"','"
					+opcionmenu.icono+"','"
					+opcionmenu.bgcolor+"','"
					+opcionmenu.fgcolor+"')";
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
				var query="select*from s_opcionmenu";
				tx.executeSql(query,[],function(tx,results){
					Guardar_Menu.reset();
					var len=results.rows.length;
					console.log(len)
					for (var i = 0; i <len; i++) {
						var LlenarModelo=new directory.models.s_opcionmenu({
							rowid:results.rows.item(i).rowid,
							rowid_opcionpadre:results.rows.item(i).rowid_opcionpadre,
							nombre_opcion:results.rows.item(i).nombre_opcion,
							ind_activo:results.rows.item(i).ind_activo,
							numorden:results.rows.item(i).numorden,
							url_link:results.rows.item(i).url_link,
							texto_ayuda:results.rows.item(i).texto_ayuda,
							fechacreacion:results.rows.item(i).fechacreacion,
							usuariocreacion:results.rows.item(i).usuariocreacion,
							fechamod:results.rows.item(i).fechamod,
							usuariomod:results.rows.item(i).usuariomod,
							icono:results.rows.item(i).icono,
							bgcolor:results.rows.item(i).bgcolor,
							fgcolor:results.rows.item(i).fgcolor	
						})
						Guardar_Menu.add(LlenarModelo);
					};

				});	
			},
			function(tx,error){
				alert('Error al consultar '+error);
			}
			

		)
	},

	UpdateS_opcionmenu:function(opcionmenu){
		
		db.transaction(
			function(tx){
				var query="update s_opcionmenu set "
					+"rowid_opcionpadre='"+opcionmenu.attributes.rowid_opcionpadre+"',"
					+"nombre_opcion='"+opcionmenu.attributes.nombre_opcion+"',"
					+"ind_activo='"+opcionmenu.attributes.ind_activo+"',"
					+"numorden='"+opcionmenu.attributes.numorden+"',"
					+"url_link='"+opcionmenu.attributes.url_link+"',"
					+"texto_ayuda='"+opcionmenu.attributes.texto_ayuda+"',"
					+"fechacreacion='"+opcionmenu.attributes.fechacreacion+"',"
					+"usuariocreacion='"+opcionmenu.attributes.usuariocreacion+"',"
					+"fechamod='"+opcionmenu.attributes.fechamod+"',"
					+"usuariomod='"+opcionmenu.attributes.usuariomod+"',"
					+"icono='"+opcionmenu.attributes.icono+"',"
					+"bgcolor='"+opcionmenu.attributes.bgcolor+"',"
					+"fgcolor='"+opcionmenu.attributes.fgcolor+"' where rowid="+opcionmenu.attributes.rowid+"";
				console.log(query);
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
				var query="delete from s_opcionmenu where rowid="+id+""
				tx.executeSql(query);
			},
			function(tx,error){
				alert('Error al eliminar por id: '+ id);
			}
		)
	},
});

directory.models.s_opcionmenu=Backbone.Model.extend({
	dao:directory.dao.s_opcionmenuDAO,
	initialize:function(){
	}
});


directory.models.s_opcionmenuCollection=Backbone.Collection.extend({
	dao: directory.dao.s_opcionmenuDAO,
	model:directory.models.s_opcionmenu,
	FindAll:function(){
		var s_opcionmenuDAO=new directory.dao.s_opcionmenuDAO(directory.db),
			self=this;
		s_opcionmenuDAO.FindAll(function(data){
			self.reset(data);
		});
	},

	SaveS_opcionmenu:function(opcionmenu){
		var s_opcionmenuDAO=new directory.dao.s_opcionmenuDAO(directory.db),
		self=this;
		s_opcionmenuDAO.SaveS_opcionmenu(opcionmenu);
	},
	UpdateS_opcionmenu:function(opcionmenu){
		var s_opcionmenuDAO=new directory.dao.s_opcionmenuDAO(directory.db),
		self=this;
		s_opcionmenuDAO.UpdateS_opcionmenu(opcionmenu);
	},
	Delete:function(id){
		var s_opcionmenuDAO=new directory.dao.s_opcionmenuDAO(directory.db),
			self=this;
		s_opcionmenuDAO.Delete(id,function(data){
			self.reset(data);
		});
	}
});


var Guardar_Menu=new directory.models.s_opcionmenuCollection();

directory.models.EjecutarColection=Backbone.Collection.extend({
	model:directory.models.s_opcionmenu,
	initialize:function(){
		this.render();
	},
	render:function(){
		Guardar_Menu.FindAll();	
	}
})

var Listar=new directory.models.EjecutarColection();


directory.models.View_OpcionMenu=Backbone.View.extend({
	model:new directory.models.s_opcionmenu(),
	tagName:'tr',
	initialize:function(){
		this.template=_.template($('.opcionmenu-list-template').html())
	},
	events:{
		'click .edit-opcionmenu': 'edit',
		'click .update-opcionmenu': 'update',
		'click .cancel': 'cancel',
		'click .delete-opcionmenu':'delete'
	},
	edit: function() {
		console.log("inicio la funcion");
		$('.edit-opcionmenu').hide();
		$('.delete-opcionmenu').hide();
		this.$('.update-opcionmenu').show();
		this.$('.cancel').show();
		
		var rowid=this.$('.rowid').html();
		var rowid_opcionpadre=this.$('.rowid_opcionpadre').html();
		var nombre_opcion=this.$('.nombre_opcion').html();
		var ind_activo=this.$('.ind_activo').html();
		var numorden=this.$('.numorden').html();
		var url_link=this.$('.url_link').html();
		var texto_ayuda=this.$('.texto_ayuda').html();
		var fechacreacion=this.$('.fechacreacion').html();
		var usuariocreacion=this.$('.usuariocreacion').html();
		var fechamod=this.$('.fechamod').html();
		var usuariomod=this.$('.usuariomod').html();
		var icono=this.$('.icono').html();
		var bgcolor=this.$('.bgcolor').html();
		var fgcolor=this.$('.fgcolor').html();
	
		this.$('.rowid').html('<input type="text" class="form-control rowid-update" value="' + rowid + '">');
		this.$('.rowid_opcionpadre').html('<input type="text" class="form-control rowid_opcionpadre-update" value="' + rowid_opcionpadre + '">');
		this.$('.nombre_opcion').html('<input type="text" class="form-control nombre_opcion-update" value="' + nombre_opcion + '">');
		this.$('.ind_activo').html('<input type="text" class="form-control ind_activo-update" value="' + ind_activo + '">');
		this.$('.numorden').html('<input type="text" class="form-control numorden-update" value="' + numorden + '">');
		this.$('.url_link').html('<input type="text" class="form-control url_link-update" value="' + url_link + '">');
		this.$('.texto_ayuda').html('<input type="text" class="form-control texto_ayuda-update" value="' + texto_ayuda + '">');
		this.$('.fechacreacion').html('<input type="text" class="form-control fechacreacion-update" value="' + fechacreacion + '">');
		this.$('.usuariocreacion').html('<input type="text" class="form-control usuariocreacion-update" value="' + usuariocreacion + '">');
		this.$('.fechamod').html('<input type="text" class="form-control fechamod-update" value="' + fechamod + '">');
		this.$('.usuariomod').html('<input type="text" class="form-control usuariomod-update" value="' + usuariomod + '">');
		this.$('.icono').html('<input type="text" class="form-control icono-update" value="' + icono + '">');
		this.$('.bgcolor').html('<input type="text" class="form-control bgcolor-update" value="' + bgcolor + '">');
		this.$('.fgcolor').html('<input type="text" class="form-control fgcolor-update" value="' + fgcolor + '">');
		
	},
	update: function() {

		var ModificarMenu=new directory.models.s_opcionmenu({
			rowid:$('.rowid-update').val(),
			rowid_opcionpadre:$('.rowid_opcionpadre-update').val(),
		    nombre_opcion:$('.nombre_opcion-update').val(),
		    ind_activo:$('.ind_activo-update').val(),
		    numorden:$('.numorden-update').val(),
		    url_link:$('.url_link-update').val(),
		    texto_ayuda:$('.texto_ayuda-update').val(),
		    fechacreacion:$('.fechacreacion-update').val(),
		    usuariocreacion:$('.usuariocreacion-update').val(),
		    fechamod:$('.fechamod-update').val(),
		    usuariomod:$('.usuariomod-update').val(),
		    icono:$('.icono-update').val(),
		    bgcolor:$('.bgcolor-update').val(),
		    fgcolor:$('.fgcolor-update').val()
		})
		Guardar_Menu.UpdateS_opcionmenu(ModificarMenu);
		this.render();

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllOpcionMenu();
	},
	cancel: function() {

		var Listar=new directory.models.AllOpcionMenu();
		Listar.render();
	},
	delete: function() {
		this.model.destroy();
		var id=this.$('.rowid').html();
		Guardar_Menu.Delete(id);
		this.render();
		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllOpcionMenu();
		Listar.render();

	
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

directory.models.AllOpcionMenu = Backbone.View.extend({
	model:Guardar_Menu,
	el: $('.opcionmenu-list'),
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
		_.each(this.model.toArray(), function(menu) {
			self.$el.append((new directory.models.View_OpcionMenu({model: menu})).render().$el);
		});
		return this;
	}
});

var Listar=new directory.models.AllOpcionMenu();





$(document).ready(function() {
	$('.guardar').on('click', function() {
		var s_opcionmenu=new directory.models.s_opcionmenuCollection();
		s_opcionmenu.SaveS_opcionmenu({
			rowid_opcionpadre:$('#rowid_opcionpadre').val(),
		    nombre_opcion:$('#nombre_opcion').val(),
		    ind_activo:$('#ind_activo').val(),
		    numorden:$('#numorden').val(),
		    url_link:$('#url_link').val(),
		    texto_ayuda:$('#texto_ayuda').val(),
		    fechacreacion:$('#fechacreacion').val(),
		    usuariocreacion:$('#usuariocreacion').val(),
		    fechamod:$('#fechamod').val(),
		    usuariomod:$('#usuariomod').val(),
		    icono:$('#icono').val(),
		    bgcolor:$('#bgcolor').val(),
		    fgcolor:$('#fgcolor').val()
		})
		alert('INSERTADO CON EXITO');

		var LoadListar=new directory.models.EjecutarColection();
		var Listar=new directory.models.AllOpcionMenu();

	});
})




directory.Router = Backbone.Router.extend({

    routes: {
    },

    initialize: function() {
    },


});
