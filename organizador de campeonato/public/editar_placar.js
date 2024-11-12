document.addEventListener('DOMContentLoaded', carregarJogos);

function carregarJogos() {
    const urlParams = new URLSearchParams(window.location.search);
    const campeonatoId = urlParams.get('campeonatoId');

    // Fetch para listar todos os jogos do campeonato
    fetch(`/api/campeonatos/${campeonatoId}/jogos`)
    .then(response => response.json())
    .then(data => {
        const jogosContainer = document.getElementById('jogos-list');
        jogosContainer.innerHTML = ''; // Limpa os jogos antigos

        if (data.jogos.length === 0) {
            jogosContainer.innerHTML = '<p>Não há jogos para este campeonato.</p>';
            return;
        }

        data.jogos.forEach(jogo => {
            const jogoElement = document.createElement('div');
            jogoElement.classList.add('jogo');

            jogoElement.innerHTML = `
                <p><strong>${jogo.time_casa_nome}</strong> x <strong>${jogo.time_visitante_nome}</strong></p>
                <div class="placar-input">
                    <label>${jogo.time_casa_nome} Gols:</label>
                    <input type="number" id="golsCasa-${jogo.jogo_id}" value="${jogo.gols_casa || 0}">
                    <label>${jogo.time_visitante_nome} Gols:</label>
                    <input type="number" id="golsVisitante-${jogo.jogo_id}" value="${jogo.gols_visitante || 0}">
                    <button onclick="atualizarPlacar(${jogo.jogo_id})">Salvar</button>
                </div>
            `;
            
            jogosContainer.appendChild(jogoElement);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar os jogos:', error);
    });
}

// Função para atualizar o placar
function atualizarPlacar(jogoId) {
    console.log(`Tentando atualizar placar para o jogoId: ${jogoId}`);  // Log do jogoId

    if (!jogoId) {
        console.error('Erro: jogoId não foi passado corretamente.');
        alert('Erro: jogoId não foi passado corretamente.');
        return;
    }

    const golsCasa = document.getElementById(`golsCasa-${jogoId}`).value;
    const golsVisitante = document.getElementById(`golsVisitante-${jogoId}`).value;

    // Verifica se os gols são números válidos
    const golsCasaInt = parseInt(golsCasa);
    const golsVisitanteInt = parseInt(golsVisitante);

    if (isNaN(golsCasaInt) || isNaN(golsVisitanteInt)) {
        alert('Por favor, insira valores válidos para os gols.');
        return;
    }

    fetch(`/api/jogos/${jogoId}/atualizar_placar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            golsCasa: golsCasaInt,
            golsVisitante: golsVisitanteInt
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        carregarJogos(); // Recarrega os jogos após salvar o placar
    })
    .catch(error => {
        console.error('Erro ao atualizar placar:', error);
        alert('Erro ao atualizar placar e desempenho das equipes.');
    });
}
