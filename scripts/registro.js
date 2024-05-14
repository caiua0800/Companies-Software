
const firebaseConfig = {
    apiKey: "AIzaSyDogb6hu_rE6BEYJDpOEuoAFUtBEbvuHm4",
    authDomain: "projeto666-766a2.firebaseapp.com",
    projectId: "projeto666-766a2",
    storageBucket: "projeto666-766a2.appspot.com",
    messagingSenderId: "631434165442",
    appId: "1:631434165442:web:24efb51fa22ae4f989cf5b",
    measurementId: "G-NNPVYMYRBC"
};// Configuração do Firebase com as credenciais do seu projeto

firebase.initializeApp(firebaseConfig); // Inicialização do Firebase com as configurações fornecidas

let db = firebase.firestore(); // Referência para o Firestore do Firebase
let auth = firebase.auth(); // Referência para o sistema de autenticação do Firebase
let num = 4; // Variável para controlar o tempo de redirecionamento

function criarUsuário(email, senha, nome, dataDeNascimento, telefone) {
    auth.createUserWithEmailAndPassword(email, senha)
        .then(userCredential => {
            let user = userCredential.user;

            // Obtém a data atual
            let dataAtual = new Date();

            // Define a data de criação como a data atual
            let dataDeCriacao = dataAtual.toISOString();

            // Atualiza o perfil do usuário com o nome de exibição
            user.updateProfile({
                displayName: nome.toUpperCase()
            }).then(() => {
                // Adiciona os dados do usuário ao Firestore
                db.collection('Usuários').doc(user.uid).set({
                    email: email,
                    nome: nome.toUpperCase(),
                    dataDeNascimento: dataDeNascimento,
                    telefone: telefone,
                    dataDeCriacao: dataDeCriacao  // Adiciona a data de criação ao documento do usuário
                }).then(() => {
                    console.log('Registro Criado com sucesso');
                    var modalTitle = document.getElementById('modalTitle');
                    var modalBody = document.getElementById('modalBody');
                    var modal = new bootstrap.Modal(document.getElementById('modal'));
                    modalTitle.textContent = 'Sucesso';
                    modalTitle.classList.add('text-su');
                    modalBody.classList.add('text-danger');
                    modalBody.textContent = 'As senhas não são iguais\nNo mínimo 6 caracteres contendo pelo menos 1 especial\nEX: @, _, ...';
                    modal.show();
                }).catch(error => {
                    console.log('Erro ao adicionar dados do usuário ao Firestore: ' + error);
                });

                // Configuração e exibição do modal de sucesso
                var modalTitle = document.getElementById('modalTitle');
                var modalBody = document.getElementById('modalBody');
                var modal = new bootstrap.Modal(document.getElementById('modal'));
                modalTitle.textContent = 'Sucesso!';
                modalTitle.classList.add('text-success');
                modalBody.classList.add('text-success');
                modalBody.textContent = 'Usuário criado com sucesso\nIndo para tela de início em ' + num;

                // Função para atualizar o contador de redirecionamento
                function updateNum() {
                    num -= 1;
                    modalBody.textContent = 'Usuário criado com sucesso\nIndo para tela de início em ' + num;
                    if (num === 0) {
                        window.location.href = '../HTML/index.html'; // Redireciona para a página inicial após o tempo especificado
                    } else {
                        setTimeout(updateNum, 1000); // Chama a função novamente após 1 segundo
                    }
                }

                setTimeout(updateNum, 1000); // Inicia o contador

                modal.show(); // Exibe o modal de sucesso
            }).catch(error => {
                console.log('Erro ao atualizar o perfil do usuário: ' + error);
            });
        })
        .catch(err => {
            console.log('Erro ao criar usuário: ' + err);
        });
}


// Seleção dos elementos HTML relevantes
let registrarBtn = document.getElementById('registrarBtn');
let email = document.getElementById('emailRegistro');
let senha = document.getElementById('senhaRegistro');
let senha2 = document.getElementById('senhaRegistro2');
let nome = document.getElementById('nomeRegistro');
let dataDeNascimento = document.getElementById('dataDeNascimentoRegistro');
let Telefone = document.getElementById('celularRegistro');

// Evento de clique no botão de registro
registrarBtn.addEventListener('click', () => {
    // Verifica se as senhas fornecidas são iguais
    if (senha.value === senha2.value) {
        criarUsuário(email.value, senha.value, nome.value, dataDeNascimento.value, Telefone.value); // Chama a função para criar o usuário
    } else {
        // Configuração e exibição do modal de erro para senhas diferentes
        var modalTitle = document.getElementById('modalTitle');
        var modalBody = document.getElementById('modalBody');
        var modal = new bootstrap.Modal(document.getElementById('modal'));
        modalTitle.textContent = 'Erro!';
        modalTitle.classList.add('text-danger');
        modalBody.classList.add('text-danger');
        modalBody.textContent = 'As senhas não são iguais\nNo mínimo 6 caracteres contendo pelo menos 1 especial\nEX: @, _, ...';
        modal.show();
    }
});