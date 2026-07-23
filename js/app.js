const boton = document.getElementById("btn-flor");
const modal = document.getElementById("modal-flor");
const cerrar = document.getElementById("cerrar-modal");

const flores = document.querySelectorAll(".flor-interactiva");

const botonPlantar = document.getElementById("plantar");
const sembrar = document.getElementById("sembrar");
const ventana = document.querySelector(".ventana");


let florSeleccionada = null;
let florElegida = "";
let esperandoLugar = false;



// ABRIR PERGAMINO

boton.addEventListener("click", () => {

    modal.classList.add("activo");

});



// CERRAR PERGAMINO

cerrar.addEventListener("click", () => {

    modal.classList.remove("activo");

});




// ELEGIR FLOR

flores.forEach(flor => {


    flor.addEventListener("click", () => {


        flores.forEach(f => {

            f.classList.remove("flor-elegida");

        });


        flor.classList.add("flor-elegida");


        florSeleccionada = flor;

        florElegida = flor.dataset.flor;



        botonPlantar.classList.remove("oculto");

        botonPlantar.classList.add("mostrar");


    });


});





// BOTON PLANTAR

botonPlantar.addEventListener("click", () => {


    let nombre = document.getElementById("nombre").value.trim();


    nombre = nombre
        .toLowerCase()
        .split(" ")
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(" ");



    const mensaje = document.getElementById("mensaje").value.trim();




    if(florElegida === ""){

        alert("Elegí una flor 🌸");

        return;

    }



    if(nombre === ""){

        alert("Escribí tu nombre 🤍");

        return;

    }



    if(mensaje === ""){

        alert("Escribí un mensaje 🌿");

        return;

    }




    console.log({

        nombre,
        mensaje,
        flor: florElegida

    });




    ventana.classList.add("cerrando");



    setTimeout(() => {


        modal.classList.remove("activo");


        ventana.classList.remove("cerrando");


        esperandoLugar = true;


        sembrar.classList.remove("oculto");



    },1400);



});





// CERRAR MENSAJE DE ELEGIR LUGAR
sembrar.style.cursor = "crosshair";

sembrar.addEventListener("click", (e) => {

    sembrar.classList.add("oculto");
    const pozo = document.createElement("div");
    pozo.classList.add("pozo");
    pozo.style.left = `${e.clientX}px`;
    pozo.style.top = `${e.clientY}px`;
    document.body.appendChild(pozo);     
    
 setTimeout(() => {

    const flor = document.createElement("img");

    flor.src = `assets/flores/${florElegida}.png`;

    flor.classList.add("flor-plantada");

    flor.style.left = `${e.clientX}px`;

    flor.style.top = `${e.clientY}px`;

    document.body.appendChild(flor);


    // LIMPIAR FORMULARIO
    document.getElementById("nombre").value = "";

    document.getElementById("mensaje").value = "";

    florElegida = "";

    florSeleccionada = null;

    flores.forEach(f => {
        f.classList.remove("flor-elegida");
    });

    botonPlantar.classList.remove("mostrar");
    botonPlantar.classList.add("oculto");


}, 300);
})