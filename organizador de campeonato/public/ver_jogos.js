document.addEventListener('DOMContentLoaded', carregarJogos);

let currentRodada = 0;

function carregarJogos() {
    const campeonatoId = new URLSearchParams(window.location.search).get('campeonatoId');

    fetch(`/api/campeonatos/${campeonatoId}/jogos`)
        .then(response => response.json())
        .then(data => {
            const rodadasContainer = document.getElementById('rodadas-container');
            rodadasContainer.innerHTML = '';

            if (data.jogos.length === 0) {
                // Exibe mensagem caso não haja jogos gerados
                rodadasContainer.innerHTML = '<p>Não há jogos gerados para este campeonato.</p>';
                return;
            }

            let rodadas = [];
            let rodadaAtual = [];
            let rodadaData = data.jogos[0].data_jogo; // Data inicial da rodada

            data.jogos.forEach((jogo, index) => {
                if (jogo.data_jogo !== rodadaData) {
                    rodadas.push(rodadaAtual); // Adiciona a rodada completa
                    rodadaAtual = [];
                    rodadaData = jogo.data_jogo; // Atualiza para a próxima data da rodada
                }

                const dataJogo = new Date(jogo.data_jogo).toLocaleDateString('pt-BR');
                const jogoElement = `
                    <div class="jogo">
                        <p><strong>${dataJogo}</strong></p>
                        <p>${jogo.time_casa_nome} x ${jogo.time_visitante_nome}</p>
                        <p><em>Local: ${jogo.local}</em></p>
                    </div>
                `;
                rodadaAtual.push(jogoElement);

                // Adiciona última rodada se for o último jogo
                if (index === data.jogos.length - 1) {
                    rodadas.push(rodadaAtual);
                }
            });

            // Renderiza a primeira rodada
            mostrarRodada(rodadas, currentRodada);
            configurarBotoesNavegacao(rodadas);
        })
        .catch(error => console.error('Erro ao carregar jogos:', error));
}

function mostrarRodada(rodadas, index) {
    const rodadasContainer = document.getElementById('rodadas-container');
    rodadasContainer.innerHTML = `<div class="rodada"><h2>Rodada ${index + 1}</h2>${rodadas[index].join('')}</div>`;
}

function configurarBotoesNavegacao(rodadas) {
    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentRodada > 0) {
            currentRodada--;
            mostrarRodada(rodadas, currentRodada);
        }
        updateNavigationButtons(rodadas);
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        if (currentRodada < rodadas.length - 1) {
            currentRodada++;
            mostrarRodada(rodadas, currentRodada);
        }
        updateNavigationButtons(rodadas);
    });

    updateNavigationButtons(rodadas);
}

function updateNavigationButtons(rodadas) {
    document.getElementById('prevButton').style.display = currentRodada === 0 ? 'none' : 'block';
    document.getElementById('nextButton').style.display = currentRodada === rodadas.length - 1 ? 'none' : 'block';
}

// Navega para a página de edição de placar da rodada atual
document.getElementById('editar-placar-btn').addEventListener('click', () => {
    const campeonatoId = new URLSearchParams(window.location.search).get('campeonatoId');
    window.location.href = `/editar_placar.html?campeonatoId=${campeonatoId}&rodada=${currentRodada + 1}`;
});