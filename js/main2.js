var GetApp = function(){
	
	var selectors = {

		owlSlider 	: '#owl-demo',

		myForm			: '#my-form',			

		email 	  	: '#exampleInputEmail1',

		mailMsg 		: 'span.mail-msg',

		nameMsg 		: 'span.name-msg',

		name  			: '#exampleInputName1',

		combo1 	  	: '#exampleInputCombo1',

		combo2 	  	: '#exampleInputCombo2',

		comboMsg		: 'span.combo-msg',

		submitBtn		: 'button[type=button]',

		message 		: '#message'

	};

	var globals = {};

	var ejecutarAJAX = function(url,data,callback){
		$.ajax({
			url : url,
			method : "POST",
			data : "data",
			dataType: "JSON",
			success : function(respuesta){
				return callback(respuesta);
			},
			error : function(){
				callback(false);
			}
		});
	};

	var validateEmail = function (email){
		var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
		
		return re.test(email);
	};
	
	return {

		init : function(){

			app = this;

			globals.dom = {};

			globals.keyValues = {

				combo1 : {
					"value" : "id",
					"innerHTML" : "nombre"
				},

				combo2 : {
					"value" : "id",
					"innerHTML" : "nombre"
				}

			};

			globals.options = {
				email  : false,
				name   : false,
				combo1 : false,
				combo2 : false,
			};

			globals.dom.owlSlider 	= $(selectors.owlSlider);

			globals.dom.myForm 			= $(selectors.myForm);

			globals.dom.email 	 		= $(selectors.email);

			globals.dom.mailMsg 		= $(selectors.mailMsg);

			globals.dom.name 				= $(selectors.name);

			globals.dom.nameMsg 		= $(selectors.nameMsg);

			globals.dom.combo1 	 		= $(selectors.combo1);

			globals.dom.combo2 	 		= $(selectors.combo2);

			globals.dom.comboMsg 	 		= $(selectors.comboMsg);

			globals.dom.submitBtn 		= $(selectors.submitBtn);

			globals.dom.message 			= $(selectors.message);

			app.bindEvents();

		},

		fillCombo : function(combo,respuestaArray,keyObjeto){ 

			var app = this;

			if (typeof respuestaArray == 'object' && respuestaArray.length > 0 && respuestaArray) {

				combo.html('');
				combo.append(
					$("<option/>")
								.val(0)
								.html('Seleccione una opción')
				);

				for (var i in respuestaArray) {
					
					combo.append(

						$("<option/>")
							.val(respuestaArray[i][ keyObjeto.value ])
							.html(respuestaArray[i][ keyObjeto.innerHTML ])
						);
					
				}

			} else {
				combo.html('');
				combo.append(
					$("<option/>")
								.val(0)
								.html('Seleccione una opción')
				);
			}
			
		},

		validate : function (){

			app = this;

			globals.dom.mailMsg.text("");

			var email = globals.dom.email.val();

			if(globals.dom.email.val() === 0 && globals.dom.email.attr('id') === 'exampleInputEmail1') {
					lobals.dom.email.parent().addClass('has-error');
					globals.dom.email.parent().removeClass('has-success');
					globals.dom.mailMsg.text("");
					respuesta = [];
				
					app.fillCombo(globals.dom.combo1,respuesta,globals.keyValues.combo1);
				}

			if (validateEmail(email)) {
				globals.dom.mailMsg.text(email + " is valid :)");
				globals.dom.email.parent().removeClass('has-error');
				globals.dom.email.parent().addClass('has-success');
				globals.options.email = true;
				
			} else {
				globals.dom.mailMsg.text(email + " is not valid :(");
				globals.dom.email.parent().addClass('has-error');
				globals.dom.email.parent().removeClass('has-success');
				globals.options.email = false;
			}

			// Validate Name

			if(globals.dom.name.val() != 0 && globals.dom.name.attr('id') === 'exampleInputName1') {
					globals.dom.name.parent().removeClass('has-error');
					globals.dom.name.parent().addClass('has-success');
					globals.dom.nameMsg.text("");
					globals.options.name = true;
				} else {
					globals.dom.name.parent().addClass('has-error');
					globals.dom.name.parent().removeClass('has-success');
					globals.dom.nameMsg.text("Come on! You must have a name!");
					globals.options.name = false;
				}

				// validate Combo 1

				if(globals.dom.combo1.find('option:selected').val() === 0 ) {
					globals.options.combo1 = false;
					globals.dom.combo
				} else {
					globals.options.combo1 = true;
				}

				// validate Combo 2

				if(globals.dom.combo2.find('option:selected').val() === 0 ) {
					globals.options.combo2 = false;
					globals.dom.combo
				} else {
					globals.options.combo2 = true;
				}
		},

		bindEvents : function(){

			var app = this;

			globals.dom.message.hide();
			// Combo 1 depends on mail change

			globals.dom.email.keyup(function(){

				var object = {
					id : $(this).find('option:selected').val()
				};

				// if it's validated call ejecutarAjax
				if(validateEmail(globals.dom.email.val())) {
					globals.dom.email.parent().removeClass('has-error');
					globals.dom.email.parent().addClass('has-success');
					globals.dom.mailMsg.html(globals.dom.email.val() + " is valid :)");
					ejecutarAJAX('json/option-combo1.json',object,function(respuesta){
						app.fillCombo(globals.dom.combo1,respuesta,globals.keyValues.combo1);
					});
					globals.options.email = true;
					globals.options.combo1 = true;
				} else {
					// Show error message
					globals.dom.email.parent().addClass('has-error');
					globals.dom.email.parent().removeClass('has-success');
					globals.dom.mailMsg.html(globals.dom.email.val() + " is not valid :(");
					respuesta = [];
					globals.options.email = false;
					globals.options.combo1 = false;
					app.fillCombo(globals.dom.combo1,respuesta,globals.keyValues.combo1);
				}
			});

			globals.dom.name.keyup(function(){
				if(globals.dom.name.val() != 0 ) {
					globals.dom.name.parent().removeClass('has-error');
					globals.dom.name.parent().addClass('has-success');
					globals.options.name = true;
				} else {
					
					globals.dom.name.parent().addClass('has-error');
					globals.dom.name.parent().removeClass('has-success');
					globals.options.name = false;
				}
			});

			// Combo 2 depends on combo 1 value

			globals.dom.combo1.on('change',function(){

				var object = {
					id : $(this).find('option:selected').val()
				};

				if (globals.dom.combo1.val() == 0) {
					respuesta = [];
					app.fillCombo(globals.dom.combo2,respuesta,globals.keyValues.combo2);
					globals.options.combo2 = false;
				} else {
					globals.options.combo2 = true;
					ejecutarAJAX('json/option-combo2.json',object,function(respuesta){
						app.fillCombo(globals.dom.combo2,respuesta,globals.keyValues.combo2);
					});
				}

			});

			globals.dom.submitBtn.on('click',function(){
				
				if (globals.options.email === true && globals.options.name === true && globals.options.combo1 === true && globals.options.combo2 === true) {

					globals.dom.myForm.remove();

					globals.dom.message.show();

				}

				// email

				if(globals.options.email === false){
					console.log('wrong email');
				} else {
					console.log('right email');
				}

				// name
				if(globals.options.name === false){
					console.log('wrong name');
				} else {
					console.log('right name');
				}

				// combo1
				if(globals.options.combo1 === false){
					console.log('wrong combo1');
				} else {
					console.log('right combo1');
				}

				// combo2
				if(globals.options.combo2 === false){
					console.log('wrong combo2');
				} else {
					console.log('right combo2');
				}
				app.validate();
			});

		}

	};

}

$(document).ready(function(){

  var app = GetApp();

  app.init();

});