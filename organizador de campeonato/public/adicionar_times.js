// Capturar o campeonatoId da URL
const campeonatoId = new URLSearchParams(window.location.search).get('campeonatoId');

// Carregar times existentes no seletor
document.addEventListener('DOMContentLoaded', carregarTimesExistentes);

function carregarTimesExistentes() {
    fetch('/api/times')
        .then(response => response.json())
        .then(times => {
            const timeSelect = document.getElementById('timeExistente');
            times.forEach(time => {
                const option = document.createElement('option');
                option.value = time.time_id;
                option.textContent = `${time.nome} - ${time.cidade}, Estádio: ${time.estadio}`;
                timeSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar times:', error));
}

// Adicionar time existente ao campeonato
document.getElementById('form-selecionar-time').addEventListener('submit', function(event) {
    event.preventDefault();
    const timeId = document.getElementById('timeExistente').value;

    fetch(`/api/campeonatos/${campeonatoId}/times`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timeId })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (response.ok) {
            // Atualizar a página ou redirecionar após adicionar o time
            window.location.href = `/campeonatos/${campeonatoId}`;
        }
    })
    .catch(error => console.error('Erro ao adicionar time existente:', error));
});

// Criar novo time e adicioná-lo ao campeonato
document.getElementById('form-novo-time').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeTime').value;
    const cidade = document.getElementById('cidadeTime').value;
    const estadio = document.getElementById('estadioTime').value;

    fetch(`/api/campeonatos/${campeonatoId}/novoTime`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cidade, estadio })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (response.ok) {
            // Atualizar a página ou redirecionar após adicionar o novo time
            window.location.href = `/campeonatos/${campeonatoId}`;
        }
    })
    .catch(error => console.error('Erro ao criar e adicionar novo time:', error));
});

// Função para o botão "Voltar" voltar para a tela de detalhes do campeonato
document.getElementById('voltar-btn').addEventListener('click', function() {
    window.location.href = `/campeonatos/${campeonatoId}`;
});
