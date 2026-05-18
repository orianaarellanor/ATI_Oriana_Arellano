document.getElementById("btn-buscar").innerText = config.search;
document.getElementById("semestre").innerText = config.semester;
document.getElementById("nombre").placeholder = config.name + "...";
document.getElementById("logo").innerHTML = `${config.site[0]}<span>${config.site[1]}</span>${config.site[2]}`;
document.getElementById("footer").innerText = config.copyRight;

profiles.forEach(function(perfil) { 
    const tarjeta = document.createElement("div");

    tarjeta.innerHTML = `
                <img src="${perfil.ci}/${perfil.ci}Big${perfil.image_ext}" alt="Foto de ${perfil.name}" class="imagen-grande">
                <img src="${perfil.ci}/${perfil.ci}Small${perfil.image_ext}" alt="Foto de ${perfil.name}" class="imagen-pequeña">
                <h3>${perfil.name}</h3>
    `;
    
    tarjeta.addEventListener("click", function() {
        window.location.href = `profile.html?ci=${perfil.ci}`;
    });

    document.querySelector(".informacion-usuario").appendChild(tarjeta);
});