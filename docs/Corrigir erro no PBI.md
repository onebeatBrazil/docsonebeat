# Corrigir erro no PBI

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 16 de julho de 2025 11:28
Categoria: Tutorial de Procedimento
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 8 de agosto de 2025 10:19
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: DEV
Lingua: Português
Status: Concluído
Texto: 16 de julho de 2025 11:28
Última edição por 1: Lucca Lacerda de Souza Lommez

# Tutorial: Como Corrigir Erros no Power BI

## Introdução

Este tutorial apresenta um guia passo a passo para resolver os erros mais comuns encontrados no Power BI, com foco especial em problemas relacionados ao gateway.

## Identificação do Erro

O primeiro passo para resolver qualquer problema no Power BI é identificar corretamente o erro:

- Verifique o e-mail de notificação de erro enviado pelo sistema
- Analise a mensagem de erro exibida na interface do Power BI
- Os erros mais comuns estão relacionados à falta de atualização do gateway

![image.png](Docs/CorrigirerronoPBI/image.png)

Exemplo de erro no PBI 

(Quer saber como ler os erros do email? —> [Verificar os erros no email](https://www.notion.so/Verificar-os-erros-no-email-2306f59d8418807ebab8e95f4151e68b?pvs=21) )

## Procedimento de Correção

Siga estes passos para resolver o problema:

### 1. Acesse o servidor do cliente

- Conecte-se ao servidor do cliente que apresentou o erro

### 2. Abra o Gateway

- Localize e abra o aplicativo do Gateway de Dados On-premises
- Faça login utilizando as credenciais do cliente
- As credenciais necessárias podem ser encontradas no ClickUp, na aba documentações.

(Quer saber como o click up funciona? —> [Como funciona o Click Up ](https://www.notion.so/Como-funciona-o-Click-Up-2336f59d841880cc923dee61ca0b97c6?pvs=21))

### 3. Verifique o status do Gateway

- Mantenha o gateway aberto durante o processo de solução
- Verifique se o gateway está conectado corretamente
- Se aparecer uma mensagem solicitando atualização, clique no link fornecido que redirecionará para a página de download da Microsoft

![image.png](Docs/CorrigirerronoPBI/image%201.png)

Basta clicar em Dowload

### 4. Execute os scripts de configuração

- Abra o Visual Studio Code
- Execute primeiro a célula de configurações

![image.png](Docs/CorrigirerronoPBI/image%202.png)

- Em seguida, execute a(s) célula(s) do PBI

![image.png](Docs/CorrigirerronoPBI/image%203.png)

- Aguarde até que o erro seja resolvido

![image.png](Docs/CorrigirerronoPBI/image%204.png)

## Resolução de Problemas Comuns

Se o problema persistir, verifique o erro no PBI entrando na [página do PBI](https://app.powerbi.com/home?experience=power-bi) e analisar e/ou reportar ao time CS responsável pelo cliente.

- Clique em workspaces e em premium [nome do cliente]:

![image.png](Docs/CorrigirerronoPBI/image%205.png)

- Clique em [nome do cliente] Dash:

![image.png](Docs/CorrigirerronoPBI/image%206.png)

- Ai estará o erro.