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

Este manual tem como objetivo orientar desenvolvedores e colaboradores sobre como montar, configurar e executar o projeto LinkUp em ambiente local, garantindo que todas as partes do sistema funcionem corretamente, incluindo backend e frontend.

---

## ✅ 2. Pré-requisitos

Antes de iniciar a instalação, certifique-se de que os seguintes softwares estão instalados:

- [Node.js (versão LTS recomendada)](https://nodejs.org/)
- [Git](https://git-scm.com/downloads)
- [Angular CLI](https://angular.io/cli) - versão compatível com Angular 19
- Gerenciador de pacotes: `npm` ou `yarn`

> 🔍 *Verifique suas versões:*
> 
> ```bash
> node -v
> npm -v
> ng version
> git --version
> ```

---

## 📁 3. Estrutura de Diretórios

```
2025-1A-T13-ES05-G06/
├── backend/       # API em Node.js + Express
├── frontend/      # Interface em Angular
├── database/      # Scripts e documentação do banco de dados
└── documentos/    # Documentação geral do projeto
```

---

## 📦 4. Clonando o Repositório

```bash
git clone https://github.com/Inteli-College/2025-1A-T13-ES05-G06
cd 2025-1A-T13-ES05-G06
```

---

## 🔧 5. Configurando o Backend

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

---

## 🖥 6. Configurando o Frontend

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
http://localhost:4200
```

---

## 🧪 7. Executando Testes

### Backend

```bash
cd backend
npm run test
```

### Frontend

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