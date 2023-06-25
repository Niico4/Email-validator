document.addEventListener("DOMContentLoaded", function () {
    const email = {
        email: "",
        asunto: "",
        mensaje: "",
    };

    // Seleccionar los elemento de intefaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const textareaMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector(
        '#formulario button[type="submit"'
    );
    const btnReset = document.querySelector('#formulario button[type="reset"');
    const spinner = document.querySelector("#spinner");

    // Asignar eventos
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    textareaMensaje.addEventListener("blur", validar);
    inputCc.addEventListener("blur", validarCc);

    formulario.addEventListener("submit", enviarEmail);

    btnReset.addEventListener("click", function (e) {
        e.preventDefault();
        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");
            resetFormulario();

            // Crear alerta
            const alertaExito = document.createElement("P");
            alertaExito.classList.add(
                "bg-green-500",
                "text-white",
                "p-2",
                "text-center",
                "rounded-lg",
                "mt-10",
                "font-bold",
                "text-sm",
                "uppercase"
            );
            alertaExito.textContent = "Mensaje enviado correctamente";

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(e) {
        if (e.target.value.trim() === "") {
            mostrarAlerta(
                `El Campo ${e.target.id} es obligatorio`,
                e.target.parentElement
            );
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

        if (e.target.id === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es válido", e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

        // Inyectar alerta a formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector(".bg-red-600");
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if (Object.values(email).includes("")) {
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        email.email = "";
        email.asunto = "";
        email.mensaje = "";

        formulario.reset();
        comprobarEmail();
    }

    function validarCc(e) {
        email[e.target.name] = e.target.value.trim().toLowerCase();

        if (!validarEmail(e.target.value)) {
            mostrarAlerta("El email no es valido", e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
        } else {
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
        }

        if (e.target.value === "") {
            delete email.divCc;
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
            return;
        }
    }
});

// Crear Div CC
const divCc = document.createElement("DIV");
divCc.classList.add("flex", "flex-col", "space-y-2");

// Crear Label CC
const labelCc = document.createElement("LABEL");
labelCc.classList.add("font-regular", "font-medium");
labelCc.setAttribute("for", "cc");
labelCc.innerHTML = '<p>CC: <span class="opacity-50">(Opcional)</span></p>';

// Crear Input Cc
const inputCc = document.createElement("INPUT");
inputCc.setAttribute("id", "cc");
inputCc.classList.add(
    "border",
    "border-gray-300",
    "px-3",
    "py-2",
    "rounded-lg"
);
inputCc.type = "email";
inputCc.placeholder = "Email Copia, ej: mkt@empresa.com";

// Agregar InputCc y LabelCc a DivCc
divCc.appendChild(labelCc);
divCc.appendChild(inputCc);

// Iyectar el Cc a el HTML
formulario.insertBefore(divCc, formulario.children[1]);
