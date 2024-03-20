function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);

        // Exibe a seção de resultados
        document.querySelector('.resultado').style.display = 'block';
    } else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado 😔 tente novamente.");

        // Oculta a seção de resultados
        document.querySelector('.resultado').style.display = 'none';
    }
}

function pesquisacep() {
    //Nova variável "cep" somente com dígitos.
    var cep = document.getElementById('cep').value.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");

            // Oculta a seção de resultados
            document.querySelector('.resultado').style.display = 'none';
        }
    } else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();

        // Oculta a seção de resultados
        document.querySelector('.resultado').style.display = 'none';
    }
};
