/**
 * Created by dev10 on 1/7/2016.
 */
//interacion de jquery y angular practicoo en las directivas
app_angular.directive("autocomplete",function(){
    function link(scope,element,attrs){
        angular.element(element).autocomplete({//auto complete del elento
            source: scope.$eval(attrs.autocomplete),//se le pasa el arreglo de atributos del elemnto
            select: function(ev,ui){
                ev.preventDefault();
                if(ui.item){
                    scope.optionSelect(ui.item.value);//se pasa el valor de la seleccion
                }
                //scope.$apply;
            },
            focus: function(ev,ui){
                ev.preventDefault();
                $(this).val(ui.item.label);//le pasa el texto cuando se seleccione
            }/*,
            change:function (ev, ui){
                debugger;

                ev.preventDefault();
                if (ui.item === null) {
                    if(scope.modulo==MODULO_PEDIDO_NUEVO)
                        scope.pedidos.rowid_tercero = null;
                }
            }*/
        })
    };
    return {
        link: link
    };
});