document.addEventListener("DOMContentLoaded", () => {
    let pagos = JSON.parse(localStorage.getItem("pagos")) || [];
    const maxPagos = 100;
    const pagosRealizadosElemento = document.getElementById("pagosRealizados");
    const registrarPagoBtn = document.getElementById("registrarPago");
    const generarEstadoCuentaBtn = document.getElementById("generarEstadoCuenta");
    const descargarEstadoCuentaBtn = document.createElement("button");
    const historialPagosElemento = document.getElementById("historialPagos");
    const fechaPagoInput = document.getElementById("fechaPago");

    descargarEstadoCuentaBtn.textContent = "Descargar Estado de Cuenta";
    descargarEstadoCuentaBtn.style.display = "none";
    document.querySelector(".container").appendChild(descargarEstadoCuentaBtn);

    actualizarPagos();

    registrarPagoBtn.addEventListener("click", () => {
        if (pagos.length < maxPagos) {
            const fechaPago = fechaPagoInput.value;
            if (!fechaPago) {
                alert("Por favor, selecciona una fecha.");
                return;
            }

            pagos.push(fechaPago);
            localStorage.setItem("pagos", JSON.stringify(pagos));
            actualizarPagos();
        } else {
            alert("Has alcanzado el límite de 100 pagos.");
        }
    });

    generarEstadoCuentaBtn.addEventListener("click", () => {
        mostrarEstadoCuenta();
    });

    descargarEstadoCuentaBtn.addEventListener("click", () => {
        descargarEstadoCuentaPDF();
    });

    function actualizarPagos() {
        pagosRealizadosElemento.textContent = pagos.length;
        historialPagosElemento.innerHTML = "";
        pagos.forEach(fecha => {
            let li = document.createElement("li");
            li.textContent = `Pago realizado el ${fecha}`;
            historialPagosElemento.appendChild(li);
        });

        if (pagos.length > 0) {
            descargarEstadoCuentaBtn.style.display = "block";
        } else {
            descargarEstadoCuentaBtn.style.display = "none";
        }
    }

    function mostrarEstadoCuenta() {
        let estadoCuenta = "Estado de Cuenta:\n\n";
        pagos.forEach((fecha, index) => {
            estadoCuenta += `Pago ${index + 1}: ${fecha}\n`;
        });
        alert(estadoCuenta);
    }

    function descargarEstadoCuentaPDF() {
        if (typeof window.jspdf === "undefined") {
            alert("jsPDF no está cargado correctamente.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Estado de Cuenta", 20, 20);
        doc.setFontSize(12);

        if (pagos.length === 0) {
            doc.text("No hay pagos registrados.", 20, 30);
        } else {
            pagos.forEach((fecha, index) => {
                doc.text(`Pago ${index + 1}: ${fecha}`, 20, 30 + index * 10);
            });
        }

        doc.save("estado_de_cuenta.pdf");
    }
});

