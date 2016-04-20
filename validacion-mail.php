<?php
	if(isset($_POST['boton'])){
		$errors = array();// Declaramos un array para almacenar los errores
		if($_POST['nombre'] == ''){
			$errors[1] = '<span class="error">Ingrese su nombre</span>';
		}else if($_POST['email'] == '' or !preg_match("/^[a-zA-Z0-9_\.\-]+[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/", $_POST['email'])){
			$errors[2] = '<span class="error">Ingrese un email correcto</span>';
		}else if($_POST['asunto'] == ''){
			$errors[3] = '<span class="error">Ingrese un asunto</span>';
		}else if($_POST['mensaje'] == ''){
			$errors[4] = '<span class="error">Ingrese un mensaje</span>';
		}else{
			//Si todo esta OK envía email
		}else{
			$dest     = "janioisacura@gmailo.com"; //email destino
			$nombre   = $_POST['nombre'];
			$email    = $_POST['email'];
			$asunto   = $_POST['asunto'];
			$cuerpo   = $_POST['mensaje'];// Cuerpo del mensaje
			// Cabeceras del correo para que no llegue a spam
			$headers  = "From: $nombre <$email>\r\n";// Remitente
			$headers  = "X-mailer: PHP5\n";
			$headers  = 'MIME-Version 1.0' . "\n";
			$headers  = 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; //

			if(mail($dest,$asunto,$cuerpo,$headers)){// comparación para ver si envía el mail o no(\r\n = salto de línea)
				$result = '<div class="result_ok">Email enviado correctamente</div>';
				// Si el email fue enviado correctamente reseteamos lo que el usuario escribio:
				$_POST['nombre'] = '';
				$_POST['email'] = '';
				$_POST['asunto'] = '';
				$_POST['mensaje'] = '';
			}else{
				$result = '<div class="result_fail">Hubo un error al enviar el mensaje</div>';
			}
		}
	}
?>

<html>
	<head>
		<title>Formulario Validación</title>
		<link rel='stylesheet' type='text/css' href='css/formulario-validacion.css'>
		<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>
		<script src='formulario-validacion.js'></script>
	</head>
	<body>
	<form class='contacto' method='POST' action='index.php'>
		<div>
			<label>Nombre: </label>
			<input type='text' name='nombre' class='nombre' value='<?php echo $_POST['nombre']; ?>'>
			<?php echo $errors[1]; ?>
		</div>
		<div>
			<label>Email: </label>
			<input type='text' name='email' class='email' value='<?php echo $_POST['email']; ?>'>
			<?php echo $errors[2]; ?>
		</div>
		<div> 
			<label>Asunto: </label>
			<input type='text' name='asunto' class='asunto' value='<?php echo $_POST['asunto']; ?>'>
			<?php echo $errors[3]; ?>
		</div>
		<div>
			<label>Mensaje: </label>
			<textarea type='text' name='mensaje' class='mensaje' rows='6' value='<?php echo $_POST['mensaje']; ?>'></textarea>
			<?php echo $errors[4]; ?>
		</div>
		<div>
			<input type="submit" name='boton' class='boton' value='Envia mensaje'>
		</div>
		<? php echo $result; ?>
	</form>
	</body>
</html>