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

// Função para enviar um e-mail de redefinição de senha para o usuário
function sendPasswordResetEmail(email) {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            // E-mail de redefinição de senha enviado com sucesso
            console.log('E-mail de redefinição de senha enviado com sucesso para: ' + email);
            // Remove a classe 'text-info' e adiciona a classe 'text-success' para alterar a cor do texto para verde
            document.getElementById('texto').classList.remove('text-info');
            document.getElementById('texto').classList.add('text-success');
            // Atualiza o texto para informar que o e-mail de redefinição foi enviado com sucesso
            document.getElementById('texto').textContent = 'E-mail de redefinição de senha enviado com sucesso para: ' + email;
        })
        .catch((error) => {
            // Ocorreu um erro ao enviar o e-mail de redefinição de senha
            console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
            // Remove a classe 'text-info' e adiciona a classe 'text-danger' para alterar a cor do texto para vermelho
            document.getElementById('texto').classList.remove('text-info');
            document.getElementById('texto').classList.add('text-danger');
            // Atualiza o texto para informar que ocorreu um erro ao enviar o e-mail de redefinição de senha
            document.getElementById('texto').textContent = 'Erro ao enviar o e-mail de redefinição de senha:' + error;
        });
}

// Obtém a referência para o campo de entrada de e-mail
let email = document.getElementById('emailRedefinir');

// Obtém a referência para o botão de enviar e-mail de redefinição de senha
let enviarEmailBtn = document.getElementById('enviarEmailBtn');

// Adiciona um ouvinte de evento de clique ao botão de enviar e-mail de redefinição de senha
enviarEmailBtn.addEventListener('click', () => {
    sendPasswordResetEmail(email.value); // Chama a função 'sendPasswordResetEmail' passando o valor do campo de entrada de e-mail
});

// Adiciona um ouvinte de evento de clique ao botão de voltar para a página inicial
document.getElementById('voltarBtn').addEventListener('click', () => {
    window.location.href = '../HTML/index.html'; // Redireciona o usuário para a página inicial
});
