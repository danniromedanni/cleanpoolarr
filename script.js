"use strict";
    
    // Manejar preguntas frecuentes
    const preguntas = document.querySelectorAll('.pregunta-titulo');

    preguntas.forEach(pregunta => {
        pregunta.addEventListener('click', function() {
            const contenedorPregunta = this.parentNode;
            contenedorPregunta.classList.toggle('pregunta-activa');
            const respuesta = contenedorPregunta.querySelector('.respuesta');
            respuesta.style.display = respuesta.style.display === 'block' ? 'none' : 'block';
            const flecha = this.querySelector('.flecha');
            flecha.innerHTML = respuesta.style.display === 'block' ? '&#9652;' : '&#9662;';
        });
    });


// Calculadora
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
//aca empiezan las calculadoras
//ACA ESTAN LOS PRECIOS Y DONDE SE TIENE QUE MODIFICAR
// Precios de los químicos
const preciosQuimicos = {
    cloro: 1100, // Precio por litro de cloro
    bs77: 6600, // Precio por litro de BS77
    bp65: 3300, // Precio por litro de BP65
    sssAlum: 1500 // Precio por litro de SSS Alum
};
//ACA ARRIBA ESTAN LOS PRECIOS DONDES E TIENE QUE MODIFICAR
//ACA ARRIBA SOLAMENTE HAY QUE MODIFICAR


// Calculadora Arranque
function calcularArranque() {
    // Entrada de valores
    const tipoAgua = document.getElementById('tipoAguaArranque').value;
    const volumen = parseInt(document.getElementById('volumenArranque').value);
    let productos = '';




    ///NUEVOOOO// Variable para las consideraciones////////////
    let consideraciones = '';
    


   

    if (volumen > 0) {
        // Calcula los productos por tipo de agua y volumen
        const tabla = {
            aguaRed: [
                { volumen: 5, cloro: 1, sssAlum: 0.100, bp65: 0.150, bs77: 0.150 },
                { volumen: 10, cloro: 1, sssAlum: 0.150, bp65: 0.250, bs77: 0.250 },
                { volumen: 20, cloro: 2, sssAlum: 0.150, bp65: 0.500, bs77: 0.500 },
                { volumen: 30, cloro: 3, sssAlum: 0.250, bp65: 0.500, bs77: 0.750 },
                { volumen: 40, cloro: 4, sssAlum: 0.250, bp65: 1, bs77: 1 },
                { volumen: 50, cloro: 5, sssAlum: 0.500, bp65: 1, bs77: 1.250 },
                { volumen: 60, cloro: 7.5, sssAlum: 0.500, bp65: 1, bs77: 1.5 },
                { volumen: 70, cloro: 7.5, sssAlum: 0.500, bp65: 1, bs77: 1.750 },
                { volumen: 80, cloro: 10, sssAlum: 1.0, bp65: 2, bs77: 2 },
                { volumen: 90, cloro: 10, sssAlum: 1.0, bp65: 2.0, bs77: 2.250 },
                { volumen: 100, cloro: 15, sssAlum: 1.0, bp65: 2.5, bs77: 2.5 },
            ],
            aguaPozo1: [
                { volumen: 5, cloro: 1, sssAlum: 0.150, bp65: 0.250, bs77: 0.150 },
                { volumen: 10, cloro: 2.5, sssAlum: 0.250, bp65: 0.500, bs77: 0.250 },
                { volumen: 20, cloro: 4, sssAlum: 0.500, bp65: 1, bs77: 0.500 },
                { volumen: 30, cloro: 5, sssAlum: 0.500, bp65: 1, bs77: 0.750 },
                { volumen: 40, cloro: 7.5, sssAlum: 0.750, bp65: 1.5, bs77: 1 },
                { volumen: 50, cloro: 10, sssAlum: 1, bp65: 2, bs77: 1.250 },
                { volumen: 60, cloro: 10, sssAlum: 1, bp65: 2.5, bs77: 1.5 },
                { volumen: 70, cloro: 15, sssAlum: 1, bp65: 2.5, bs77: 1.750 },
                { volumen: 80, cloro: 15, sssAlum: 2, bp65: 4, bs77: 2 },
                { volumen: 90, cloro: 20, sssAlum: 2, bp65: 4, bs77: 2.250 },
                { volumen: 100, cloro: 20, sssAlum: 2.5, bp65: 5, bs77: 2.5 },
            ],
            aguaPozo2: [
                { volumen: 5, cloro: 2.50, sssAlum: 0.500, bp65: 0.500, bs77: 0.150 },
                { volumen: 10, cloro: 5, sssAlum: 0.750, bp65: 1.5, bs77: 0.250 },
                { volumen: 20, cloro: 7.5, sssAlum: 1, bp65: 2, bs77: 0.500 },
                { volumen: 30, cloro: 15, sssAlum: 2, bp65: 2.5, bs77: 0.750 },
                { volumen: 40, cloro: 20, sssAlum: 2.5, bp65: 5, bs77: 1 },
                { volumen: 50, cloro: 20, sssAlum: 2.5, bp65: 5, bs77: 1.250 },
                { volumen: 60, cloro: 25, sssAlum: 2.5, bp65: 5, bs77: 1.5 },
                { volumen: 70, cloro: 30, sssAlum: 3.5, bp65: 5, bs77: 1.750 },
                { volumen: 80, cloro: 30, sssAlum: 5, bp65: 10, bs77: 2 },
                { volumen: 90, cloro: 35, sssAlum: 5, bp65: 10, bs77: 2.250 },
                { volumen: 100, cloro: 40, sssAlum: 5, bp65: 10, bs77: 2.5 },
            ],
        };

        // Seleccionar resultado según el tipo de agua
        let data = tabla[tipoAgua].find(item => item.volumen === volumen);

        if (data) {
            // Cálculo del total basado en los precios de los químicos
            const total = (data.cloro * preciosQuimicos.cloro) + 
                          (data.sssAlum * preciosQuimicos.sssAlum) + 
                          (data.bp65 * preciosQuimicos.bp65) + 
                          (data.bs77 * preciosQuimicos.bs77);

            productos = `
                <strong>Cloro:</strong> ${data.cloro} Lts<br>
                <strong>SSS Alum:</strong> ${data.sssAlum} Lts<br>
                <strong>BP65:</strong> ${data.bp65} Lts<br>
                <strong>BS77:</strong> ${data.bs77} Lts<br><br>
                <strong>Precio estimado total: $${total.toFixed(2)}<br>
                </strong><span style="font-size: 0.7em;">UAF: 01/11/2024<span></span> 
            `;

///NUEVOOOOOO// Añadir consideraciones según el tipo de agua
// Añadir consideraciones detalladas según el tipo de agua
if (tipoAgua === "aguaRed") {
    consideraciones = `
        * Consideraciones arranque agua de red ▴<br>
        * Tabla de dosificación para instalaciones convencionales (filtro de arena con bomba de filtrado).<br>
        * Antes del inicio de temporada se recomienda hacerle un lavado interior al filtro, consultar instrucciones.<br>
        * Secuencia de arranque: 1 – Encender el filtro (limpio), 2 - Cloro (esperar 30 minutos), 3 – SssAlum (esperar 30 minutos) 4 – BP65 en caso de ser posible filtrar toda la noche para mejor rendimiento de productos y realizarle prueba hidráulica al motor de la bomba.<br>
        Al otro día, realizarle un barrefondo (en función FILTRADO), un retrolavado (aprox. 1 minuto) y colocar la dosis inicial de BS77 (según tabla).<br>
        * Para más información Ver FOLLETO ARRANQUE RED.<br>
        * Para tamaños mayores a 100.000 litros consultar por dosificación especial.
    `;
} else if (tipoAgua === "aguaPozo1") {
    consideraciones = `
        * Consideración arranque agua con sales de pozo (poco hierro) ▴<br>
        * Tabla de dosificación para instalaciones convencionales (filtro de arena con bomba de filtrado).<br>
        * Secuencia de arranque: 1 – Encender el filtro (limpio), 2 - Cloro (esperar 30 minutos), 3 – SssAlum (esperar 30 minutos) 4 – BP65 en caso de ser posible filtrar toda la noche para mejor rendimiento de productos y realizarle prueba hidráulica al motor de la bomba.<br>
        Al otro día, realizarle un barrefondo (en función FILTRADO), un retrolavado (aprox. 1 minuto) y colocar la dosis inicial de BS77 (según tabla).<br>
        * Para más información Ver FOLLETO ARRANQUE POZO.<br>
        * Para tamaños mayores a 100.000 litros consultar por dosificación especial.
    `;
} else if (tipoAgua === "aguaPozo2") {
    consideraciones = `
        * Consideración arranque agua con sales de pozo (mucho hierro) ▴<br>
        * Tabla de dosificación para instalaciones convencionales (filtro de arena con bomba de filtrado).<br>
        * Antes del inicio de temporada se recomienda hacerle un lavado interior al filtro, consultar instrucciones.<br>
        * Para secuencia de arranque Ver FOLLETO ARRANQUE POZO.<br>
        * Se recomienda llenar el nivel de la pileta HASTA ARRIBA (para tener margen de purga).<br>
        * Dependiendo de la cantidad de hierro que tenga el agua, no se descarta que el proceso dure + de 1 día (varias pasadas de barrefondo).<br>
        * Se recomienda filtrado continuo hasta formación de colchón sedimentado, realizando retrolavados (de 3 minutos) cada 8 hs.<br>
        * Se recomienda NO colocar la dosis inicial de BS77 hasta haber conseguido transparencia en el agua.<br>
        * En caso de no obtener resultados, comunicarse con un instalador para chequeo de instalaciones (arena de filtro, bomba, etc) y secuencia de colocación de productos.<br>
        * Para tamaños mayores a 100.000 litros consultar por dosificación especial.
    `;
}
           

        } else {
            productos = 'No se encontraron datos para el volumen especificado.';
            consideraciones = '';
        }
    } else {
        productos = 'Por favor, ingresa un volumen válido.';
        consideraciones = '';
    }
///mostrar el resultado en la calculadora/////
    document.getElementById('resultadoArranque').innerHTML = productos;
}



//calculadora mantenimiento
function calcularMantenimiento() {
    // entrada de valores
    const tipoAgua = document.getElementById('tipoAguaMantenimiento').value;
    const volumen = parseInt(document.getElementById('volumenMantenimiento').value);
    let productos = '';

   

    if (volumen > 0) {
        // calcula los productos por tipo de agua y volumen
        const tabla = {
            aguaRed: [
                { volumen: 5, cloro: 0.5, sssAlum: 0.025, bp65: 0.025, bs77: 0.050 },
                { volumen: 10, cloro: 0.5, sssAlum: 0.075, bp65: 0.075, bs77: 0.100 },
                { volumen: 20, cloro: 1, sssAlum: 0.100, bp65: 0.150, bs77: 0.200 },
                { volumen: 30, cloro: 1, sssAlum: 0.150, bp65: 0.150, bs77: 0.300 },
                { volumen: 40, cloro: 2, sssAlum: 0.150, bp65: 0.250, bs77: 0.400 },
                { volumen: 50, cloro: 2.5, sssAlum: 0.150, bp65: 0.250, bs77: 0.500 },
                { volumen: 60, cloro: 2.5, sssAlum: 0.250, bp65: 0.500, bs77: 0.600 },
                { volumen: 70, cloro: 3.5, sssAlum: 0.250, bp65: 0.500, bs77: 0.700 },
                { volumen: 80, cloro: 3.5, sssAlum: 0.500, bp65: 0.500, bs77: 0.800 },
                { volumen: 90, cloro: 5, sssAlum: 0.500, bp65: 0.500, bs77: 0.900 },
                { volumen: 100, cloro: 5, sssAlum: 0.500, bp65: 0.500, bs77: 1 },
            ],
            aguaPozo1: [
                { volumen: 5, cloro: 0.5, sssAlum: 0.050, bp65: 0.050, bs77: 0.3 },
                { volumen: 10, cloro: 0.5, sssAlum: 0.100, bp65: 0.150, bs77: 0.6 },
                { volumen: 20, cloro: 1, sssAlum: 0.150, bp65: 0.250, bs77: 0.8 },
                { volumen: 30, cloro: 2.5, sssAlum: 0.150, bp65: 0.250, bs77: 0.8 },
                { volumen: 40, cloro: 2.5, sssAlum: 0.150, bp65: 0.500, bs77: 0.8 },
                { volumen: 50, cloro: 3.5, sssAlum: 0.250, bp65: 0.500, bs77: 0.8 },
                { volumen: 60, cloro: 3.5, sssAlum: 0.500, bp65: 1, bs77: 0.8 },
                { volumen: 70, cloro: 5, sssAlum: 0.500, bp65: 1, bs77: 0.8 },
                { volumen: 80, cloro: 5.0, sssAlum: 0.750, bp65: 1, bs77: 0.8 },
                { volumen: 90, cloro: 5.0, sssAlum: 1, bp65: 1.5, bs77: 0.8 },
                { volumen: 100, cloro: 7.5, sssAlum: 1, bp65: 1.5, bs77: 0.8 },
            ],
            aguaPozo2: [
                { volumen: 5, cloro: 0.5, sssAlum: 0.075, bp65: 0.075, bs77: 0.050 },
                { volumen: 10, cloro: 0.5, sssAlum: 0.150, bp65: 0.150, bs77: 0.100 },
                { volumen: 20, cloro: 1, sssAlum: 0.150, bp65: 0.250, bs77: 0.200 },
                { volumen: 30, cloro: 2.5, sssAlum: 0.250, bp65: 0.250, bs77: 0.300 },
                { volumen: 40, cloro: 3.5, sssAlum: 0.250, bp65: 0.500, bs77: 0.400 },
                { volumen: 50, cloro: 5, sssAlum: 0.500, bp65: 0.500, bs77: 0.500 },
                { volumen: 60, cloro: 5, sssAlum: 0.500, bp65: 1, bs77: 0.600 },
                { volumen: 70, cloro: 5, sssAlum: 0.750, bp65: 1, bs77: 0.700 },
                { volumen: 80, cloro: 7.5, sssAlum: 1, bp65: 1.5, bs77: 0.800 },
                { volumen: 90, cloro: 7.5, sssAlum: 1, bp65: 2, bs77: 0.900 },
                { volumen: 100, cloro: 10, sssAlum: 1, bp65: 2, bs77: 1 },
            ],
        };

        // Seleccionar resultado según el tipo de agua
        


            let data = tabla[tipoAgua].find(item => item.volumen === volumen);
            if (data) {
                const total = (data.cloro * preciosQuimicos.cloro)*4+ 
                              (data.sssAlum * preciosQuimicos.sssAlum)*4 + 
                              (data.bp65 * preciosQuimicos.bp65) *4+ 
                              (data.bs77 * preciosQuimicos.bs77) *4;

            productos = `
                <strong>Cloro:</strong> ${data.cloro} Lts<br>
                <strong>SSS Alum:</strong> ${data.sssAlum} Lts<br>
                <strong>BP65:</strong> ${data.bp65} Lts<br>
                <strong>BS77:</strong> ${data.bs77} Lts<br><br>
                 <strong>Precio estimado MENSUAL: $${total.toFixed(2)}<br>
                </strong><span style="font-size: 0.7em;">UAF: 01/11/2024<span></span> 
            `;
        } else {
            productos = 'No se encontraron datos para el volumen especificado.';
        }
    } else {
        productos = 'Por favor, ingresa un volumen válido.';
    }

    document.getElementById('resultadoMantenimiento').innerHTML = productos;
}



//calculadora recuperacion
function calcularRecuperacion() {
    // entrada de valores
    const tipoAgua = document.getElementById('tipoAguaRecuperacion').value;
    const volumen = parseInt(document.getElementById('volumenRecuperacion').value);
    let productos = '';

  

    if (volumen > 0) {
        // calcula los productos por tipo de agua y volumen
        const tabla = {
            //agua poco turbia
            aguaRed: [
                { volumen: 5, cloro: 1, sssAlum: 0.100, bp65: 0.250 },
                { volumen: 10, cloro: 1, sssAlum: 0.250, bp65: 0.250 },
                { volumen: 20, cloro: 2.5, sssAlum: 0.300, bp65: 0.750 },
                { volumen: 30, cloro: 2.5, sssAlum: 0.500, bp65: 1 },
                { volumen: 40, cloro: 5, sssAlum: 0.500, bp65: 1.5 },
                { volumen: 50, cloro: 5, sssAlum: 0.750, bp65: 1.5 },
                { volumen: 60, cloro: 7.5, sssAlum: 1, bp65: 2 },
                { volumen: 70, cloro: 10, sssAlum: 1, bp65: 2 },
                { volumen: 80, cloro: 10, sssAlum: 1.5, bp65: 2.5 },
                { volumen: 90, cloro: 15, sssAlum: 1.5, bp65: 2.5 },
                { volumen: 100, cloro: 15, sssAlum: 1.5, bp65: 2.5 },
            ],
            //agua turbia
            aguaPozo1: [
                { volumen: 5, cloro: 1, sssAlum: 0.250, bp65: 0.500 },
                { volumen: 10, cloro: 2.5, sssAlum: 0.250, bp65: 0.750 },
                { volumen: 20, cloro: 5, sssAlum: 0.500, bp65: 1.5 },
                { volumen: 30, cloro: 5, sssAlum: 0.500, bp65: 2 },
                { volumen: 40, cloro: 7.5, sssAlum: 0.750, bp65: 2 },
                { volumen: 50, cloro: 10, sssAlum: 1, bp65: 2 },
                { volumen: 60, cloro: 10, sssAlum: 1, bp65: 2.5 },
                { volumen: 70, cloro: 15, sssAlum: 1.5, bp65: 2.5 },
                { volumen: 80, cloro: 15, sssAlum: 3.5, bp65: 5 },
                { volumen: 90, cloro: 20, sssAlum: 3.5, bp65: 5 },
                { volumen: 100, cloro: 20, sssAlum: 3.5, bp65: 5 },
            ],
            //agua muy turbia
            aguaPozo2: [
                { volumen: 5, cloro: 2.5, sssAlum: 0.350, bp65: 0.750 },
                { volumen: 10, cloro: 5, sssAlum: 0.500, bp65: 1.5 },
                { volumen: 20, cloro: 10, sssAlum: 0.750, bp65: 2 },
                { volumen: 30, cloro: 15, sssAlum: 1, bp65: 2.5 },
                { volumen: 40, cloro: 20, sssAlum: 1.5, bp65: 2.5 },
                { volumen: 50, cloro: 25, sssAlum: 2, bp65: 5 },
                { volumen: 60, cloro: 25, sssAlum: 2, bp65: 5 },
                { volumen: 70, cloro: 30, sssAlum: 2.5, bp65: 5 },
                { volumen: 80, cloro: 30, sssAlum: 3.5, bp65: 10 },
                { volumen: 90, cloro: 35, sssAlum: 5, bp65: 10 },
                { volumen: 100, cloro: 35, sssAlum: 5, bp65: 10 },
            ],
        };

        // Seleccionar resultado según el tipo de agua
        let data = tabla[tipoAgua].find(item => item.volumen === volumen);

        if (data) {
            const total = (data.cloro * preciosQuimicos.cloro) + 
                          (data.sssAlum * preciosQuimicos.sssAlum) + 
                          (data.bp65 * preciosQuimicos.bp65);

            productos = `
                <strong>Cloro:</strong> ${data.cloro} Lts<br>
                <strong>SSS Alum:</strong> ${data.sssAlum} Lts<br>
                <strong>BP65:</strong> ${data.bp65} Lts<br><br><br>
                <strong>Precio estimado total:</strong>
                $${total.toFixed(2)}<br>
                </strong><span style="font-size: 0.7em;">UAF: 01/11/2024</span>
            `;
        } else {
            productos = 'No se encontraron datos para el volumen especificado.';
        }
    } else {
        productos = 'Por favor, ingresa un volumen válido.';
    }

    document.getElementById('resultadoRecuperacion').innerHTML = productos;
}


document.addEventListener("DOMContentLoaded", function() {
    const consideraciones = document.querySelectorAll('.consideracionTitulo');
    console.log(consideraciones); // Esto debería mostrarte una lista de los elementos encontrados

    if (consideraciones.length === 0) {
        console.error("No se encontraron elementos con la clase 'consideracionTitulo'.");
    }

    consideraciones.forEach(consideracion => {
        consideracion.addEventListener('click', function() {
            const cuerpo = this.nextElementSibling;
            if (cuerpo && cuerpo.classList.contains('cuerpoConsideracion')) {
                cuerpo.style.display = (cuerpo.style.display === 'block') ? 'none' : 'block';
                const flecha = this.querySelector('.flecha');
                flecha.innerHTML = cuerpo.style.display === 'block' ? '&#9652;' : '&#9662;';
            }
        });
    });
});






// Selecciona el ícono y el menú
const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('nav ul');

// Añade un evento de clic al ícono para abrir y cerrar el menú
menuIcon.addEventListener('click', () => {
  navMenu.classList.toggle('menu-open'); // Añade o quita la clase que abre el menú
});

