<Table>
  <tr>
    <td><a href= "https://www.cps.sp.gov.br/"><img src="img/logo-CPS.jpg" alt="Centro Paula Souza" border="0"></td>
    <td>
      <a href= "https://www.inteli.edu.br/"><img src="img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
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

# Sumário



# 1. Introdução

## 1.1 Objetivo do Documento

Este documento estabelece um conjunto de práticas recomendadas que ajudarão a manter a consistência no desenvolvimento do projeto, alinhando-se com as melhores práticas da indústria e garantindo escalabilidade e reutilização do código.

A adoção de padrões de codificação e padrões de projeto é fundamental para garantir um código limpo, organizado e de fácil manutenção. Seguir essas diretrizes melhora a legibilidade do código, tornando-o compreensível para toda a equipe de desenvolvimento e facilitando a colaboração entre os membros. Além disso, a padronização reduz a incidência de erros e torna o processo de revisão de código mais eficiente.


# 2. Padrões de Codificação

## 2.1 Naming Conventions

- Variáveis e Funções: Utilize camelCase
  - Exemplos:
    - ```let userName = "John";``` 
    - ```function calculateTotal() { ... } 

- Classes e Interfaces: Utilize PascalCase
  - Exemplos:
    - ```class UserProfile { ... }``` 
    - ```interface PaymentGateway { ... }```  

## 2.2 Formatação de Código

- Indentação: Utilize 2 espaços para indentação.
- Linhas: Mantenha o comprimento das linhas em até 80 caracteres.
- Chaves: Coloque chaves de abertura na mesma linha.
  - Exemplo:
    ```
    if (condition) {
        // código
    }
    ```

## 2.3 Comentários e Documentação

- Comentários de Linha: Use para explicar lógica complexa.
  - Exemplo: // Calcula o total com desconto

- Comentários de Bloco: Use para documentar funções e classes com JSDoc.
  - Exemplo: 
    ```
    /**
    * Calcula o total de um pedido.
    * @param {number} price - Preço do item.
    * @param {number} quantity - Quantidade do item.
    * @returns {number} Total calculado.
    */
    function calculateTotal(price, quantity) {
        return price * quantity;
    }
    ```

- Documentação da API
  - Utilizar SWAGGER para documentação da API a partir dos comentários do código.
  - Configure uma rota, como /api-docs, para que a documentação gerada pelo Swagger seja facilmente acessível aos desenvolvedores e stakeholders.

  ## 2.4 Boas Práticas para Revisão de Código

Todos os Pull Requests (PRs) devem seguir as diretrizes abaixo para assegurar um processo eficiente.

### 2.4.1 Antes de Criar um PR
- [ ] Certifique-se de que os testes passam.
- [ ] Revise seu próprio código antes de submeter.
- [ ] Atualize a documentação, se necessário.
- [ ] Garanta que os commits seguem o padrão do projeto.

### 2.4.2 Criando um PR
- [ ] O título deve ser claro e descritivo sobre a alteração.
- [ ] Seguir o padrão estipulado no template.
- [ ] A descrição deve explicar o motivo da mudança e seus impactos.
- [ ] Adicione um checklist, se necessário.
- [ ] Marque os revisores.

### 2.4.3 Revisão de Código
- [ ] O código segue os padrões do projeto?
- [ ] As funções e classes possuem responsabilidades bem definidas?
- [ ] Teste localmente se necessário, principalmente em mudanças críticas.

### 2.4.4 Correção de PRs
- [ ] Feedbacks devem ser objetivos e construtivos.
- [ ] Sugestões devem indicar possíveis melhorias.
- [ ] Se um problema for identificado, explique.
- [ ] Se necessário, o autor deve aplicar as correções antes do merge.


# 3. Padrões de Projeto

## 3.1 Design Patterns

_Opcionalmente, o grupo pode definir um ou mais design patterns para serem adotados, como forma de exercitarem tipos de solução para problemas/situações recorrentes_
_Sugestão de leitura: https://refactoring.guru/_

## 3.2 Arquitetura de Software

O projeto segue uma **arquitetura de Três Camadas**, garantindo separação de responsabilidades e organização do código. As três camadas são:

1. **Camada de Apresentação (Frontend)** – Responsável pela interface do usuário.
2. **Camada de Negócios (Lógica de Aplicação)** – Contém as regras de negócio e a lógica central do sistema.
3. **Camada de Dados (Persistência e Comunicação com o Banco)** – Responsável pelo armazenamento e recuperação dos dados.

---

### **Estrutura de Diretórios**

A organização do projeto segue a divisão das camadas conforme descrito acima.

```
/Users/vitorbalbo/Documents/inteli/2025-1A-T13-ES05-G06/
├── documentos                 # Documentação do projeto
├── src                        # Código-fonte principal
│   ├── backend                # Camada de Negócios
│   │   ├── src
│   │   │   ├── classes        
│   │   │   ├── controllers    # Controllers que lidam com requisições HTTP
│   │   │   ├── middleware     # Middlewares para autenticação, logs, etc.
│   │   │   ├── models         # Modelos que representam entidades do banco de dados
│   │   │   ├── routes         # Definição de rotas e endpoints da API
│   │   │   ├── types          
│   │   │   ├── utils          # Funções utilitárias
│   │   ├── tests              # Testes do backend
│   │   ├── database           # Configuração do banco de dados e migrations
│   ├── frontend               # Camada de Apresentação (Frontend)
│   │   ├── dist               # Build do frontend para produção
│   ├── public                 # Arquivos públicos da aplicação
│   │   ├── assets             # Recursos estáticos acessíveis publicamente
│   ├── src                    # Estrutura principal da aplicação
│   │   ├── app                # Camada de Apresentação no frontend
│   │   │   ├── components     # Componentes reutilizáveis do frontend
│   │   │   ├── models         # Modelos usados no frontend
│   │   │   ├── pages          # Páginas da aplicação
│   │   ├── services           # Serviços para comunicação com a API
│   │   ├── environments       # Configurações de ambiente
```

---

### **Descrição das Camadas**

#### **1. Camada de Apresentação (Frontend)**
- Localizada em `/frontend` e `/src/app`.
- Utiliza **Angular** para gerenciar a interface do usuário.
- Contém:
  - **Componentes (`/src/app/components`)** – Botões, formulários, menus, etc.
  - **Páginas (`/src/app/pages`)** – Telas completas, como login, dashboard e cadastro.
  - **Serviços (`/src/services`)** – Comunicação com a API.

---

#### **2. Camada de Negócios (Backend)**
- Localizada em `/backend/src`.
- Utiliza **Node.js com Express** para gerenciar as regras de negócio.
- Contém:
  - **Controllers (`/backend/src/controllers`)** – Lógica de requisição e resposta.
  - **Middlewares (`/backend/src/middleware`)** – Interceptadores para autenticação, logs, etc.
  - **Rotas (`/backend/src/routes`)** – Definição dos endpoints da API.
  - **Utilitários (`/backend/src/utils`)** – Funções auxiliares usadas no backend.

---

#### **3. Camada de Dados (Persistência)**
- Localizada em `/backend/database`.
- Responsável pelo acesso ao banco de dados MySQL.
- Contém:
  - **Modelos (`/backend/src/models`)** – Definição das tabelas e relações.
  - **Banco de Dados (`/backend/database`)** – Migrations e configuração do banco.
  - **Ambientes (`/src/environments`)** – Configurações para diferentes ambientes.

#### **4. Banco de dados**
- Localizada em `/database`.
- Responsável pela criação do banco de dados.
- Contém:
  - **Banco de Dados (`/database`)** – Configuração do banco.

---

# 4. Práticas de Desenvolvimento

## 4.1 Testes Automatizados

- Testes Unitários: Utilize Jest para criar testes unitários
  - Exemplo:
    ```
    test('adiciona 1 + 2 para igualar 3', () => {
      expect(1 + 2).toBe(3);
    });
    ```

- Testes de Integração: Como sugestão, utilizar o Cypress para testes de integração.
  - Exemplo: Testar a interação entre componentes de frontend e backend.

- Testes end-to-end: Como sugestão, utilizar o Cypress para testes end-to-end. 
  - Exemplo: Testar um RF de ponta a ponta.

## 4.2 Controle de Qualidade

- Revisão de Código: Todos os commits devem ser revisados por pelo menos um outro desenvolvedor.

- Sugestão: Utilizar ESLint para análise estática de código JavaScript/TypeScript.

# 5. Ferramentas e Tecnologias

## 5.1 Ferramentas de Desenvolvimento

- Editor de Código: Utilize Visual Studio Code como editor padrão.

- Plugins recomendados: ESLint, Prettier, GitLens.

## 5.2 Tecnologias e Frameworks

- Backend: Utilize Node.js com TypeScript.

- Frontend: Utilize Angular com TypeScript.

