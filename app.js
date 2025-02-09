document.addEventListener("DOMContentLoaded", () => {
    let pagos = JSON.parse(localStorage.getItem("pagos")) || [];
    const maxPagos = 100;
    const pagosRealizadosElemento = document.getElementById("pagosRealizados");
    const registrarPagoBtn = document.getElementById("registrarPago");
    const generarEstadoCuentaBtn = document.getElementById("generarEstadoCuenta");
    const historialPagosElemento = document.getElementById("historialPagos");
    const fechaPagoInput = document.getElementById("fechaPago");

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
        let estadoCuenta = "Estado de Cuenta:\n\n";
        pagos.forEach((fecha, index) => {
            estadoCuenta += `Pago ${index + 1}: ${fecha}\n`;
        });
        alert(estadoCuenta);
    });

    function actualizarPagos() {
        pagosRealizadosElemento.textContent = pagos.length;
        historialPagosElemento.innerHTML = "";
        pagos.forEach(fecha => {
            let li = document.createElement("li");
            li.textContent = `Pago realizado el ${fecha}`;
            historialPagosElemento.appendChild(li);
        });
    }
});

