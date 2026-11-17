var botao = document.getElementById("botao");
var campo = document.getElementById("item");
var campoPreco = document.getElementById("preco");
var lista = document.getElementById("lista");
var totalTela = document.getElementById("total");

var itens = [];

function salvar() {
  localStorage.setItem("compras", JSON.stringify(itens));
}

function dinheiro(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrar() {
  lista.innerHTML = "";
  var total = 0;

  itens.forEach(function (item, posicao) {
    total = total + item.preco;

    var li = document.createElement("li");
    li.textContent = item.nome + " - " + dinheiro(item.preco) + " ";

    var apagar = document.createElement("button");
    apagar.textContent = "❌";
    apagar.onclick = function () {
      itens.splice(posicao, 1);
      salvar();
      mostrar();
    };

    li.appendChild(apagar);
    lista.appendChild(li);
  });

  totalTela.textContent = "Total: " + dinheiro(total);
}

botao.onclick = function () {
  var nome = campo.value;
  var preco = parseFloat(campoPreco.value);

  if (nome === "") {
    return;
  }
  if (isNaN(preco)) {
    preco = 0;
  }

  itens.push({ nome: nome, preco: preco });
  salvar();
  mostrar();
  campo.value = "";
  campoPreco.value = "";
};

var guardado = localStorage.getItem("compras");
if (guardado) {
  itens = JSON.parse(guardado).map(function (i) {
    if (typeof i === "string") {
      return { nome: i, preco: 0 };
    }
    return i;
  });
}
mostrar();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(function () {});
}