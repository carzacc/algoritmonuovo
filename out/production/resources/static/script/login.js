'use strict';


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
if(cookieIsSet("token")) {
  window.location.href = "/admin.html";
}
$("#submitButton").click(function() {
  console.log("Accesso in corso");
  var usernameIn = $("#inputEmail").val();
  var passwordIn = $("#inputPassword").val();
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: "/api/login",
    data: "{\"username\": \"" + usernameIn + "\", \"password\": \"" + passwordIn + "\"}",
    processData: false,
    success: function(data) {
      console.log("post fatto");
      if(data == "false") alert("Password Sbagliata");
      else {
        console.log("Giusto");
        setCookie("token", data);
        setCookie("username", usernameIn);
        window.location.href = "/admin.html";
      }
    },
    error: function() {
      alert("ERRORE");
    }
  });
  return false;
});
