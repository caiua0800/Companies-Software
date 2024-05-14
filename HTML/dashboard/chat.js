const firebaseConfig = {
    apiKey: "AIzaSyDogb6hu_rE6BEYJDpOEuoAFUtBEbvuHm4",
    authDomain: "projeto666-766a2.firebaseapp.com",
    databaseURL: "https://projeto666-766a2-default-rtdb.firebaseio.com",
    projectId: "projeto666-766a2",
    storageBucket: "projeto666-766a2.appspot.com",
    messagingSenderId: "631434165442",
    appId: "1:631434165442:web:24efb51fa22ae4f989cf5b",
    measurementId: "G-NNPVYMYRBC"
};
  

let base = 'Usuários';
  
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

//antigo inicio

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let imagemUsuário = user.displayName.charAt(0);
        document.getElementsByClassName('fotoUsuario')[0].textContent = imagemUsuário;
        document.getElementsByClassName('fotoUsuario')[1].textContent = imagemUsuário;
        var displayName = user.displayName;
        if (displayName) {
            let email = user.email;
            var creationTime = user.metadata.creationTime;
            var formattedCreationTime = new Date(creationTime).toLocaleString('pt-BR');

            document.getElementById("username").innerText = displayName;
            document.getElementById('nomeUsuario').value = displayName;
            document.getElementById('emailUsuario').value = email;
            document.getElementById('dataCriacaoUsuario').textContent = formattedCreationTime;

        }
    } else {
        // O usuário não está autenticado, redirecionar para a página de login
        window.location.href = "index.html";
    }
});

function deslogar() {
    auth.signOut()
        .then(() => {
            console.log('Usuário deslogado com sucesso');
            // Redirecionar para a página de login ou qualquer outra página desejada após o logout
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.log('Erro ao deslogar o usuário: ' + error.message);
        });
}

document.getElementById('verPerfilBtn').addEventListener('click', () => {
    document.getElementById('perfil').classList.remove('d-none')
    document.getElementById('FEED').classList.add('d-none')
})


// Parte da edição de perfil
let editarPerfilBtn = document.getElementById('editarPerfilBtn');
let salvarPerfilBtn = document.getElementById('salvarPerfilBtn');
let cancelarPerfilBtn = document.getElementById('cancelarPerfilBtn');
let nomeUsuarioEdit = ''; // Inicialmente, deixe vazio

editarPerfilBtn.addEventListener('click', () => {
    salvarPerfilBtn.classList.remove('d-none');
    editarPerfilBtn.classList.add('d-none');
    cancelarPerfilBtn.classList.remove('d-none')

    document.getElementById('nomeUsuario').disabled = false;

    // Atualizar nomeUsuarioEdit com o valor atual do input
    nomeUsuarioEdit = document.getElementById('nomeUsuario').value.toUpperCase();
});

salvarPerfilBtn.addEventListener('click', () => {
    salvarPerfilBtn.classList.add('d-none');
    cancelarPerfilBtn.classList.add('d-none')
    editarPerfilBtn.classList.remove('d-none');

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var newDisplayName = document.getElementById('nomeUsuario').value.toUpperCase();
            if(newDisplayName === nomeUsuarioEdit){
                document.getElementById('dangerInfo').classList.remove('d-none');
            } else {
                user.updateProfile({
                    displayName: newDisplayName
                }).then(function() {
                    console.log("Nome de exibição atualizado com sucesso para: " + newDisplayName);
                    document.getElementById('dangerInfo').classList.add('d-none');
                    document.getElementById('nomeUsuario').value = newDisplayName.toUpperCase()
                    document.getElementById('username').textContent = newDisplayName.toUpperCase()
                }).catch(function(error) {
                    console.error("Erro ao atualizar o nome de exibição:", error);
                });
            }
        } else {
            console.error("Usuário não autenticado.");
        }
    });
    document.getElementById('nomeUsuario').disabled = true;

});

cancelarPerfilBtn.addEventListener('click', () => {
    window.location.href = '../HTML/tarefasEprojetos.html'
})
  
document.getElementById('FEED').addEventListener('click', () => {
    document.getElementById('perfil').classList.add('d-none')
    document.getElementById('FEED').classList.remove('d-none')
})

//antigo fim

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('Usuário logado:', user.displayName);
    } else {
        console.log('Nenhum usuário logado.');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const div_posts = document.getElementById('conversation-cards');

    document.querySelector('#sendPost').addEventListener('click', () => {
        const messageText = document.querySelector('#new-Text-Post').value;
        const currentUser = auth.currentUser;
    
        if (messageText !== '') {
            if (currentUser) {
                // Se houver um usuário logado, salve o post com o nome do usuário
                salvarPostNoFirebase(messageText, currentUser.displayName);
            } else {
                // Caso contrário, salve como 'Anonymous'
                salvarPostNoFirebase(messageText, 'Anonymous');
            }
            document.querySelector('#new-Text-Post').value = '';
        } else {
            alert('Por favor, digite uma mensagem.');
        }
    });

});

database.ref('posts').on('child_added', (snapshot) => {
    const post = snapshot.val();
    criarPost(post.texto, post.user, post.hora); // Passando o timestamp do post
});

function criarPost(texto, user, timestamp) {
    let div_posts = document.getElementById('conversation-cards');

    // Criar a div post
    let divPost = document.createElement('div');
    divPost.className = 'post shadow';

    // Criar o cabeçalho do post
    let h3 = document.createElement('h3');
    h3.textContent = `@${user}`; // Usando o nome de usuário recebido como parâmetro
    divPost.appendChild(h3);

    // Criar o parágrafo do post
    let p = document.createElement('p');
    p.textContent = texto;
    divPost.appendChild(p);

    // Criar o span para exibir o horário
    let spanTime = document.createElement('span');
    spanTime.className = 'time-message';
    // Converter o timestamp para um objeto Date
    let postTime = new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    spanTime.textContent = postTime;
    divPost.appendChild(spanTime);

    // Adicionar o post à div de posts
    div_posts.appendChild(divPost);
}

function salvarPostNoFirebase(texto, user) {
    database.ref('posts').push({
        user: user, // Salve o usuário recebido como parâmetro
        texto: texto,
        hora: firebase.database.ServerValue.TIMESTAMP // Adiciona o timestamp do servidor
    });
}
