document.getElementById('criar-campeonato-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const ano = document.getElementById('ano').value;
    const descricao = document.getElementById('descricao').value;

    fetch('/api/campeonatos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, ano, descricao })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.id) {
            window.location.href = "/campeonatos";
        }
    })
    .catch(error => console.error('Erro ao criar campeonato:', error));
});

function voltarParaTelaPrincipal() {
    window.location.href = "/";
}
