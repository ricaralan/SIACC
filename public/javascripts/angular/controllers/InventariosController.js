SIACCApp.controller("InventariosController", ["$scope", "$http", "scopes", "$timeout","util", function($scope, $http, scopes, $timeout, util) {

  scopes.set("InventariosController", $scope);

  $scope.areas = [];
  $scope.idArea;
  $scope.area;
  $scope.tiposInventarios = [];
  $scope.inventarios = [];
  $scope.opcAccion;
  $scope.tipoInventarioActual;
  $scope.numInventarioEditar;
  $scope.crearInventario;
  $scope.findUsuarios = [];
  $scope.resguardo = {};
  $scope.inciarResguardo = true;
  $scope.socket = io();

  $scope.getAreas = function() {
    $http.get("/areas/getAreas").success(function(areas) {
      $scope.areas = areas;
    });
  };

  $scope.setArea = function(idArea) {
    $scope.idArea = idArea;
    $scope.inventarios = [];
    $scope.getDatosArea(idArea);
  };

  $scope.getDatosArea = function(idArea) {
    $http.get("/areas/getArea/"+idArea).success(function(area) {
      $timeout(function() {
        $scope.area = area;
      },0);
    });
  };

  $scope.getTiposInventario = function() {
    $http.get("/tipo_inventario/getTiposInventarios")
      .success(function(tipos) {
      $scope.tiposInventarios = tipos;
      setTimeout(function() {
        $('ul.tabs').tabs();
      }, 200);
    });
  };

  $scope.getInventarioTipoArea = function(tipoInventario) {
    if(!util.empty(tipoInventario)) {
      $scope.tipoInventarioActual = tipoInventario;
    }
    $http.get("/inventarios/getInventarioTipoArea/"+$scope.idArea+"/"+$scope.tipoInventarioActual)
    .success(function(inventarios) {
      $timeout(function() {
        $scope.inventarios = inventarios;
      });
    });
  };

  $scope.getTipoInventario = function(idTipoInventario){
    for(var i = 0; i < $scope.tiposInventarios.length; i++) {
      if($scope.tiposInventarios[i].id_tipo_inventario == idTipoInventario) {
        return $scope.tiposInventarios[i];
      }
    }
    return null;
  };

  $scope.setDatosCrearInventario = function() {
    $timeout(function() {
      $scope.opcAccion = "Crear";
      $scope.formInventario = {};
      $scope.crearInventario = true;
    }, 0);
    $("#modalOpcionesInventarios").openModal();
  };

  $scope.setDatosEditarInventario = function(inventario) {
    $timeout(function() {
      $scope.numInventarioEditar = inventario.num_inventario;
      $scope.opcAccion = "Editar";
      $scope.crearInventario = false;
      $scope.formInventario = inventario;
      $scope.formInventario.inv_usar_control_acceso = $scope.formInventario.inv_usar_control_acceso==1;
    }, 0);
    $("#modalOpcionesInventarios").openModal();
  };

  $scope.opcionInventario = function() {
    $scope.formInventario.inv_id_area = $scope.idArea;
    if($scope.validarFormulario()) {
      if($scope.crearInventario) {
        $http.post("/inventarios/create", {jsonInventario : $scope.formInventario})
        .success(function(data) {
          if(data.success) {
            $scope.socket.emit("changeOnInventarios", {});
            Materialize.toast("Creación exitosa!", 2000);
            $("#modalOpcionesInventarios").closeModal();
          } else {
            if(data.existInv) {
              Materialize.toast("El número de inventario ya existe", 2000);
            } else {
              Materialize.toast("Ocurrio un error desconocido...", 2000);
            }
          }
        });
      } else {
        $http.put("/inventarios/update", {
          jsonInventario : $scope.formInventario,
          idInventario   : $scope.numInventarioEditar
          }).success(function(data) {
          if(data.success) {
            $scope.socket.emit("changeOnInventarios", {});
            Materialize.toast("Edición exitosa!", 2000);
            $("#modalOpcionesInventarios").closeModal();
          } else {
            Materialize.toast("Ocurrio un error", 2000);
          }
        });
      }
    } else {
      Materialize.toast("Formulario no validado", 2000);
    }
  };

  $scope.eliminarInventario = function(idInventario) {
    if(confirm("¿Realmente deseas eliminar?")) {
      $http.delete("/inventarios/delete/"+idInventario).success(function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnInventarios", {});
          Materialize.toast("Eliminación exitosa!", 2000);
        }
      });
    }
  };

  $scope.darBajaInventario = function(idInventario) {
    if(confirm("¿Realmente deseas dar de baja el inventario?")) {
      $http.put("/inventarios/darBaja/"+idInventario).success(function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnInventarios", {});
          Materialize.toast("Baja exitosa!", 2000);
        }
      });
    }
  };

  $scope.validarFormulario = function() {
    validacion = true;
    if($scope.getTipoInventario($scope.formInventario.inv_tipo).tin_es_computadora) {
      // Validar los numericos
      validacion = (
        util.isNumber($scope.formInventario.inv_num_maq) &&
        util.isNumber($scope.formInventario.inv_ram) &&
        util.isNumber($scope.formInventario.inv_vel_procesador) &&
        util.isNumber($scope.formInventario.inv_capacidad)
      );
    }
    return validacion && (
      !util.empty($scope.formInventario.num_inventario) &&
      !util.empty($scope.formInventario.inv_no_serie) &&
      !util.empty($scope.formInventario.inv_marca)
    );
  };

  $scope.getColorStatus = function(status) {
    // Mal estado
    color = "#AD1D07";
    if(status == 1) {
      // Buen estado
      color = "#128F39";
    } else if(status == 2) {
      // Mantenimiento
      color = "#D8BC02";
    }
    return color;
  }

  $scope.opcResguardo = function(idInventario, idResguardo) {
    $scope.resguardo = {
      num_inventario : idInventario,
      id_resguardo : idResguardo
    };
    if(util.empty(idResguardo)) {
      // Iniciar
      $scope.inciarResguardo = true;
    } else {
      // Finalizar
      $scope.inciarResguardo = false
      $scope.getDataResguardo(idResguardo);
    }
    $("#modalResguardoInventario").openModal();
  };

  $scope.getUsuariosByText = function(text) {
    if(!util.empty(text)){
      $http.get("/usuarios/getUsuariosByTextLimit/"+text+"/0/5").success(function(usuarios) {
        $scope.usuarioResguardo = (usuarios.length>0)?usuarios[0].id_usuario:null;
        $scope.findUsuarios = usuarios;
      });
    } else {
      $scope.usuarioResguardo = null;
      $scope.findUsuarios = [];
    }
  };

  $scope.resguardar = function() {
    if($scope.inciarResguardo) {
      $scope.resguardo.rin_id_usuario = $scope.usuarioResguardo;
      $http.post("/inventarios/createResguardo/"+$scope.resguardo.num_inventario+"/"+$scope.usuarioResguardo)
      .success(function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnInventarios", {});
          $scope.resguardo = {};
          Materialize.toast("Asignación exitosa!", 2000);
          $("#modalResguardoInventario").closeModal();
        }
      });
    } else {
      $http.put("/inventarios/finalizarResguardo/"+$scope.resguardo.id_resguardo).success(function(data) {
        if(data.success) {
          $scope.socket.emit("changeOnInventarios", {});
          $scope.resguardo = {};
          Materialize.toast("Finalización exitosa!", 2000);
          $("#modalResguardoInventario").closeModal();
        }
      });
    }
  };

  $scope.getDataResguardo = function(idResguardo) {
    $http.get("/inventarios/getDataResguardo/"+idResguardo).success(function(resguardo) {
      $scope.dataResguardo = resguardo;
    });
  };

  $scope.getTiposInventario();


  /**
  * LISTEN SOCKETS
  **/
  $scope.socket.on("changeOnInventarios", function(data) {
    $scope.getInventarioTipoArea();
  });


}]);
