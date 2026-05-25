let primerNumero = "";
let segundoNumero= "";
let operadorActual = "";

const calculadora = document.querySelector(".calculadora");
const pantalla = document.getElementById("pantalla");

function crearOnda(event) {
    const rect = calculadora.getBoundingClientRect();
    const onda = document.createElement("span");
    const tamaño = Math.max(120, Math.max(rect.width, rect.height) * 1.15);

    onda.className = "ripple";
    onda.style.width = `${tamaño}px`;
    onda.style.height = `${tamaño}px`;
    onda.style.left = `${event.clientX - rect.left}px`;
    onda.style.top = `${event.clientY - rect.top}px`;

    calculadora.appendChild(onda);

    onda.addEventListener("animationend", () => onda.remove());
}

document.querySelectorAll("button").forEach((boton) => {
    boton.addEventListener("click", crearOnda);
});

function elegirOperador(operador) {
    primerNumero = pantalla.value;
    operadorActual = operador;
    pantalla.value = pantalla.value + " " + operador + " ";

}
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


