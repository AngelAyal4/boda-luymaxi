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