var AppModule = angular.module("AppModule", []);


AppModule.directive("appForUsers", function() {
  var init = function (scope, element, attributes) {
      $(".button-collapse").sideNav();
      $('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: false // Displays dropdown below the button
        }
      );
      $(document).ready(function(){
        $('.collapsible').collapsible({
          accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal({
          dismissible: true, // Modal can be dismissed by clicking outside of the modal
          opacity: .5, // Opacity of modal background
          in_duration: 300, // Transition in duration
          out_duration: 300, // Transition out duration
          ready: function() {  }, // Callback for Modal open
          complete: function() {  } // Callback for Modal close
        });
        $('select').material_select();
        $('.datepicker').pickadate({
          selectMonths: true,
          selectYears: 15,
          format: 'yyyy-mm-dd',
          min: true
        });
      });
      document.getElementById("contentApp").removeAttribute("hidden");
      document.getElementById("loadPage").remove();
	};
  return {
    restrict : "E",
    templateUrl : "/prefabs/app-for-users.html",
    link : init,
    transclude : true
  };
});

AppModule.directive("cardLineUser", function() {
  return {
    restrict : "E",
    templateUrl : "/prefabs/card-line-user.html",
    link : function(scope, element, attributes) {
      scope.userCardLine = JSON.parse(attributes.user);
    }
  };
});

AppModule.directive("cardDetailUser", function() {
  return {
    restrict : "E",
    templateUrl : "/prefabs/card-detail-user.html",
    link : function(scope, element, attributes) {
      attributes.$observe("user", function() {
        scope.userCardDetail = JSON.parse(attributes.user);
      });
    }
  };
});

AppModule.directive("horarioSemana", function($parse) {
  return {
    restrict : "E",
    //template : "",
    link : function(scope, element, attributes) {
      horaInicio = 7;
      horaFin    = 20;
      diasSemana = ["H", "L", "M", "M", "J", "V", "S"];
      caja  = document.getElementById(attributes.id);
      tabla = document.createElement("table");
      caja.appendChild(tabla);
      for(var j = horaInicio - 1; j <= horaFin; j++) {
        tr = document.createElement("tr");
        for(var i = 0; i < diasSemana.length; i++) {
          td = document.createElement("td");
          td.setAttribute("h", j);
          td.setAttribute("d", i);
          td.id = "d"+td.getAttribute("d")+"-h"+td.getAttribute("h");
          if (j == (horaInicio - 1)) {
            td.innerHTML = diasSemana[i];
            td.style.backgroundColor = "#2B8DAC";
            td.id = "h" + i;
          } else if(i == 0) {
            td.innerHTML = j;
            td.id = "d" + j;
            td.style.width = "30px";
            td.style.backgroundColor = "#2B8DAC";
          } else {
            // TODO hay mucho código repetitivo... Hay que automatizar esto (utilizar más funciones)
            td.addEventListener("mouseover", function() {
              dia  = document.getElementById("d"+this.getAttribute("h"));
              hora = document.getElementById("h"+this.getAttribute("d"));
              dia.style.backgroundColor = "#fff";
              hora.style.backgroundColor = "#fff";
              this.style.backgroundColor = "#2B8DAC";
            });
            td.addEventListener("mouseleave", function() {
              dia  = document.getElementById("d"+this.getAttribute("h"));
              hora = document.getElementById("h"+this.getAttribute("d"));
              dia.style.backgroundColor = "#2B8DAC";
              hora.style.backgroundColor = "#2B8DAC";
              this.style.backgroundColor = "#fff";
            });
            td.className = "celdaHorario";
            td.addEventListener("click", function() {
              if(this.getAttribute("selected") == null) {
                this.setAttribute("selected", "true");
                this.style.boxShadow = "0px 0px 13px 7px rgba(0, 0, 0, .3) inset";
              } else {
                this.removeAttribute("selected");
                this.style.boxShadow = "";
              }
              eval("scope."+attributes.callback)({
                add  : (this.getAttribute("selected") != null),
                area : document.getElementById(attributes.id).getAttribute("area"),
                usuario : document.getElementById(attributes.id).getAttribute("usuario"),
                id : this.id,
                diaHora : {
                  h  : this.getAttribute("h"),
                  d  : this.getAttribute("d")
                }
              });
            });
          }
          td.style.borderRight = "1px solid #d0d0d0";
          td.style.textAlign = "center";
          tr.appendChild(td);
        }
        tr.style.borderBottom = "1px solid #d0d0d0";
        tabla.appendChild(tr);
      }
      tabla.style.width = "100%";
    }
  };
});
