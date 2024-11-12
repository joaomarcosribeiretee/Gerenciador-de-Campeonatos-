// server.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'campeonato'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados "campeonato".');
});

// Funções CRUD expostas como endpoints

// 1. Endpoints para "Campeonato"
app.post('/campeonatos', (req, res) => {
    const { nome, ano, descricao } = req.body;
    const sql = 'INSERT INTO Campeonato (nome, ano, descricao) VALUES (?, ?, ?)';
    db.query(sql, [nome, ano, descricao], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Campeonato criado com sucesso', campeonatoId: result.insertId });
    });
});

app.get('/campeonatos', (req, res) => {
    db.query('SELECT * FROM Campeonato', (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

app.put('/campeonatos/:id', (req, res) => {
    const { nome, ano, descricao } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Campeonato SET nome = ?, ano = ?, descricao = ? WHERE campeonato_id = ?';
    db.query(sql, [nome, ano, descricao, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Campeonato atualizado com sucesso' });
    });
});

app.delete('/campeonatos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Campeonato WHERE campeonato_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Campeonato removido com sucesso' });
    });
});

// Repita a estrutura para cada tabela

// 2. Endpoints para "Time"
app.put('/times/:id', (req, res) => {
    const { nome, cidade, estadio } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Time SET nome = ?, cidade = ?, estadio = ? WHERE time_id = ?';
    db.query(sql, [nome, cidade, estadio, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Time atualizado com sucesso' });
    });
});

app.delete('/times/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Time WHERE time_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Time removido com sucesso' });
    });
});

// 3. Endpoints para "Jogador"
app.put('/jogadores/:id', (req, res) => {
    const { time_id, nome, posicao, numero_camisa, data_nascimento } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Jogador SET time_id = ?, nome = ?, posicao = ?, numero_camisa = ?, data_nascimento = ? WHERE jogador_id = ?';
    db.query(sql, [time_id, nome, posicao, numero_camisa, data_nascimento, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Jogador atualizado com sucesso' });
    });
});

app.delete('/jogadores/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Jogador WHERE jogador_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Jogador removido com sucesso' });
    });
});

// 4. Endpoints para "Jogo"
app.put('/jogos/:id', (req, res) => {
    const { campeonato_id, data_jogo, local, time_casa_id, time_visitante_id, gols_casa, gols_visitante } = req.body;
    const { id } = req.params;
    const sql = `UPDATE Jogo SET campeonato_id = ?, data_jogo = ?, local = ?, time_casa_id = ?, time_visitante_id = ?, gols_casa = ?, gols_visitante = ? 
                 WHERE jogo_id = ?`;
    db.query(sql, [campeonato_id, data_jogo, local, time_casa_id, time_visitante_id, gols_casa, gols_visitante, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Jogo atualizado com sucesso' });
    });
});

app.delete('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Jogo WHERE jogo_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Jogo removido com sucesso' });
    });
});

// 5. Endpoints para "Desempenho"
app.put('/desempenhos/:id', (req, res) => {
    const { campeonato_id, time_id, jogos, vitorias, empates, derrotas, gols_pro, gols_contra, pontos } = req.body;
    const { id } = req.params;
    const sql = `UPDATE Desempenho SET campeonato_id = ?, time_id = ?, jogos = ?, vitorias = ?, empates = ?, derrotas = ?, gols_pro = ?, gols_contra = ?, pontos = ?
                 WHERE desempenho_id = ?`;
    db.query(sql, [campeonato_id, time_id, jogos, vitorias, empates, derrotas, gols_pro, gols_contra, pontos, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Desempenho atualizado com sucesso' });
    });
});

app.delete('/desempenhos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Desempenho WHERE desempenho_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Desempenho removido com sucesso' });
    });
});

// 6. Endpoints para "EstatisticaJogador"
app.put('/estatisticas-jogadores/:id', (req, res) => {
    const { jogador_id, campeonato_id, gols, assistencias } = req.body;
    const { id } = req.params;
    const sql = `UPDATE EstatisticaJogador SET jogador_id = ?, campeonato_id = ?, gols = ?, assistencias = ? WHERE estatistica_id = ?`;
    db.query(sql, [jogador_id, campeonato_id, gols, assistencias, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Estatística do jogador atualizada com sucesso' });
    });
});

app.delete('/estatisticas-jogadores/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM EstatisticaJogador WHERE estatistica_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Estatística do jogador removida com sucesso' });
    });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
