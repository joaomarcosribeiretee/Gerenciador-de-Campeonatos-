// Captura o campeonatoId da URL
const campeonatoId = window.location.pathname.split('/').pop();

// Carrega os detalhes do campeonato
document.addEventListener('DOMContentLoaded', carregarDetalhesCampeonato);

// Função para carregar detalhes do campeonato
function carregarDetalhesCampeonato() {
    fetch(`/api/campeonatos/${campeonatoId}`)
        .then(response => response.json())
        .then(data => {
            // Carregar dados do campeonato
            document.getElementById('campeonato-nome').textContent = data.campeonato.nome;
            document.getElementById('campeonato-descricao').textContent = data.campeonato.descricao;

            // Carregar times participantes
            const timesList = document.getElementById('times-list');
            timesList.innerHTML = '';
            data.times.forEach(time => {
                const item = document.createElement('p');
                item.textContent = `${time.nome} - ${time.cidade}, Estádio: ${time.estadio}`;
                timesList.appendChild(item);
            });

            // Carregar desempenho na tabela
            const desempenhoList = document.getElementById('desempenho-list');
            desempenhoList.innerHTML = '';
            data.desempenho.forEach(record => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.times.find(t => t.time_id === record.time_id)?.nome || 'Desconhecido'}</td>
                    <td>${record.jogos}</td>
                    <td>${record.vitorias}</td>
                    <td>${record.empates}</td>
                    <td>${record.derrotas}</td>
                    <td>${record.gols_pro}</td>
                    <td>${record.gols_contra}</td>
                    <td>${record.pontos}</td>
                `;
                desempenhoList.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar detalhes do campeonato:', error));
}

// Botão "Voltar" para a página de visualização de campeonatos
document.getElementById('voltar-btn').addEventListener('click', function() {
    window.location.href = '/ver_campeonatos.html';
});

// Botão "Adicionar Time" para a página de adicionar times ao campeonato atual
document.getElementById('adicionar-time-btn').addEventListener('click', function() {
    window.location.href = `/adicionar_times?campeonatoId=${campeonatoId}`;
});

// Botão "Gerar Jogos" para chamar a geração dos jogos no servidor
document.getElementById('gerar-jogos-btn').addEventListener('click', function() {
    fetch(`/api/campeonatos/${campeonatoId}/gerar-jogos`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Mensagem de sucesso ou erro
    })
    .catch(error => console.error('Erro ao gerar jogos:', error));
});


// Botão "Ver Jogos" para a página de visualização dos jogos
document.getElementById('ver-jogos-btn').addEventListener('click', function() {
    window.location.href = `/ver_jogos.html?campeonatoId=${campeonatoId}`;
});

// Botão "Apagar Campeonato" para apagar o campeonato
document.getElementById('apagar-campeonato-btn').addEventListener('click', function() {
    if (confirm("Tem certeza que deseja apagar este campeonato? Esta ação é irreversível!")) {
        fetch(`/api/campeonatos/${campeonatoId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.href = '/campeonatos';
        })
        .catch(error => console.error('Erro ao apagar campeonato:', error));
    }
});

// Botão para editar placar da rodada
document.getElementById('editar-placar-btn').addEventListener('click', () => {
    const rodadaId = prompt("Digite o número da rodada que deseja editar:");
    if (rodadaId) {
        window.location.href = `/editar_placar.html?campeonatoId=${campeonatoId}&rodadaId=${rodadaId}`;
    }
});

