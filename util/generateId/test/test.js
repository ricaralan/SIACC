var assert = require("assert");

addToArrayAlphabetUpperCase = function(array) {
  try{
    for(var j = 65; j < 91; j++) {
      array.push(String.fromCharCode(j));
    }
  }catch(e) {
    console.log(e);
  }
};

addToArrayAlphabetDownCase = function(array) {
  try{
    for(var j = 97; j < 123; j++) {
      array.push(String.fromCharCode(j));
    }
  }catch(e) {
    console.log(e);
  }
};

addToArrayNaturalNumbers = function(array) {
  try{
    for(var i = 0; i <=9; i++) {
      array.push(i);
    }
  }catch(e) {
    console.log(e);
  }
};

getRandomNumer = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

generateId = function(requiredLength) {
  var letters = [];
  var letter = String.fromCharCode(65,66,67);
  addToArrayAlphabetUpperCase(letters)
  addToArrayNaturalNumbers(letters)
  cadena1 = "";
  cadena2 = "";
  for(var i = 0; i < requiredLength; i++) {
    cadena1 += letters[getRandomNumer(0, letters.length -1)];
    cadena2 += letters[getRandomNumer(0, letters.length -1)];
  }
  assert.notEqual(cadena1, cadena2);
  console.log("TEST EXITOSO!");
};

new generateId(10);
