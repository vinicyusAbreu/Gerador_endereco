(function() {
    const cep = document.getElementById('cep');
    const uf = document.getElementById('uf');
    const cidade = document.getElementById('cidade');
    const bairro = document.getElementById('bairro');
    const logradouro = document.getElementById('logradouro');
    const complemento = document.getElementById('complemento');


    const regex = /^[\d+]{5}-?[\d+]{3}$/;


    cep.addEventListener('keyup', correiosAPi)

    function correiosAPi(e) {
        const ajax = new XMLHttpRequest();


        const cep = e.target.value;

        if (cepValido(cep)) {

            ajax.open('GET', `https://viacep.com.br/ws/${cep}/json`)

            ajax.onload = function() {
                if (ajax.status === 200) {

                    const inputsTxt = JSON.parse(ajax.responseText);
                    preencherCampos(inputsTxt);
                }
            }

            ajax.send(null)
        };

    }

    function preencherCampos(valor) {
        uf.value = valor.uf != undefined ? valor.uf : '';
        cidade.value = valor.localidade != undefined ? valor.localidade : '';
        bairro.value = valor.bairro != undefined ? valor.bairro : '';
        logradouro.value = valor.logradouro != undefined ? valor.logradouro : '';

    }

    const cepValido = cep => regex.test(cep);

})()