# 2. Abertura de tasks

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 8 de agosto de 2025 09:46
Categoria: 1. Informativo
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 8 de agosto de 2025 10:10
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: CS
Lingua: Inglês, Português
Status: Concluído
Texto: 8 de agosto de 2025 09:46
Última edição por 1: Lucca Lacerda de Souza Lommez

# 1 - Português - BR

# 📌 Guia para Abertura de Tasks no ClickUp – Padrão de Qualidade e Clareza

Este documento define **como** abrir uma task de forma eficiente para que o time técnico possa entender e executar rapidamente a solicitação.

O objetivo é **eliminar retrabalho**, reduzir tempo de investigação e evitar trocas desnecessárias de mensagens para coletar informações básicas.

---

## **1. Título da Task**

- O título deve ser **curto, objetivo e autoexplicativo**.
- Evite frases genéricas como *"Erro na tela nova"* ou *"Arrumar procedure"*.
- Prefira algo como:
    - `Tela de Estoque – View V_Inventory não atualiza após execução da SP_UpdateStock`
    - `Adicionar SP_CalculateSales ao Job após SP_UpdateInventory`

**Lembre-se:** O título deve permitir que qualquer pessoa entenda o **que** será feito sem precisar abrir a descrição.

---

## **2. Descrição da Task**

A descrição é **obrigatória**.

**Tasks sem descrição não serão feitas.**

A descrição deve conter:

1. **Contexto detalhado** do problema ou solicitação.
2. **Passos já realizados na investigação** (quando for um erro ou problema técnico).
3. **Informações técnicas** relevantes:
    - Nome da **view** envolvida.
    - Nome da **tabela** que alimenta a view.
    - Nome da **procedure** que atualiza a tabela.
    - Origem dos dados (integração, job, API, etc.).
4. **Evidências**: prints, vídeos, arquivos de log, queries utilizadas, etc.
5. **Impacto**: descrever o que acontece se não for resolvido e quem é afetado.

**Exemplo de descrição ruim:**

> A tela de pedidos não funciona.
> 

**Exemplo de descrição boa:**

> Na tela de Pedidos (OrderScreen), os registros não são exibidos.
> 
> 
> Já investigado:
> 
> - View: `V_Orders` não retorna dados para o período atual.
> - Tabela: `TB_Orders` está vazia.
> - Procedure: `SP_UpdateOrders` não executou no último Job_DailySync.
>     
>     Logs anexados no arquivo `SP_UpdateOrders_Log_2025-08-08.txt`.
>     
>     Impacto: usuários não conseguem visualizar pedidos gerados hoje.
>     

---

## **3. Uso da Tag "URGENTE"**

- **Use APENAS** para casos críticos que exigem intervenção imediata.
- Exemplos de **urgente**:
    - Sistema inteiro fora do ar.
    - Processos críticos de integração parados.
    - Perda de dados em produção.
- Casos cotidianos, melhorias ou correções que não afetam de forma imediata e grave o negócio **não devem** ser marcados como urgentes.
- Se tudo for urgente, **nada** é urgente.

---

## **4. Uso de Arquivos e Imagens**

- Sempre que possível, anexe **prints, vídeos, arquivos de log ou exportações**.
- Isso acelera o entendimento e reduz dúvidas.
- Se for erro de procedure ou SQL, anexar também:
    - Query utilizada para validação.
    - Resultado da query.
    - Mensagens de erro.

---

## **5. Registro de Demandas**

- **Toda e qualquer demanda** deve estar registrada como uma task no ClickUp.
- Solicitações informais como *"faz rapidinho pra mim"* ou *"é só uma coisinha"* **não serão executadas** sem task aberta.
- Isso garante rastreabilidade e organização.

---

## **6. Tasks para Adição de Procedures em Jobs**

Quando solicitar inclusão de uma procedure em um job, **informar obrigatoriamente**:

1. **O que a procedure faz** (descrição funcional).
2. **Após qual procedure** ela deve ser executada no job.
3. **Tempo médio de execução** da procedure.
4. Se a procedure é da **integração Onebeat** ou do **Analytics**.

**Exemplo:**

> Solicitação: Adicionar SP_UpdatePrices ao Job_DailySync.
> 
> - Função: atualiza preços promocionais nas tabelas de vendas.
> - Deve rodar após: `SP_UpdateInventory`.
> - Tempo médio de execução: 2 minutos.
> - Origem: Integração Onebeat.

**⚠️ Importante:** Sem essas informações, a adição será **ignorada**.

---

## **Resumo – Checklist Antes de Abrir a Task**

✅ Título claro e objetivo.

✅ Descrição técnica e detalhada.

✅ Informações sobre views, tabelas e procedures.

✅ Prints, arquivos ou logs anexados.

✅ Uso correto da tag **URGENTE**.

✅ Registro obrigatório no ClickUp (nada informal).

✅ Especificações completas para alterações de jobs/procedures.

---

Se seguirmos este padrão, conseguiremos **reduzir o tempo de resolução em até 10x** e evitar gargalos de comunicação entre CS e Tech.

---

# 2 - English - EUA

# 📌 Guide for Opening Tasks in ClickUp – Quality and Clarity Standard

This document defines **how** to open a task efficiently so the tech team can quickly understand and execute the request.

The goal is to **eliminate rework**, reduce investigation time, and avoid unnecessary message exchanges to gather basic information.

---

## **1. Task Title**

- The title must be **short, objective, and self-explanatory**.
- Avoid generic phrases like *"Error on the new screen"* or *"Fix procedure"*.
- Prefer something like:
    - `Stock Screen – View V_Inventory does not update after executing SP_UpdateStock`
    - `Add SP_CalculateSales to Job after SP_UpdateInventory`

**Remember:** The title should allow anyone to understand **what** will be done without opening the description.

---

## **2. Task Description**

The description is **mandatory**.

**Tasks without description will not be done.**

The description must contain:

1. **Detailed context** of the problem or request.
2. **Steps already taken in the investigation** (when it is an error or technical problem).
3. **Relevant technical information**:
    - Name of the **view** involved.
    - Name of the **table** feeding the view.
    - Name of the **procedure** updating the table.
    - Data source (integration, job, API, etc.).
4. **Evidence**: screenshots, videos, log files, queries used, etc.
5. **Impact**: describe what happens if not solved and who is affected.

**Example of a bad description:**

> The order screen is not working.
> 

**Example of a good description:**

> On the Orders screen (OrderScreen), records are not displayed.
> 
> 
> Already investigated:
> 
> - View: `V_Orders` does not return data for the current period.
> - Table: `TB_Orders` is empty.
> - Procedure: `SP_UpdateOrders` did not run in the last Job_DailySync.
>     
>     Logs attached in file `SP_UpdateOrders_Log_2025-08-08.txt`.
>     
>     Impact: users cannot see orders generated today.
>     

---

## **3. Use of the "URGENT" Tag**

- **Use ONLY** for critical cases requiring immediate intervention.
- Examples of **urgent**:
    - Entire system down.
    - Critical integration processes stopped.
    - Data loss in production.
- Everyday cases, improvements, or fixes that do not immediately and severely affect the business **should NOT** be marked as urgent.
- If everything is urgent, **nothing** is urgent.

---

## **4. Use of Files and Images**

- Whenever possible, attach **screenshots, videos, log files, or exports**.
- This speeds up understanding and reduces doubts.
- If it is a procedure or SQL error, also attach:
    - Query used for validation.
    - Query result.
    - Error messages.

---

## **5. Demand Registration**

- **Every single demand** must be registered as a task in ClickUp.
- Informal requests like *"do it quickly for me"* or *"it's just a little thing"* **will not be executed** without an opened task.
- This ensures traceability and organization.

---

## **6. Tasks for Adding Procedures to Jobs**

When requesting the inclusion of a procedure in a job, **mandatory to inform**:

1. **What the procedure does** (functional description).
2. **After which procedure** it should run in the job.
3. **Average execution time** of the procedure.
4. Whether the procedure is from **Onebeat integration** or **Analytics**.

**Example:**

> Request: Add SP_UpdatePrices to Job_DailySync.
> 
> - Function: updates promotional prices in sales tables.
> - Must run after: `SP_UpdateInventory`.
> - Average execution time: 2 minutes.
> - Origin: Onebeat Integration.

**⚠️ Important:** Without this information, the addition will be **ignored**.

---

## **Summary – Checklist Before Opening the Task**

✅ Clear and objective title.

✅ Technical and detailed description.

✅ Information about views, tables, and procedures.

✅ Attached screenshots, files, or logs.

✅ Correct use of the **URGENT** tag.

✅ Mandatory registration in ClickUp (no informal requests).

✅ Complete specifications for job/procedure changes.

---

If we follow this standard, we will be able to **reduce resolution time by up to 10x** and avoid communication bottlenecks between CS and Tech.