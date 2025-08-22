# Integrar Shared Project

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 6 de agosto de 2025 11:26
Categoria: Integração
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 18 de agosto de 2025 13:39
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: DEV
Lingua: Português
Status: Concluído
Texto: 6 de agosto de 2025 11:26
Última edição por 1: Lucca Lacerda de Souza Lommez

## **Índice**

1. Introdução
2. Pré-requisitos
3. Visão Geral da Estrutura Antiga
4. Objetivo da Migração
5. Passo a Passo da Migração
    - 5.1 Clonar o Shared_Project
    - 5.2 Criar/ajustar estrutura de pastas
    - 5.3 Atualizar cabeçalho do notebook
    - 5.4 Importar e configurar o `Shared_Project`
    - 5.5 Converter células: Interfaces, Autoloader, SPs, Dash, Analytics, etc
6. Validações e Testes
7. Boas Práticas e Checklist Final

---

## 1. Introdução

Este tutorial tem como objetivo guiar a migração de notebooks antigos de integração para o novo modelo baseado no projeto `Shared_Project`, promovendo padronização, reuso de código e redução de erros operacionais.

---

## 2. Pré-requisitos

- Python 3.12 (recomendado)
- Git instalado e configurado
- Acesso ao repositório `Shared_Project` no GitHub
- Estrutura existente no caminho: `C:/OnebeatFiles/Integrations_Git/CLIENTE/`
- `.env` atualizado com credenciais do cliente (PBI, banco local e central)
- Biblioteca `decouple` instalada
- Pasta `/Logs/` criada no projeto

---

## 3. Visão Geral da Estrutura Antiga

O notebook antigo fazia:

- Execução de `.cmd`
- Validação manual de arquivos
- Logs manuais no SQL
- Chamadas diretas de procedures
- Requisições PowerBI manuais
- Sem modularização nem tratamento padrão de erros

---

## 4. Objetivo da Migração

- Reduzir duplicidade de código
- Centralizar lógica de SPs, logs, chamadas PowerBI, etc
- Usar funções reutilizáveis do `Shared_Project`
- Melhorar logging e rastreabilidade
- Melhorar organização e manutenção dos notebooks

---

## 5.  Passo a Passo da Migração

---

### 5.1. Clonar o `Shared_Project`

Abra o terminal (VSCode ou CMD):

```bash
cd C:/OnebeatFiles/Integrations_Git/CLIENTE/
git clone git@github.com:onebeatBrazil/Shared_Project.git
```

---

### 5.2. Atualizar cabeçalho do notebook

```python
import pandas as pd
import numpy as np
import datetime as dt
import threading
import requests
import sys
import os
import gc
import time
import sqlalchemy
import urllib
import pyodbc
import io
import subprocess
import zipfile
import re
import decouple 
import importlib
#====================##====================##====================#
pd.set_option('display.max_columns', 200)
pd.set_option('display.max_colwidth', 200)
DECOUPLE = decouple.Config(decouple.RepositoryEnv('./.env'))
#====================##====================##====================#
PROCESS_DATE = dt.datetime.strftime(dt.datetime.today() - dt.timedelta(days=1),'20%y-%m-%d')
CURRENT_DATE = dt.datetime.strftime(dt.datetime.today() - dt.timedelta(days=0),'20%y-%m-%d')
#====================##====================##====================#
PATH_ONEBEAT = 'C:/OnebeatFiles/'
PATH_INPUT = f'{PATH_ONEBEAT}/InputFolder/' if os.path.isdir(f'{PATH_ONEBEAT}/InputFolder/') else './'
PATH_HISTORY = f'{PATH_ONEBEAT}/HistoryFolder/' if os.path.isdir(f'{PATH_ONEBEAT}/HistoryFolder/') else './'
#====================##====================##====================#
CONNECTION_STRING = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={DECOUPLE('SERVER')};DATABASE={DECOUPLE('DATABASE')};UID={DECOUPLE('USER')};PWD={DECOUPLE('PASSWORD')}"
ENGINE_ONEBEAT = sqlalchemy.create_engine("mssql+pyodbc:///?odbc_connect=%s" % urllib.parse.quote_plus(CONNECTION_STRING))
#====================##====================##====================#
DEBUG = False # DB Insert - File Generation - API Post
CONTINUE = True
#====================##====================##====================#
from Shared_Project import sharedFunctions
sharedFunctions.GitPull(); importlib.reload(sharedFunctions)
sharedFunctions.ImportLocalVars(CONNECTION_STRING,ENGINE_ONEBEAT,CURRENT_DATE,PATH_ONEBEAT,PATH_INPUT,DECOUPLE,DEBUG)
sharedFunctions.ServerValidation()
```

Abaixo do bloco padrão devem ser adicionadas as personalizações e, obrigatoriamente, a variável OBRIGATORY_FILES (com suas devidas personalizações). Veja alguns exemplos de personalizações:

```python
OBRIGATORY_FILES = {f'MTSSKUS_{PROCESS_DATE}', f'STATUS_{PROCESS_DATE}', f'TRANSACTIONS_{PROCESS_DATE}', f'STOCKLOCATIONS_{PROCESS_DATE}'}
#====================##====================##====================# 
PATH_LOGS = f'{PATH_ONEBEAT}Integrations_Git/CLIENTE/Logs'
##====================##====================##====================# 
#PATH_SEASONALITY = os.path.join(PATH_INPUT, f"SEASONALITY{f"_{CURRENT_DATE}_{dt.datetime.now().strftime('%H-%M')}"}.csv")
#FTP_DATE = dt.datetime.strftime(dt.datetime.today() - dt.timedelta(days=1),'20%y%m%d')
#FTP_OUTPUT = f'C:/OnebeatFiles/ftp-totto-guatemala/OutputFiles'
#FTP_LIDOS = f'C:/OnebeatFiles/ftp-totto-guatemala/OutputFiles/Lidos'
#FTP_INPUT = f'C:/OnebeatFiles/ftp-totto-guatemala/InputFiles/'
#FTP_HISTORY = f'C:/OnebeatFiles/ftp-totto-guatemala/HistoryFiles' if os.path.isdir('C:/OnebeatFiles/inputFolder/') else f'./{FTP_DATE}'
##====================##====================##====================#
#sharedFunctions.resetWindowsServices(['PBIDesktop.exe','OnebeatServer','SQLSERVERAGENT','MSSQLSERVER']) # Restarting sql server services in hetzner servers
```

---

### 5.3. ✅ Importar e configurar o Shared_Project

- O notebook deve **importar `sharedFunctions`** e **chamar o `GitPull()` + `ImportLocalVars()`** antes de qualquer coisa.
- Todas as variáveis globais usadas no projeto devem ser definidas no notebook principal.

---

### 5.4. 🔄 Converter células passo a passo

---

### 🧩 **Interfaces**

**Antes:**

```python
# try:
#     print('Running Interfaces')
#     Interfaces = subprocess.Popen(
#         PATH_EXEC + 'Exec_Interfaces.cmd',
#         cwd = PATH_EXEC,
#         text = True,stdin = subprocess.PIPE,stdout = subprocess.PIPE,stderr = subprocess.PIPE).communicate()
#     print(Interfaces)

#     #---------------Validation------------
#     InputFolderFiles = [file for file in os.listdir(PATH_INPUT) if file.endswith('.csv')]
#     HistoryFolderFiles = [file for file in os.listdir(PATH_HISTORY) if file.endswith('.csv')]

#     if len(InputFolderFiles) == 0: sql_log('Interfaces','No interface generated'); CONTINUE = False
#     elif len(InputFolderFiles) % NUM_INTERFACE_FILES != 0: sql_log('Interfaces','InputFolder incorrect number of files'); CONTINUE = False #If there's X Files in inputFolder
#     elif any(x in InputFolderFiles for x in HistoryFolderFiles): sql_log('Interfaces','Input and History same file name'); CONTINUE = False #If no filename is in HistoryFolder
#     if CONTINUE: sql_log('Interfaces','Sucess')
# except Exception as e: sql_log('Interfaces',str(e)); CONTINUE = False
```

**Depois:**

```python
try:
    if CONTINUE:
        sharedFunctions.clear_inputFolder()
        sharedFunctions.run_executable('cliente_Interfaces.ipynb')

    #====================##====================# VALIDATION
        CONTINUE = False
        InputFolderFiles = [file for file in os.listdir(PATH_INPUT) if file.endswith('.csv')]
        HistoryFolderFiles = [file for file in os.listdir(PATH_HISTORY) if file.endswith('.csv')]

        if OBRIGATORY_FILES - {f.split('.')[0] for f in os.listdir(PATH_INPUT)}: raise Exception('Missing Obrigatory Files')
        elif any(x in InputFolderFiles for x in HistoryFolderFiles): raise Exception('Input and History same file name')
        else: sharedFunctions.sql_log('Interfaces','Success'); CONTINUE = True
    #====================#
except Exception as e:sharedFunctions.sql_log('Interfaces',str(e)); CONTINUE = False
```

Nota: Substitua "cliente" pelo nome do cliente específico

---

### 🧩 **Autoloader**

**Antes:**

```python
# try:
#     if CONTINUE:
#         print('Importing Files to Onebeat')
#         autoloader_process = subprocess.Popen(
#             PATH_AUTOLOADER + 'AutoLoader.cmd',
#             cwd = PATH_AUTOLOADER,
#             text = True,stdin = subprocess.PIPE,stdout = subprocess.PIPE,stderr = subprocess.PIPE).communicate()
#         print(autoloader_process)

#         #---------------Validation------------
#         time.sleep(60)
#         df = pd.read_sql_query(f"""select top 1 isLoadSuccessful from Symphony_LoadRecalculateLog where startDate >= '{CURRENT_DATE}' order by startDate desc""",ENGINE_ONEBEAT)
#         if df.shape[0] <= 0: sql_log('Autoloader','Missing Load & Recalculate'); CONTINUE = False
#         elif df.isLoadSuccessful[0] == False: sql_log('Autoloader','Error in Load & Recalculate'); CONTINUE = False
#         if CONTINUE: sql_log('Autoloader','Sucess')
# except Exception as e: sql_log('Autoloader',str(e)); CONTINUE = False
```

**Depois:**

```python
try:
    if CONTINUE:
        sharedFunctions.run_executable('AutoLoader.cmd',PATH_ONEBEAT)

    #====================##====================# VALIDATION
        CONTINUE = False
        time.sleep(60) #Error in read DB right after L&R Solution
        
        df = pd.read_sql_query(f"""select top 1 isLoadSuccessful from Symphony_LoadRecalculateLog where startDate >= '{CURRENT_DATE}' order by startDate desc""",ENGINE_ONEBEAT)
        
        if df.empty: raise Exception('Missing Load & Recalculate')
        elif df.isLoadSuccessful[0] == False: raise Exception('Error in Load & Recalculate')
        else: sharedFunctions.sql_log('Autoloader','Success'); CONTINUE = True
    #====================#
except Exception as e:sharedFunctions.sql_log('Autoloader',str(e)); CONTINUE = False
```

---

### 🧩 **Execução de Procedures**

**Antes:**

```python
# if CONTINUE:
#     print('Start DBRoutines: '+ dt.datetime.strftime(dt.datetime.today(),'20%y-%m-%d %H:%M:%S'))
#     dailyJobs = [
#         'sp_BISS',
#     ]
#     for job in dailyJobs:
#         try:
#             print(f'Executing {job} {pd.Timestamp.today().time()}')
#             sql_connection = pyodbc.connect(CONNECTION_STRING,autocommit=True).cursor()
#             sql_connection.execute(job)
#         except Exception as e:
#             if (job == 'sp_biss') and ('Duplicate key was ignored' in str(e)): continue #Ignore sp_biss duplicate key return
#             if (job == 'sp_AtualizaVendas') and ('Null value is eliminated by an aggregate or other SET operation' in str(e)): continue
#             sql_log(f'DB_Routines.{job}',str(e))
#         finally: sql_connection.close()
    
#     sql_log('DB_Routines','Sucess')
```

**Depois:**

```python
try:
    if CONTINUE:
        
        dailyJobs = [
        'sp_biss',
        ]

        sharedFunctions.exec_dbJobs(dailyJobs)
        sharedFunctions.sql_log('Jobs DB','Success')
except Exception as e:sharedFunctions.sql_log('Jobs DB',str(e)); CONTINUE = False
```

Nota: adicione as procedures específicas do cliente, o exemplo acima é apenas ilustrativo

---

### 🧩 Repositions

```python
if CONTINUE:
    try:
        sharedFunctions.run_executable('CLIENTE_Repositions.ipynb')
    except Exception as e:sharedFunctions.sql_log('Repositions',str(e))
```

### 🧩 **PowerBI Dashboards**

**Antes:**

```python
# from msal import ConfidentialClientApplication
# if CONTINUE:
#     try:
#         dash_workspace = 'XXXXXXXXXX'
#         dash_dataset = 'XXXXXXXXXX'
    
#         SECRET = {
#             'client_id' : "XXXXXXXXXX",
#             'client_secret' : "XXXXXXXXXX",
#             'tenant_name' : "XXXXXXXXXX",
#             'authority_url' : "XXXXXXXXXX",
#             'scope' : ["XXXXXXXXXX"],
#             'workspace_id' : dash_workspace,
#             'dataset_id' : dash_dataset,
#             'url' : f"XXXXXXXXXX"
#         }
    
#         app = ConfidentialClientApplication(SECRET['client_id'], authority=SECRET['authority_url'], client_credential=SECRET['client_secret'])
#         token = app.acquire_token_for_client(scopes=SECRET['scope'])
#         HEADER = {'Content-Type':'application/json', 'Authorization':f'Bearer {token["access_token"]}'}
#         api_call = requests.post(url=SECRET['url'], headers=HEADER) #Request PBI Refresh
        
#         #---------------Validation------------
#         if pd.read_sql_query(f"""if (select max(data) as data from biss) = '{PROCESS_DATE}' select 1 else select 0""",ENGINE_ONEBEAT).iloc[0,0] == 0: sql_log('PBI_Dash','Biss table not updated!'); raise
#         if 'access_token' not in token: sql_log('PBI_Dash','Could not generate TokenAcess'); raise 
#         if api_call.status_code != 202: sql_log('PBI_Dash',f'Couldnt refresh .post dash: {api_call.status_code,api_call.reason,api_call.content}'); raise 
#         #---------------
        
#         try:
#             while True:
#                 request = requests.get(url=SECRET['url'], headers=HEADER)
                
#                 #---------------Validation------------
#                 if request.status_code != 200: 
#                     if request.status_code == 403: 
#                         app = ConfidentialClientApplication(SECRET['client_id'], authority=SECRET['authority_url'],client_credential=SECRET['client_secret'])
#                         token = app.acquire_token_for_client(scopes=SECRET['scope'])
#                         HEADER = {'Content-Type':'application/json', 'Authorization':f'Bearer {token["access_token"]}'}
#                         continue
#                     else:
#                         sql_log('PBI_Dash',f'Error: {request.status_code,request.reason,request.content}'); raise Exception (f'{request.status_code,request.reason,request.content}')
#                 #---------------
    
#                 dashLog = pd.DataFrame(request.json()['value'], columns=['requestId', 'id', 'refreshType', 'startTime', 'endTime', 'status']).sort_values('startTime',ascending=False)
                
#                 if pd.isnull(dashLog.endTime[0]) == False:
#                         if dashLog.status[0] == "Completed": sql_log('PBI_Dash','Sucess'); raise Exception('Sucess')
#                         elif dashLog.status[0] == "Failed": sql_log('PBI_Dash','Failed'); raise
#                         elif dashLog.status[0] == "Disabled": sql_log('PBI_Dash','Dataset refresh is disabled'); raise
#                         elif dashLog.status[0] == "Unknown": sql_log('PBI_Dash','Dataset is already refreshing'); raise
#                         else: sql_log('PBI_Dash',f'Unfamiliar dashLog status {dashLog.status[0]}'); raise
#                 else:
#                     print('Waiting 2 minutes to check again')
#                     time.sleep(120) #Sleep for 1minute and check again
#         except Exception as e: raise(e)
#     except Exception as ee: print(ee)
```

**Depois:**

```python
if CONTINUE:
    try:  
        t1 = threading.Thread(target=sharedFunctions.pbi_refresh,args=('PBI_Dash','XXXXXXXXXX','XXXXXXXXXX'))
        t1.start()
    except Exception as e: sharedFunctions.sql_log('PBI_Dash',str(e))
```

Nota: substitua os valores XXXXXXXXXX pelos identificadores específicos do dash_workspace e dash_dataset. Também substitua "PBI_Dash" pelo nome que deseja exibir no registro de log.

---

### 🧩 **Analytics**

```python
try:
    if CONTINUE:
        t2 = threading.Thread(target=sharedFunctions.run_executable,args=('Analytics_Upload_data.ipynb','./Shared_Project/',))
        t2.start()
except Exception as e: sharedFunctions.sql_log('Analytics',str(e))
```

Nota: Os exemplos estão usando t1 e t2, mas se o cliente tiver apenas o analytics, use somente t1. Se o cliente tiver mais de um dashboard, use t3, t4 ou quantos forem necessários. Sempre inclua o **Wait threads para cada thread** após todos os dashboards. Código exemplo abaixo:

### 🧩 **Wait threads**

```python
if CONTINUE:
    t1.join()
    t2.join()
```

---

### 🧩 **Zip & Backup**

```python
try:
    if CONTINUE:
        sharedFunctions.zipDeleteFiles(PATH_HISTORY, daysAgo=60, fileExtension='.csv', mode='zip')
        sharedFunctions.zipDeleteFiles(PATH_LOGS, daysAgo=60, fileExtension='.txt', mode='zip')
        sharedFunctions.zipDeleteFiles(PATH_LOGS, daysAgo=60, fileExtension='.html', mode='zip')

        if any(f.endswith('.zip') for path in [PATH_HISTORY,PATH_LOGS] for f in os.listdir(path)):
            sharedFunctions.moveToDrive([PATH_HISTORY,PATH_LOGS], extension=".zip", mode="BR", nomeDoCliente="XXXXXX")
            sharedFunctions.zipDeleteFiles(PATH_HISTORY, daysAgo=0, fileExtension='.zip', mode='delete')
            sharedFunctions.zipDeleteFiles(PATH_LOGS, daysAgo=0, fileExtension='.zip', mode='delete')
except Exception as e:sharedFunctions.sql_log('Zip',str(e))
```

Nota: Adicione a FTP apenas se utilizado pelo cliente, sempre ajustando a extensão do arquivo. Backup ainda em testes.

---

### 🧩 **Shutdown**

```python
if CONTINUE:
    try:
        sharedFunctions.shutDownServer(lastProccess='ANALYTICS.INTEGRATION')
    except Exception as e: sharedFunctions.sql_log('Shutdown',str(e))
```

---

## 6. ✅ Validações e Testes

1. ⚙️ Rode a célula de cabeçalho
2. 🧪 Rode `Interfaces` e **delete a transactions**
3. 🧪 Rode `Autoloader`, verifique `Symphony_LoadRecalculateLog`
4. 🔁 Rode SPs e veja se `sql_log` grava corretamente
5. 📊 Teste dashboards PowerBI com `thread.join()`
6. 📂 Verifique se logs `.html` estão na pasta `/Logs/`
7. 📤 Verifique envio automático ao Drive, se configurado

---

## 7. 📌 Boas Práticas e Checklist Final

✅ Variáveis `CURRENT_DATE`, `PATH_INPUT`, `ENGINE_ONEBEAT` definidas

✅ `GitPull()` antes de importar `sharedFunctions`

✅ `.env` com variáveis do cliente

✅ Scripts separados como `.ipynb`, sem necessidade de `.cmd`

✅ SPs padronizadas no `exec_dbJobs()`

✅ `sql_log()` substituído por `sharedFunctions.sql_log()`

✅ `Sucess` substituído por `Success`

✅ Manter apenas o arquivo de execução main.cmd na pasta Exec

---