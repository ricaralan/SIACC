var generateId =  function () {

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

  this.generate = function(requiredLength) {
    var letters = [];
    addToArrayAlphabetUpperCase(letters)
    addToArrayNaturalNumbers(letters)
    cadena = "";
    for(var i = 0; i < requiredLength; i++) {
      cadena += letters[getRandomNumer(0, letters.length -1)];
    }
    return cadena;
  };

}

module.exports = new generateId();
