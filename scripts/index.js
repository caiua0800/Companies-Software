
const firebaseConfig = {
    apiKey: "AIzaSyDogb6hu_rE6BEYJDpOEuoAFUtBEbvuHm4",
    authDomain: "projeto666-766a2.firebaseapp.com",
    projectId: "projeto666-766a2",
    storageBucket: "projeto666-766a2.appspot.com",
    messagingSenderId: "631434165442",
    appId: "1:631434165442:web:24efb51fa22ae4f989cf5b",
    measurementId: "G-NNPVYMYRBC"
};// Configuração do Firebase com as credenciais do seu projeto

// Inicializa o Firebase com a configuração fornecida
firebase.initializeApp(firebaseConfig);

// Obtém uma referência para o Firestore (banco de dados)
let db = firebase.firestore();

// Obtém uma referência para a autenticação do Firebase
let auth = firebase.auth();

// Declaração de uma constante 'base' com o valor 'Usuários'
let base = 'Usuários';

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function() {

    // Função para realizar o login do usuário com email e senha
    function login(email, senha) {
        auth.signInWithEmailAndPassword(email, senha)
            .then(user => {
                if (user) {
                    console.log(user + ' logado');
                    // Redireciona para a página tarefasEprojetos.html após 500ms
                    setTimeout(() => {
                        window.location.href = '../HTML/tarefasEprojetos.html'
                    }, 500)
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err.message);
                    // Exibe uma mensagem de erro em um modal
                    var modalTitle = document.getElementById('modalTitle');
                    var modalBody = document.getElementById('modalBody');
                    var modal = new bootstrap.Modal(document.getElementById('modal'));
                    modalTitle.textContent = 'Erro!';
                    modalTitle.classList.add('text-danger');
                    modalBody.classList.add('text-danger');
                    modalBody.textContent = 'ERRO, USUÁRIO INVÁLIDO!';
                    modal.show();
                }
            });
    }

    // Obtém referências para os campos de entrada de usuário e senha
    let usuario = document.getElementById('usuario');
    let senhaInput = document.getElementById('senha'); // Alterei o nome da variável para evitar conflito com a variável 'senha' definida anteriormente

    // Obtém referência para o botão de login
    let loginBtn = document.getElementById('login');

    // Adiciona um ouvinte de evento de clique ao botão de login
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Cancela o comportamento padrão de enviar o formulário
        login(usuario.value, senhaInput.value); // Chama a função 'login' passando os valores dos campos de entrada de usuário e senha
    });
});

