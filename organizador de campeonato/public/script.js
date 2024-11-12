// Carrega os campeonatos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarCampeonatos);

// Função para carregar e exibir os campeonatos na tela
function carregarCampeonatos() {
    fetch('/api/campeonatos')
        .then(response => response.json())
        .then(campeonatos => {
            const listContainer = document.getElementById('championships-list');
            listContainer.innerHTML = ''; // Limpa a lista antes de adicionar os campeonatos

            campeonatos.forEach(campeonato => {
                const item = document.createElement('div');
                item.classList.add('championship-item');
                
                // Adiciona o evento de clique para redirecionar para a página de detalhes
                item.onclick = () => window.location.href = `/campeonatos/${campeonato.campeonato_id}`;

                item.innerHTML = `
                    <h2>${campeonato.nome} (${campeonato.ano})</h2>
                    <p>${campeonato.descricao || 'Sem descrição'}</p>
                `;
                
                listContainer.appendChild(item);
            });
        })
        .catch(error => console.error('Erro ao carregar campeonatos:', error));
}

// Event listener para o botão "Voltar"
document.getElementById('voltar-btn').addEventListener('click', function() {
    window.location.href = '/'; // Redireciona para a tela principal
});
