# Desafio-tecnico-full-stack-

# **Sistema de Gerenciamento de Transferências**

Este projeto implementa um sistema para gerenciar transferências bancárias, permitindo criar e visualizar transferências específicas . O sistema foi desenvolvido com um back-end em Node.js e um front-end em Vue.js, utilizando SQLite para o banco de dados.

## **Instruções para Configuração**

### **Instalações**
- **Node.js** 
- **npm** 
- **Vue**
- **SQLite**

### **Configuração de como fica a estrutura das pastas**
Desafio-tecnico-full-stack/
├── node-backend/            
│   ├── backend.js           # Código principal do backend
│   ├── transfers.db         # Banco de dados SQLite
│   ├── package.json         
│   ├── package-lock.json    
│   ├── node_modules/        
├── vue-frontend/            
│   ├── src/                 
│   │   ├── App.vue          # Código principal do frontend
│   │   ├── components/      
│   │   ├── main.js          
│   │   ├── shims-vue.d.ts   # Configuração TypeScript para Vue
│   ├── assets/              
│   │   ├── styles.css       # Estilização da página do frontend
│   ├── package.json         
│   ├── package-lock.json    
│   ├── node_modules/        

---

 ## **Instruções de como executar**
 - **Na parte do backend entre na pasta do node-backend e clique com o botão direito para entrar no terminal. No terminal digite (```npm install```) para instalar as dependências caso necessário e em seguida digite (```node backend.js```) para iniciar o servidor backend, e em seguida irá aparecer o servidor para acessar (```http://localhost:3000```)**
 - **Na parte do frontend  entre na pasta do Vue-frontend e clique com o botão direito para entrar no terminal. No terminal digite (```npm install```) para instalar as dependências caso necessário e em seguida digite (```npm run dev```) para iniciar o servidor frontend, e em seguida irá aparecer o servidor para acessar (```http://localhost:5173```)**

 ## **Decisões técnicas**

Durante o desenvolvimento deste projeto, foram tomadas diversas decisões técnicas para garantir a qualidade, funcionalidade e escalabilidade da aplicação.

## **1. Uso de SQLite como banco de dados**
Optou-se por utilizar o SQLite devido à sua simplicidade e fácil configuração, dispensando a necessidade de configurar um servidor de banco de dados externo.

---

## **2. Backend em Node.js com Express**
O backend foi desenvolvido com Node.js utilizando o framework Express, conhecido por sua leveza e flexibilidade. Ele permite a criação de APIs REST de maneira rápida e eficiente.

---

## **3. Frontend com Vue.js**
O frontend foi implementado com Vue.js, devido à sua simplicidade, curva de aprendizado rápida e eficiência para construir interfaces reativas.

---

## **4. Comunicação entre frontend e backend**
A comunicação entre o frontend e o backend foi feita utilizando requisições HTTP via API REST. O frontend consome os endpoints criados no backend para listar, criar e visualizar transferências.

**Decisões:**
- Uso do método **POST** para criar transferências.
- Uso do método **GET** para listar todas as transferências ou buscar uma específica pelo ID.

---

## **5. Padrão de organização do projeto**
O projeto foi estruturado separando claramente o backend e o frontend em diretórios distintos. Isso facilita a navegação, manutenção e escalabilidade do código.

---

## **6. Validação de entrada de dados no backend**
No endpoint de criação de transferências, foi implementada uma validação para garantir que os campos obrigatórios (`externalId`, `amount`, `expectedOn`) sejam fornecidos. Essa validação previne erros e mantém a integridade do banco de dados.

---

## **7. Uso de CORS**
No backend, foi configurado o uso da biblioteca `cors` (Cross-Origin Resource Sharing) para permitir a comunicação entre o frontend e o backend, que estão hospedados em portas diferentes durante o desenvolvimento. O uso de CORS permite que o frontend em `http://localhost:5173` consuma as APIs do backend em `http://localhost:3000`.

---
## **8. Configuração de estilos com CSS no frontend**
A estilização do frontend foi realizada utilizando um arquivo CSS centralizado (`styles.css`) localizado no diretório `assets`. Desta maneira facilita a manutenção e a organização do design do projeto.