const form = document.getElementById('form');
const inputTel = document.getElementById('telefone');
const nomes = [];
let linhas = "";






document.addEventListener('change', (e) => {
    const radios = document.getElementsByName('pais');
    let selectedValue;
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    selectedValue = consultarRadio();
    selectedValue == 'br' ? document.getElementById('ddi').innerHTML = '+55' : document.getElementById('ddi').innerHTML = '+1';
    selectedValue == 'br' ? document.getElementById('telefone').placeholder = '(00)XXXXX-XXXX' : document.getElementById('telefone').placeholder = '(000)XXX-XXXX';
    selectedValue == 'br' ? document.getElementById('telefone').max = '14' : document.getElementById('telefone').max = '12';

});

inputTel.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace') {
        limparInputTel();
        addInfo();
    }
});

inputTel.addEventListener('input', function(e) {

    radio = consultarRadio();
    let tel = e.target.value;
    
    if (tel.length == 2 && radio == 'br') {
        e.target.value = '(' + tel + ')';
    }
    if (tel.length == 9 && radio == 'br') {
        e.target.value =  tel + '-';
    }
    if (tel.length == 3 && radio == 'ca') {
        e.target.value = '(' + tel + ')';
    }
    if (tel.length == 8 && radio == 'ca') {
        e.target.value =  tel + '-';
    }

    if(tel.length == 0){
        addInfo();
    }else{
        limparInfo();
    }
    
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    if (validarNumero() == true){
        adicionaLinha();
        atualizaTabela();
        addInfo();
    }else{
        alert('Número inválido');
    }
    
});

function adicionaLinha(){
    const inputNome = document.getElementById('nome');
    const inputTelefone = document.getElementById('telefone');

    if(nomes.includes(inputNome.value)){
        alert('Nome já cadastrado');
    }else{
        nomes.push(inputNome.value);

        let codigo = consultarRadio() == 'br' ? '+55' : '+1';

        let linha = `<tr>`;
        linha += `<td>${inputNome.value}</td>`;
        linha += `<td>${codigo}${inputTelefone.value}</td>`;
        linha += `</tr>`;

        linhas += linha;
    }

    inputNome.value = '';
    inputTelefone.value = '';
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function consultarRadio(){
    const radios = document.getElementsByName('pais');
    let selectedValue;
    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

function limparInputTel(){
    inputTel.value = '';
}

function limparInfo(){
    document.getElementById('info').innerHTML = '';
}
function addInfo(){
    document.getElementById('info').innerHTML = 'Somente Números';
}

function validarNumero(){
    const valBr = /^\(\d{2}\)\d{5}-\d{4}$/;
    const valCa = /^\(\d{3}\)\d{3}-\d{4}$/;
    let radio = consultarRadio();
    let tel = inputTel.value;   

    return radio == 'br' ? valBr.test(tel) : valCa.test(tel);
    
}