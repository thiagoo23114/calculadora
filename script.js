let primerNumero = "";
let operadorActual = "";

function elegirOperador(operador) {
    primerNumero = pantalla.value;
    operadorActual = operador;
    pantalla.value = "0"

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