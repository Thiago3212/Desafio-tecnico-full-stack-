<template>
  <div id="app">
    <!-- Centralizar o título -->
    <div class="title-container">
      <h1>Transferências</h1>
    </div>

    <!-- Formulário Centralizado -->
    <div class="form-container">
      <form @submit.prevent="criarTransferencia">
        <div class="form-group">
          <label>ID Externo:</label>
          <input v-model="novaTransferencia.externalId" placeholder="Digite o ID externo" />
        </div>
        <div class="form-group">
          <label>Valor:</label>
          <input v-model="novaTransferencia.amount" type="number" step="0.01" placeholder="Digite o valor" />
        </div>
        <div class="form-group">
          <label>Data Esperada:</label>
          <input v-model="novaTransferencia.expectedOn" type="date" />
        </div>
        <button type="submit">Salvar Transferência</button>
      </form>
    </div>

    <p v-if="erro" class="erro">{{ erro }}</p>
    <p v-if="sucesso" class="sucesso">{{ sucesso }}</p>

    <!-- Tabela Centralizada -->
    <div class="table-container">
      <h2>Transferências Criadas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Externo</th>
            <th>Valor</th>
            <th>Data Esperada</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transferencia in transferencias" :key="transferencia.id">
            <td>{{ transferencia.id }}</td>
            <td>{{ transferencia.externalId }}</td>
            <td>{{ transferencia.amount }}</td>
            <td>{{ transferencia.expectedOn }}</td>
            <td>{{ transferencia.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      novaTransferencia: {
        externalId: "",
        amount: "",
        expectedOn: "",
      },
      transferencias: [],
      erro: null,
      sucesso: null,
    };
  },
  methods: {
    carregarTransferencias() {
      axios
        .get("http://localhost:3000/transfers")
        .then((res) => {
          this.transferencias = res.data;
        })
        .catch(() => {
          this.erro = "Erro ao buscar transferências.";
        });
    },
    criarTransferencia() {
      if (!this.novaTransferencia.externalId || !this.novaTransferencia.amount || !this.novaTransferencia.expectedOn) {
        this.erro = "Todos os campos são obrigatórios!";
        return;
      }

      if (new Date(this.novaTransferencia.expectedOn) < new Date()) {
        this.erro = "A data de vencimento não pode ser no passado!";
        return;
      }

      axios
        .post("http://localhost:3000/transfers", this.novaTransferencia)
        .then(() => {
          this.erro = null;
          this.sucesso = "Transferência criada com sucesso!";
          this.novaTransferencia = { externalId: "", amount: "", expectedOn: "" };
          this.carregarTransferencias();
        })
        .catch(() => {
          this.erro = "Erro ao criar transferência.";
        });
    },
  },
  mounted() {
    this.carregarTransferencias();
  },
};
</script>

<style>

/* Estilo Global */
body {
  font-family: Arial, sans-serif;
  background-color: beige;
  margin: 0;
  padding: 0;
}

#app {
  text-align: center;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
}

/* Centralizar o título */
.title-container {
  text-align: center;
  margin-bottom: 20px;
}

/* Títulos */
h1, h2 {
  color: #333;
  margin-bottom: 20px;
}

/* Formulário */
.form-container {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Botão */
button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #f4f400;
}

/* Mensagens */
.erro {
  color: red;
  margin-top: 10px;
}

.sucesso {
  color: green;
  margin-top: 10px;
}

/* Tabela */
.table-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
