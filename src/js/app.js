// Espera a que todo el contenido del HTML esté cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL MODAL Y LA MÚSICA ---
    const modal = document.getElementById('welcome-modal');
    const enterButton = document.getElementById('enter-button');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('background-music');

    // Verifica que todos los elementos necesarios existan antes de añadir el listener.
    if (enterButton && modal && mainContent && audio) {
        enterButton.addEventListener('click', () => {
            // 1. Iniciar la música con un suave fundido de entrada (fade-in).
            let playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    audio.volume = 0;
                    let currentVolume = 0;
                    const fadeInterval = setInterval(() => {
                        currentVolume += 0.05;
                        if (currentVolume >= 1) {
                            audio.volume = 1;
                            clearInterval(fadeInterval);
                        } else {
                            audio.volume = currentVolume;
                        }
                    }, 50); // Puedes ajustar este valor para un fade-in más rápido o lento.
                }).catch(error => {
                    // Este error es común si el navegador bloquea la reproducción automática.
                    console.error("La reproducción de audio fue bloqueada:", error);
                });
            }

            // 2. Ocultar el modal con un fundido de salida (fade-out).
            modal.classList.add('hidden');

            // 3. Mostrar el contenido principal después de que termine la transición del modal.
            setTimeout(() => {
                modal.style.display = 'none'; // Oculta completamente el modal para no interferir.
                mainContent.style.display = 'block'; // Muestra el contenido principal.
            }, 800); // Este tiempo debe coincidir con la duración de la transición en CSS (0.8s).
        });
    }

    // --- BOTÓN FLOTANTE DE PLAY/PAUSE ---
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    if (musicToggle && audio) {
        // Mostrar el botón solo cuando el modal ya no está visible
        if (mainContent) {
            const observer = new MutationObserver(() => {
                if (mainContent.style.display === 'block') {
                    musicToggle.style.display = 'flex';
                } else {
                    musicToggle.style.display = 'none';
                }
            });
            observer.observe(mainContent, {
                attributes: true,
                attributeFilter: ['style']
            });
        }

        // Cambia el icono según el estado
        function updateMusicIcon() {
            if (audio.paused) {
                musicIcon.classList.remove('fa-pause');
                musicIcon.classList.add('fa-play');
                musicToggle.setAttribute('aria-label', 'Reproducir música');
            } else {
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-pause');
                musicToggle.setAttribute('aria-label', 'Pausar música');
            }
        }

        musicToggle.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            updateMusicIcon();
        });

        // Actualiza el icono si el usuario pausa/reproduce desde otro lado
        audio.addEventListener('play', updateMusicIcon);
        audio.addEventListener('pause', updateMusicIcon);
    }

    // --- CÓDIGO ORIGINAL PARA EL CONTENIDO PRINCIPAL ---

    //------------- SCRIPT CUENTA REGRESIVA ------------------------//
    const fechaObjetivo = new Date('2026-03-07T20:30:00');
    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');
    let countdownInterval; // Variable para poder detener el intervalo.

    function actualizarCuentaRegresiva() {
        const ahora = new Date();
        const diferencia = fechaObjetivo - ahora;

        // Si la fecha ya pasó, detiene el contador en cero.
        if (diferencia <= 0) {
            if (diasEl) diasEl.textContent = '0';
            if (horasEl) horasEl.textContent = '00';
            if (minutosEl) minutosEl.textContent = '00';
            if (segundosEl) segundosEl.textContent = '00';
            if (countdownInterval) clearInterval(countdownInterval); // Detiene el intervalo.
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        // Actualiza el contenido del HTML.
        if (diasEl) diasEl.textContent = dias;
        if (horasEl) horasEl.textContent = horas.toString().padStart(2, '0');
        if (minutosEl) minutosEl.textContent = minutos.toString().padStart(2, '0');
        if (segundosEl) segundosEl.textContent = segundos.toString().padStart(2, '0');
    }

    // Inicia el contador solo si los elementos existen en la página.
    if (diasEl) {
        actualizarCuentaRegresiva();
        countdownInterval = setInterval(actualizarCuentaRegresiva, 1000);
    }

    //-------------DROPDOWN MENU SCRIPT------------------------//
    const dropdownContainers = document.querySelectorAll('.dropdown-container');
    if (dropdownContainers.length > 0) {
        dropdownContainers.forEach(container => {
            const toggle = container.querySelector('.dropdown1');
            if (toggle) {
                toggle.addEventListener('click', () => {
                    // Alterna la clase 'active' solo en el contenedor clickeado.
                    container.classList.toggle('active');
                });
            }
        });
    }

    const copyButton = document.getElementById('copyAliasButton');
    if (copyButton) {
        copyButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que el dropdown se cierre al hacer clic en el botón.
            navigator.clipboard.writeText(copyButton.innerText).then(() => {
                const originalText = copyButton.innerText;
                copyButton.innerText = '¡Copiado!';
                copyButton.classList.add('copied');
                // Vuelve al texto original después de 2 segundos.
                setTimeout(() => {
                    copyButton.innerText = originalText;
                    copyButton.classList.remove('copied');
                }, 2000);
            });
        });
    }

    // --- LÓGICA DEL CARRUSEL ---
    const imagenCarrusel = document.querySelector('.imagen-carrusel');
    // Actualizamos las referencias a los nuevos elementos de control
    const areaControlDerecha = document.querySelector('.area-control.derecha');
    const areaControlIzquierda = document.querySelector('.area-control.izquierda');

    // Array de las 6 imágenes del carrusel. Asegúrate de que las rutas sean correctas.
    const imagenes = [
        'src/img/galeria/Rectangle 94.png',
        'src/img/galeria/Rectangle 95.png',
        'src/img/galeria/Rectangle 96.png',
        'src/img/galeria/Rectangle 97.png',
        'src/img/galeria/Rectangle 98.png',
        'src/img/galeria/Rectangle 99.png',
    ];

    let indiceActual = 0; // El índice de la imagen actualmente mostrada

    // Función para actualizar la imagen mostrada en el carrusel
    function actualizarImagenCarrusel() {
        if (imagenCarrusel) {
            imagenCarrusel.src = imagenes[indiceActual];
        }
    }

    // Event listener para el área de control derecha (Siguiente)
    if (areaControlDerecha) {
        areaControlDerecha.addEventListener('click', () => {
            indiceActual++;
            if (indiceActual >= imagenes.length) {
                indiceActual = 0; // Vuelve a la primera imagen si llega al final
            }
            actualizarImagenCarrusel();
        });
    }

    // Event listener para el área de control izquierda (Anterior)
    if (areaControlIzquierda) {
        areaControlIzquierda.addEventListener('click', () => {
            indiceActual--;
            if (indiceActual < 0) {
                indiceActual = imagenes.length - 1; // Vuelve a la última imagen si llega al principio
            }
            actualizarImagenCarrusel();
        });
    }

    // Inicializa la imagen del carrusel al cargar la página
    actualizarImagenCarrusel();
});