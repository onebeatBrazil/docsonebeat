# Automatizar o delete de backup dos bancos

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 16 de julho de 2025 17:05
Categoria: Tutorial de Procedimento
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 8 de agosto de 2025 10:19
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: DEV
Lingua: Português
Status: Concluído
Texto: 16 de julho de 2025 17:05
Última edição por 1: Lucca Lacerda de Souza Lommez

# Tutorial: Automatizar o Delete de Backup dos Bancos de Dados

## Problema

Os servidores Hetzner estão apresentando problemas de espaço em disco, o que está afetando as integrações. Esses problemas ocorrem devido ao acúmulo de backups de bancos de dados que não são removidos automaticamente.

## Solução

Implementar uma rotina automatizada para deletar backups antigos dos bancos de dados, liberando espaço em disco e evitando interrupções nas integrações.

## Implementação

### Passo 1: Adicionar código para remoção de backups

Adicione o seguinte bloco de código ao código principal:

```python
if CONTINUE:
    try:
        print('REMOVING OLD BKPS')
        autoloader_process = subprocess.Popen(
            PATH_EXEC + 'Exec_Clean_DB_Backup.cmd',
            cwd = PATH_EXEC,
            text = True,
            stdin = subprocess.PIPE,
            stdout = subprocess.PIPE,
            stderr = subprocess.PIPE
        ).communicate()
        print(autoloader_process)
        sql_log('Removing bkps','Sucess')
    except Exception as e: 
        sql_log('Removing bkps',str(e))
        CONTINUE = True

```

No final do notebook:

![image.png](Docs/Automatizarodeleedebackupdosbancos/image.png)

### Passo 2: Criar o arquivo batch para limpeza

Crie um arquivo chamado **Exec_Clean_DB_Backup.cmd** com o seguinte conteúdo:

```
REM ===================================================================
REM DELETE BACKUPS Older than 5 days from D:\BackupsFolder
FORFILES /S /p "D:\BackupsFolder"  /d -5 /C "CMD /C echo @FILE @FDATE" >> "D:\BackupsFolder\Log\DB_BACKUP_CLEAN.log"
FORFILES /S /p "D:\BackupsFolder"  /d -5 /c "CMD /C DEL @FILE /Q"
REM ===================================================================

```

### Passo 3: Verificar a estrutura de diretórios

Certifique-se de que:

- O diretório `D:\BackupsFolder` existe
- O diretório `D:\BackupsFolder\Log` existe para armazenar os logs
- O script tem permissões para acessar esses diretórios

<aside>
Atenção: Alguns clientes podem utilizar o drive C: em vez do D:. Nestes casos, adapte o script alterando o caminho para `C:\BackupsFolder` conforme necessário.

</aside>

## Como funciona

Este processo:

- Executa automaticamente após a conclusão das rotinas principais
- Chama o arquivo batch `Exec_Clean_DB_Backup.cmd`
- O batch identifica e remove todos os arquivos de backup com mais de 5 dias
- Gera um log das operações em `D:\BackupsFolder\Log\DB_BACKUP_CLEAN.log`
- Registra o sucesso ou falha da operação no log do sistema

## Monitoramento

Após implementar esta solução, monitore:

- Espaço em disco dos servidores Hetzner
- Logs de execução para confirmar que os backups estão sendo removidos
- Funcionamento das integrações

## Observações

O parâmetro `/d -5` define que apenas arquivos com mais de 5 dias serão excluídos. Ajuste este valor conforme a política de retenção de backups da empresa.

<aside>
Certifique-se de que os backups importantes sejam armazenados em outro local antes de implementar esta rotina de limpeza automática.

</aside>