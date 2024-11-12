-- Inserindo campeonatos
INSERT INTO Campeonato (nome, ano, descricao) VALUES ('Campeonato Brasileiro', 2024, 'Principal campeonato nacional do Brasil');
INSERT INTO Campeonato (nome, ano, descricao) VALUES ('Campeonato Paulista', 2024, 'Campeonato estadual de São Paulo');


-- Inserindo times
INSERT INTO Time (nome, cidade, estadio) VALUES ('Flamengo', 'Rio de Janeiro', 'Maracanã');
INSERT INTO Time (nome, cidade, estadio) VALUES ('Corinthians', 'São Paulo', 'Arena Corinthians');
INSERT INTO Time (nome, cidade, estadio) VALUES ('Palmeiras', 'São Paulo', 'Allianz Parque');
INSERT INTO Time (nome, cidade, estadio) VALUES ('São Paulo FC', 'São Paulo', 'Morumbi');


INSERT INTO desempenho (campeonato_id, time_id ) VALUES (1,1), (1,2), (1,3), (1,4);
INSERT INTO desempenho (campeonato_id, time_id ) VALUES (2,2), (2,3), (2,4);

SELECT *
FROM Desempenho
WHERE campeonato_id = 1;

select * from campeonato;