# Como Reprocessar uma Carga

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 14 de julho de 2025 20:03
Categoria: Tutorial de Procedimento
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 8 de agosto de 2025 10:19
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: DEV
Lingua: Português
Status: Concluído
Texto: 14 de julho de 2025 20:03
Última edição por 1: Lucca Lacerda de Souza Lommez

# Tutorial: Como Reprocessar uma Carga

Este tutorial apresenta o passo a passo para reprocessar uma carga que não foi executada em uma data anterior. Siga as instruções abaixo para resolver este problema de forma eficiente.

## Passo 1: Verificar o motivo da falha no email de erros

O primeiro passo para reprocessar uma carga é verificar no email de erros na data em questão o motivo pelo qual a carga não foi executada. Na maioria das vezes, a falha ocorre por dois motivos principais:

- **Falha na geração das interfaces** (parcial ou total)

![image.png](Docs/ComoReprocessarumaCarga/image.png)

(Imagem exemplo, o erro pode variar)

- **Falha no autoloader**

![image.png](Docs/ComoReprocessarumaCarga/image%201.png)

Quer aprender a ler o email de erros? Clique no link para um tutorial detalhado! —>  [Verificar os erros no email](https://www.notion.so/Verificar-os-erros-no-email-2306f59d8418807ebab8e95f4151e68b?pvs=21) 

## Passo 2: Resolver falhas nas interfaces

Se o problema for na geração de interfaces, verifique se é possível gerá-las novamente. O procedimento vai depender do cliente específico:

### Para interfaces via SFTP:

É necessário contatar o cliente para que reenvie as interfaces caso não tenham sido enviadas ou enviadas incompletas.

### Para interfaces via View ou API:

Na maioria dos casos, é possível gerar as interfaces novamente através da alteração da variável "PROCESS_DATE" e "CURRENT_DATE”, que a maioria dos clientes possui.

![image.png](Docs/ComoReprocessarumaCarga/image%202.png)

Basta alterar essa variável para a data desejada para que as interfaces possam ser geradas. Em caso de reprocessamento de um cliente que utiliza sftp tem também a "FTP_DATE”:

![image.png](Docs/ComoReprocessarumaCarga/image%203.png)

Em caso de dúvidas sobre a geração das interfaces, ou da ausência da variável, consulte o tech responsável pelo código.

Após gerar as interfaces com sucesso, é necessário executar o autoloader manualmente para processar os arquivos para a data desejada. Uma vez concluído o processamento pelo autoloader, você pode prosseguir para a atualização da BISS conforme descrito no Passo 4.

## Passo 3: Resolver falhas no autoloader

Se o erro for apenas do autoloader e as interfaces foram geradas e carregadas no dia seguinte junto com a próxima carga, apenas a BISS precisa ser atualizada.

Isso pode ser verificado no email de confirmação - geralmente a carga carrega 4 arquivos apenas. Caso tenha o dobro de arquivos usuais, significa que ocorreu esse tipo de situação.

![image.png](Docs/ComoReprocessarumaCarga/image%204.png)

É de extrema importância verificar a pasta "history folder" para confirmar se os arquivos foram de fato carregados. TODOS os arquivos esperados devem estar presentes nesta pasta, E PREENCHIDOS COM DADOS, NÃO PODEM ESYTAR VAZIOS, sem exceção. Esta verificação é um passo crítico para garantir que o processamento foi completado corretamente e evitar problemas futuros relacionados a dados faltantes ou incompletos.

![image.png](Docs/ComoReprocessarumaCarga/25a877d9-14b9-48eb-957b-f9c92f18b1b6.png)

## Passo 4: Atualizar a BISS

**Observação importante:** Em ambos os casos (falha nas interfaces ou falha no autoloader), a BISS deve ser atualizada.

### Verificando a existência da procedure sp_BissHistory:

Verifique se o cliente tem a procedure sp_BissHistory, que é responsável pela atualização da BISS para um dia que tenha sido deletada ou não tenha sido carregada.

### Se o cliente não tiver a sp_BissHistory:

Será necessário criá-la. Acesse o tutorial específico para criação da procedure neste link —> [Criar sp_BissHistory](https://www.notion.so/Criar-sp_BissHistory-2306f59d841880938619d4d8a114f750?pvs=21) 

### Se o cliente tiver a sp_BissHistory:

Execute o comando abaixo para verificar o dia faltante:

```sql
use XXXDBOB -- complete com o banco certo
DECLARE @dataInicial DATE = '2025-07-07'; -- data de consulta
select sum(inventoryAtSite),data from biss where data >= @dataInicial group by data order by data desc
select sum(inventoryAtSite),updateDate from Symphony_StockLocationSkuHistory where updateDate >= @dataInicial group by updateDate order by updateDate desc
```

Este comando compara a soma dos inventários da Symphony_StockLocationSkuHistory que é atualizada ao fazer a carga no onebeat e a biss que deve ser atualizada pela procedure e possuir a mesma soma de inventario, venda etc.

Após identificar a data faltante, execute a procedure com o seguinte comando:

```sql
EXEC sp_BissHistory 'data_inicial', 'data_final'
```

Este comando executa a sp_BissHistory de uma data até outra. Se for apenas para um dia específico, utilize a mesma data como início e fim.

Após executar a procedure, é essencial refazer o SELECT acima para confirmar se os dados foram inseridos corretamente na BISS. Verifique se a soma dos inventários na tabela BISS está agora alinhada com a tabela Symphony_StockLocationSkuHistory para a data que estava faltando. Esta verificação garante que a atualização foi realizada com sucesso e que os dados estão consistentes.