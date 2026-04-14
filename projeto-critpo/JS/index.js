const selectFIAT = document.getElementById('currency');
const selectCripto = document.getElementById('crypto');
const preço = document.getElementById('price');
const variação = document.getElementById('variation');
const valorMercado = document.getElementById('mktCap');
const negociação = document.getElementById('deal');
const btnCalcular = document.getElementById('calcular');

btnCalcular.addEventListener('click', (e) => {
    e.preventDefault()
    const moeda = selectFIAT.value.toLowerCase();
    const cripto = selectCripto.value.toLowerCase();
    if (moeda === "moeda" || cripto === "Cripto") {
        Swal.fire({
            icon: 'error',
            title: 'Seleção obrigatória',
            text: 'Escolha uma moeda e uma criptomoeda antes de calcular!'
        });
        return;
    }

    //Buscar valores na API

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=${moeda}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;


    fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'x-cg-demo-api-key': 'CG-KsDjFtuHS6VexaHCmk6ojtiZ'
        }
    })


        //Verificando sinal do servidor
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede ou chave inválida');
            }
            return response.json();
        })

        //Buscando dados no servidor
        .then(data => {
            const info = data[cripto];


            preço.value = info[moeda].toLocaleString('pt-BR', { style: 'currency', currency: moeda.toUpperCase() });
            variação.value = info[moeda + '_24h_change'].toFixed(2) + '%';
            valorMercado.value = info[moeda + '_market_cap'].toLocaleString('pt-BR');
            negociação.value = info[moeda + '_24h_vol'].toLocaleString('pt-BR');

            //Salvando registro
            const novoregistro = {
                id: crypto.randomUUID(),
                fiat: document.getElementById("currency").value,
                criptomoeda: document.getElementById("crypto").value,
                price: preço.value,
                variation: variação.value,
                mktCap: valorMercado.value,
                deal: negociação.value
            }
            salvarRegistro(novoregistro)
            mostrarRegistros()

        }).catch(error => {
            console.error("Erro detalhado:", error);

            //Demonstra o erro para o usuario
            Swal.fire({
                icon: 'error',
                title: 'Falha no servidor, tente novamente',
                text: 'Verifique sua conexão ou tente mais tarde',
                showConfirmButton: false,
                timer: 2000
            });

        });



});

function mostrarRegistros() {    
    const cotacoes = JSON.parse(localStorage.getItem('cotacoes')) || []
    const tabela = document.getElementById("tableWrapper")
    const vazio = document.getElementById("emptyMessage")
    const tabelabody = document.getElementById("tabelaBody")
    tabelabody.innerHTML = ""
    
    if (cotacoes.length === 0) {
        tabela.hidden = true
        vazio.hidden = false
        return
    }
    tabela.hidden = false
    vazio.hidden = true

    cotacoes.forEach(reg => {
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${reg.fiat}</td>
                        <td>${reg.criptomoeda}</td>
                        <td>${reg.price}</td>
                        <td>${reg.variation}</td>
                        <td>${reg.mktCap}</td>
                        <td>${reg.deal}</td>
                        `
        tabelabody.appendChild(tr)

    });
}

function salvarRegistro(cotacao) {    
    const cotacoes = JSON.parse(localStorage.getItem('cotacoes')) || []
    cotacoes.push(cotacao)
    localStorage.setItem('cotacoes', JSON.stringify(cotacoes))
}    



mostrarRegistros()