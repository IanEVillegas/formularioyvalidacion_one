export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    //El dataset es para conectar todos los datas que estén en el HTML, el .tipo es para indicar exactamente a cuál nos referimos (la palabra tipo podría ser cualquier otra que queramos)
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tiposDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

//* todo lo siguiente es agarrado del modo desarrollador de chrome
const mensajesDeError = {
    nombre: {
        valueMissing: "El espacio nombre no puede estar vacío."
    },
    email: {
        valueMissing: "El espacio email no puede estar vacío.",
        typeMismatch: "El email no es válido."
    },
    password: {
        valueMissing: "El espacio contaseña no puede estar vacío.",
        patternMismatch: "6-12 caracteres, al menos una minúzcula, una mayúzcula, un número y sin caracteres especiales."
    },
    nacimineto: {
        valueMissing: "El espacio fecha de nacimiento no puede estar vacío.",
        customError: "Debe tener como mínimo 18 años de edad."
    },
    numero: {
        valueMissing: "El espacio número de teléfono no puede estar vacío.",
        patternMismatch: "El formato requerido es xxxx xxxx"
    },
    direccion: {
        valueMissing: "El espacio dirección no puede estar vacío.",
        patternMismatch: "La dirección debe contener de 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "El espacio ciudad no puede estar vacío.",
        patternMismatch: "La ciudad debe contener de 10 a 40 caracteres"
    },
    provincia: {
        valueMissing: "El espacio provincia no puede estar vacío.",
        patternMismatch: "La provincia debe contener de 10 a 40 caracteres"
    }
}

const validadores = {
    nacimineto: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tiposDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener como mínimo 18 años de edad."
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}