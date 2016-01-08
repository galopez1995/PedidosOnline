
var db = window.openDatabase("MODELO1", "1.0", "MODELO1", 200000);
db.transaction(function (tx) {
	var query=
					"create table if not exists erp_terceros ("+
					"rowid integer primary key autoincrement , "+
					"rowid_empresa integer, "+
					"id_cia integer, "+
					"rowid_interno integer, "+
					"identificacion integer, "+
					"tipo_identificacion varchar (10), "+
					"razonsocial varchar (50), "+
					"nombre_comercial varchar (50), "+
					"codigo_erp varchar (50), "+
					"ind_activo varchar (10), "+
					"es_vendedor varchar (50), "+
					"es_cliente varchar (50), "+
					"es_proveedor varchar (50), "+
					"fechacreacion date, "+
					"usuariocreacion varchar (50), "+
					"fechamod date, "+
					"usuariomod varchar (50),"+
					"id_impuesto integer) ";

				tx.executeSql(query);
				 var query=
					"create table if not exists  t_pedidos ("+
					"rowid integer  primary key autoincrement, "+
					"rowid_empresa integer, "+
					"id_cia integer, "+
					"rowid_cliente_facturacion integer, "+
					"rowid_cliente_despacho integer, "+
					"rowid_lista_precios integer, "+
					"rowid_bodega integer, "+
					"fecha_pedido date, "+
					"fecha_entrega date, "+
					"fecha_solicitud date, "+
					"id_punto_envio varchar (10), "+
					"observaciones varchar (500), "+
					"observaciones2 varchar (500), "+
					"orden_compra varchar (50), "+
					"referencia varchar (50), "+
					"valor_base float, "+
					"valor_descuento float , "+
					"valor_impuesto float, "+
					"valor_total float, "+
					"id_estado integer, "+
		            "numpedido_erp varchar (50), "+
		            "numfactura_erp varchar (50), "+
		            "estado_erp varchar (50), "+
		            "valor_facturado float, "+
		            "id_cond_especial varchar (50), "+
		            "fechacreacion date, "+
		            "usuariocreacion varchar (50), "+
		            "fechamod date, "+
		            "usuariomod varchar (50), "+
		            "tipo_doc varchar (10), "+
		            "id_vendedor varchar (25), "+
		            "id_cond_pago varchar (10), "+
		            "numremision_erp varchar (25), "+
		            "id_co varchar (10), "+
		            "transporte_conductor_cc varchar (25), "+
		            "transporte_conductor_nombre varchar (25), "+
		            "transporte_placa varchar (25), "+
		            "fecha_anulacion date, "+
		            "usuario_anulacion varchar (50), "+
		            "id_nota integer, "+
		            "criterio_clasificacion varchar(50)) ";
				tx.executeSql(query);
				var query=
					"create table if not exists t_pedidos_detalle ("+
					"rowid integer primary key autoincrement, "+
					"rowid_pedido integer, "+
					"rowid_bodega integer,"+
					"rowid_item integer,"+
					"linea_descripcion varchar (255),"+
					"id_unidad varchar (10),"+
					"cantidad float,"+
					"factor float,"+
					"cantidad_base float,"+
					"precio_unitario float,"+
					"id_motivo varchar (10),"+
					"stock float,"+
					"valor_base float,"+
					"valor_impuesto float,"+
					"porcen_descuento float,"+
					"valor_porcen_descuento float,"+
					"valor_descuento float,"+
					"valor_total_linea float,"+
					"fechacreacion date,"+
					"usuariocreacion varchar (50),"+
					"fechamod date,"+
					"usuariomod varchar (50),"+
					"rowid_item_ext integer,"+
					"item_ext1 varchar (50),"+
					"item_ext2 varchar (50),"+
					"num_lote varchar (50),"+
					"fecha_anulacion date,"+
					"usuario_anulacion varchar (50))";
				tx.executeSql(query);
				var query="create table if not exists s_opcionmenu ("+
					"rowid integer  primary key autoincrement,rowid_opcionpadre varchar (60),"+
					"nombre_opcion varchar (60),ind_activo varchar(60),"+
					"numorden varchar (60),url_link varchar (60),texto_ayuda varchar (60),"+
					"fechacreacion varchar (60),usuariocreacion varchar (60),"+
					"fechamod varchar (60), usuariomod varchar (60),icono varchar (60),bgcolor varchar (60),fgcolor varchar (60))";
				
				tx.executeSql(query);
				var query="create table if not exists erp_items ("+
					"rowid integer primary key autoincrement,"+
					"rowid_empresa integer,"+
					"id_cia integer,"+
					"rowid_item_erp integer,"+
					"rowid_item_ext integer,"+
					"id_item integer,"+
					"item_referencia varchar (50),"+
					"item_codigo varchar (50),"+
					"item_descripcion varchar (255), "+
					"item_linea varchar (255),"+
					"item_ext1 varchar (50),"+
					"item_ext2 varchar (50),"+
					"id_unidad varchar (10),"+
					"id_unidad_venta varchar (10),"+
					"ind_estado integer,"+
					"descripcion_extensa text,"+
					"fechacreacion varchar (50),"+
					"usuariocreacion varchar (50),"+
					"fechamod date,"+
					"usuariomod varchar (50),"+
					"item_custom1 varchar (50),"+
					"impuesto_id varchar (50),"+
					"impuesto_porcentaje float,"+
					"descripcion_adicional varchar (500), "+
					"cantidad_embalaje integer)";
				tx.executeSql(query);

				var query="create table if not exists erp_items_precios("+
					"rowid integer primary key autoincrement,"+
					"rowid_empresa integer not null,"+
					"id_cia integer not null,"+
					"id_lista_precios varchar (50) not null,"+
					"rowid_item integer not null,"+
					"rowid_item_ext integer null,"+
					"id_unidad  varchar (10) not null,"+
					"precio_lista float not null,"+
					"fechacreacion date not null,"+
					"usuariocreacion varchar (50) not null,"+
					"fechamod date null,"+
					"usuariomod varchar (50) null )";
				
				tx.executeSql(query);
				var query="create table if not exists m_empresas_config ("+
				"rowid integer primary key autoincrement,"+
				"id_tipo_erp varchar (50) null,"+
				"rowid_empresa integer null,"+
				"step varchar (100) null,"+
				"secuencia integer null,"+
				"tiporeg varchar (50) null,"+
				"parametros text null,"+
				"ind_activo integer not null,"+
				"fechacreacion date not null)";
				
				tx.executeSql(query);
				var query="create table if not exists m_modulos_config ("+
				"rowid integer primary key autoincrement,"+
				"modulo varchar (50) not null,"+
				"campo varchar (50) not null,"+
				"ind_ocultar integer not null,"+
				"valor_defecto varchar (50) null," +
				"usuario_creacion varchar (50) not null,"+
				"fecha_creacion date null,"+
				"usuario_modificacion varchar (50) null,"+
				"fecha_modificacion date null)";
				tx.executeSql(query);
				var query="create table if not exists erp_entidades_master("+
				"rowid integer primary key autoincrement,"+
				"id_tipo_maestro varchar (50) not null,"+
				"rowid_empresa integer not null,"+
				"erp_id_cia integer not null,"+
				"erp_rowid_maestro integer null,"+
				"erp_id_maestro varchar (30) null,"+
				"erp_descripcion varchar (255) null,"+
				"custom1 varchar (20) null,"+
				"email varchar (255) null,"+
				"fechacreacion date not null,"+
				"usuariocreacion varchar (50) not null,"+
				"fechamod date null,"+
				"usuariomod date null,"+
				"ind_disabled  bit not null,"+
				"custom2 varchar (20) null,"+
				"custom3 varchar (30) null)";
				tx.executeSql(query);
				var query="create table if not exists s_parametros ("+
					"rowid integer primary key autoincrement,"+
					"rowid_empresa integer null,"+
					"cod_parametro varchar (45) null,"+
					"nombre_parametro varchar (500) not null,"+
					"valor_parametro text)";
				tx.executeSql(query); 
				var query="create table if not exists l_log_eventos("+
					"rowid integer primary key autoincrement,"+
					"rowid_empresa integer not null,"+
					"id_log varchar (20) not null,"+
					"id_tipo_entidad varchar (20) null,"+
					"rowid_entidad integer null,"+
					"nombre_campo varchar (50) null,"+
					"valor_campo varchar (50)null,"+
					"observaciones text null,"+
					"fechacreacion date not null,"+
					"usuariocreacion varchar (50) not null)";
				console.log(query);
				tx.executeSql(query);

},
function (tx,error) {
	// body...
	console.log(error);
}
)

	
				
			

