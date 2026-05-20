document.getElementById("btn-buscar").innerText = config.search;
document.getElementById("nombre").placeholder = config.name + "...";
document.getElementById("logo").innerHTML = `${config.site[0]}<span>${config.site[1]}</span>${config.site[2]}`;
document.getElementById("footer").innerText = config.copyRight;

const urlParams = new URLSearchParams(window.location.search);
const ciUrl = urlParams.get('ci');

if(ciUrl){
    const scriptPerfil = document.createElement('script');
    scriptPerfil.src = `${ciUrl}/profile.json`;
    scriptPerfil.onload = function(){
        llenarDatosPerfil(profile);
    };
    document.head.appendChild(scriptPerfil);
}

function llenarDatosPerfil(profile) {
    document.getElementById("foto-grande").src = `${profile.ci}/${profile.ci}Big${profile.image_ext}`;
    document.getElementById("foto-pequena").src = `${profile.ci}/${profile.ci}Small${profile.image_ext}`;
    document.getElementById("nombre-perfil").innerText = profile.name;
    document.getElementById("descripcion-perfil").innerText = profile.description;

    document.getElementById("etiq-color").innerText = config.color + ":";
    document.getElementById("val-color").innerText = profile.color;

    if(profile.book.length > 1){
        document.getElementById("etiq-libro").innerText = config.book[1] + ":";
        document.getElementById("val-libro").innerText = profile.book.join(", ");
    }else {
        document.getElementById("etiq-libro").innerText = config.book[0] + ":";
        document.getElementById("val-libro").innerText = profile.book;
    }

    if(profile.music.length > 1){
        document.getElementById("etiq-musica").innerText = config.music[1] + ":";
        document.getElementById("val-musica").innerText = profile.music.join(", ");
    }else {
        document.getElementById("etiq-musica").innerText = config.music[0] + ":";
        document.getElementById("val-musica").innerText = profile.music;
    }

    if(profile.video_game.length > 1){
        document.getElementById("etiq-juego").innerText = config.video_game[1] + ":";
        document.getElementById("val-juego").innerText = profile.video_game.join(", ");
    }else {
        document.getElementById("etiq-juego").innerText = config.video_game[0] + ":";
        document.getElementById("val-juego").innerText = profile.video_game;
    }

    document.getElementById("etiq-lenguaje").innerText = config.language + ":";
    document.getElementById("val-lenguaje").innerText = profile.language.join(", ");

    document.getElementById("etiq-email").innerHTML = config.email.replace("[email]", `<a href="mailto:${profile.email}">${profile.email}</a>`);
}