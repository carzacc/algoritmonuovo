'use strict';
class Post {
  titolo: string;
  id: number;
  idautore: number;
  testo: string;
};
var postavuto;
function carica(nomepost: String) {
  console.log(nomepost);
  $.getJSON("/api/posts", function (posts: Post[]) {
    postavuto = posts;

    for (var i = 0; i < posts.length; i++) {
      console.log(posts[i]);
      var elemento: HTMLLIElement = document.createElement('li');
      if(nomepost != posts[i].titolo) elemento.className="nav-item";
      else elemento.className="nav-item active";
      var link: HTMLAnchorElement = document.createElement('a');
      link.className="nav-link";
      link.href = "/posts/" + posts[i].id.toString();
      link.innerText = posts[i].titolo;
      elemento.appendChild(link);
      var navbarList: HTMLElement = document.getElementById("navbarList");
      navbarList.appendChild(elemento);
    }
  });
}
