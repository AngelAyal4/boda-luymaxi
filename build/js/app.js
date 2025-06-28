// Fecha objetivo: 7 de marzo de 2026, 20:30:00
const fechaObjetivo = new Date('2026-03-07T20:30:00');

function actualizarCuentaRegresiva() {
    const ahora = new Date();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        document.getElementById('dias').textContent = '0';
        document.getElementById('horas').textContent = '0';
        document.getElementById('minutos').textContent = '0';
        document.getElementById('segundos').textContent = '0';
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
}

actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);

//-------------DROPDOWN MENU------------------------//

document.addEventListener('DOMContentLoaded', function() {
            // Selecciona todos los contenedores de dropdown
            const dropdownContainers = document.querySelectorAll('.dropdown-container');

            dropdownContainers.forEach(container => {
                // Encuentra el encabezado clickeable dentro de cada contenedor
                const toggle = container.querySelector('.dropdown1');

                toggle.addEventListener('click', () => {
                    // Cierra todos los demás dropdowns abiertos
                    dropdownContainers.forEach(otherContainer => {
                        if (otherContainer !== container) {
                            otherContainer.classList.remove('active');
                        }
                    });
                    
                    // Alterna la clase 'active' en el contenedor clickeado
                    container.classList.toggle('active');
                });
            });

            // Funcionalidad del botón para copiar
            const copyButton = document.getElementById('copyAliasButton');
            if (copyButton) {
                copyButton.addEventListener('click', (event) => {
                    // Evita que el evento de clic se propague al dropdown y lo cierre
                    event.stopPropagation(); 
                    
                    const textToCopy = copyButton.innerText;

                    // Usa la API del portapapeles para copiar el texto
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        // Feedback visual para el usuario
                        const originalText = copyButton.innerText;
                        copyButton.innerText = '¡Copiado!';
                        copyButton.classList.add('copied');

                        // Vuelve al texto y estilo original después de 2 segundos
                        setTimeout(() => {
                            copyButton.innerText = originalText;
                            copyButton.classList.remove('copied');
                        }, 2000);
                    }).catch(err => {
                        // Manejo de errores en caso de que no se pueda copiar
                        console.error('Error al copiar el texto: ', err);
                        alert('No se pudo copiar el alias.');
                    });
                });
            }
        });