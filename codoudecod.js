var selecionePasso = document.getElementById("selecionePasso");
var passo = document.getElementById("passo");
var metodo = document.getElementById("CifraCesarouB64");
var mensagem = document.getElementById("texto");
var resultado = document.getElementById("resultadoMensagem");

metodo.addEventListener("change", function () {
  if (metodo.value == "cifraDeCesar") {
    selecionePasso.style.display = "block";
    passo.style.display = "block";
  } else {
    passo.style.display = "none";
    selecionePasso.style.display = "none";
  }
});

var codOuDecod = document.querySelectorAll(".codOuDecod");
var botao = document.getElementById("botao");

codOuDecod[0].addEventListener("click", function () {
  if (codOuDecod[0].checked) {
    botao.innerText = "Codificar";
  }
});
codOuDecod[1].addEventListener("click", function () {
  botao.innerText = "Decodificar";
});

function cifraCodificar(message, passo) {
  return message
    .map((str) => {
      var textoEntrada = str.charCodeAt();
      if (textoEntrada >= 65 && textoEntrada <= 90) {
        return String.fromCharCode(((textoEntrada - 65 + passo) % 26) + 65);
      } else if (textoEntrada >= 97 && textoEntrada <= 122) {
        return String.fromCharCode(((textoEntrada - 97 + passo) % 26) + 97);
      } else {
        return str;
      }
    })
    .join("");
}

function cifraDecodificar(message, passo) {
  return message
    .map((str) => {
      var textoEntrada = str.charCodeAt();
      if (textoEntrada >= 65 && textoEntrada <= 90) {
        if (textoEntrada - 65 - passo < 0) {
          return String.fromCharCode(
            ((textoEntrada - 65 - passo + 26) % 26) + 65
          );
        } else {
          return String.fromCharCode(((textoEntrada - 65 - passo) % 26) + 65);
        }
      } else if (textoEntrada >= 97 && textoEntrada <= 122) {
        if (textoEntrada - 97 - passo < 0) {
          return String.fromCharCode(
            ((textoEntrada - 97 - passo + 26) % 26) + 97
          );
        } else {
          return String.fromCharCode(((textoEntrada - 97 - passo) % 26) + 97);
        }
      } else {
        return str;
      }
    })
    .join("");
}

botao.addEventListener("click", function (event) {
  event.preventDefault();
  if (metodo.value == "cifraDeCesar" && codOuDecod[0].checked) {
    var valorMessage = mensagem.value.split("");
    var valorPasso = parseInt(passo.value);
    resultado.value = cifraCodificar(valorMessage, valorPasso);
  } else if (metodo.value == "cifraDeCesar" && codOuDecod[1].checked) {
    var valorMessage = mensagem.value.split("");
    var valorPasso = parseInt(passo.value);
    resultado.value = cifraDecodificar(valorMessage, valorPasso);
  } else if (metodo.value == "base64" && codOuDecod[0].checked) {
    var valorMessage = mensagem.value;
    resultado.value = btoa(valorMessage);
  } else if (metodo.value == "base64" && codOuDecod[1].checked) {
    var valorMessage = mensagem.value;
    resultado.value = atob(valorMessage);
  }
});