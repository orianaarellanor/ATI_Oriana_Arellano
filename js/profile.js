//Prueba 1: Contexto Global
console.log("Prueba 1 - Contexto Global:", this);

const urlParams = new URLSearchParams(window.location.search);
let lang = urlParams.get('lang') || 'ES';
const ciUrl = urlParams.get('ci');

const scriptConfig = document.createElement('script');
scriptConfig.src = `conf/config${lang}.json`;

scriptConfig.onload = function () {

    document.getElementById("btn-buscar").innerText = config.search;
    document.getElementById("nombre").placeholder = config.name + "...";
    document.getElementById("logo").innerHTML = `${config.site[0]}<span>${config.site[1]}</span>${config.site[2]}`;
    document.getElementById("footer").innerText = config.copyRight;

    document.querySelector("nav a").href = `index.html?lang=${lang}`;

    if (ciUrl) {
        const scriptPerfil = document.createElement('script');
        scriptPerfil.src = `Profiles/${ciUrl}/profile.json`;
        scriptPerfil.onload = function () {
            llenarDatosPerfil(profile);
        };
        document.head.appendChild(scriptPerfil);
    }

    //Redirigir al listado y efectuar la búsqueda automáticamente
    const formulario = document.querySelector("nav form");
    const inputBusqueda = document.getElementById("nombre");

    if (formulario && inputBusqueda) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const textoBuscado = inputBusqueda.value.trim();
            window.location.href = `index.html?lang=${lang}&search=${encodeURIComponent(textoBuscado)}`;
        });
    }
    
    //Menú desplegable
    if (document.getElementById("texto-perfil")) {
            document.getElementById("texto-perfil").innerText = config.profile;
        }
        const botonMenu = document.querySelector(".solo-movil");
        const navBar = document.querySelector("nav");

        if (botonMenu && navBar) {
            botonMenu.addEventListener("click", function() {
                //Prueba 2: Event Listener
                console.log("Prueba 2 - Event Listener:", this);

                navBar.classList.toggle("menu-abierto");
            });
        }
};

document.head.appendChild(scriptConfig);

function llenarDatosPerfil(profile) {
    document.title = profile.name;
    document.getElementById("foto-grande").src = `Profiles/${profile.ci}/${profile.ci}Big${profile.image_ext}`;
    document.getElementById("foto-pequena").src = `Profiles/${profile.ci}/${profile.ci}Small${profile.image_ext}`;
    document.getElementById("nombre-perfil").innerText = profile.name;
    document.getElementById("descripcion-perfil").innerText = profile.description;

    document.getElementById("etiq-color").innerText = config.color + ":";
    document.getElementById("val-color").innerText = profile.color;

    if (profile.book.length > 1) {
        document.getElementById("etiq-libro").innerText = config.book[1] + ":";
        document.getElementById("val-libro").innerText = profile.book.join(", ");
    } else {
        document.getElementById("etiq-libro").innerText = config.book[0] + ":";
        document.getElementById("val-libro").innerText = profile.book;
    }

    if (profile.music.length > 1) {
        document.getElementById("etiq-musica").innerText = config.music[1] + ":";
        document.getElementById("val-musica").innerText = profile.music.join(", ");
    } else {
        document.getElementById("etiq-musica").innerText = config.music[0] + ":";
        document.getElementById("val-musica").innerText = profile.music;
    }

    if (profile.video_game.length > 1) {
        document.getElementById("etiq-juego").innerText = config.video_game[1] + ":";
        document.getElementById("val-juego").innerText = profile.video_game.join(", ");
    } else {
        document.getElementById("etiq-juego").innerText = config.video_game[0] + ":";
        document.getElementById("val-juego").innerText = profile.video_game;
    }

    document.getElementById("etiq-lenguaje").innerText = config.language + ":";
    document.getElementById("val-lenguaje").innerText = profile.language.join(", ");

    document.getElementById("etiq-email").innerHTML = config.email.replace("[email]", `<a href="mailto:${profile.email}">${profile.email}</a>`);
}

//Prueba 3: Enlace Implícito en Objeto
const perfilPrueba = {
    nombre: "Oriana Arellano",
    mostrarThis: function() {
        console.log("Prueba 3 - Objeto:", this);
        console.log("El nombre es:", this.nombre);
    }
};

perfilPrueba.mostrarThis();