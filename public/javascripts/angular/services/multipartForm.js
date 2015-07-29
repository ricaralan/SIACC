SIACCApp.service("multipartForm", ["$http", function($http) {

  this.post = function(uploadURI, data, success) {
    $http.post(uploadURI, this.getFormData(data),{
      transformRequest : angular.indentity,
      headers : {
        "Content-Type" : undefined
      }
    }).success(success);
  };

  this.put = function(uploadURI, data, success) {
    $http.put(uploadURI, this.getFormData(data),{
      transformRequest : angular.indentity,
      headers : {
        "Content-Type" : undefined
      }
    }).success(success);
  };

  this.getFormData = function(data) {
    var fd = new FormData();
    for(key in data) {
      fd.append(key, data[key]);
    }
    return fd;
  };

}]);
