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
  let data;
  let autore;
  $.getJSON("/api/posts", function(posts) {
    $.each(posts, function() {
      console.log(this);
      //autore = datiautore.nickName;
      data = new Date(this.dataeora*1000);
      let cellaid = document.createElement("td");
      let cellautore = document.createElement("td");
      let cellatitolo = document.createElement("td");
      let celladataeora = document.createElement("td");
      row = document.createElement("tr");
      cellaid.innerText = this.id;
      cellatitolo.innerText = this.titolo;
      cellautore.innerText = this.idautore;
      celladataeora.innerText = data.getDate().toString() + "/" + data.getMonth().toString() +
                          "/" + data.getFullYear().toString() + " alle ore " +
                          data.getHours().toString() + ":" + data.getMinutes().toString() +
                          ":" + data.getSeconds().toString();
      row.appendChild(cellaid);
      row.appendChild(cellatitolo);
      row.appendChild(cellautore);
      row.appendChild(celladataeora);
      tBody.appendChild(row);
    });
  });
  return false;
}

/* Esempio input:
[
	{
		"dataeora": 1527967885,
		"titolo": "Prova Post CMS",
		"lead": "primo articolo",
		"testo": "Questo è un articolo di prova dal DB",
		"idautore": 1,
		"id": 1
	},
	{
		"dataeora": 1527967885,
		"titolo": "Seconda Prova Post CMS",
		"lead": "secondo articolo",
		"testo": "Questo è un altro un articolo di prova dal DB",
		"idautore": 1,
		"id": 2
	},
	{
		"dataeora": 1527967885,
		"titolo": "Un'altra prova",
		"lead": "terzo articolo",
		"testo": "Un altro articolo, prova di come si può modificare tutto e tutte le pagine in modo semplice",
		"idautore": 1,
		"id": 3
	}
]
*/

function signOut() {
  setCookie("token", "");
  setCookie("username", "");
  window.location.href = "/login.html";
}
