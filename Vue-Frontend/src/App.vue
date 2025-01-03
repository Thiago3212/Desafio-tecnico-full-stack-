<template>
  <div id="app">
    <div class="title-container">
      <h1>Transferências</h1>
    </div>

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

<script >
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