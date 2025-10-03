// Aguarda o documento HTML ser completamente carregado.
document.addEventListener('DOMContentLoaded', function() {

  const formLogin = document.getElementById('form-login');
  // Pega também o campo de e-mail para ler seu valor.
  const emailInput = document.getElementById('email-login');

  formLogin.addEventListener('submit', function(event) {
    event.preventDefault();

    // --- SIMULAÇÃO DE LOGIN ---
    
    // NOVO: Captura o valor digitado no campo de e-mail.
    const emailUsuario = emailInput.value;

    console.log(`Usuário ${emailUsuario} logado com sucesso.`);

    // Armazena duas informações na sessionStorage:
    // 1. A confirmação de que está logado.
    sessionStorage.setItem('usuarioLogado', 'true');
    // 2. O e-mail do usuário para podermos exibi-lo depois.
    sessionStorage.setItem('emailUsuario', emailUsuario);

    // Redireciona o usuário de volta para a página inicial.
    window.location.href = 'index.html'; 
  });
});