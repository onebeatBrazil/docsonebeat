# Shared Project

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 6 de agosto de 2025 11:25
Categoria: Documentação
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 22 de agosto de 2025 18:40
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: CS, DEV
Lingua: Português
Status: Concluído
Texto: 6 de agosto de 2025 11:25
Última edição por 1: Lucca Lacerda de Souza Lommez

# Documentação do Shared Project - Overview

## 1. Introdução ao Shared Project

O Shared Project é uma solução de integração e automação desenvolvida para otimizar e padronizar processos de integração entre sistemas. Diferente de abordagens tradicionais, onde cada cliente possui seu próprio código de integração isolado, o Shared Project centraliza funções comuns em um único repositório compartilhado, permitindo que atualizações e melhorias sejam aplicadas automaticamente a todos os clientes simultaneamente.

### Conceito Fundamental

Considere um cenário com 20 clientes diferentes, cada um com seu próprio processo de integração. Anteriormente, caso fosse necessário implementar uma melhoria ou corrigir um erro, seria preciso modificar 20 códigos diferentes. Com o Shared Project, é necessário modificar apenas uma vez o código central, e todos os 20 clientes são atualizados automaticamente na próxima execução.

### Por que ele é prático?

- Centralização de código: Funções comuns são mantidas em um único lugar, eliminando duplicação
- Atualizações automáticas: Cada cliente executa um "pull" do repositório compartilhado diariamente
- Padronização: Todos os clientes seguem o mesmo padrão de integração
- Maior confiabilidade: Validações e tratamentos de erros padronizados
- Redução de tempo: Processos que antes demandavam configuração manual são automatizados
- Monitoramento centralizado: Todos os logs são enviados para um banco de dados central

## 2. Fluxo de Trabalho

### Antes do Shared Project:

Anteriormente, cada cliente tinha seu próprio processo de integração, com códigos diferentes para tarefas comuns como:

- Geração de interfaces (arquivos CSV)
- Carregamento de dados no sistema (Autoloader)
- Execução de procedimentos no banco de dados
- Atualização de dashboards Power BI e/ou Analytics
- Geração de relatórios e logs
- Gerenciamento de arquivos

Cada implementação tinha suas particularidades, tratamentos de erros inconsistentes, e necessitava de manutenção individual. Qualquer melhoria precisava ser replicada manualmente em cada cliente.

### Com o Shared Project:

O processo agora é padronizado e centralizado:

1. O notebook principal do cliente importa o módulo Shared Project
2. Executa-se automaticamente um "git pull" para garantir a versão mais atualizada
3. As funções padronizadas são utilizadas para todas as operações comuns
4. Validações de ambiente ocorrem automaticamente
5. Logs são padronizados e enviados para um banco central
6. Processos longos são executados em threads separadas para otimização

## 3. Implementação

O processo de implementação do Shared Project é descrito detalhadamente em [Integrar Shared Project ](https://www.notion.so/Integrar-Shared-Project-2476f59d8418805fac34ebb8359c8a64?pvs=21) 

## 4. Explicação das Funções

### — Funções de Inicialização

### ImportLocalVars

Esta função importa variáveis do notebook principal para o módulo compartilhado. Ela permite que o módulo compartilhado tenha acesso às configurações específicas de cada cliente sem precisar redefini-las.

### GitPull

Executa um "git pull" no repositório Shared_Project para garantir que o código mais recente seja utilizado. Esta função é executada em uma thread separada com timeout para evitar travamentos, e registra o resultado no log de integração.

### ServerValidation

Verifica se o ambiente do servidor está configurado corretamente. Checa a existência da pasta de logs, as credenciais do Power BI e do banco central, e verifica se os serviços Windows necessários estão em execução.

### — Funções de Monitoramento e Execução

### timeCheck

Uma classe que funciona como um decorador de contexto para medir o tempo de execução de processos. Ela registra quando um processo começa e termina, calculando o tempo total em minutos.

### sql_log

Registra eventos no banco de dados de log local e, opcionalmente, envia para o banco central. Esta função padroniza o formato dos logs.

### run_executable

Executa scripts externos (.ipynb, .py, .cmd) e captura sua saída. Gera arquivos HTML para notebooks, facilitando a análise posterior. Mede o tempo de execução e registra erros.

### exec_dbJobs

Executa uma lista de procedimentos armazenados no banco de dados, medindo o tempo de cada um. Trata erros específicos e registra resultados.

### pbi_refresh

Atualiza dashboards do Power BI usando a API oficial. Gerencia tokens de autenticação, verifica o status da atualização periodicamente e registra o resultado.

### — Funções Utilitárias

### clear_inputFolder

Move arquivos existentes da pasta de entrada para uma subpasta de arquivos ignorados, preparando o ambiente para uma nova execução.

### to_SqlCsv

Exporta dados para SQL ou CSV com configurações padronizadas, garantindo consistência em todas as exportações.

### resetWindowsServices

Reinicia serviços do Windows e processos, seguindo uma ordem específica para evitar problemas de dependência.

### shutDownServer

Desliga o servidor após verificar que todos os processos foram concluídos com sucesso e que não há erros registrados.

### zipDeleteFiles

Compacta ou exclui arquivos antigos com base em sua data de modificação, ajudando a gerenciar o espaço em disco.

### — Funções de Centralização

### getClientInfoToCentral

Coleta informações sobre a execução atual (dados do Autoloader, quarentenas, arquivos importados, status de integração) e envia para o banco de dados central, permitindo monitoramento unificado de todos os clientes.