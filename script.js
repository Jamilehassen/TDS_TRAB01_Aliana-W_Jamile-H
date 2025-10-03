// =========================
// VARIÁVEIS GLOBAIS
// =========================
let carrinho = [];
let total = 0;

// =========================
// FUNÇÕES DE MENU E LOGIN
// =========================
function mostrarMenu(tipo) {
  const menuFunc = document.getElementById('menu-funcionario');
  const menuCli = document.getElementById('menu-cliente-view');
  const menuCompleto = document.getElementById('menu-completo');
  const menuLogado = document.getElementById('menu-logado');
  const menuCliente = document.getElementById('menu-cliente');
  const emailLogadoSpan = document.getElementById('email-logado');

  // Esconde tudo por padrão
  if (menuFunc) menuFunc.style.display = 'none';
  if (menuCli) menuCli.style.display = 'none';
  if (menuCompleto) menuCompleto.style.display = 'none';
  if (menuLogado) menuLogado.style.display = 'none';
  if (menuCliente) menuCliente.style.display = 'none';

  const estaLogado = sessionStorage.getItem('usuarioLogado');
  const emailUsuario = sessionStorage.getItem('emailUsuario');

  if (tipo === 'funcionario') {
    if (menuFunc) menuFunc.style.display = 'block';
    if (menuCompleto) menuCompleto.style.display = 'block';
  } else if (tipo === 'cliente') {
    if (menuCli) menuCli.style.display = 'block';
    if (menuCliente && !estaLogado) menuCliente.style.display = 'flex';
  }

  if (estaLogado === 'true' && emailUsuario) {
    if (menuLogado) menuLogado.style.display = 'flex';
    if (menuCliente) menuCliente.style.display = 'none';
    if (emailLogadoSpan) emailLogadoSpan.textContent = emailUsuario;
  }
}

// =========================
// FUNÇÕES DE CARRINHO
// =========================
function atualizarCarrinho() {
  const carrinhoItens = document.getElementById("carrinho-itens");
  const carrinhoTotal = document.getElementById("carrinho-total");

  if (!carrinhoItens || !carrinhoTotal) return;

  carrinhoItens.innerHTML = "";

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

  // evento de remover
  document.querySelectorAll(".remover-item").forEach(btn => {
    btn.addEventListener("click", function() {
      const idx = parseInt(this.getAttribute("data-index"));
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

// =========================
// FUNÇÃO SCROLL SUAVE
// =========================
function scrollParaMenu() {
  const menuCompleto = document.getElementById("menu-completo");
  const menuClienteView = document.getElementById("menu-cliente-view");

  const menuVisivel = window.getComputedStyle(menuCompleto).display !== 'none'
    ? menuCompleto
    : menuClienteView;

  if (menuVisivel) menuVisivel.scrollIntoView({ behavior: 'smooth' });
}

// =========================
// FUNÇÃO PARA POPULAR SELECT DE PRATO
// =========================
function popularSelectPratos() {
  const pratosDoCardapio = document.querySelectorAll('#menu-cliente-view .card-title');
  const selectPreferencia = document.getElementById('preferencia');

  if (!selectPreferencia || pratosDoCardapio.length === 0) return;

  selectPreferencia.innerHTML = '';
  const opcaoPadrao = document.createElement('option');
  opcaoPadrao.textContent = 'Selecione seu prato preferido';
  opcaoPadrao.value = '';
  selectPreferencia.appendChild(opcaoPadrao);

  pratosDoCardapio.forEach(prato => {
    const nomeDoPrato = prato.textContent;
    const novaOpcao = document.createElement('option');
    novaOpcao.value = nomeDoPrato;
    novaOpcao.textContent = nomeDoPrato;
    selectPreferencia.appendChild(novaOpcao);
  });
}

// =========================
// CÓDIGO PRINCIPAL
// =========================
document.addEventListener('DOMContentLoaded', function() {
  // Simula usuário (cliente ou funcionario)
  mostrarMenu('cliente'); // alterar para 'funcionario' se quiser testar

  // Scroll suave
  document.getElementById("btnExplorar")?.addEventListener("click", scrollParaMenu);

  // Adicionar ao carrinho
  document.querySelectorAll(".btn-pedir").forEach(btn => {
    btn.addEventListener("click", function() {
      const nome = this.getAttribute("data-nome");
      const preco = parseFloat(this.getAttribute("data-preco").replace(',', '.'));
      adicionarAoCarrinho(nome, preco);
    });
  });

  // Finalizar compra
  document.getElementById('btn-finalizar-compra')?.addEventListener('click', function() {
    const estaLogado = sessionStorage.getItem('usuarioLogado');
    if (estaLogado === 'true') {
      alert('Ótimo! Você está logado. Prosseguindo para o pagamento!');
    } else {
      alert('Você precisa estar logado para finalizar a compra!');
      window.location.href = 'login.html';
    }
  });

  // Logout
  document.getElementById('btn-logout')?.addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('emailUsuario');
    window.location.href = 'index.html';
  });

  // Popula select de pratos
  popularSelectPratos();
});
