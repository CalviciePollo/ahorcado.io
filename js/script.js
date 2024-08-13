const listaPalabras = ["GOJO", "ITADORI", "TANJIRO", "KAZEHAYA", "MIRKO", "GOKU", "NARUTO",
    "LAIOS", "DENJI", "EDWARD", "SASUKE", "GON", "KILLUA", "BAKI", "TSUNADE"];
let palabraSecreta;
let intentosRestantes;
let palabraOculta;
let letrasUsadas;
let partidasGanadas = 0;
let partidasPerdidas = 0;

const elementoPalabra = document.getElementById("palabra");
const elementoIntentos = document.getElementById("intentosRestantes");
const elementoMensaje = document.getElementById("mensaje");
const elementoTeclado = document.getElementById("teclado");
const botonReiniciar = document.getElementById("botonReiniciar");

function inicializarJuego() {
    palabraSecreta = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    intentosRestantes = 10;
    palabraOculta = Array(palabraSecreta.length).fill("_");
    letrasUsadas = [];

    elementoIntentos.textContent = intentosRestantes;
    elementoMensaje.textContent = "";

    // Mostrar la imagen del ahorcado y restablecer su estado
    const img = document.getElementById("img-c");
    img.style.display = "block";
    img.src = "";

    const body = document.body;
    switch (palabraSecreta) {
        case "GOJO":
        case "ITADORI":
            body.style.backgroundImage = "url('img/jujutsu.png')";
            break;
        case "TANJIRO":
            body.style.backgroundImage = "url('img/Kimetsu.jpg')";
            break;
        case "KAZEHAYA":
            body.style.backgroundImage = "url('img/kimino.jpg')";
            break;
        case "MIRKO":
            body.style.backgroundImage = "url('img/Boku.jpg')";
            break;
        case "GOKU":
            body.style.backgroundImage = "url('img/dbz.webp')";
            break;
        case "NARUTO":
        case "SASUKE":
        case "TSUNADE":
            body.style.backgroundImage = "url('img/naruto.jpg')";
            break;
        case "LAIOS":
            body.style.backgroundImage = "url('img/Dungeon.jpg')";
            break;
        case "DENJI":
            body.style.backgroundImage = "url('img/Chainsaw man.jpg')";
            break;
        case "EDWARD":
            body.style.backgroundImage = "url('img/Full metal.jpg')";
            break;
        case "GON":
        case "KILLUA":
            body.style.backgroundImage = "url('img/Hunter x Hunter.jpg')";
            break;
        case "BAKI":
            body.style.backgroundImage = "url('img/baki.jpg')";
            break;
        default:
            break;
    }

    actualizarPalabraEnPantalla();
    activarTeclado();
}

function actualizarPalabraEnPantalla() {
    elementoPalabra.textContent = palabraOculta.join(" ");
}

function manejarLetraSeleccionada(letra) {
    if (!letrasUsadas.includes(letra)) {
        letrasUsadas.push(letra);

        if (palabraSecreta.includes(letra)) {
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    palabraOculta[i] = letra;
                }
            }
        } else {
            intentosRestantes--;
            elementoIntentos.textContent = intentosRestantes;
        }

        const img = document.getElementById("img-c");
        if (intentosRestantes == 9) {
            img.src = "img/intento10.png";
        }

        if (intentosRestantes == 8) {
            img.src = "img/intento9.png";
        }

        if (intentosRestantes == 7) {
            img.src = "img/intento8.png";
        }

        if (intentosRestantes == 6) {
            img.src = "img/intento7.png";
        }

        if (intentosRestantes == 5) {
            img.src = "img/intento6.png";
        }

        if (intentosRestantes == 4) {
            img.src = "img/intento5.png";
        }

        if (intentosRestantes == 3) {
            img.src = "img/intento4.png";
        }

        if (intentosRestantes == 2) {
            img.src = "img/intento3.png";
        }

        if (intentosRestantes == 1) {
            img.src = "img/intento2.png";
        }
        if (intentosRestantes == 0) {
            img.src = "img/intento1.png";
        }


        actualizarPalabraEnPantalla();
        verificarEstadoDelJuego();

        deshabilitarBotonLetra(letra);
    }
}

function deshabilitarBotonLetra(letra) {
    const botones = elementoTeclado.getElementsByTagName("button");
    for (let boton of botones) {
        if (boton.textContent === letra) {
            boton.disabled = true;
            break;
        }
    }
}

function verificarEstadoDelJuego() {
    if (palabraOculta.join("") === palabraSecreta) {
        partidasGanadas++;
        document.getElementById("txtGanados").value = partidasGanadas;
        elementoMensaje.textContent = "¡Ganaste! La palabra era " + palabraSecreta;
        desactivarTeclado();
    } else if (intentosRestantes === 0) {
        partidasPerdidas++;
        document.getElementById("txtPerdidos").value = partidasPerdidas;
        elementoMensaje.textContent = "Perdiste. La palabra era " + palabraSecreta;
        desactivarTeclado();


        const img = document.getElementById("img-c");
        img.src = "img/intento1.png"; /*Y aquí termina con la última*/
    }
}

function activarTeclado() {
    const botones = elementoTeclado.getElementsByTagName("button");
    for (let boton of botones) {
        boton.disabled = false;
    }
}

function desactivarTeclado() {
    const botones = elementoTeclado.getElementsByTagName("button");
    for (let boton of botones) {
        boton.disabled = true;
    }
}

function reiniciarJuego() {
    inicializarJuego();
}

inicializarJuego();