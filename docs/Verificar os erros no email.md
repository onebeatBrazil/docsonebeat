# Verificar os erros no email

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 14 de julho de 2025 20:33
Categoria: 1. Informativo
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 8 de agosto de 2025 10:20
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: CS, DEV
Lingua: Português
Status: Concluído
Texto: 14 de julho de 2025 20:33
Última edição por 1: Lucca Lacerda de Souza Lommez

# Guia para Interpretação do Email de Erros Diário

## Horários de Envio

O email de erros é enviado diariamente nos seguintes horários:

- 7:00
- 9:00
- 11:00
- 13:00
- 15:00
- 17:00

## Estrutura do Cabeçalho

O cabeçalho do email informa quantos erros e quantos warnings foram encontrados. **Erros são considerados graves e devem ser resolvidos imediatamente**, enquanto warnings indicam problemas menos críticos, mas que também precisam de atenção.

![image](/docs/img/verificaroserrosnoemail_image.png)

## Sistema de Cores dos Clientes

Os clientes são apresentados com as seguintes cores:

- Verde: Indica que tudo rodou corretamente, incluindo o Autoloader e o Dashboard. Porém, isso não isenta a necessidade de verificar o status das stored procedures, métricas e quarentenas.

![image](/docs/img/verificaroserrosnoemail_image1.png)

- Amarelo: Indica que o Autoloader carregou, mas o Dashboard não foi atualizado. Requer atenção para resolver os problemas. (Um exemplo: se a sp_biss não roda, o dash não atualiza.)

![image](/docs/img/verificaroserrosnoemail_image2.png)

- Vermelho: Indica que nem o Autoloader conseguiu rodar, impedindo completamente a carga de dados. Deve ser resolvido imediatamente.

![image](/docs/img/verificaroserrosnoemail_image3.png)

## Componentes Principais

Para cada cliente, o email apresenta os seguintes componentes iniciais:

### 1. Interfaces

Responsáveis pela geração de arquivos.

### 2. Autoloader

Responsável pelo carregamento dos arquivos no banco de dados.

### 3. Jobs DB

Responsáveis pela execução das procedures.

## Classificação de Erros

A gravidade do erro depende de onde ele ocorreu:

- Erro (Vermelho): Se ocorreu antes ou durante o Autoloader. Deve ser resolvido imediatamente, pois a carga não foi completada.
- Warning (Amarelo): Se ocorreu do Jobs DB em diante. A carga foi feita, mas algo deu errado e deve ser corrigido.

Para saber como corrigir todos esses erros:

[Corrigir erro na carga diaria](https://www.notion.so/Corrigir-erro-na-carga-diaria-2336f59d84188022a7c4ecc7816d4b1a?pvs=21)

## Personalizações

Após os componentes principais, podem existir personalizações que variam de cliente para cliente:

- Reposições
- Outros Autoloaders
- Outros Jobs DB

É importante notar que apenas o primeiro Autoloader configura erro se falhar. Os demais são considerados recalculações e geram apenas warnings.

## Dashboards

Após as personalizações, o email apresenta informações sobre os dashboards:

- Clientes antigos: Utilizam PBI e Analytics
- Clientes novos: Utilizam apenas Analytics

Os dashboards são executados por último. Caso ocorra algum erro, é necessário analisar e resolver para garantir que as visualizações estejam atualizadas com os dados mais recentes.

Links uteis:

- [Corrigir erro no PBI](https://www.notion.so/Corrigir-erro-no-PBI-2326f59d8418801ca7a8d5e7dd883538?pvs=21)
- [Corrigir erro no Analytics](https://www.notion.so/Corrigir-erro-no-Analytics-2336f59d841880d4946ffe75fa70e319?pvs=21)

## Procedimento para Resolução

1. Priorize a resolução dos erros (vermelho) antes dos warnings (amarelo)
2. Concentre-se primeiro nos problemas de Autoloader, pois estes impedem a carga dos dados
3. Em seguida, resolva os problemas de Jobs DB
4. Por último, verifique os dashboards para garantir que estejam atualizados

## Informações Detalhadas do Email

Além das informações básicas sobre erros e warnings, o email também apresenta estatísticas detalhadas sobre o processamento dos dados:

### 1. Métricas de Carregamento

- SucessLoads: Número de carregamentos bem-sucedidos
- FailLoads: Número de carregamentos que falharam
- Rows: Total de linhas carregadas no banco de dados

### 2. Informações de Quarentena

O email exibe o número de registros em quarentena e os motivos. Registros em quarentena são aqueles que não puderam ser processados devido a problemas específicos, como:

- Registros com SKUs inexistentes em locais de estoque
- Linhas duplicadas em arquivos
- Outros erros de validação

### 3. Arquivos Importados

Uma lista de todos os arquivos processados é apresentada, incluindo:

- Nome do arquivo
- Data da importação
- Número de registros por arquivo

### 4. Tempo de Processamento

Para cada componente do sistema, o email mostra o horário de conclusão, permitindo identificar:

- Duração total do processamento
- Componentes que estão levando mais tempo para executar

### 5. Como Interpretar as Métricas

Ao analisar o email, preste atenção especial para:

- Alto número de quarentenas
- Discrepâncias significativas no número de linhas: Comparado com dias anteriores
- Tempo de processamento anormal: Componentes demorando mais que o habitual

Essas informações são fundamentais para diagnosticar problemas antes que afetem os dashboards e relatórios finais.

## Verificação de Erros no Log de Integração

Para uma análise mais profunda e precisa dos erros relatados nos emails, é fundamental consultar a tabela Log_Integration mencionada na [1. Overview Onebeat](https://www.notion.so/1-Overview-Onebeat-2316f59d8418807a915df3a73a8f3371?pvs=21). Esta tabela contém registros detalhados de todas as integrações e pode fornecer informações valiosas que não estão disponíveis no email.

Consultar esta tabela permite:

- Verificar se o erro ainda existe ou se já foi resolvido por outro membro da equipe
- Identificar se o cliente está gerando um "falso positivo" - situações onde o sistema reporta um erro, mas na realidade o processo foi concluído com sucesso
- Obter detalhes técnicos mais específicos sobre a natureza do erro
- Visualizar o histórico de ocorrências semelhantes para identificar padrões

```sql
-- Consulta básica para verificar os registros de integração recentes
SELECT 
   *
FROM 
    Log_Integration
ORDER BY 
    date DESC
```

Ao analisar os resultados desta consulta, preste atenção especial aos campos Status e ErrorMessage, que fornecem informações diretas sobre a natureza do problema e podem ajudar a determinar a abordagem correta para resolução.

![image](/docs/img/verificaroserrosnoemail_image4.png)

Exemplo de erro de procedure.