document.addEventListener("DOMContentLoaded", () => {
    let pagosRealizados = JSON.parse(localStorage.getItem("pagosRealizados")) || [];
    const pagosMaximos = 100;
    const pagosRealizadosElemento = document.getElementById("pagosRealizados");
    const registrarPagoBtn = document.getElementById("registrarPago");
    const activarNotificacionesBtn = document.getElementById("activarNotificaciones");
    const descargarEstadoCuentaBtn = document.getElementById("descargarEstadoCuenta");

    pagosRealizadosElemento.textContent = pagosRealizados.length;

    registrarPagoBtn.addEventListener("click", () => {
        if (pagosRealizados.length < pagosMaximos) {
            const fechaPago = prompt("Ingresa la fecha del pago (formato: yyyy-mm-dd):");
            if (fechaPago) {
                pagosRealizados.push({ fecha: fechaPago });
                localStorage.setItem("pagosRealizados", JSON.stringify(pagosRealizados));
                pagosRealizadosElemento.textContent = pagosRealizados.length;
            }
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

    // Función para descargar el estado de cuenta en formato Excel
    descargarEstadoCuentaBtn.addEventListener("click", () => {
        if (pagosRealizados.length === 0) {
            alert("No hay pagos registrados.");
            return;
        }

        const ws = XLSX.utils.json_to_sheet(pagosRealizados); // Convierte los pagos en una hoja de Excel
        const wb = XLSX.utils.book_new(); // Crea un nuevo libro de trabajo
        XLSX.utils.book_append_sheet(wb, ws, "Estado de Cuenta"); // Agrega la hoja al libro
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const blob = new Blob([wbout], { type: "application/octet-stream" }); // Crea un blob para la descarga
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "estado_de_cuenta.xlsx"; // Nombre del archivo de descarga
        link.click();
    });
});
