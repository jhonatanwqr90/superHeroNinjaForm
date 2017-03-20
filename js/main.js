function formulario(f,o) {
	var t = this;
	t.form = f;
	t.error = true;
	t.param = o || {};
	t.urlAction = t.param.url || 'process.php';
	t.sendType = t.param.tipo || 'POST';
	t.sendDataType = t.param.tipoRespuesta || 'json';
	t.validEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	t.validNum = /^([0-9])*$/;
};

formulario.prototype.removeError=function() {
	this.form.find('input,select,textarea').on('focus', function(){
		$(this).removeClass('error');
	});
};

formulario.prototype.validar=function() {
	var t = this;
	$.each(t.form.find('input, textarea, select'), function(index, val) {
		if($.trim($(this).val())==='' && $(this).attr('no')===undefined ) { $(this).addClass('error'); t.error=false; }
		if($(this).attr('validEmail')!==undefined && $(this).attr('no')===undefined ) {
			if( !t.validEmail.test($(this).val()) ) { $(this).addClass('error'); t.error=false; }
		}
		if($(this).attr('validNum')!==undefined && $(this).attr('no')===undefined ) {
			if( !t.validNum.test($(this).val()) ) { $(this).addClass('error'); t.error=false; }
		}
	});
	return t.error;
};

formulario.prototype.enviar=function(){
	var t = this;
	if(t.validar()) {
		$.ajax({ url: t.urlAction, type: t.sendType, dataType: t.sendDataType, data: t.form.serializeArray() })
			.done(function(data) { return data; });
	} else {
		return false;
	}
};


$('form').on('submit', function(e){
	e.preventDefault();
	var newForm = new formulario($(this));
	newForm.removeError();
	console.log(newForm.enviar()); // El resultado devuelto puede ser evaluado ya que es un json.

	/*
		Se pueden editar los parametros de envio de la siguiente manera, cada parametro es opcional.
		var objeto = {
			url:'otroArchivo.php', //-- Archivo de destino en donde se procesará la información enviada, por defecto apunta a process.php
			tipo:'GET', //-- Tipo de formulario, por defecto es POST
			tipoRespuesta :'jsonp' //-- Tipo de respuesta, por defecto es json
		};

		Se Instanciaria de la siguiente manera:
		var newForm = new formulario($(this), objeto);
	*/

});
