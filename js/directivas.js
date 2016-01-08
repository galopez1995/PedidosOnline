/**
 * Created by dev10 on 1/7/2016.
 */
//interacion de jquery y angular practicoo en las directivas
app.directive("autocomplete",function(){
    function link(scope,element,attrs){
        angular.element(element).autocomplete({//auto complete del elento
            source: scope.$eval(attrs.autocomplete),//se le pasa el arreglo de atributos del elemnto
            select: function(ev,ui){
                ev.preventDefault();
                if(ui.item){
                    scope.optionSelect(ui.item.value);//se pasa el valor de la seleccion
                }
            },
            focus: function(ev,ui){
                ev.preventDefault();
                $(this).val(ui.item.label);//le pasa el texto cuando se seleccione
            }
        });
    };
    return {
        link: link
    };
});