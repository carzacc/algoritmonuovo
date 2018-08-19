/* File per gestire l'aggiunta di partite
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

var idutente;
function admin() {
    $.getJSON("/api/id/nome/"+getCookie("username"), function(utente) {
        idutente = utente;
        return false;
    });
    return false;
}
$.ajaxSetup({
    contentType: "application/json"
})

$("#altra").click(function() {
  let sqCasa = document.createElement("input");
  sqCasa.className = "sqCasa";
  sqCasa.placeholder = "Squadra in Casa";
  sqCasa.required = true;
  let sqTrasferta = document.createElement("input");
  sqTrasferta.className = "sqTrasferta";
  sqTrasferta.placeholder = "Squadra in Trasferta";
  sqTrasferta.required = true;
  let golCasa = document.createElement("input");
  golCasa.className = "golCasa";
  golCasa.placeholder = "Gol Squadra in Casa";
  golCasa.required = true;
  let golTrasferta = document.createElement("input");
  golTrasferta.className = "golTrasferta";
  golTrasferta.placeholder = "Gol Squadra in Trasferta";
  golTrasferta.required = true;
  $("#partite").append(document.createElement("br"));
  $("#partite").append(document.createElement("br"));
  $("#partite").append(sqCasa);
  $("#partite").append(sqTrasferta);
  $("#partite").append(document.createElement("br"));
  $("#partite").append(golCasa);
  $("#partite").append(golTrasferta);
  return false;
})

function signOut() {
  setCookie("token", "");
  setCookie("username", "");
  window.location.href = "/login.html";
}


$("#invia").click(function() {
  let giornata = $("#giornata").val();
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: "/api/giornata",
    data: `{
          "token": "${getCookie("token")}",
          "idutente": "${idutente.toString()}",
          "giornata": "${giornata}"
          }`,
    processData: false
  });
  let squadreCasa = document.getElementsByClassName("sqCasa");
  let squadreTrasferta = document.getElementsByClassName("sqTrasferta");
  let golCasa = document.getElementsByClassName("golCasa");
  let golTrasferta = document.getElementsByClassName("golTrasferta");
  for(let i = 0, l = squadreCasa.length; i < l; i++) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: "/api/partita",
      data: `{
            "token": "${getCookie("token")}",
            "idutente": "${idutente.toString()}",
            "giornata": "${giornata}",
            "team1": "${$(squadreCasa[i]).val()}",
            "team2": "${$(squadreTrasferta[i]).val()}",
            "goal1": "${$(golCasa[i]).val()}",
            "goal2": "${$(golTrasferta[i]).val()}"
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
  console.log("prova");
     return false;
});
