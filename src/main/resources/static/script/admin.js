/* file home page admin
*
* Copyright 2018 Carmine Zaccagnino
*
* Licensed under the EUPL, Version 1.1 or – as soon they
* will be approved by the European Commission - subsequent
* versions of the EUPL (the "Licence");
* You may not use this work except in compliance with the
* Licence.
* You may obtain a copy of the Licence at:
* https://joinup.ec.europa.eu/software/page/eupl
*
* Unless required by applicable law or agreed to in
* writing, software distributed under the Licence is
* distributed on an "AS IS" basis,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
* express or implied.
* See the Licence for the specific language governing
* permissions and limitations under the Licence.
*/

var idutente;

function setCookie(nome, valore) {
   document.cookie = nome + "=" + valore+";path=/";
}

function getCookie(cname) {
   var name = cname + "=";
   var decodedCookie = decodeURIComponent(document.cookie);
   var ca = decodedCookie.split(';');
   for(var i = 0; i <ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0) == ' ') {
           c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
           return c.substring(name.length, c.length);
       }
   }
   return "";
}
function cookieIsSet(name) {
   return !(getCookie(name) == "")
}

if(!cookieIsSet("token")) {
  window.location.href = "/login.html";
} else {
  admin();
}

function elimina(id) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: "/api/cancella",
      data: `{
            "token": "${getCookie("token")}",
            "idutente": "${idutente.toString()}",
            "id": "${id.toString()}",
            }`,
      processData: false,
      success: function(data) {
        if(data == false) {
            alert("Si è verificato un errore");
        }
        else {
            window.location.href = "/admin.html";
        }
        return false;
      },
      error: function() {
        alert("ERRORE");
        return false;
      }
     });

}

function admin() {
   $.getJSON("/api/id/nome/"+getCookie("username"), function(utente) {
       idutente = utente;
       return false;
   });
  let tBody = document.getElementById("tableBody");
  let row;
  $.getJSON("/api/partite", function(partite) {
    $.each(partite, function() {
      console.log(this);
      let cellaGiornata = document.createElement("td");
      let cellaSquadra1 = document.createElement("td");
      let cellaSquadra2 = document.createElement("td");
      let cellaRisultato = document.createElement("td");
      let cellaCancella =document.createElement("td");
      row = document.createElement("tr");
      cellaGiornata.innerText = this.giornata;
      cellaSquadra1.innerText = this.team1;
      cellaSquadra2.innerText = this.team2;
      cellaRisultato.innerText = this.goal1 + "-" + this.goal2;
      let linkcella = document.createElement('a');
      let imgcella = document.createElement('img');
      linkcella.href = "#";
      linkcella.onclick = elimina(this.id);
      imgcella.width="20px";
      imgcella.height="20px";
      imgcella.src="/X.png";
      linkcella.appendChild(imgcella);
      cellaCancella.appendChild(linkcella);
      row.appendChild(cellaGiornata);
      row.appendChild(cellaSquadra1);
      row.appendChild(cellaSquadra2);
      row.appendChild(cellaRisultato);
      row.appendChild(cellaCancella);
      tBody.appendChild(row);
    });
  });
  return false;
}

function signOut() {
  setCookie("token", "");
  setCookie("username", "");
  window.location.href = "/login.html";
}
