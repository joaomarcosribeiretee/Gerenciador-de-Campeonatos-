create database campeonato;
use campeonato;

-- Tabela para armazenar os campeonatos
CREATE TABLE Campeonato (
    campeonato_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    descricao TEXT
);

-- Tabela para armazenar os times
CREATE TABLE Time (
    time_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cidade VARCHAR(100),
    estadio VARCHAR(100)
);

-- Tabela para armazenar os jogadores de cada time
CREATE TABLE Jogador (
    jogador_id INT PRIMARY KEY AUTO_INCREMENT,
    time_id INT,
    nome VARCHAR(100) NOT NULL,
    posicao VARCHAR(50),
    numero_camisa INT,
    data_nascimento DATE,
    CONSTRAINT fk_time_id FOREIGN KEY (time_id) REFERENCES Time(time_id)
);

-- Tabela para armazenar os jogos
CREATE TABLE Jogo (
    jogo_id INT PRIMARY KEY AUTO_INCREMENT,
    campeonato_id INT,
    data_jogo DATE,
    local VARCHAR(100),
    time_casa_id INT,
    time_visitante_id INT,
    gols_casa INT DEFAULT 0,
    gols_visitante INT DEFAULT 0,
    CONSTRAINT fk_campeonato_id FOREIGN KEY (campeonato_id) REFERENCES Campeonato(campeonato_id),
    CONSTRAINT fk_time_casa FOREIGN KEY (time_casa_id) REFERENCES Time(time_id),
    CONSTRAINT fk_time_visitante FOREIGN KEY (time_visitante_id) REFERENCES Time(time_id)
);

-- Tabela para registrar o desempenho dos times no campeonato
CREATE TABLE Desempenho (
    desempenho_id INT PRIMARY KEY AUTO_INCREMENT,
    campeonato_id INT,
    time_id INT,
    jogos INT DEFAULT 0,
    vitorias INT DEFAULT 0,
    empates INT DEFAULT 0,
    derrotas INT DEFAULT 0,
    gols_pro INT DEFAULT 0,
    gols_contra INT DEFAULT 0,
    pontos INT DEFAULT 0,
    CONSTRAINT fk_desempenho_campeonato FOREIGN KEY (campeonato_id) REFERENCES Campeonato(campeonato_id),
    CONSTRAINT fk_desempenho_time FOREIGN KEY (time_id) REFERENCES Time(time_id),
    CONSTRAINT uq_desempenho UNIQUE (campeonato_id, time_id)
);

-- Tabela para armazenar as estatísticas dos jogadores
CREATE TABLE EstatisticaJogador (
    estatistica_id INT PRIMARY KEY AUTO_INCREMENT,
    jogador_id INT,
    campeonato_id INT,
    gols INT DEFAULT 0,
    assistencias INT DEFAULT 0,
    CONSTRAINT fk_estatistica_jogador FOREIGN KEY (jogador_id) REFERENCES Jogador(jogador_id),
    CONSTRAINT fk_estatistica_campeonato FOREIGN KEY (campeonato_id) REFERENCES Campeonato(campeonato_id)
);

