<template>
  <div id="app">
    <div class="title-container">
      <h1>Transferências</h1>
    </div>

    <!-- Formulário para criar uma nova transferência -->
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

    <!-- Mensagens de erro ou sucesso -->
    <p v-if="erro" class="erro">{{ erro }}</p>
    <p v-if="sucesso" class="sucesso">{{ sucesso }}</p>

    <!-- Tabela para exibir transferências criadas -->
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
          <!-- Listando cada transferência -->
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
      // Dados do formulário para criar transferência
      novaTransferencia: {
        externalId: "",
        amount: "",
        expectedOn: "",
      },
      // Lista de transferências recebidas do backend
      transferencias: [],
      // Mensagens de erro ou sucesso
      erro: null,
      sucesso: null,
    };
  },
  methods: {
    // Função para carregar transferências do backend
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
    // Função para criar uma nova transferência com todos os campos que devem estar preenchidos
    criarTransferencia() {
      if (!this.novaTransferencia.externalId || !this.novaTransferencia.amount || !this.novaTransferencia.expectedOn) {
        this.erro = "Todos os campos são obrigatórios!";
        return;
      }

      // Validação para a data não ser no passado
      const hoje = new Date(); 
      const dataEsperada = new Date(this.novaTransferencia.expectedOn); 
      if (dataEsperada < hoje) {
        this.erro = "A data da transferencia não pode ser no passado!";
        return;
      }

      // Fazendo o POST para criar a transferência no backend
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
  // Método chamado quando o componente é montado
  mounted() {
    this.carregarTransferencias(); 
  },
};
</script>
