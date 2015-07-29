SIACCApp.directive("horarioSemana", function($parse) {
  return {
    restrict : "E",
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
          td.style.position = "relative";
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
