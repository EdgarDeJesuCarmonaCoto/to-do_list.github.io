// /*Se usa el metodo localStorage.setItem("key","informacion a guardar") para guardar infomacion de manera local en el navegador*/
// localStorage.setItem("tarea","Hacer el proyecto");
// /*usamos el localStorage.getItem("key") para acceder a la informacion de la key que esta guardada en el navegador*/
// console.log(localStorage.getItem("tarea"));



// /*guardar un objeto en el localStorage*/
// let list=[{
//     name:"Edgar",
//     Edad: 18
// },{
//     name: "Cristian",
//     Edad: 17
// }];

// /*usamos JSON.stringify(list) para convertir los objetos en un string y se puedan guardar en el localStorage*/
// localStorage.setItem("lista",JSON.stringify(list));
// /*Usamos el JSON.parse() para convertir el string otra vez en un objeto*/
// let list2=JSON.parse(localStorage.getItem("lista"));
// console.log(list2);
// let info=list2.map(Index => `<p>${Index.name}: ${Index.Edad}</p>`);
// info=info.join(" ")

// let div=document.getElementById("info");
// div.innerHTML=`
// ${info}
// `


let tabla=document.getElementById("tabla");
let input=document.getElementById("inputTarea");


cargarTareas();

function guardarTarea() {
    if (input.value.trim() === "") {
        mostrarError();
        return;
    }

    let puntero = localStorage.getItem("puntero") || "1";
    localStorage.setItem("tarea" + puntero, input.value);
    mostrarTarea(puntero);
    puntero = (parseInt(puntero) + 1).toString();
    localStorage.setItem("puntero", puntero);

    input.value = "";
}

function mostrarTarea(puntero) {
    let tarea = localStorage.getItem("tarea" + puntero);

    if (tarea) {
        tabla.innerHTML += `
        <tr id="fila${puntero}">
            <td>${tarea}</td>
            <td><button onclick="borrarTarea('${puntero}')">Borrar tarea</button></td>
        </tr>
        `
    }
}

function cargarTareas() {
    let puntero = localStorage.getItem("puntero") || "1";

    for (let i = 1; i < parseInt(puntero); i++) {
        if (localStorage.getItem("tarea" + i)) {
            mostrarTarea(i.toString());
        }
    }
}

function borrarTarea(puntero){
        // Eliminar la tarea del localStorage
        localStorage.removeItem("tarea" + puntero);

        // Eliminar la fila de la tabla
        let fila = document.getElementById("fila" + puntero);
        if (fila) {
            fila.remove();
        }
}

function mostrarError(){
    alert("Digite una tarea antes de añadir")
}

