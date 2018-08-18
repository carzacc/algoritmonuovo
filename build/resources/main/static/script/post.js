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

var idautore;
function admin() {
    $.getJSON("/api/utente/nome/"+getCookie("username"), function(utente) {
        idautore = utente.id;
        return false;
    });
    return false;
}
$.ajaxSetup({
    contentType: "application/json"
})
$("#invia").click(function() {
    console.log("prova");
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "/api/pubblica",
        data: `{
              "token": "${getCookie("token")}",
              "lead": "${$("#lead").val()}",
              "titolo": "${$("#titolo").val()}",
              "idautore": "${idautore.toString()}",
              "testo": "${$("#testo").val()}"
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
     return false;
});



function signOut() {
  setCookie("token", "");
  setCookie("username", "");
  window.location.href = "/login.html";
}
