'use strict';
var Post = (function () {
    function Post() {
    }
    return Post;
})();
;
var postavuto;
function carica(nomepost) {
    console.log(nomepost);
    $.get("/api/nomeblog", function (nome) {
        console.log(nome);
        $("#navbar-brand").text(nome);
    });
    $.getJSON("/api/posts", function (posts) {
        postavuto = posts;
        for (var i = 0; i < posts.length; i++) {
            console.log(posts[i]);
            var elemento = document.createElement('li');
            if (nomepost != posts[i].titolo)
                elemento.className = "nav-item";
            else
                elemento.className = "nav-item active";
            var link = document.createElement('a');
            link.className = "nav-link";
            link.href = "/posts/" + posts[i].id.toString();
            link.innerText = posts[i].titolo;
            elemento.appendChild(link);
            var navbarList = document.getElementById("navbarList");
            navbarList.appendChild(elemento);
        }
    });
}
