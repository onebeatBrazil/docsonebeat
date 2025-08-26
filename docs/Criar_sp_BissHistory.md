# Criar sp_BissHistory

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 14 de julho de 2025 20:28
Categoria: Tutorial de Procedimento
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 8 de agosto de 2025 10:19
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: DEV
Lingua: Português
Status: Concluído
Texto: 14 de julho de 2025 20:28
Última edição por 1: Lucca Lacerda de Souza Lommez

# Guia de Criação da sp_BissHistory

## Introdução

Este documento descreve o processo para criar a stored procedure sp_BissHistory baseada na procedure existente do cliente a sp_Biss. A sp_BissHistory é utilizada para reconstruir a biss por algum motivo (Um exemplo é quando precisamos reprocessar uma carga —> [Como Reprocessar uma Carga](https://www.notion.so/Como-Reprocessar-uma-Carga-2306f59d841880fab771fe6fcf45be5d?pvs=21) ).

## Etapas para Criação

### 1. Preparação Inicial

- Abra o banco de dados do cliente específico
- Localize e abra a sp_biss do cliente para usar como referência

![image.png](/docs/img/sp_BissHistory.png)

- Crie um novo script e cole o código base fornecido abaixo

### 2. Script Base

```sql
---=========================================================
-- sp_BissHistory
USE XXXDBOB
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--=========# MODA #==========
--MPDBOB, FILIDBOB, AS2DBOB

--=========# DBMP #==========
--MPDBOB, SNDBOB, LPDBOB, KDBOB, OBDBOB, WQDBOB

--=========# VEND #==========
--GNDBOB, FILIDBOB, GSOUDBOB, USDBOB, LIVDBOB, KOEDBOB, AS2DBOB, LPDBOB

CREATE PROCEDURE [dbo].[sp_BissHistory]
@iDate nvarchar(30),
@fDate nvarchar(30)
AS
BEGIN

  IF OBJECT_ID('tempdb..#Biss') IS NOT NULL
  drop table #Biss

  CREATE TABLE #Biss(
    [Data] [date] NOT NULL,
    [stockLocationID] [int] NOT NULL,
    [skuID] [int] NOT NULL,
    [Buffer] [numeric](18, 5) NOT NULL DEFAULT (0),
    [InventoryAtSite] [numeric](18, 5) NOT NULL DEFAULT (0),
    [InventoryAtTransit] [numeric](18, 5) NOT NULL DEFAULT (0),
    [replenishmentTime] [smallint]  NOT NULL DEFAULT (0),
    [avoidReplenishment] [bit] NOT NULL DEFAULT (0),
    [avoidSeasonality] [bit] NOT NULL DEFAULT (0),
    [minimumReplenishment] [numeric](18, 5) NOT NULL DEFAULT (0),
    [multiplications] [numeric](18, 5) NOT NULL DEFAULT (0),
    [Venda] [numeric](18, 5) NOT NULL,
    [BP_Transit_Color] [nvarchar](100) NULL,
    [BP_Site_Color] [nvarchar](100) NULL,
    [unitPrice] [numeric](18, 5) NOT NULL DEFAULT (0),
    [Throughput] [numeric](18, 5) NOT NULL DEFAULT (0),
    [TVC] [numeric](18, 5) NOT NULL DEFAULT (0),
    [InventoryAtCD] [numeric](18, 5) NOT NULL DEFAULT (0),
    [replenishmentQuantity][numeric](18, 5) NOT NULL DEFAULT (0),
    [inventoryNeeded][numeric](18, 5) NULL DEFAULT (0),
    [RollingSales] [numeric](18, 5) NULL,
    [RollingSalesMoney] [numeric](18, 5) NULL,
    --====================##====================##====================#Moda
    -- [GradeQuebrada] [tinyint] NULL,
    -- [GradeQuebradaRessuprimento] [tinyint] NULL,
    -- [QuantidadeRessuprimentoFinal] [numeric](18, 5) NULL,
    --====================##====================##====================#
    [noConsumptionDays] [smallint] NULL,
    [VendaSemanaCorrente] [numeric](18, 5) NULL
  )

  INSERT INTO #BISS
          ([Data]
          ,[stockLocationID]
          ,[skuID]
          ,[Buffer]
          ,[InventoryAtSite]
          ,[InventoryAtTransit]
          ,[replenishmentTime]
          ,[avoidReplenishment]
          ,[avoidSeasonality]
          ,[minimumReplenishment]
          ,[multiplications]
          ,[Venda]
          ,[BP_Transit_Color]
          ,[BP_Site_Color]
          ,[unitPrice]
          ,[Throughput]
          ,[TVC]
          ,[InventoryAtCD]
          ,[replenishmentQuantity]
          ,[inventoryNeeded]
          ,RollingSales
          ,RollingSalesMoney
          --====================##====================##====================#Moda
          -- ,GradeQuebrada
          -- ,GradeQuebradaRessuprimento
          -- ,QuantidadeRessuprimentoFinal
          --====================##====================##====================#
          ,noConsumptionDays
          ,VendaSemanaCorrente
        )
    select cast(hist.updateDate as Date) as 'Data',
      hist.stockLocationID,
      hist.skuID,
      hist.bufferSize,
      hist.inventoryAtSite,
      hist.inventoryAtTransit,
      sl_sku.replenishmentTime,
      sl_sku.avoidReplenishment,
      sl_sku.avoidSeasonality,
      sl_sku.minimumReplenishment as 'Minimum Replenishment',
      sl_sku.multiplications as 'Multiplications',
      hist.consumption as 'Venda',
      CASE 
        WHEN (cast(hist.bpTransit as numeric(10, 2)) < 0) THEN 'Cyan'
        WHEN (cast(hist.bpTransit as numeric(10, 2)) >=0 AND cast(hist.bpTransit as numeric(10, 2)) <= hist.greenBpLevel) THEN 'Green'
        WHEN (cast(hist.bpTransit as numeric(10, 2)) >= hist.redBpLevel AND cast(hist.bpTransit as numeric(10, 2)) < 1) THEN 'Red'
        WHEN (cast(hist.bpTransit as numeric(10, 2)) = 1) THEN 'Black'
        ELSE 'Yellow'
        END AS 'BP_Transit_Color',
      CASE 
        WHEN (cast(hist.bpSite as numeric(10, 2)) < 0) THEN 'Cyan'
        WHEN (cast(hist.bpSite as numeric(10, 2)) >=0 AND cast(hist.bpSite as numeric(10, 2)) <= hist.greenBpLevel) THEN 'Green'
        WHEN (cast(hist.bpSite as numeric(10, 2)) >= hist.redBpLevel AND cast(hist.bpSite as numeric(10, 2)) < 1) THEN 'Red'
        WHEN (cast(hist.bpSite as numeric(10, 2)) = 1) THEN 'Black'
        ELSE 'Yellow'
        END AS 'BP_Site_Color',
      sl_sku.unitPrice,
      sl_sku.Throughput,
      sl_sku.TVC,
      isnull(hist_origem.InventoryAtSite, 0) as 'InventoryAtDC',
      sl_sku.replenishmentQuantity,
      sl_sku.inventoryNeeded,
      0 as 'RollingSales',
      0 as 'RollingSalesMoney',
      -- 0 as 'GradeQuebrada',                      --=========# MODA #==========
      -- 0 as 'GradeQuebradaRessuprimento',                 --=========# MODA #==========
      -- sl_sku.replenishmentQuantity as 'QuantidadeRessuprimentoFinal',  --=========# MODA #==========
      sl_sku.noConsumptionDays,
      0 as 'VendaSemanaCorrente'
    from [dbo].[Symphony_StockLocationSkuHistory] hist
      left join [dbo].[Symphony_StockLocations] sl on hist.stockLocationID = sl.stockLocationID
      left join [dbo].[Symphony_SKUs] sku on hist.skuID = sku.skuID
      inner join [dbo].[Symphony_StockLocationSkus] sl_sku on sl.stockLocationID = sl_sku.stockLocationID and sku.skuID = sl_sku.skuID
      inner join dbo.Symphony_DBMChangePolicies policy on policy.ID = sl_sku.bufferManagementPolicy
      left join [dbo].[Symphony_StockLocationSkuHistory] hist_origem on hist.originStockLocation = hist_origem.stockLocationID and hist.skuID = hist_origem.skuID and hist.updateDate = hist_origem.updateDate
    --#====================##====================# CHANGE DATE
    where cast(hist.updateDate as Date) BETWEEN @iDate and @fDate
    --#====================##====================##====================#
    order by hist.updateDate desc

  update #BISS
    set RollingSales = ISNULL(
                  (
                  select Isnull(sum(hist.consumption), 0)
                    from [dbo].[Symphony_StockLocationSkuHistory] hist
                  where hist.stockLocationID = #BISS.stockLocationID
                    and hist.skuID = #BISS.skuID
                    and hist.updateDate > DATEADD(day, - 60, #BISS.Data)
            ), 0)

  update #BISS
    set RollingSalesMoney = ISNULL(
                  (
                  select Isnull(sum(hist.consumption * hist.unitPrice), 0)
                    from [dbo].[Symphony_StockLocationSkuHistory] hist
                  where hist.stockLocationID = #BISS.stockLocationID
                    and hist.skuID = #BISS.skuID
                    and hist.updateDate > DATEADD(day, - 60, #BISS.Data)
            ), 0)

  update #BISS
  set VendaSemanaCorrente = ISNULL(
          (
          select Isnull(sum(hist.consumption), 0)
          from [dbo].[Symphony_StockLocationSkuHistory] hist
          where hist.stockLocationID = #BISS.stockLocationID
          and hist.skuID = #BISS.skuID
          and DATEPART(WEEK, hist.updateDate) = DATEPART(WEEK,getdate())
          and DATEPART(YEAR, hist.updateDate) = DATEPART(YEAR,getdate())
            ), 0)

  INSERT INTO biss
          ([Data]
          ,[stockLocationID]
          ,[skuID]
          ,[Buffer]
          ,[InventoryAtSite]
          ,[InventoryAtTransit]
          ,[replenishmentTime]
          ,[avoidReplenishment]
          ,[avoidSeasonality]
          ,[minimumReplenishment]
          ,[multiplications]
          ,[Venda]
          ,[BP_Transit_Color]
          ,[BP_Site_Color]
          ,[unitPrice]
          ,[Throughput]
          ,[TVC]
          ,[InventoryAtCD]
          ,[replenishmentQuantity]
          ,[inventoryNeeded]
          ,RollingSales
          ,RollingSalesMoney
          --====================##====================##====================#Moda
          -- ,GradeQuebrada
          -- ,GradeQuebradaRessuprimento
          -- ,QuantidadeRessuprimentoFinal
          --====================##====================##====================#
          ,noConsumptionDays
          ,VendaSemanaCorrente
  )
    SELECT * FROM #Biss
END
GO
---=========================================================
```

### 3. Adaptação ao Cliente

Após copiar o script base, será necessário adaptá-lo conforme a sp_biss do cliente:

### Passo a Passo:

- **Tabela Temporária:** Compare as colunas do CREATE TABLE #Biss do cliente com as do script base, e adicione todas as colunas que existem na sp_biss do cliente mas não estão no script base
- **Primeiro INSERT:** Adicione os mesmos campos ao INSERT INTO #BISS que estão presentes na sp_biss do cliente
- **Verificação do SELECT:** Certifique-se que todas as colunas após o "select cast(hist.updateDate as Date) as 'Data'" estejam na mesma ordem do INSERT INTO #BISS, adicione as informações faltantes
- **Updates:** Compare os UPDATEs da sp_biss do cliente com os do script base e certifique-se que estão iguais
- **INSERT Final:** No INSERT INTO biss no final da procedure, adicione os mesmos campos que foram adicionados no INSERT INTO #BISS

### 4. Substituições Necessárias

- Substitua "XXXDBOB" pelo nome do banco de dados do cliente

## Exemplo Final

Após todas as modificações, seu script deverá estar adaptado às necessidades específicas do cliente, mantendo a estrutura básica mas incluindo todas as particularidades necessárias para o funcionamento correto da sp_BissHistory. Ao salvar a procedure, se ela não der erro, é um excelente indício de que funcionou, pois ela não salva caso esteja faltando algo.