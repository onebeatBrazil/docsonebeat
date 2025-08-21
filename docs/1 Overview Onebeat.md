# 1. Overview Onebeat

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 15 de julho de 2025 13:16
Categoria: 1. Informativo
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 8 de agosto de 2025 10:20
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: CS, DEV
Lingua: Português
Status: Concluído
Texto: 15 de julho de 2025 13:16
Última edição por 1: Lucca Lacerda de Souza Lommez

# Overview do Onebeat

## Introdução ao Onebeat

O Onebeat é uma ferramenta avançada de gestão e análise de estoque e vendas, projetada para ajudar empresas a otimizar seus processos operacionais, tomar decisões estratégicas e melhorar seus resultados financeiros.

O sistema Onebeat busca encontrar a **melhor forma de gerenciar a cadeia de estoque** de uma empresa. Para isso, o sistema utiliza as informações provenientes do cliente de **Cadastros de Lojas e Produtos**, e também informações de **quantidade de estoque** e **transações de produtos**.

O sistema então utiliza esses dados para fazer uma série de cálculos que serão utilizados para o gerenciamento do estoque disponível, gerando informações como a quantidade de estoque por loja que deve ser abastecida, que está em excesso, que pode ser transferida, etc. Dando ao cliente uma visão geral de sua cadeia de suprimentos.

## Processo de Integração

A integração é o processo pelo qual conectamos os sistemas do cliente ao Onebeat. Este processo é fundamental para garantir que os dados fluam corretamente e que a ferramenta possa realizar suas análises com precisão.

A integração é realizada através de código Python e estruturas SQL (procedures, tabelas e views), onde fazemos a extração, transformação e carregamento (ETL) dos dados do cliente para o formato compatível com o Onebeat.

Durante este processo, configuramos as tabelas padrão do sistema e, quando necessário, criamos estruturas personalizadas para atender às necessidades específicas de cada cliente.

Para entender como é feito o processo de integração do zero clique nesse link —> [Integração no Onebeat ](https://www.notion.so/Integra-o-no-Onebeat-2316f59d841880d6a4bbc1462541167f?pvs=21) 

## Estrutura do Banco de Dados

O banco de dados do Onebeat é composto por tabelas e views padrão, além de possíveis estruturas personalizadas para cada cliente. Abaixo estão as principais tabelas padrão do sistema:

### Tabelas de Cadastro

```sql
-- Cadastros de SKUs (Stock Keeping Units)
select * from symphony_skus

-- Cadastros de Localizações (Lojas, Centros de Distribuição, etc.)
select * from symphony_stocklocations

-- Relações entre SKUs e Localizações
select * from symphony_stocklocationskus

-- Histórico das relações entre SKUs e Localizações
select * from symphony_stocklocationskuHistory

```

### Tabelas de Propriedades

```sql
-- Propriedades dos SKUs
select * from Symphony_SKUsProperty

-- Valores das propriedades dos SKUs
select * from Symphony_SKUsPropertyItems

-- Propriedades das Localizações
select * from Symphony_StockLocationProperty

-- Valores das propriedades das Localizações
select * from Symphony_StockLocationPropertyItems

```

### Tabelas de Processamento e Cálculos

```sql
-- Cadastro Location-Skus + Propriedades
select * from biss

-- Cadastro Location-Skus Cálculos
select * from bissMTSSKUS

-- Registros de integração e logs
select * from Log_Integration

```

## Fluxo de Dados no Onebeat

1. **Extração de Dados:** Coletamos informações dos sistemas do cliente (sftp, api, view, etc.)
2. **Transformação:** Convertemos os dados para o formato padrão do Onebeat através da integração em python.
3. **Carregamento:** Inserimos os dados nas tabelas apropriadas com o app do Onebeat (veja tudo a respeito do app —> [App Onebeat informações e configurações](https://www.notion.so/App-Onebeat-informa-es-e-configura-es-2316f59d841880088790cda7c5d72b3d?pvs=21))
4. **Processamento:** O Onebeat executa seus algoritmos de análise
5. **Visualização:** Os resultados são disponibilizados através de dashboards e relatórios (Power BI e/ou Analytics)

## Customizações por Cliente

Além das estruturas padrão, o Onebeat permite customizações específicas para cada cliente, como:

- Tabelas adicionais para dados específicos do segmento
- Views personalizadas para relatórios customizados
- Procedures específicas para cálculos ou regras de negócio particulares
- Integrações com sistemas proprietários