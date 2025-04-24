<Table>
  <tr>
    <td><a href= "https://www.cps.sp.gov.br/"><img src="documentos/img/logo-CPS.jpg" alt="Centro Paula Souza" border="0"></td>
    <td>
      <a href= "https://www.inteli.edu.br/"><img src="documentos/img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
    </td>
  </tr>
</table>

# Nome do Projeto: LinkUp

## Nome do Grupo: LinkUp

## Integrantes:

- <a href="https://www.linkedin.com/in/arthur-bretas/">Arthur Bretas Oliveira</a>
- <a href="https://www.linkedin.com/in/felipe-zillo-72b367247/">Felipe Gutierres Zillo</a>
- <a href="https://www.linkedin.com/in/kauarodrigues/">Kauã Rodrigues dos Santos</a>
- <a href="https://www.linkedin.com/in/lucca-henrique-pereira/">Lucca Henrique Pereira</a>
- <a href="https://www.linkedin.com/in/milena-castro-vieira/">Milena Aparecida Vieira Castro</a>
- <a href="https://www.linkedin.com/in/rodrigo-lee/">Rodrigo Hu Tchie Lee</a>
- <a href="https://www.linkedin.com/in/vitor-balbo/">Vitor Margarido Balbo</a>


## Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/vanunes/">Vanessa Nunes</a>
### Instrutores
- <a href="https://www.linkedin.com/in/jefferson-o-silva/">Computação - Jefferson de Oliveira</a>
- <a href="https://www.linkedin.com/in/diogo-martins-gon%C3%A7alves-de-morais-96404732/">Matemática e Física - Diogo Morais</a>
- <a href="https://www.linkedin.com/in/lisane-valdo/">Negócios - Lisane Valdo</a>
- <a href="https://www.linkedin.com/in/gui-cestari/">Design - Guilherme Cestari</a> 
- <a href="https://www.linkedin.com/in/filipe-gon%C3%A7alves-08a55015b/">Liderança - Filipe Gonçalves</a>

## 📝 Descrição

&nbsp;&nbsp;&nbsp;&nbsp;Este projeto é uma aplicação web para auxiliar o registro de atendimentos a alunos PCD no Centro Paula Souza, associando-o a um profissional que o antederá e/ou uma tecnologia assistiva para auxiliá-lo, conforme a necessidade identificada do(a) aluno(a). <br>
&nbsp;&nbsp;&nbsp;&nbsp;A aplicação só deve ser acessada por funcionários autorizados pelo Centro Paula Souza através das credenciais que a própria organização enviará, limitando o acesso aos dados da plataforma, conforme o nível de acesso. <br>
&nbsp;&nbsp;&nbsp;&nbsp;Os dados referente aos alunos veem de outra API que deve simular a API existente do Centro Paula Souza, enquanto os demais dados são do banco de dados da própria aplicação LinkUp.

## 📝 LINKS

<a href="./documentos/Projeto.md">Link para a documentação geral</a> do projeto.

## 📁 Estrutura de pastas

```
/2025-1A-T13-ES05-G06/
├── .github
├── app
├── documentos
│   └── img
└── src
    ├── backend
    │   ├── src
    ├── database
    └── frontend
        ├── dist
        ├── public
        │   └── assets
        └── src
├── .gitignore
└── README.md
```

Dentre os arquivos presentes na raiz do projeto, definem-se:

- **README.md**: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- **documentos**: aqui estarão todos os documentos do projeto. Há também uma pasta denominada **outros** onde podem estar presentes documentos complementares à documentação principal.

- **src**: nesta pasta encontra-se todo o código fonte do sistema (circuito e eventuais sistemas complementares).

---

# 📖 Manual de Instalação

## ✅ Pré-requisitos

Antes de iniciar, verifique se você possui instalado:

- [Node.js (versão LTS)](https://nodejs.org/)
- [Git](https://git-scm.com/downloads)
- [Angular CLI](https://angular.io/cli) - versão compatível com o Angular 19
- Um gerenciador de pacotes: `npm` (vem com o Node.js) ou [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

---

## 🧩 Clonando o repositório

```bash
git clone https://github.com/Inteli-College/2025-1A-T13-ES05-G06>
cd </2025-1A-T13-ES05-G06/>
```

---

## 📦 Instalando as dependências do Backend (Node.js + Express + TypeScript)

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```


---

## 🖥 Instalando o Frontend (Angular 19)

1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode o servidor de desenvolvimento Angular:
   ```bash
   ng serve
   ```

4. Acesse a aplicação em:
   ```
   http://localhost:3000
   ```

---

## 🗃 Histórico de lançamentos

* 0.1.0 - 14/02/2025
    * GESTÃO EVOLUTIVA DE PROJETOS
    * GESTÃO DE CONFIGURAÇÃO
    * ESPECIFICAÇÃO DE REQUISITOS FUNCIONAIS E NÃO FUNCIONAIS
    * ENTENDIMENTO DO PROJETO E DO NEGÓCIO
* 0.2.0 - 28/02/2024
    * GESTÃO EVOLUTIVA DE PROJETOS
    * PROJETO VISUAL DA SOLUÇÃO
    * MODELAGEM DE DADOS
    * SOLUÇÃO TÉCNICA (DESIGN)
* 0.3.0 - 14/03/2024
    * GESTÃO EVOLUTIVA DE PROJETOS
    * PLANEJAMENTO DE TESTES
    * DESENVOLVIMENTO DO PROJETO
    * IMPLEMENTAÇÃO DO BANCO DE DADOS
    * MAPEAMENTO TÉCNICO DE INFRAESTRUTURA E IMPLANTAÇÃO
* 0.4.0 - 28/03/2024
    * GESTÃO EVOLUTIVA DE PROJETOS
    * EXECUÇÃO E ANÁLISE DE TESTES
    * EVOLUÇÃO DO BANCO DE DADOS
    * DESENVOLVIMENTO DO PROJETO
* 0.5.0 - 11/04/2024
    * FINALIZAÇÃO DO PROJETO
    * GESTÃO EVOLUTIVA DE PROJETOS
    * EXECUÇÃO E ANÁLISE DE TESTES
    * DESENVOLVIMENTO DO PROJETO

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