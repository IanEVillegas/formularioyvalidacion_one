import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");
//"blur" es para cuando el mouse salga de foco o del espacio de texto, en estos casos
inputs.forEach(input => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    })
})