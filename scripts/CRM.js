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



// Autenticação do Firebase
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


// Função para deslogar um usuário
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
    document.getElementById('CRMDIV').classList.add('d-none')
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
    window.location.href = '../HTML/CRM.html'
})
  
document.getElementById('CRMBTN').addEventListener('click', () => {
    document.getElementById('perfil').classList.add('d-none')
})


let salvar_btn = document.getElementById('salvar-btn')

salvar_btn.addEventListener('click', () => {

    let nomeNegocio = document.getElementById('nomeNegocio').value.toUpperCase()
    let valorNegocio = document.getElementById('valorNegocio').value
    let nomeClienteNegocio = document.getElementById('nomeClienteNegocio').value.toUpperCase()
    let contatoClienteNegocio = document.getElementById('contatoClienteNegocio').value
    let empresaClienteNegocio = document.getElementById('empresaClienteNegocio').value.toUpperCase()

    if(nomeNegocio !== '' && valorNegocio.trim() !== '' && nomeClienteNegocio.trim !== '' && contatoClienteNegocio.trim !== '' && empresaClienteNegocio.trim !== ''){
        db.collection('negocios-desenvolvimento').doc(nomeNegocio).set({
            ClienteNome: nomeClienteNegocio,
            ContatoCliente:contatoClienteNegocio,
            Empresa: empresaClienteNegocio,
            NomeProjeto: nomeNegocio,
            Valor: valorNegocio,
        }).then(() => {
            console.log(`${nomeNegocio} adicionado com sucesso`)
            nomeClienteNegocio.value = ''
            contatoClienteNegocio.value = ''
            empresaClienteNegocio.value = ''
            nomeNegocio.value = ''
            valorNegocio.value = ''
            closeBtn.click()
            consultarColecao()
        }).catch(error => {
            console.log(`Erro ao adicionar ${nomeNegocio}: ${error}`)
        })
    }else{
        alert('TODOS OS CAMPOS DEVEM SER PREENCHIDOS')
    }



})

let salvar_btnDoc = document.getElementById('salvar-btnDoc')

salvar_btnDoc.addEventListener('click', () => {

    let nomeNegocio = document.getElementById('nomeNegocioDoc').value.toUpperCase()
    let valorNegocio = document.getElementById('valorNegocioDoc').value
    let nomeClienteNegocio = document.getElementById('nomeClienteDocumento').value.toUpperCase()
    let contatoClienteNegocio = document.getElementById('contatoClienteDocumento').value
    let empresaClienteNegocio = document.getElementById('empresaClienteDocumento').value.toUpperCase()

    if(nomeNegocio !== '' && valorNegocio.trim() !== '' && nomeClienteNegocio.trim !== '' && contatoClienteNegocio.trim !== '' && empresaClienteNegocio.trim !== ''){
        db.collection('Docs-Criados').doc(nomeNegocio).set({
            ClienteNome: nomeClienteNegocio,
            ContatoCliente:contatoClienteNegocio,
            Empresa: empresaClienteNegocio,
            NomeProjeto: nomeNegocio,
            Valor: valorNegocio,
        }).then(() => {
            console.log(`${nomeNegocio} adicionado com sucesso`)
            nomeClienteNegocio.value = ''
            contatoClienteNegocio.value = ''
            empresaClienteNegocio.value = ''
            nomeNegocio.value = ''
            valorNegocio.value = ''
            closeBtn.click()
            consultarColecaoDocumentos()
        }).catch(error => {
            console.log(`Erro ao adicionar ${nomeNegocio}: ${error}`)
        })
    }else{
        alert('TODOS OS CAMPOS DEVEM SER PREENCHIDOS')
    }

})


let salvar_btnAnd = document.getElementById('salvar-btnAnd')

salvar_btnAnd.addEventListener('click', () => {

    let nomeNegocio = document.getElementById('nomeNegocioAnd').value.toUpperCase()
    let valorNegocio = document.getElementById('valorNegocioAnd').value
    let nomeClienteNegocio = document.getElementById('nomeClienteAnd').value.toUpperCase()
    let contatoClienteNegocio = document.getElementById('contatoClienteAnd').value
    let empresaClienteNegocio = document.getElementById('empresaClienteAnd').value.toUpperCase()

    if(nomeNegocio !== '' && valorNegocio.trim() !== '' && nomeClienteNegocio.trim !== '' && contatoClienteNegocio.trim !== '' && empresaClienteNegocio.trim !== ''){
        db.collection('Andamento-Criados').doc(nomeNegocio).set({
            ClienteNome: nomeClienteNegocio,
            ContatoCliente:contatoClienteNegocio,
            Empresa: empresaClienteNegocio,
            NomeProjeto: nomeNegocio,
            Valor: valorNegocio,
        }).then(() => {
            console.log(`${nomeNegocio} adicionado com sucesso`)
            nomeClienteNegocio.value = ''
            contatoClienteNegocio.value = ''
            empresaClienteNegocio.value = ''
            nomeNegocio.value = ''
            valorNegocio.value = ''
            closeBtn.click()
            consultarColecaoDocumentosAnd()
        }).catch(error => {
            console.log(`Erro ao adicionar ${nomeNegocio}: ${error}`)
        })
    }else{
        alert('TODOS OS CAMPOS DEVEM SER PREENCHIDOS')
    }

})

let salvar_btnFat = document.getElementById('salvar-btnFat')

salvar_btnFat.addEventListener('click', () => { 

    let nomeNegocio = document.getElementById('nomeNegocioFat').value.toUpperCase()
    let valorNegocio = document.getElementById('valorNegocioFat').value
    let nomeClienteNegocio = document.getElementById('nomeClienteFat').value.toUpperCase()
    let contatoClienteNegocio = document.getElementById('contatoClienteFat').value
    let empresaClienteNegocio = document.getElementById('empresaClienteFat').value.toUpperCase()

    if(nomeNegocio !== '' && valorNegocio.trim() !== '' && nomeClienteNegocio.trim !== '' && contatoClienteNegocio.trim !== '' && empresaClienteNegocio.trim !== ''){
        db.collection('faturas-Criadas').doc(nomeNegocio).set({
            ClienteNome: nomeClienteNegocio,
            ContatoCliente:contatoClienteNegocio,
            Empresa: empresaClienteNegocio,
            NomeProjeto: nomeNegocio,
            Valor: valorNegocio,
        }).then(() => {
            console.log(`${nomeNegocio} adicionado com sucesso`)
            nomeClienteNegocio.value = ''
            contatoClienteNegocio.value = ''
            empresaClienteNegocio.value = ''
            nomeNegocio.value = ''
            valorNegocio.value = ''
            closeBtn.click()
            consultarColecaoFaturas()
        }).catch(error => {
            console.log(`Erro ao adicionar ${nomeNegocio}: ${error}`)
        })
    }else{
        alert('TODOS OS CAMPOS DEVEM SER PREENCHIDOS')
    }

})

let criarDesBtn = document.getElementById('criar-des-btn')
let closeBtn = document.getElementById('btn-close')
let criarDesDrop = document.getElementById('criar-des-drop')

criarDesBtn.addEventListener('click', () => {
    criarDesDrop.classList.remove('d-none')
})

closeBtn.addEventListener('click', () => {
    criarDesDrop.classList.add('d-none')
})

let criarDesBtnAnd = document.getElementById('criar-and-btn')
let closeBtnAnd = document.getElementById('btn-closeAnd')
let criarDesDropAnd = document.getElementById('criar-and-drop')

criarDesBtnAnd.addEventListener('click', () => {
    criarDesDropAnd.classList.remove('d-none')
})

closeBtnAnd.addEventListener('click', () => {
    criarDesDropAnd.classList.add('d-none')
})


let criarDesBtnDoc = document.getElementById('criar-doc-btn')
let closeBtnDoc = document.getElementById('btn-closeDoc')
let criarDesDropDoc = document.getElementById('criar-doc-drop')

criarDesBtnDoc.addEventListener('click', () => {
    criarDesDropDoc.classList.remove('d-none')
})

closeBtnDoc.addEventListener('click', () => {
    criarDesDropDoc.classList.add('d-none')
})

let criarFatBtnDoc = document.getElementById('criar-fat-btn')
let closeBtnFat = document.getElementById('btn-closeFat')
let criarDesDropFat = document.getElementById('criar-fat-drop')

criarFatBtnDoc.addEventListener('click', () => {
    criarDesDropFat.classList.remove('d-none')
})

closeBtnFat.addEventListener('click', () => {
    criarDesDropFat.classList.add('d-none')
})

function consultarColecao() {
    db.collection('negocios-desenvolvimento').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Cria elementos HTML com base nos dados do documento
            criarElementoHTML(doc.data());
        });
    })
    .catch((error) => {
        console.log("Erro ao consultar a coleção: ", error);
    });
}

function consultarColecaoAnd() {
    db.collection('Andamento-Criados').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Cria elementos HTML com base nos dados do documento
            criarElementoHTML(doc.data());
        });
    })
    .catch((error) => {
        console.log("Erro ao consultar a coleção: ", error);
    });
}

function consultarColecaoDocumentos() {
    db.collection('Docs-Criados').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Cria elementos HTML com base nos dados do documento
            criarElementoHTML2(doc.data());
        });
    })
    .catch((error) => {
        console.log("Erro ao consultar a coleção: ", error);
    });
}

function consultarColecaoFaturas() {
    db.collection('faturas-Criadas').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Cria elementos HTML com base nos dados do documento
            criarElementoHTML3(doc.data());
        });
    })
    .catch((error) => {
        console.log("Erro ao consultar a coleção: ", error);
    });
}

// Chamada para a função consultarColecao ao iniciar a página
window.addEventListener('DOMContentLoaded', () => {
    consultarColecao();
    consultarColecaoDocumentos();
    consultarColecaoFaturas();
});

// Função para criar elementos HTML com base nos dados do documento
function criarElementoHTML(data) {
    let divDesenvolvimentoCriado = document.createElement('div');
    divDesenvolvimentoCriado.classList.add('div-desenvolvimento-criado', 'mt-2', 'rounded', 'p-2');

    let divNomePCreated = document.createElement('div');
    divNomePCreated.classList.add('nome-p-created', 'text-center', 'p-2');

    // Itera sobre as chaves (campos) do objeto 'data'
    Object.keys(data).forEach((key) => {
        // Cria um input para cada campo do documento
        let inputLabel = document.createElement('h6');
        inputLabel.classList.add('mt-2');
        inputLabel.textContent = key;

        let inputField = document.createElement('input');
        inputField.classList.add('input-info');
        inputField.type = 'text';
        inputField.value = data[key]; // Valor do campo do documento
        
        // Adiciona o input e seu rótulo à div
        divNomePCreated.appendChild(inputLabel);
        divNomePCreated.appendChild(inputField);
    });

    // let btnSalvar = document.createElement('button')
    // btnSalvar.className = 'botaoSalvar w-100 text-center'
    // btnSalvar.textContent = 'salvar'


    divDesenvolvimentoCriado.appendChild(divNomePCreated);
    // divDesenvolvimentoCriado.appendChild(btnSalvar);


    // Adiciona o elemento criado ao container divElementosCriados
    document.getElementById('divElementosCriados').appendChild(divDesenvolvimentoCriado);
}

// Função para criar elementos HTML com base nos dados do documento
function criarElementoHTML2(data) {
    let divDesenvolvimentoCriado = document.createElement('div');
    divDesenvolvimentoCriado.classList.add('div-desenvolvimento-criado', 'mt-2', 'rounded', 'p-2');

    let divNomePCreated = document.createElement('div');
    divNomePCreated.classList.add('nome-p-created', 'text-center', 'p-2');

    // Itera sobre as chaves (campos) do objeto 'data'
    Object.keys(data).forEach((key) => {
        // Cria um input para cada campo do documento
        let inputLabel = document.createElement('h6');
        inputLabel.classList.add('mt-2');
        inputLabel.textContent = key;

        let inputField = document.createElement('input');
        inputField.classList.add('input-info');
        inputField.type = 'text';
        inputField.value = data[key]; // Valor do campo do documento
        
        // Adiciona o input e seu rótulo à div
        divNomePCreated.appendChild(inputLabel);
        divNomePCreated.appendChild(inputField);
    });

    // let btnSalvar = document.createElement('button')
    // btnSalvar.className = 'botaoSalvar w-100 text-center'
    // btnSalvar.textContent = 'salvar'

    divDesenvolvimentoCriado.appendChild(divNomePCreated);
    // divDesenvolvimentoCriado.appendChild(btnSalvar);

    // Adiciona o elemento criado ao container divElementosCriados
    document.getElementById('divDocumentosCriados').appendChild(divDesenvolvimentoCriado);
}


// Função para criar elementos HTML com base nos dados do documento
function criarElementoHTML3(data) {
    let divDesenvolvimentoCriado = document.createElement('div');
    divDesenvolvimentoCriado.classList.add('div-desenvolvimento-criado', 'mt-2', 'rounded', 'p-2');

    let divNomePCreated = document.createElement('div');
    divNomePCreated.classList.add('nome-p-created', 'text-center', 'p-2');

    // Itera sobre as chaves (campos) do objeto 'data'
    Object.keys(data).forEach((key) => {
        // Cria um input para cada campo do documento
        let inputLabel = document.createElement('h6');
        inputLabel.classList.add('mt-2');
        inputLabel.textContent = key;

        let inputField = document.createElement('input');
        inputField.classList.add('input-info');
        inputField.type = 'text';
        inputField.value = data[key]; // Valor do campo do documento
        
        // Adiciona o input e seu rótulo à div
        divNomePCreated.appendChild(inputLabel);
        divNomePCreated.appendChild(inputField);
    });

    // let btnSalvar = document.createElement('button')
    // btnSalvar.className = 'botaoSalvar w-100 text-center'
    // btnSalvar.textContent = 'salvar'

    divDesenvolvimentoCriado.appendChild(divNomePCreated);
    // divDesenvolvimentoCriado.appendChild(btnSalvar);

    // Adiciona o elemento criado ao container divElementosCriados
    document.getElementById('divFaturasCriados').appendChild(divDesenvolvimentoCriado);
}

let TEPBTN = document.getElementById('TEPBTN')

TEPBTN.addEventListener('click', () => {
    window.location.href = './tarefasEprojetos.html'
})
