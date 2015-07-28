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

AppModule.directive("horarioSemana", function() {
  return {
    restrict : "E",
    template : "<div></div>",
    link : function(scope, element, attributes) {
      diasSemana = 7;
      horaInicio = 7;
      horaFin    = 20;
      arrayDias = ["H", "L", "M", "M", "J", "V", "S", "D"];
      caja  = document.getElementById(attributes.id);
      tabla = document.createElement("table");
      caja.appendChild(tabla);
      for(var j = horaInicio - 1; j <= horaFin; j++) {
        tr = document.createElement("tr");
        for(var i = 0; i <= diasSemana; i++) {
          td = document.createElement("td");
          td.setAttribute("d", j);
          td.setAttribute("h", i);
          if (j == (horaInicio - 1)) {
            td.innerHTML = arrayDias[i];
            td.style.backgroundColor = "#2B8DAC";
            td.id = "h" + i;
          } else if(i == 0) {
            td.innerHTML = j;
            td.id = "d" + j;
            td.style.width = "30px";
            td.style.backgroundColor = "#2B8DAC";
          } else {
            td.addEventListener("mouseover", function() {
              dia  = document.getElementById("d"+this.getAttribute("d"));
              hora = document.getElementById("h"+this.getAttribute("h"));
              dia.style.backgroundColor = "#fff";
              hora.style.backgroundColor = "#fff";
              this.style.backgroundColor = "#2B8DAC";
            });
            td.addEventListener("mouseleave", function() {
              dia  = document.getElementById("d"+this.getAttribute("d"));
              hora = document.getElementById("h"+this.getAttribute("h"));
              dia.style.backgroundColor = "#2B8DAC";
              hora.style.backgroundColor = "#2B8DAC";
              this.style.backgroundColor = "#fff";
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
