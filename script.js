// ======================================
// SISTEMA POWERFIT ACADEMIA
// ======================================


// CADASTRO DE ALUNO

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", function(event) {

        event.preventDefault();

        // Pegando os valores dos campos
        const nome = document.getElementById("nome").value;
        const cpf = document.getElementById("cpf").value;
        const nascimento = document.getElementById("nascimento").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        const plano = document.getElementById("plano").value;
        const pagamento = document.getElementById("pagamento").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;


        // Verificar se as senhas são iguais
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }


        // Verificar se o e-mail já está cadastrado
        const usuarioExistente = JSON.parse(localStorage.getItem("usuarioPowerFit"));

        if (usuarioExistente && usuarioExistente.email === email) {
            alert("Este e-mail já está cadastrado!");
            return;
        }


        // Criar objeto com os dados do aluno
        const usuario = {
            nome: nome,
            cpf: cpf,
            nascimento: nascimento,
            email: email,
            telefone: telefone,
            endereco: endereco,
            plano: plano,
            pagamento: pagamento,
            senha: senha
        };


        // Salvar no navegador
        localStorage.setItem("usuarioPowerFit", JSON.stringify(usuario));


        alert("Cadastro realizado com sucesso!");


        // Ir para a tela de login
        window.location.href = "login.html";

    });

}



// ======================================
// LOGIN
// ======================================

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function(event) {

        event.preventDefault();

        const emailLogin = document.getElementById("email").value;
        const senhaLogin = document.getElementById("senha").value;


        // Buscar usuário salvo
        const usuario = JSON.parse(localStorage.getItem("usuarioPowerFit"));


        // Verificar se existe cadastro
        if (!usuario) {
            alert("Nenhum usuário cadastrado. Faça seu cadastro primeiro.");
            return;
        }


        // Verificar e-mail e senha
        if (emailLogin === usuario.email && senhaLogin === usuario.senha) {

            alert("Login realizado com sucesso!");


            // Salvar sessão do usuário
            localStorage.setItem("usuarioLogado", "true");


            // Redirecionar para página inicial
            window.location.href = "index.html";

        } else {

            alert("E-mail ou senha incorretos!");

        }

    });

}
// ======================================
// DASHBOARD DO ALUNO
// ======================================

const nomeAluno = document.getElementById("nomeAluno");

if (nomeAluno) {

    const usuario = JSON.parse(localStorage.getItem("usuarioPowerFit"));

    const logado = localStorage.getItem("usuarioLogado");

    // Verificar se está logado
    if (!usuario || logado !== "true") {

        alert("Você precisa fazer login primeiro!");

        window.location.href = "login.html";

    } else {

        // Mostrar informações do aluno

        document.getElementById("nomeAluno").textContent = usuario.nome;

        document.getElementById("planoAluno").textContent =
            usuario.plano;

        document.getElementById("infoNome").textContent =
            usuario.nome;

        document.getElementById("infoEmail").textContent =
            usuario.email;

        document.getElementById("infoTelefone").textContent =
            usuario.telefone;

        document.getElementById("infoCpf").textContent =
            usuario.cpf;

        document.getElementById("infoPlano").textContent =
            usuario.plano;

        document.getElementById("infoPagamento").textContent =
            usuario.pagamento;

    }

}


// ======================================
// BOTÃO SAIR
// ======================================

const btnSair = document.getElementById("btnSair");

if (btnSair) {

    btnSair.addEventListener("click", function(event) {

        event.preventDefault();

        localStorage.removeItem("usuarioLogado");

        alert("Você saiu da sua conta.");

        window.location.href = "dashboard.html";

    });

}
// ======================================
// PAINEL ADMINISTRATIVO
// ======================================

const tabelaAlunos = document.getElementById("tabelaAlunos");

if (tabelaAlunos) {

    const usuario = JSON.parse(localStorage.getItem("usuarioPowerFit"));

    if (usuario) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
            <td>${usuario.plano}</td>
            <td class="status">● Ativo</td>
            <td>
                <button class="btn-editar" onclick="editarAluno()">
                    Editar
                </button>

                <button class="btn-excluir" onclick="excluirAluno()">
                    Excluir
                </button>
            </td>
        `;

        tabelaAlunos.appendChild(linha);

        document.getElementById("totalAlunos").textContent = "1";
        document.getElementById("alunosAtivos").textContent = "1";

    } else {

        tabelaAlunos.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    Nenhum aluno cadastrado.
                </td>
            </tr>
        `;

        document.getElementById("totalAlunos").textContent = "0";
        document.getElementById("alunosAtivos").textContent = "0";
    }

}


// EDITAR ALUNO

function editarAluno() {

    alert("Função de edição será implementada em breve.");

}


// EXCLUIR ALUNO

function excluirAluno() {

    const confirmacao = confirm("Deseja realmente excluir este aluno?");

    if (confirmacao) {

        localStorage.removeItem("usuarioPowerFit");

        alert("Aluno excluído com sucesso!");

        window.location.reload();

    }

}


// SAIR DO ADMIN

const btnSairAdmin = document.getElementById("btnSairAdmin");

if (btnSairAdmin) {

    btnSairAdmin.addEventListener("click", function(event) {

        event.preventDefault();

        localStorage.removeItem("usuarioLogado");

        window.location.href = "login.html";

    });

}