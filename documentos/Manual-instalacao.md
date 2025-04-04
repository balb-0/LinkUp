
<Table>
  <tr>
    <td><a href= "https://www.cps.sp.gov.br/"><img src="img/logo-CPS.jpg" alt="Centro Paula Souza" border="0"></td>
    <td>
      <a href= "https://www.inteli.edu.br/"><img src="img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
    </td>
  </tr>
</table>

# Nome do Projeto: LinkUp
# Nome do Projeto: LinkUp

## Integrantes:

- <a href="https://www.linkedin.com/in/arthur-bretas/">Arthur Bretas Oliveira</a>
- <a href="https://www.linkedin.com/in/felipe-zillo-72b367247/">Felipe Gutierres Zillo</a>
- <a href="https://www.linkedin.com/in/kauarodrigues/">Kauã Rodrigues dos Santos</a>
- <a href="https://www.linkedin.com/in/lucca-henrique-pereira/">Lucca Henrique Pereira</a>
- <a href="https://www.linkedin.com/in/milena-castro-vieira/">Milena Aparecida Vieira Castro</a>
- <a href="https://www.linkedin.com/in/rodrigo-lee/">Rodrigo Hu Tchie Lee</a>
- <a href="https://www.linkedin.com/in/vitor-balbo/">Vitor Margarido Balbo</a>

# Manual de Instalação - Projeto LinkUp

## 🛠️ 1. Introdução

Este manual tem como objetivo orientar desenvolvedores e colaboradores sobre como montar, configurar e executar o projeto LinkUp em ambiente local. Cada passo inclui uma breve explicação para garantir clareza no processo de inicialização do sistema.

---

## ✅ 2. Pré-requisitos

Antes de iniciar a instalação, certifique-se de que os seguintes softwares estão instalados:

- [Node.js (versão LTS recomendada)](https://nodejs.org/)
- [Git](https://git-scm.com/downloads)
- [Angular CLI](https://angular.io/cli) - versão compatível com Angular 19
- Gerenciador de pacotes: `npm` ou `yarn`

> 🔍 *Verifique suas versões executando no terminal:*
>
> ```bash
> node -v
> npm -v
> ng version
> git --version
> ```

---

## 📁 3. Estrutura de Diretórios

A estrutura do projeto está organizada da seguinte forma:

```
2025-1A-T13-ES05-G06/
├── backend/       # API em Node.js + Express
├── frontend/      # Interface em Angular
├── database/      # Scripts e documentação do banco de dados
└── documentos/    # Documentação geral do projeto
```

---

## 📦 4. Clonando o Repositório

Para obter o código-fonte do projeto em sua máquina local, execute:

```bash
git clone https://github.com/Inteli-College/2025-1A-T13-ES05-G06
cd 2025-1A-T13-ES05-G06
```

---

## 🔧 5. Configurando o Backend

### 5.1 Instalando dependências

As dependências do backend incluem bibliotecas como Express, TypeScript, ts-node-dev e outras essenciais para a execução da API. Para instalá-las corretamente, navegue até a pasta do backend e execute:

```bash
cd backend
npm install
```

> ✅ *Após a instalação, espere a criação da pasta `node_modules/` e a ausência de mensagens de erro no terminal.*

### 5.2 Executando o servidor

Com as dependências instaladas, você pode iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

> 🔎 *Você verá no terminal uma mensagem indicando que o servidor está rodando, geralmente em `http://localhost:3000`.*

---

## 🖥 6. Configurando o Frontend

### 6.1 Instalando dependências

O frontend é baseado em Angular e utiliza diversas bibliotecas como Angular Material, RXJS, entre outras. Para garantir que o projeto funcione corretamente, execute:

```bash
cd frontend
npm install
```

> ✅ *Assim como no backend, espere a criação da pasta `node_modules/`.*

### 6.2 Rodando a aplicação Angular

Para iniciar o servidor Angular em ambiente de desenvolvimento, rode:

```bash
ng serve
```

> 🌐 *A aplicação estará acessível via navegador em:*
> ```
> http://localhost:4200
> ```

---

## 🧪 7. Executando Testes

### Backend

O projeto inclui testes automatizados para verificar funcionalidades do backend. Execute:

```bash
cd backend
npm run test
```

### Frontend

Para rodar os testes do Angular:

```bash
cd frontend
ng test
```

---

## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">
  <a property="dct:title" rel="cc:attributionURL" href="https://github.com/ENDEREÇOGRUPO"><nome do projeto></a> 
  by 
  <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/ENDEREÇOGRUPO">
    INTELI, 
    <a href="https://www.linkedin.com/in/arthur-bretas/">Arthur Bretas Oliveira</a>, 
    <a href="https://www.linkedin.com/in/felipe-zillo-72b367247/">Felipe Gutierres Zillo</a>, 
    <a href="https://www.linkedin.com/in/kauarodrigues/">Kauã Rodrigues dos Santos</a>, 
    <a href="https://www.linkedin.com/in/lucca-henrique-pereira/">Lucca Henrique Pereira</a>, 
    <a href="https://www.linkedin.com/in/milena-castro-vieira/">Milena Aparecida Vieira Castro</a>, 
    <a href="https://www.linkedin.com/in/rodrigo-lee/">Rodrigo Hu Tchie Lee</a>, 
    <a href="https://www.linkedin.com/in/vitor-balbo/">Vitor Margarido Balbo</a>
  </a> 
  is licensed under 
  <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">
    Attribution 4.0 International
    <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1">
    <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1">
  </a>
</p>
