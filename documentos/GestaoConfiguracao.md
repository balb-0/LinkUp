<Table>
  <tr>
    <td><a href= "https://www.cps.sp.gov.br/"><img src="img/logo-CPS.jpg" alt="Centro Paula Souza" border="0"></td>
    <td>
      <a href= "https://www.inteli.edu.br/"><img src="img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
    </td>
  </tr>
</table>

# Nome do Projeto: <nome do projeto>

## Nome do Grupo: <nome do grupo>

## Integrantes:

- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>

# Sumário

- [1. Introdução](#1-introdução)
  - [1.1 Objetivo do Documento](#11-objetivo-do-documento)
- [2. Política de Branches](#2-política-de-branches)
  - [2.1 Visão Geral do Gitflow](#21-visão-geral-do-gitflow)
  - [2.2 Estrutura de Branches](#22-estrutura-de-branches)
  - [2.3 Diretrizes de Uso das Branches](#23-diretrizes-de-uso-das-branches)
- [3. Políticas de Commit](#3-políticas-de-commit)
- [4. Política de Push e Pull Requests](#4-política-de-push-e-pull-requests)
- [Referências](#referências)

# 1. Introdução
Este documento descreve as regras para usar o Git no projeto projeto, incluindo branches, commits e pull requests. O objetivo é manter o desenvolvimento simples, ajudar na organização e garantir que o projeto seja realizado de forma mais simples.

## 1.1 Objetivo do Documento
Este documento estabelece diretrizes claras para a utilização de boas práticas no desenvolvimento de software, visando a organização e a qualidade do código. Todos os membros da equipe devem seguir as instruções definidas.

# 2. Política de Branches

## 2.1 Visão Geral do Gitflow
Nota: Fornecer uma breve explicação sobre o Gitflow e sua importância para o gerenciamento eficiente do código fonte.

## 2.2 Estrutura de Branches
Padrão de Nomenclatura das Branches:

**main**: Contém o código pronto para produção. </br>
**dev**: Integração contínua das novas funcionalidades em desenvolvimento. </br>
**feature/[nome-da-feature]**: Para desenvolvimento de novas funcionalidades. Exemplo: feature/integracao-api </br>
**fix/[nome-do-bug]**: Para correção de bugs. Exemplo: bugfix/corrige-login </br>
**hotfix/[nome-do-hotfix]**: Correção urgente diretamente na produção. Exemplo: hotfix/corrige-bug-em-producao </br>
**docs/[mudanca]**: Adição ou modificação de um arquivo da documentação. Exemplo: docs/implementa-matriz-risco </br>
**config/[alteracao]**: Adição ou modificação de um arquivo de configuração. Exemplo: config/altera-gitignore </br>

## 2.3 Diretrizes de Uso das Branches
- Cada nova funcionalidade deve ser desenvolvida em uma branch de feature criada a partir da branch develop.
  - Nomeação das branches de features deve seguir o padrão feature/[nome-da-feature].
- Todas as novas funcionalidades devem ser desenvolvidas em branches de features e integradas na branch develop através de pull requests.
- Commits diretos na branch main são proibidos! 
  - Configurem o Github para proteger de commits direto para a main.
- Branches de hotfix devem ser criadas a partir da branch main para corrigir problemas críticos em produção.
  - Nomeação das branches de hotfix deve seguir o padrão hotfix/[nome-do-hotfix].

# 3. Políticas de Commit
Integrar "Conventional Commits" nas políticas de commit ajuda a manter um histórico de commits claro e estruturado, facilitando a automação de processos como geração de changelogs e versionamento semântico.

As mensagens de commit devem seguir o padrão de Conventional Commits para garantir clareza e consistência.

Formato: **[Tipo][Escopo opcional]: Mensagem clara e descritiva.**

Os tipos devem ser:

**feat**: Uma nova funcionalidade para o usuário. <br>
**fix**: Correção de bug. <br>
**docs**: Mudanças na documentação. <br>
**style**: Mudanças que não afetam o significado do código (espaços em branco, formatação, etc.). <br>
**refactor**: Uma mudança de código que não corrige um bug nem adiciona uma funcionalidade. <br>
**test**: Adição ou correção de testes. <br>
**chore**: Atualizações de tarefas de build ou ferramentas auxiliares e bibliotecas, como a geração de documentação. <br>

Exemplo de commit: **feat(auth): add login feature with JWT**

Proibido:
**- O uso de emojis nas mensagens de commit, e commits com mensagens vagas como "melhorias" ou "atualizações".**

IMPORTANTE!
- Realizar commits frequentes (diários) para facilitar o rastreamento de mudanças e a colaboração.

# 4. Política de Push e Pull Requests

**Políticas de Push**:
- Não é permitido fazer push diretamente para a main ou dev.
- Todas as contribuições devem ser feitas em suas respectivas branches, indicando que tipos de mudanças foram feitas nas mesmas ('feature', 'docs', etc.), e submetidas por meio de pull requests.

**Regras de Push**:
- Todo código deve passar por revisão de código por pares antes de ser mergeado.
- A revisão (de código) só deve ser aprovada se os testes automatizados forem bem-sucedidos e os critérios de qualidade (cobertura de testes, análise de código) forem atendidos.

**Revisão por Pares - Critério de Aprovação**:
- O pull request deve ser revisado por, no mínimo, uma pessoa.
- A revisão de código deve considerar: 
  - Está funcional e resolve o problema proposto.
  - Passou em todos os testes automatizados.
  - Cobertura mínima de testes (60% ou mais). 
  - Verificação de boas práticas de código(como clean code).
  - Não introduz duplicidade de código.
- Após a aprovação, a branch deve ser mergeada na dev e o pull request pode ser fechado. 
- O Scrum Master da Sprint é responsável por subir os artefatos para a MAIN ao final da Sprint.


# Referências
- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- GitFlow: https://nvie.com/posts/a-successful-git-branching-model/
- Gitihub/iuricode: https://github.com/iuricode/padroes-de-commits
