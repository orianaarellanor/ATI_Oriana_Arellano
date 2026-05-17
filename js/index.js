document.getElementById("btn-buscar").innerText = config.search;
document.getElementById("semestre").innerText = config.semester;
document.getElementById("nombre").placeholder = config.name + "...";
document.getElementById("logo").innerHTML = `${config.site[0]}<span>${config.site[1]}</span>${config.site[2]}`;
document.getElementById("footer").innerText = config.copyRight;