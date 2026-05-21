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
                <img src="${perfil.ci}/${perfil.ci}Big${perfil.image_ext}" alt="Foto de ${perfil.name}" class="imagen-grande">
                <img src="${perfil.ci}/${perfil.ci}Small${perfil.image_ext}" alt="Foto de ${perfil.name}" class="imagen-pequeña">
                <h3>${perfil.name}</h3>
    `;

            tarjeta.addEventListener("click", function () {
                window.location.href = `profile.html?ci=${perfil.ci}&lang=${lang}`;
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