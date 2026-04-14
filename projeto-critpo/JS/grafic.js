let chartInstance = null;
let periodo = 7;
let moedaAtual = "bitcoin";

// BOTÕES (24h, 7 dias, 30 dias)
const botoes = document.querySelectorAll(".botaoquadro");

botoes.forEach((btn) => {
  btn.addEventListener("click", () => {
    periodo = btn.getAttribute("data-days");

    // Se já tiver moeda selecionada, atualiza o gráfico
    if (moedaAtual) {
      carregarGrafico(moedaAtual);
    }
    
  });
});

// LINHAS (moedas)
const linhas = document.querySelectorAll(".table tr");

linhas.forEach((linha) => {
  linha.addEventListener("click", () => {
    const coin = linha.getAttribute("data-coin");
    moedaAtual = coin;
    carregarGrafico(coin);
  });
});

// FUNÇÃO PRINCIPAL DO GRÁFICO
async function carregarGrafico(coin) {
  try {
    const resposta = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${periodo}`
    );

    const dados = await resposta.json();

    const labels = dados.prices.map((item) => {
      const data = new Date(item[0]);

      // Se for 24h, mostra hora
      if (periodo == 1) {
        return data.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit"
        });
      }

      return data.toLocaleDateString("pt-BR");
    });

    const valores = dados.prices.map((item) => item[1]);

    const ctx = document.getElementById("grafico").getContext("2d");

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: `Preço de ${coin} (USD)`,
            data: valores,
            borderWidth: 2,
            tension: 0.3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true
      }
    });

  } catch (erro) {
    console.error("Erro ao carregar o gráfico:", erro);
  }
}

window.addEventListener("load", () => {
  carregarGrafico(moedaAtual);
});