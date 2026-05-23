let primerNumero = "";
let segundoNumero= "";
let operadorActual = "";


function elegirOperador(operador) {
    primerNumero = pantalla.value;
    operadorActual = operador;
    pantalla.value = pantalla.value + " " + operador + " ";

}
const pantalla =
    document.getElementById("pantalla")
    ;
function agregarNumero(numero) {
    if (pantalla.value === "0") {
        pantalla.value = numero;
    } else {
        pantalla.value =
            pantalla.value + numero;
    }
}
function calcular() {
    let pedazos = pantalla.value.split(" ");
    let num1 = parseFloat(pedazos[0]);
    let num2 = parseFloat(pedazos[2]);
    let resultado = 0;

    if (pedazos[1] === "+"){
        resultado = num1 + num2;
    }

    if (pedazos[1] === "-"){
    resultado = num1 - num2;
    }

    if (pedazos[1] === "*"){
        resultado = num1 * num2;
    }

if (pedazos[1] === "/"){
        resultado = num1 / num2;
    }

    pantalla.value = resultado;
}
function borrarTodo() {
    pantalla.value = "0";
}
function borrarUno() {
    if (pantalla.value !== "0" && pantalla.value !== "") {
        pantalla.value = pantalla.value.slice(0, -1);
    }
    if (pantalla.value === "") {
        pantalla.value = "0";
    }
}


