const textoInput = document.getElementById("texto");
const resultadoOutput = document.getElementById("resultado");
const mensagemOutput = document.getElementById("mensagem");
const criptografarBtn = document.getElementById("criptografar");
const descriptografarBtn = document.getElementById("descriptografar");
const copiarBtn = document.getElementById("copiar");

const substituicoes = {
    'a': 'x', 'e': 'y', 'i': 'w', 'o': 'z', 'u': 'v',
    'b': 'f', 'c': 'g', 'd': 'h', 'f': 'j', 'g': 'k',
    'h': 'l', 'j': 'm', 'k': 'n', 'l': 'p', 'm': 'q',
    'n': 'r', 'p': 's', 'q': 't', 'r': 'u', 's': 'i',
    't': 'o', 'v': 'a', 'x': 'e', 'y': 'i', 'z': 'o', 
    'w': 'u', ' ': '_'
};

// Função para criptografar o texto
function criptografar() {
    const textoOriginal = textoInput.value.toLowerCase();
    let textoCriptografado = "";

    if (!validarTexto(textoOriginal)) {
        mensagemOutput.textContent = "Caracteres inválidos. Use apenas letras minúsculas e sem acentos.";
        resultadoOutput.textContent = "";
        return;
    }

    for (let i = 0; i < textoOriginal.length; i++) {
        const letra = textoOriginal[i];
        textoCriptografado += substituicoes[letra] || letra;
    }

    resultadoOutput.textContent = textoCriptografado;
    mensagemOutput.textContent = "";
}

function descriptografar() {
    const textoCriptografado = textoInput.value;
    let textoOriginal = "";

    for (let i = 0; i < textoCriptografado.length; i++) {
        const letra = textoCriptografado[i];
        const letraOriginal = Object.keys(substituicoes).find(key => substituicoes[key] === letra);
        textoOriginal += letraOriginal || letra; 
    }

    resultadoOutput.textContent = textoOriginal;
    mensagemOutput.textContent = "";
}

function validarTexto(texto) {
    return /^[a-z\s]+$/.test(texto); 
}

function copiarTexto() {
    const textoCopiado = resultadoOutput.textContent;
    navigator.clipboard.writeText(textoCopiado)
        .then(() => {
            mensagemOutput.textContent = "Texto copiado com sucesso!";
        })
        .catch(err => {
            mensagemOutput.textContent = "Erro ao copiar: " + err;
        });
}

criptografarBtn.addEventListener("click", criptografar);
descriptografarBtn.addEventListener("click", descriptografar);
copiarBtn.addEventListener("click", copiarTexto);
