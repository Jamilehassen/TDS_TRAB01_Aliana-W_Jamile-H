// Simula o tipo de usuário logado (cliente ou funcionário)
  function definirUsuario(tipo) {
    const navFuncionario = document.getElementById('menu-funcionario');
    const navCliente = document.getElementById('menu-cliente');
    const menuCompleto = document.getElementById('menu-completo');
    const menuCliente = document.getElementById('menu-cliente-view');

    if (tipo === 'funcionario') {
      navFuncionario.style.display = 'block';
      navCliente.style.display = 'none';
      menuCompleto.style.display = 'block';
      menuCliente.style.display = 'none';
    } else if (tipo === 'cliente') {
      navFuncionario.style.display = 'none';
      navCliente.style.display = 'block';
      menuCompleto.style.display = 'none';
      menuCliente.style.display = 'block';
    }
  }

  window.onload = function() {
    definirUsuario('cliente'); // alterar para 'funcionario' para simular

    // Adiciona evento de clique no botão Explorar
    const btnExplorar = document.getElementById("btnExplorar");
    if (btnExplorar) {
      btnExplorar.addEventListener("click", function() {
        // Descobre qual menu está visível e rola até ele
        const menuVisivel = document.getElementById("menu-completo").style.display === "block"
          ? document.getElementById("menu-completo")
          : document.getElementById("menu-cliente-view");

        menuVisivel.scrollIntoView({ behavior: "smooth" });
      });
    }
  }


// =========================
// Carrinho de Compras
// =========================
let carrinho = [];
let total = 0;

function atualizarCarrinho() {
  const carrinhoItens = document.getElementById("carrinho-itens");
  const carrinhoTotal = document.getElementById("carrinho-total");

  carrinhoItens.innerHTML = ""; // limpa lista
  carrinho.forEach((item, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td><button class="btn btn-sm btn-danger remover-item" data-index="${index}">
        <i class="bi bi-trash"></i> Remover
      </button></td>
    `;

    carrinhoItens.appendChild(tr);
  });

  carrinhoTotal.textContent = total.toFixed(2);

  // adiciona evento para remover
  document.querySelectorAll(".remover-item").forEach(btn => {
    btn.addEventListener("click", function() {
      const idx = this.getAttribute("data-index");
      total -= carrinho[idx].preco;
      carrinho.splice(idx, 1);
      atualizarCarrinho();
    });
  });
}

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-pedir").forEach(btn => {
    btn.addEventListener("click", function() {
      const nome = this.getAttribute("data-nome");
      const preco = parseFloat(this.getAttribute("data-preco"));
      adicionarAoCarrinho(nome, preco);
    });
  });
});
