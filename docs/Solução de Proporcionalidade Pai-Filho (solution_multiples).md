# Solução de Proporcionalidade Pai-Filho (solution_multiples)

Criado por: Pedro Basilio
Criado em: 29 de julho de 2025 04:57
Categoria: Tutorial de Procedimento
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 8 de agosto de 2025 10:19
Autor: Pedro Basilio
Direcionado ao: CS
Lingua: Português
Status: Concluído
Texto: 29 de julho de 2025 04:57
Última edição por 1: Lucca Lacerda de Souza Lommez

## 🎯 Objetivo Geral

Calcular o buffer ideal (estoque ideal) para SKUs filhos com base na proporção relativa a um SKU pai (ou grupo pai), usando diferentes estratégias de cálculo. A solução considera múltiplos clientes e todas as lojas do tipo "POS".

---

## 📂 Estrutura de Tabelas

### `solution_multiples_input`

Tabela de entrada manual/configurável pelo usuário.

| Coluna | Tipo | Descrição |
| --- | --- | --- |
| id | SERIAL | PK |
| clientid | INTEGER | ID do cliente |
| modelcolor | VARCHAR | Chave do SKU (modelo/cor) |
| father_code | VARCHAR | Código pai do SKU |
| proportion_father_son_given | NUMERIC | Proporção manualmente atribuída |
| proportion_logic | INTEGER | Estratégia de cálculo:1: Margem2: Dado manual (Given)3: Buffer atual4: Rolling Sales 30d5: Rolling Sales 60d6: Histórico de Vendas7: Velocidade de Vendas |
| min_dc_inv | INTEGER | Estoque mínimo no CD para considerar |

**Chave única**: `(clientid, modelcolor)`

---

### `solution_multiples_output`

Tabela com os resultados finais do cálculo do buffer.

| Coluna | Tipo | Descrição |
| --- | --- | --- |
| id | SERIAL | PK |
| clientid | INTEGER | Cliente |
| locationid | INTEGER | Loja |
| skuid | INTEGER | SKU |
| modelcolor | VARCHAR | SKU (modelo/cor) |
| father_code | VARCHAR | Código pai |
| method_of_proportion_calc | VARCHAR | Nome da estratégia usada |
| base_of_proportion_calc | NUMERIC | Valor base para a proporção |
| proportion_father_son_calc | NUMERIC | Proporção filho/pai calculada |
| buffer_son_calc | INTEGER | Buffer calculado para o filho |
| buffer_father_calc | INTEGER | Buffer calculado para o pai |

---

### `solution_multiples_input_view` e `solution_multiples_output_view`

Views para facilitar a leitura cruzada com as tabelas `vmc`, `sku`, `location` e `last_date_cleaned`.

---

## ⚙️ Procedure `sp_solution_multiples(id_clientid[], sos_coverage integer)`

### Função

Calcula buffers proporcionais por SKU filho, para todos os clientes da lista `id_clientid`, utilizando lógica parametrizada e cobertura `sos_coverage`.

---

### Etapas da Procedure

### 1. Limpeza Inicial

```sql
sql
CopiarEditar
DELETE FROM solution_multiples_output WHERE clientid = ANY(id_clientid);

```

### 2. Preparação das bases intermediárias (base1 a base6)

- `base1` → Filtra os SKUs com `father_code`
- `base2` → Mapeia os SKUs válidos por `clientid`
- `base3` → Une base1 com skuid correspondente
- `base4` → Faz produto cartesiano com todas as lojas "POS"
- `base5` → Puxa dados de vendas e estoque da `last_date_cleaned`
- `base6` → Junta os dados, aplicando filtro por `stockatorigin > min_dc_inv` (multiplicador = 1 ou 0)

### 3. Cálculo do Total do Pai (base7)

Agrupa por `father_code` e `size_desc`, somando métricas ponderadas apenas para filhos válidos (`multiplier = 1`).

### 4. Prepara Entrada para `sp_sos` (base8)

Alimenta a procedure `sp_sos()` com dados de cobertura e estoque pai.

### 5. Chamada da Procedure `sp_sos(...)`

Chama o método responsável por distribuir o buffer ideal do pai entre os filhos (novo `optimalstock` por item pai).

### 6. Une Resultado com Novos Buffers (base9 a base10)

Enriquece com valores recalculados de estoque e velocidade de vendas.

### 7. Cálculo da Proporção Filho/Pai (base11)

Aplica a regra definida em `proportion_logic`:

```sql
sql
CopiarEditar
CASE
  WHEN proportion_logic = 1 THEN margem / total_pai_margem
  ...

```

### 8. Cálculo Final do Buffer Filho (base12)

```sql
sql
CopiarEditar
buffer_son_calc = GREATEST(FLOOR(new_optimalstock * son_proportion), 1)

```

### 9. Inserção na Tabela de Saída

Insere todos os dados na `solution_multiples_output`.

---

## 📌 Exemplo de Uso

```sql
sql
CopiarEditar
-- Inserir registros iniciais:
INSERT INTO solution_multiples_input (...)
SELECT ... FROM sku WHERE clientid = 17;

-- Executar cálculo para cliente 17 com cobertura de 30 dias:
CALL sp_solution_multiples(array[17], 30);

```

---

## 🧠 Observações Técnicas

- **Garantia de 100%**: O `multiplier` é usado para excluir SKUs que não devem participar da proporção, garantindo que a soma das proporções seja 100%.
- **Flexibilidade**: Suporte a 7 métodos diferentes de cálculo de proporção.
- **Modularidade**: Estrutura baseada em tabelas temporárias e views que favorecem legibilidade e manutenção.
- **Extensibilidade**: Pode ser facilmente adaptado para novos métodos de proporção ou filtros adicionais.