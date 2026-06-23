const urlParams = new URLSearchParams(window.location.search);
let lang = urlParams.get('lang') || 'ES';
let searchParam = urlParams.get('search') || '';

const scriptConfig = document.createElement('script');
scriptConfig.src = `conf/config${lang}.json`;

scriptConfig.onload = function () {

    document.getElementById("btn-buscar").innerText = config.search;
    document.getElementById("semestre").innerText = config.semester;
    document.getElementById("nombre").placeholder = config.name + "...";
    document.getElementById("logo").innerHTML = `${config.site[0]}<span>${config.site[1]}</span>${config.site[2]}`;
    document.getElementById("footer").innerText = config.copyRight;

    const contenedorPerfiles = document.querySelector(".informacion-usuario");
    const inputBusqueda = document.getElementById("nombre");

    function mostrarPerfiles(listaEstudiantes) {
        contenedorPerfiles.innerHTML = "";

        if (listaEstudiantes.length === 0) {
            const query = inputBusqueda.value;
            const mensajeError = document.createElement("p");
            mensajeError.className = "mensaje-vacio";
            mensajeError.innerHTML = `${config.noProfiles} <strong>${query}</strong>`;
            contenedorPerfiles.appendChild(mensajeError);
            return;
        }

        listaEstudiantes.forEach(function (perfil) {
            const tarjeta = document.createElement("div");

            tarjeta.innerHTML = `
                <img src="Profiles/${perfil.ci}/${perfil.ci}Big${perfil.image_ext}" alt="Foto de ${perfil.name}" class="imagen-grande">
                <img src="Profiles/${perfil.ci}/${perfil.ci}Small${perfil.image_ext}" alt="Foto de ${perfil.name}" class="imagen-pequeña">
                <h3>${perfil.name}</h3>
            `;

            //Implementación de AJAX (fetch)
            tarjeta.addEventListener("click", function () {
                
                //Petición asíncrona al backend de Python
                fetch(`/ATI/index.py?fetch_data=${perfil.ci}&lang=${lang}`)
                    .then(response => {
                        if (!response.ok) throw new Error("Error en la red al recuperar el perfil");
                        return response.json(); 
                    })
                    .then(datosPerfil => {
                        //Ocultar la vista principal (listado y título)
                        document.querySelector(".informacion-usuario").style.display = "none";
                        document.getElementById("semestre").style.display = "none";

                        //Mostrar la vista del perfil 
                        const seccionPerfil = document.getElementById("seccion-perfil");
                        if (seccionPerfil) {
                            seccionPerfil.style.display = "flex"; // o "block" dependiendo de tu CSS
                            
                            //Llenar los datos del perfil dinámicamente
                            llenarDatosPerfil(datosPerfil);
                        } else {
                            console.error("No se encontró el contenedor del perfil en el HTML.");
                        }
                    })
                    .catch(error => console.error("Error cargando el perfil mediante AJAX:", error));
            });

            document.querySelector(".informacion-usuario").appendChild(tarjeta);
        });
    }

    //Redirigir al listado y efectuar la búsqueda automáticamente
    let perfilesIniciales = profiles;

    if (searchParam) {
        inputBusqueda.value = searchParam;
        const textoLimpio = searchParam.toLowerCase().trim();
        perfilesIniciales = profiles.filter(function (perfil) {
            return perfil.name.toLowerCase().includes(textoLimpio);
        });
    }
    mostrarPerfiles(perfilesIniciales);

    inputBusqueda.addEventListener("input", function () {
        const textoBuscado = inputBusqueda.value.toLowerCase().trim();
        const perfilesFiltrados = profiles.filter(function (perfil) {
            return perfil.name.toLowerCase().includes(textoBuscado);
        });
        mostrarPerfiles(perfilesFiltrados);
    });

    const formulario = document.querySelector("nav form");
    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
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
            navBar.classList.toggle("menu-abierto");
        });
    }
};

document.head.appendChild(scriptConfig);

//Función para inyectar la información del JSON en el DOM
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

//Función para el botón Volver al listado
function volverAlListado() {
    //Ocultamos el perfil
    document.getElementById("seccion-perfil").style.display = "none";
    
    //Volvemos a mostrar la grilla de estudiantes y el título
    document.querySelector(".informacion-usuario").style.display = "flex"; // o "grid" según tu CSS
    document.getElementById("semestre").style.display = "block";
    
    //Restauramos el título original de la pestaña
    document.title = "ATI Log";
}