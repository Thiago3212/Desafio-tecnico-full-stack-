const express = require("express"); 
const bodyParser = require("body-parser"); 
const sqlite3 = require("sqlite3").verbose(); 
const cors = require("cors"); 

const app = express(); 
const PORT = 3000; 

app.use(cors());
app.use(express.json());

//  Banco de Dados SQLite
const db = new sqlite3.Database("transfers.db"); 

// Criação da tabela no banco de dados de como irá ficar
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transfers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identificador único para cada transferência
      externalId TEXT NOT NULL,              -- ID externo fornecido pelo cliente
      amount REAL NOT NULL,                  -- Valor da transferência
      expectedOn TEXT NOT NULL,              -- Data esperada da transferência
      status TEXT DEFAULT 'pendente'          -- Status da transferência 
    )
  `, (err) => {
    if (err) {
      console.error("Erro ao criar a tabela:", err.message); 
    } else {
      console.log("Tabela 'transfers' criada com sucesso."); 
    }
  });
});

// Rota para criar uma nova transferência
app.post("/transfers", (req, res) => {
  const { externalId, amount, expectedOn } = req.body; 

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!externalId || !amount || !expectedOn) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  // Inserir os dados da transferência no banco
  const query = `INSERT INTO transfers (externalId, amount, expectedOn) VALUES (?, ?, ?)`;
  db.run(query, [externalId, amount, expectedOn], function (err) {
    if (err) {
      console.error("Erro ao salvar no banco de dados:", err.message); 
      return res.status(500).json({ error: "Erro ao salvar no banco de dados." });
    }

    // Retorno da transferência criada com o ID
    res.status(201).json({
      id: this.lastID, 
      externalId,
      amount,
      expectedOn,
      status: "pendente", 
    });
  });
});

// Rota para listar todas as transferências
app.get("/transfers", (req, res) => {
  const query = `SELECT * FROM transfers`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar transferências:", err.message); 
      return res.status(500).json({ error: "Erro ao buscar transferências." });
    }

    res.json(rows); 
  });
});

// Rota para buscar uma transferência específica pelo ID
app.get("/transfers/:id", (req, res) => {
  const { id } = req.params; 
  const query = `SELECT * FROM transfers WHERE id = ?`; 

  db.get(query, [id], (err, row) => {
    if (err || !row) {
      console.error("Erro ao buscar transferência:", err ? err.message : "Não encontrada"); 
      return res.status(404).json({ error: "Transferência não encontrada." });
    }

    res.json(row);
  });
});

// Inicialização do servidor na porta definida 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
