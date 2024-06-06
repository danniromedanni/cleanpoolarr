
/*document.addEventListener('DOMContentLoaded', function() {
    var imagenes = ['./assets/fondo-1.jpg', './assets/fondo-2.jpg', './assets/fondo-3.jpg'];
    var actual = 0;
    var contenedor = document.querySelector('.contenedor-1');

    setInterval(function() {
        actual = (actual + 1) % imagenes.length;
        contenedor.style.backgroundImage = 'url(' + imagenes[actual] + ')'
    }, 5000); // Cambia la imagen cada 5000 milisegundos (5 segundos)
})*/

document.addEventListener("DOMContentLoaded", function() {
    let imagenes = document.querySelectorAll('.galeria img');
    let indiceActual = 0;

    function cambiarImagen() {
        imagenes[indiceActual].classList.remove('active');
        indiceActual = (indiceActual + 1) % imagenes.length; // Vuelve a 0 después de la última imagen
        imagenes[indiceActual].classList.add('active');
    }

    setInterval(cambiarImagen, 3000); // Cambia cada 3000 milisegundos (3 segundos)
});

document.addEventListener("DOMContentLoaded", function() {
    const preguntas = document.querySelectorAll('.pregunta-titulo');

    preguntas.forEach(pregunta => {
        pregunta.addEventListener('click', function() {
            // Se obtiene el contenedor .pregunta para manipular la clase
            const contenedorPregunta = this.parentNode;
            // Se cambia la clase pregunta-activa para el contenedor .pregunta
            contenedorPregunta.classList.toggle('pregunta-activa');
            // Se obtiene el div .respuesta que es hermano del h3
            const respuesta = contenedorPregunta.querySelector('.respuesta');
            // Cambiar la visibilidad basada en el estado actual
            respuesta.style.display = respuesta.style.display === 'block' ? 'none' : 'block';
            // Se cambia el símbolo de la flecha
            const flecha = this.querySelector('.flecha');
            flecha.innerHTML = respuesta.style.display === 'block' ? '&#9652;' : '&#9662;';
        });
    });
});

//Ju
function concatenar(valor) {
    document.getElementById("display").value += valor;
}

function operar(operador) {
    document.getElementById("display").value += operador;
}

function limpiar() {
    document.getElementById("display").value = "";
}

function calcular() {
    try {
        var resultado = eval(document.getElementById("display").value);
        document.getElementById("display").value = resultado;
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}
