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

- Utilize a Arquitetura de Três Camadas: Separe a lógica de negócios (Camada de Negócios), a interface do usuário (Camada de Apresentção) e o acesso aos dados (Camada de Dados).
  - Exemplo: Em uma aplicação Angular, utilize serviços para lógica de negócios, componentes para a interface e controladores para gerenciar a interação.

# 4. Práticas de Desenvolvimento

## 4.1 Testes Automatizados

### Testes Unitários

Utilize **Jest** para criar testes unitários e garantir que cada função ou módulo do seu código se comporta conforme esperado.

- **Exemplo:**
    ```typescripts
    test('adiciona 1 + 2 para igualar 3', () => {
      expect(1 + 2).toBe(3);
    });
    ```

### Testes de Integração

Embora o Jest possa ser utilizado para testes de integração, é sugerido usar **Cypress** para testes de integração, pois ele oferece uma integração completa com frontend e backend.

- **Exemplo:**
    Testar a interação entre componentes do frontend (como botões, formulários, etc.) e o backend (API, banco de dados).
    ```typescript
    describe('Testando integração entre frontend e backend', () => {
      it('deve enviar dados do formulário e receber resposta', () => {
        cy.visit('/form');
        cy.get('input[name="username"]').type('testuser');
        cy.get('form').submit();
        cy.contains('Sucesso').should('be.visible');
      });
    });
    ```

### Testes End-to-End

Para testes de ponta a ponta, é sugerido o uso do **Cypress**, que oferece uma maneira fácil de testar a aplicação como um todo, desde a interface até o backend.

- **Exemplo:**
    Testar um **requisito funcional** (RF) de ponta a ponta, simulando o comportamento real do usuário na aplicação.
    ```typescript
    describe('Testando fluxo completo de login', () => {
      it('deve realizar login com sucesso e redirecionar para o painel', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
        cy.contains('Bem-vindo, testuser').should('be.visible');
      });
    });
    ```

### 4.1.2 Organização e Estrutura de Testes

### Organização de Arquivos

- **Arquivos de Teste Unitário:** Organize os testes unitários no mesmo diretório que os arquivos de código, usando o mesmo nome do arquivo, mas com a extensão `.test.js` ou `.spec.js`.
    - Exemplo:
      - Arquivo de código: `src/controllers/UserController.js`
      - Arquivo de teste: `src/controllers/UserController.test.js`

- **Arquivos de Teste de Integração e End-to-End:** Armazene esses testes em uma pasta separada, como `


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

