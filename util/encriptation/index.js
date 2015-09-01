/**
*	Este modulo sirve para encriptar y desencriptar lo que se requiera...
*	Si es necesario cambiar la key por defecto tiene que ser en la instalación.
*	Ya que despues no se podrá por que entonces no se podría decifrar lo que
*	se ha guardado en base de datos.
*
*	@version 0.0.1
*	@author Alan Olivares
*/

var crypto	= require("crypto");
var configEncriptacion = require("./ConfigEncriptation");

var SIACCEncriptation = function(){};

SIACCEncriptation.prototype.openSSLCipherAlgorithm =
				   configEncriptacion.openSSLCipherAlgorithm;
SIACCEncriptation.prototype.key = configEncriptacion.key;

/*	Aqui se recibe la palabra que se cifrará	*/
SIACCEncriptation.prototype.cipher = function(palabraAEncriptar) {
	try{
		var cipher 	 = crypto.createCipher(
			SIACCEncriptation.prototype.openSSLCipherAlgorithm,
			SIACCEncriptation.prototype.key);
		var cifrado  = cipher.update(palabraAEncriptar, "utf8", "hex");
		cifrado 	  += cipher.final("hex");
	}catch(e){
		console.log(e.message);
	}
	return cifrado;
};

/*	Aqui se recibe la palabra que se decifrará			*/
SIACCEncriptation.prototype.decipher = function(palabraADecifrar){
	try{
		var decipher = crypto.createDecipher(
			SIACCEncriptation.prototype.openSSLCipherAlgorithm,
			SIACCEncriptation.prototype.key);
		var palabraDecifrada  = decipher.update(palabraADecifrar, "hex", "utf8");
		palabraDecifrada	 += decipher.final("utf8");
	}catch(e){
		console.log(e.message + "  -->  " + palabraADecifrar);
	}
	return palabraDecifrada;
};

module.exports = new SIACCEncriptation();
