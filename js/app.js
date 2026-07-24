const boton = document.getElementById("btn-flor");
const modal = document.getElementById("modal-flor");
const cerrar = document.getElementById("cerrar-modal");

const flores = document.querySelectorAll(".flor-interactiva");

const botonPlantar = document.getElementById("plantar");
const sembrar = document.getElementById("sembrar");
const ventana = document.querySelector(".ventana");

const imagen = document.getElementById("imagen");
const vistaImagen = document.getElementById("vista-imagen");

const significados = {

    rosa: "Cariño",
    margarita: "Esperanza",
    amapola: "Recuerdo",
    tulipan: "Gratitud",
    girasol: "Luz",
    "rosa-china": "Alegría",
    dalia: "Fortaleza",
    lavanda: "Calma",
    lirio: "Pureza",
    jazmin: "Amor eterno"

};


let florSeleccionada = null;
let florElegida = "";
let esperandoLugar = false;
let nuevaFlor = null;



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




    const archivoImagen = imagen.files[0];

    nuevaFlor = {

    nombre: nombre,

    mensaje: mensaje,

    flor: florElegida,

    significado: significados[florElegida],

    fecha: new Date().toLocaleDateString(),

    imagen: archivoImagen ? archivoImagen.name : null

};
    

console.log(nuevaFlor);




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
    nuevaFlor.posicion = {

         x: e.clientX,

         y: e.clientY

    };

console.log(nuevaFlor);
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
imagen.addEventListener("change", () => {

    const archivo = imagen.files[0];

    if(!archivo){
        vistaImagen.innerHTML = "";
        return;
    }


    const lector = new FileReader();


    lector.onload = (e) => {

        vistaImagen.innerHTML = `
            <img src="${e.target.result}" class="imagen-previa">
        `;

    };


    lector.readAsDataURL(archivo);

});
