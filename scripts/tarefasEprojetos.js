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

document.addEventListener('DOMContentLoaded', function () {
    // Encontra todos os links que abrem submenus dropdown
    var dropdownToggleLinks = document.querySelectorAll('.nav-link[data-bs-toggle="collapse"]');

    // Remove a classe 'show' dos submenus dropdown
    dropdownToggleLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var targetId = link.getAttribute('href');
            var targetCollapse = document.querySelector(targetId);
            targetCollapse.classList.remove('show');
        });
    });
});

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
    document.getElementById('tarefasEprojetos').classList.add('d-none')
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
  
document.getElementById('tarefasEprojetosBtn').addEventListener('click', () => {
    document.getElementById('perfil').classList.add('d-none')
    document.getElementById('tarefasEprojetos').classList.remove('d-none')
    document.getElementById('inputFiltroPesquisa').value = ' '
})

function atualizarHora() {
    var data = new Date();
    var hora = data.getHours();
    var minutos = data.getMinutes();
    var segundos = data.getSeconds();

    // Formatação para garantir que os números tenham sempre dois dígitos
    if (hora < 10) hora = "0" + hora;
    if (minutos < 10) minutos = "0" + minutos;
    if (segundos < 10) segundos = "0" + segundos;

    // Exibir a hora no formato hh:mm:ss
    document.getElementById("hora").innerHTML = hora + ":" + minutos + ":" + segundos;
}

// Chamar a função inicialmente e a cada segundo
setInterval(atualizarHora, 1000);

let procurarGeral = document.getElementById('procurarGeral')

let salvarTarefaBtn = document.getElementById('salvarTarefaBtn')
let criarTarefaBtn = document.getElementById('criarTarefaBtn')

criarTarefaBtn.addEventListener('click', () => {
    let codigoAleatorio = gerarCodigoAleatorio();
    let tbody = document.getElementById('tbodyTarefas');
    let tarefasVaziasDiv = document.getElementById('tarefasVaziasDiv')

    if(tbody.classList.contains('vazio')){
        tbody.classList.remove('vazio')
        tarefasVaziasDiv.classList.add('d-none')
    }
    
    criarTR(codigoAleatorio)

    criarTarefaBtn.classList.add('d-none')
    salvarTarefaBtn.classList.remove('d-none')

    salvarTarefaBtn.addEventListener('click', () => {
        let tr = document.querySelector(".novo-item")

        if(tr){
            tr.classList.remove('novo-item')
            let numero = tr.getAttribute('numero');
            let textAreas = tr.querySelectorAll('textarea');

            textAreas.forEach(a => {
                a.readOnly = true;
            })

            let nome_projeto = textAreas[0].value
            let atividade_projeto = textAreas[1].value
            let prazo_final_projeto = textAreas[2].value
            let criado_por_projeto = textAreas[3].value
            let responsavel_projeto = textAreas[4].value
            let projeto_projeto = textAreas[5].value
            let marcadores_projeto = textAreas[6].value

            db.collection('TarefasEProjetos').doc(numero).set({
                data_id: codigoAleatorio,
                Nome:nome_projeto,
                Atividade:atividade_projeto,
                Prazo:prazo_final_projeto,
                Criador:criado_por_projeto,
                Responsavel:responsavel_projeto,
                Projeto:projeto_projeto,
                Marcadores:marcadores_projeto
            }).then(() => {
                console.log(`${numero} adicionado com sucesso`)
                salvarTarefaBtn.classList.add('d-none')
                criarTarefaBtn.classList.remove('d-none')
                buscarDadosEAtualizarTabela();
            }).catch(error => {
                console.log(`Erro ao adicionar ${numero}: ${error}`)
            })
            
        }else{
            console.log('TR não encontrado')
        }
    })

})


function criarTR(numero) {
    let tbody = document.getElementById('tbodyTarefas');

    let tr = document.createElement('tr');
    let codigoAleatorio = numero;
    tr.setAttribute('numero', codigoAleatorio);
    tr.classList.add('novo-item')

    console.log(numero)

    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
    let n = document.createElement('td');

    n.textContent = numero

    td0.className = 'text-start d-none checkBoxIcon';
    td1.className = 'p-2 text-center';
    td2.className = 'p-2 text-center';
    td3.className = 'p-2 text-center';
    td4.className = 'p-2 text-center';
    td5.className = 'p-2 text-center';
    td6.className = 'p-2 text-center';
    td7.className = 'p-2 text-center';
    n.className = 'p-2 text-center d-none';

    let textA1 = document.createElement('textarea');
    let textA2 = document.createElement('textarea');
    let textA3 = document.createElement('textarea');
    let textA4 = document.createElement('textarea');
    let textA5 = document.createElement('textarea');
    let textA6 = document.createElement('textarea');
    let textA7 = document.createElement('textarea');
    let checkbox = document.createElement('input');
    

    textA1.classList.add('text-start')
    textA2.classList.add('text-start')
    textA3.classList.add('text-start')
    textA4.classList.add('text-start')
    textA5.classList.add('text-start')
    textA6.classList.add('text-start')
    textA7.classList.add('text-start')

    textA1.placeholder="Digite o nome"
    textA2.placeholder="Digite a atividade"
    textA3.placeholder="Digite o prazo"
    textA4.placeholder="Digite o criador"
    textA5.placeholder="Digite o responsável"
    textA6.placeholder="Digite o projeto"
    textA7.placeholder="Digite o marcador"

    checkbox.type = 'checkbox';
    checkbox.className = 'Checkbox checkBoxIcon';

    td0.appendChild(checkbox);
    td1.appendChild(textA1);
    td2.appendChild(textA2);
    td3.appendChild(textA3);
    td4.appendChild(textA4);
    td5.appendChild(textA5);
    td6.appendChild(textA6);
    td7.appendChild(textA7);

    tr.appendChild(n);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    tbody.appendChild(tr);
}

function gerarCodigoAleatorio() {
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
 
    // Aumentando o comprimento do código para 40 caracteres
    for (let i = 0; i < 40; i++) {
        let indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
    }

    return codigo;
}

function exibirCheckboxes() {
    // Remove a classe 'd-none' das células que contêm checkboxes
    let checkboxes = document.querySelectorAll('.checkBoxIcon');
    document.getElementById('criarTarefaBtn').classList.add('d-none');
    console.log('Número de elementos selecionados:', checkboxes.length);
    checkboxes.forEach((icon) => {
        icon.classList.remove('d-none');
    });
}

document.getElementById('selecionarChecksBtn').addEventListener('click', () => {
    // Chama a função para exibir os checkboxes
    exibirCheckboxes();

    // Exibe os botões correspondentes
    document.getElementById('removeChecksBtn').classList.remove('d-none');
    document.getElementById('deleteChecksBtn').classList.remove('d-none');
    document.getElementById('selecionarChecksBtn').classList.add('d-none');
    
    document.getElementById('SelecionarCheckTable').classList.remove('d-none')

    let Checkbox = document.getElementsByClassName('Checkbox')
    let Checkbox2 = document.getElementsByClassName('checkBoxIcon')
    
    for(let check of Checkbox){
        check.classList.remove('d-none')
    }
    for(let check of Checkbox2){
        check.classList.remove('d-none')
    }
        
}); 

document.getElementById('removeChecksBtn').addEventListener('click', () => {
    // Oculta os checkboxes e os botões
    ocultarCheckboxes();
    document.getElementById('criarTarefaBtn').classList.remove('d-none');

});

document.getElementById('deleteChecksBtn').addEventListener('click', () => {
    // Lógica para remover as linhas com checkboxes selecionados
    document.getElementById('criarTarefaBtn').classList.remove('d-none');
    document.getElementById('removeChecksBtn').classList.add('d-none');
    document.getElementById('selecionarChecksBtn').classList.remove('d-none');
    ocultarCheckboxes();

    let checks = document.getElementsByClassName('Checkbox');
    for (let i = 0; i < checks.length; i++) {
        let checkbox = checks[i];
        if (checkbox.checked) {
            let tr = checkbox.closest('tr');
            let numero = tr.getAttribute('data-id'); // Obtém o número do item

            if (numero) { // Verifica se o número do documento é válido
                tr.remove(); // Remove a linha da tabela HTML

                // Remove o item do Firebase Firestore
                db.collection('TarefasEProjetos').doc(numero).delete()
                    .then(() => {
                        console.log(`Item ${numero} excluído com sucesso do Firestore`);
                    })
                    .catch((error) => {
                        console.log(`Erro ao excluir item ${numero} do Firestore: ${error}`);
                    });
            } else {
                console.log('Número do documento inválido:', numero);
            }
        }
    }
});

// Função para ocultar checkboxes e botões
function ocultarCheckboxes() {
    // Adiciona a classe 'd-none' às células que contêm checkboxes
    document.querySelectorAll('.checkBoxIcon').forEach((icon) => {
        icon.classList.add('d-none');
        document.getElementById('criarTarefaBtn').classList.remove('d-none');
    });

    // Oculta os botões correspondentes
    document.getElementById('removeChecksBtn').classList.add('d-none');
    document.getElementById('deleteChecksBtn').classList.add('d-none');
    document.getElementById('selecionarChecksBtn').classList.remove('d-none');
    document.getElementById('SelecionarCheckTable').classList.add('d-none')

    let Checkbox = document.getElementsByClassName('Checkbox')
    
    for(let check of Checkbox){
        check.classList.add('d-none')
    }
}

let tarefasEProjetosRef = db.collection('TarefasEProjetos');
function buscarDadosEAtualizarTabela() {
    tarefasEProjetosRef.get()
        .then((querySnapshot) => {
            // Verifica se existem dados
            if (!querySnapshot.empty) {
                document.getElementById('tarefasVaziasDiv').classList.add('d-none');
            } else {
                return;
            }

            // Se houver dados, limpe o tbody antes de adicionar novas linhas
            let tbody = document.getElementById('tbodyTarefas');
            tbody.innerHTML = '';

            querySnapshot.forEach((doc) => {
                let data = doc.data();
                let id = doc.id; // ID do documento Firebase

                let tr = document.createElement('tr');
                tr.setAttribute('data-id', id); // Adiciona o ID como atributo de dados

                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'Checkbox d-none text-center';
                tr.classList.add('text-center')
                tr.appendChild(checkbox);

                // Colunas de texto para cada item
                let textTds = [];
                let columns = ['Nome', 'Atividade', 'Prazo', 'Criador', 'Responsavel', 'Projeto', 'Marcadores'];

                columns.forEach(column => {

                    let td = document.createElement('td');

                    td.setAttribute('filtrinho', data[column]);

                    let textarea = document.createElement('textarea');
                    textarea.classList.add('text-center');
                    textarea.value = data[column] || ''; // Verifica se o campo existe ou é nulo
                    td.appendChild(textarea);
                    textTds.push(td);
                    textarea.readOnly = true;
                });

                // Adiciona as colunas de texto à linha da tabela
                textTds.forEach((td) => tr.appendChild(td));

                // Adiciona a linha à tabela
                tbody.appendChild(tr);
            });
        })
        .catch((error) => {
            console.log('Erro ao buscar dados do Firebase:', error);
        });
}

let inputFiltroPesquisa = document.getElementById('inputFiltroPesquisa');

inputFiltroPesquisa.addEventListener('input', () => {
    let filtro = inputFiltroPesquisa.value.toLowerCase(); // Obtém o texto digitado e converte para minúsculas

    let linhas = document.querySelectorAll('#myTable tbody tr'); // Seleciona todas as linhas da tabela
    linhas.forEach((linha) => {
        let colunas = linha.querySelectorAll('td.possui-filtro'); // Seleciona todas as células da linha com a classe 'possui-filtro'

        let linhaVisivel = false; // Define uma variável para controlar se a linha deve ser visível

        let valorAtributo1 = linha.children[1].getAttribute('filtrinho')
        let valorAtributo2 = linha.children[2].getAttribute('filtrinho')
        let valorAtributo3 = linha.children[3].getAttribute('filtrinho')
        let valorAtributo4 = linha.children[4].getAttribute('filtrinho')
        let valorAtributo5 = linha.children[5].getAttribute('filtrinho')
        let valorAtributo6 = linha.children[6].getAttribute('filtrinho')
        let valorAtributo7 = linha.children[7].getAttribute('filtrinho')

        if (valorAtributo1 && valorAtributo1.toLowerCase().includes(filtro)) {
            linhaVisivel = true; // Se encontrar, marca a linha como visível
        }else if (valorAtributo2 && valorAtributo2.toLowerCase().includes(filtro)) {
            linhaVisivel = true; // Se encontrar, marca a linha como visível
        }else if (valorAtributo3 && valorAtributo3.toLowerCase().includes(filtro)) {
            linhaVisivel = true; // Se encontrar, marca a linha como visível
        }else if (valorAtributo4 && valorAtributo4.toLowerCase().includes(filtro)) {
            linhaVisivel = true; // Se encontrar, marca a linha como visível
        }else if (valorAtributo5 && valorAtributo5.toLowerCase().includes(filtro)) {
            linhaVisivel = true; // Se encontrar, marca a linha como visível
        }else if (valorAtributo6 && valorAtributo6.toLowerCase().includes(filtro)) {
            linhaVisivel = true; // Se encontrar, marca a linha como visível
        }else if (valorAtributo7 && valorAtributo7.toLowerCase().includes(filtro)) {
            linhaVisivel = true; // Se encontrar, marca a linha como visível
        } 

        // Aplica a visibilidade à linha com base na variável 'linhaVisivel'
        if (linhaVisivel) {
            linha.style.display = ''; // Mostra a linha
        } else {
            linha.style.display = 'none'; // Oculta a linha
        }
    });
});


buscarDadosEAtualizarTabela();

let = document.getElementById('CRMBTN')

CRMBTN.addEventListener('click', () => {
    window.location.href = './CRM.html'
})