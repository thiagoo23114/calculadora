let primerNumero = "";
let segundoNumero= "";
let operadorActual = "";

const calculadora = document.querySelector(".calculadora");
const pantalla = document.getElementById("pantalla");
const cyberCanvas = document.getElementById("cyber-bg");
const cyberCtx = cyberCanvas.getContext("2d");

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

function ajustarCyber() {
    cyberCanvas.width = window.innerWidth;
    cyberCanvas.height = window.innerHeight;
    iniciarParticulas();
}

const particulas = [];

function iniciarParticulas() {
    particulas.length = 0;

    for (let i = 0; i < 56; i++) {
        const tono = Math.random() > 0.55 ? "74, 221, 232" : "180, 180, 180";

        particulas.push({
            x: Math.random() * cyberCanvas.width,
            y: Math.random() * cyberCanvas.height,
            size: Math.random() * 2 + 1,
            velocidad: Math.random() * 1.2 + 0.45,
            alpha: Math.random() * 0.28 + 0.16,
            color: tono
        });
    }
}

function dibujarCyber() {
    cyberCtx.clearRect(0, 0, cyberCanvas.width, cyberCanvas.height);
    cyberCtx.fillStyle = "rgba(0, 0, 0, 0.12)";
    cyberCtx.fillRect(0, 0, cyberCanvas.width, cyberCanvas.height);

    cyberCtx.strokeStyle = "rgba(120, 120, 120, 0.05)";
    cyberCtx.lineWidth = 1;

    for (let x = 0; x < cyberCanvas.width; x += 30) {
        cyberCtx.beginPath();
        cyberCtx.moveTo(x, 0);
        cyberCtx.lineTo(x, cyberCanvas.height);
        cyberCtx.stroke();
    }

    for (let y = 0; y < cyberCanvas.height; y += 30) {
        cyberCtx.beginPath();
        cyberCtx.moveTo(0, y);
        cyberCtx.lineTo(cyberCanvas.width, y);
        cyberCtx.stroke();
    }

    for (const particula of particulas) {
        particula.y += particula.velocidad;

        if (particula.y > cyberCanvas.height) {
            particula.y = -6;
            particula.x = Math.random() * cyberCanvas.width;
        }

        cyberCtx.beginPath();
        cyberCtx.arc(particula.x, particula.y, particula.size, 0, Math.PI * 2);
        cyberCtx.fillStyle = `rgba(${particula.color}, ${particula.alpha})`;
        cyberCtx.fill();
    }

    requestAnimationFrame(dibujarCyber);
}

ajustarCyber();
dibujarCyber();
window.addEventListener("resize", ajustarCyber);

document.querySelectorAll("button").forEach((boton) => {
    boton.addEventListener("click", crearOnda);
});

function manejarTeclado(event) {
    const tecla = event.key;

    if (tecla >= "0" && tecla <= "9") {
        event.preventDefault();
        agregarNumero(tecla);
        return;
    }

    if (tecla === "." || tecla === ",") {
        event.preventDefault();
        agregarNumero(".");
        return;
    }

    if (tecla === "+" || tecla === "-" || tecla === "*" || tecla === "/") {
        event.preventDefault();
        elegirOperador(tecla);
        return;
    }

    if (tecla.toLowerCase() === "x") {
        event.preventDefault();
        elegirOperador("*");
        return;
    }

    if (tecla === "Enter") {
        event.preventDefault();
        calcular();
        return;
    }

    if (tecla === "Backspace" || tecla === "Delete") {
        event.preventDefault();
        borrarUno();
        return;
    }

    if (tecla === "Escape" || tecla.toLowerCase() === "c") {
        event.preventDefault();
        borrarTodo();
    }
}

document.addEventListener("keydown", manejarTeclado);

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
    const pedazos = pantalla.value.trim().split(/\s+/).filter(Boolean);

    if (pedazos.length === 0) {
        return;
    }

    if (pedazos.length === 1) {
        pantalla.value = parseFloat(pedazos[0]);
        return;
    }

    const soloSumas = pedazos.slice(1).every((token, index) => index % 2 === 0 ? token === "+" : true);

    if (pedazos[1] === "+" && soloSumas) {
        const resultado = pedazos
            .filter((_, index) => index % 2 === 0)
            .map(Number)
            .reduce((acumulado, numero) => acumulado + numero, 0);

        pantalla.value = resultado;
        return;
    }

    const num1 = parseFloat(pedazos[0]);
    const num2 = parseFloat(pedazos[2]);
    let resultado = 0;

    if (pedazos[1] === "+") {
        resultado = num1 + num2;
    }

    if (pedazos[1] === "-") {
        resultado = num1 - num2;
    }

    if (pedazos[1] === "*") {
        resultado = num1 * num2;
    }

    if (pedazos[1] === "/") {
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


