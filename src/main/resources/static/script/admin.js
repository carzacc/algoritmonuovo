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

function admin() {
  let tBody = document.getElementById("tableBody");
  let row;
  $.getJSON("/api/partite", function(partite) {
    $.each(partite, function() {
      console.log(this);
      let cellaGiornata = document.createElement("td");
      let cellaSquadra1 = document.createElement("td");
      let cellaSquadra2 = document.createElement("td");
      let cellaRisultato = document.createElement("td");
      row = document.createElement("tr");
      cellaGiornata.innerText = this.giornata;
      cellaSquadra1.innerText = this.team1;
      cellaSquadra2.innerText = this.team2;
      cellaRisultato.innerText = this.goal1 + "-" + this.goal2;
      row.appendChild(cellaGiornata);
      row.appendChild(cellaSquadra1);
      row.appendChild(cellaSquadra2);
      row.appendChild(cellaRisultato);
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
