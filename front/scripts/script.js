const cepForm = document.getElementById('cep-form');
const buttonSubmit = document.getElementById('buscar-cep');
const buttonSubmitUf = document.getElementById('buscar-uf');
const cepInput = document.getElementById('cep');
const ufForm = document.getElementById('estado-cidade-form');
const ufSelect = document.getElementById('uf-select');
const ufInput = document.getElementById('uf');

buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    checarFormCep();
})

buttonSubmitUf.addEventListener("click", (event) => {
    event.preventDefault();
    checarFormUf();
})

//API CEP
async function buscarEnderecoPorCep(event) {
    try {
        const resposta = await fetch(`https://localhost:7049/Cep?cep=${cepInput.value}`);
        if (!resposta.ok) {
            throw new Error('Erro ao buscar endereço');
        }
        const endereco = await resposta.json();
        return endereco;
    } catch (erro) {
        return Error('error');
    }
}

function exibirEndereco(endereco) {
    if (endereco.erro) {
        errorInput(cepInput, 'CEP não encontrado. Por favor, insira um CEP válido.');
        return;
    } else {
        const enderecoHtml = `
        <p><strong>Rua:</strong> ${endereco.logradouro || 'Não encontrado'}</p>
        <p><strong>Complemento:</strong> ${endereco.complemento || 'Não encontrado'}</p>
        <p><strong>Bairro:</strong> ${endereco.bairro || 'Não encontrado'}</p>
        <p><strong>Cidade:</strong> ${endereco.localidade || 'Não encontrado'}</p>
        <p><strong>Estado:</strong> ${endereco.uf || 'Não encontrado'}</p>
    `;

        document.getElementById('resultado').innerHTML = enderecoHtml;
    }
}

//API ENDEREÇO 
async function buscarEnderecoPorEstadoECidade(estado, cidade) {
    try {
        const resposta = await fetch(`https://localhost:7049/Endereco?uf=${ufSelect.value}&cidade=${ufInput.value}`);
        if (!resposta.ok) {
            throw new Error('Erro ao buscar endereço');
        }
        const enderecos = await resposta.json();
        return enderecos;
    } catch (erro) {
        console.error(erro);
    }
}

function exibirEnderecos(enderecos) {
    if (!enderecos || enderecos.length === 0) {
        errorInputUf(ufInput, 'Nenhum endereço encontrado. Por favor, insira um estado e cidade válidos.');
        return;
    }

    let enderecosHtml = '';

    enderecos.forEach(endereco => {
        enderecosHtml += `
            <div class="endereco-item">
                <h3>Endereço Encontrado:</h3>
                <p><strong>CEP:</strong> ${endereco.cep}</p>
                <p><strong>Rua:</strong> ${endereco.logradouro}</p>
                <p><strong>Bairro:</strong> ${endereco.bairro}</p>
                <!-- Você pode adicionar mais informações, como complemento, localidade e estado, se disponível -->
            </div>
        `;
    });

    document.getElementById('resultado-uf').innerHTML = enderecosHtml;
}

//API SIGLA
async function exibirUfs() {
    try {
        const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);
        if (!resposta.ok) {
            throw new Error('Erro ao buscar endereço');
        }
        const ufs = await resposta.json();

        ufs.sort((a, b) => a.sigla.localeCompare(b.sigla));
        const selectUf = document.getElementById('uf-select');

        ufs.forEach(uf => {
            const option = document.createElement('option');
            option.value += uf.sigla;
            option.textContent = uf.sigla;
            selectUf.appendChild(option);
        })
        return ufs;
    } catch (erro) {
        console.error(erro);
    }
}
exibirUfs();

// VALIDAÇÃO CEP
function checarFormCep() {
    checarInputCep();


    const isValid = cepInput.value && cepInput.value.length === 8;
    if (isValid) {
        buscarEnderecoPorCep(cepInput.value).then(endereco => exibirEndereco(endereco));
    }
}

function checarInputCep() {
    const cepValue = cepInput.value;

    if (!cepValue) {
        errorInput(cepInput, "Digite um CEP válido"); // Mensagem para valor nulo
    } else if (cepValue.length !== 8) {
        errorInput(cepInput, "O CEP deve ter exatamente 8 dígitos");
    } else {
        const formItem = cepInput.parentElement;
        formItem.className = "cep-form";
    }
}

// VALIDAÇÃO ENDEREÇO
function checarFormUf() {
    checarSelectUf();


    const isValid = ufSelect.value && ufInput.value;
    if (isValid) {
        const estado = ufSelect.value;
        const cidade = ufInput.value;
        buscarEnderecoPorEstadoECidade(estado, cidade).then(enderecos => exibirEnderecos(enderecos));
    }
}

function checarSelectUf() {
    const ufInputValue = ufInput.value;
    const ufSelectValue = ufSelect.value;
    const formItem = ufInput.closest('form');

    if (ufSelectValue === "" || ufInputValue === "") {
        errorInputUf(ufSelect, ufInput, "Preencha todos os campos!");
    } else {
        formItem.classList.remove('error');
        const textMessage = formItem.querySelector("span");
        textMessage.innerText = "";
    }
}

// ERRO CEP
function errorInput(input, message) {
    const formItem = input.closest('form');
    const textMessage = formItem.querySelector("span");

    textMessage.innerText = message;
    formItem.className = "cep-form error";
}

// ERRO ENDEREÇO
function errorInputUf(select, input, message) {
    const formItem = input.closest('form');
    const formItemSelect = select.closest('form');
    const textMessage = formItem.querySelector("span");

    textMessage.innerText = message;
    formItem.className = "estado-cidade-form error";
    formItemSelect.className = "estado-cidade-form error";
}