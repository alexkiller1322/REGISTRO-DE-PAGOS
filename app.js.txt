document.addEventListener("DOMContentLoaded", () => {
    let pagosRealizados = localStorage.getItem("pagosRealizados") || 0;
    const pagosMaximos = 100;
    const pagosRealizadosElemento = document.getElementById("pagosRealizados");
    const registrarPagoBtn = document.getElementById("registrarPago");
    const activarNotificacionesBtn = document.getElementById("activarNotificaciones");

    pagosRealizadosElemento.textContent = pagosRealizados;

    registrarPagoBtn.addEventListener("click", () => {
        if (pagosRealizados < pagosMaximos) {
            pagosRealizados++;
            localStorage.setItem("pagosRealizados", pagosRealizados);
            pagosRealizadosElemento.textContent = pagosRealizados;
        } else {
            alert("Has alcanzado el límite de 100 pagos.");
        }
    });

    activarNotificacionesBtn.addEventListener("click", () => {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                programarNotificacion();
            }
        });
    });

    function programarNotificacion() {
        setInterval(() => {
            new Notification("Recordatorio de pago", {
                body: "Es momento de registrar tu pago de 1000 pesos."
            });
        }, 518400000); // 6 días en milisegundos
    }
});
