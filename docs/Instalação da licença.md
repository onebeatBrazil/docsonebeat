# Instalação da licença

Criado por: Lucca Lacerda de Souza Lommez
Criado em: 23 de abril de 2025 11:58
Categoria: Instalação
Última edição por: Lucca Lacerda de Souza Lommez
Última atualização em: 8 de agosto de 2025 10:20
Autor: Lucca Lacerda de Souza Lommez
Direcionado ao: CS, DEV
Lingua: Português
Status: Concluído
Texto: 23 de abril de 2025 11:58
Última edição por 1: Lucca Lacerda de Souza Lommez

Antes de qualquer coisa olhe a versão que se encontra o onebeat no Abra o Onebeat administrator:

Se estiver na 1.7:

![image.png](/Docs/img/Instalacaodalicenca_image.png)

Faça o processo de Renovar

Se estiver em versões anteriores:

![image.png](/docs/img/Instalacaodalicenca_image_1.png)

Faça o processo de Instalação da nova licença.

# Renovar licença do Onebeat

- Passo 1 - Pedir a nova licença

Peça a licença nos seguintes termos para [support@1beat.zendesk.com](mailto:support@1beat.zendesk.com):

**Segue texto padrão:**

Renew License -

Hi Guys,

We will need to renew the XXXXX license.

Onebeat Server ID: XXXXX

Onebeat Server Activation ID: XXXXX

Obs: Esses dois dados se encontram no Onebeat Server Administration, na aba server ID:

![image.png](/docs/img/Instalacaodalicenca_image_2.png)

Obs: Não se esqueça de anexar a licença antiga no email:

![image.png](/docs/img/Instalacaodalicenca_image_3.png)

- Passo 2 - Desligue o serviço do Onebeat

Vá em services e desligue o Onebeat server, também dê Quit no atalho (canto inferior direito)

![image.png](/docs/img/Instalacaodalicenca_image_4.png)

![image.png](/docs/img/Instalacaodalicenca_image_5.png)

- Passo 3 - Substituir a licença

Pegue a nova licença do email e adicione na pasta:

\Program Files\Onebeat\Onebeat Server

Obs: Depois de apagar a antiga

- Passo 4 - Reiniciar o serviço

Reinicie o serviço do onebeat server ligando e desligando por 10 segundos

- Passo 5 - Verificação

Abra o onebeat server manager para ver se está running

Abra o Onebeat administrator e verifique se a licença foi aplicada corretamente

# Instalação da nova licença

- Passo 1 - Pedir a licença

Peça a licença nos seguintes termos:

![image.png](/docs/img/Instalacaodalicenca_image_6.png)

Segue texto padrão:

New License - 

Hi Guys,

We gonna need a new license for XXXXX. We'll running in one server from our side.

We need to add:

Unlimited databases, Unlimited Users, Also the new feature Open Server ID

Onebeat Server ID: XXXXX

Onebeat Server Activation ID: XXXXX

Obs: Não se esqueca de anexar a licenca antiga no email.

- Passo 2 - Baixe o Onebeat novo

Segue link do drive: 

[https://drive.google.com/file/d/1wc6SHkyJ7LmRCK9Jlq-qjb3YdtIhB4vq/view?usp=sharing](https://drive.google.com/file/d/1wc6SHkyJ7LmRCK9Jlq-qjb3YdtIhB4vq/view?usp=sharing)

Extraia

- Passo 3 - Desligue o servico do Onebeat

Vá em services e desligue o Onebeat server, tambem de Quit nos atalhos (canto inferior direito)

- Passo 4 - Exclua o Onebeat

Digite na barra de pesquisa do windows “Add or remove programs",  segue imagem:

![image.png](/docs/img/Instalacaodalicenca_image_7.png)

pesquise por onebeat na barra e apague os apps de cima para baixo, veja:

![image.png](/docs/img/Instalacaodalicenca_image_8.png)

Confira se tem 7 e apague todos.

Reinicie o servidor.

- Passo 5 - Intalacao do Onebeat

Instale os arquivos de cima para baixo, sempre executando como administrador:

 

![image.png](/docs/img/Instalacaodalicenca_image_9.png)

Obs: Não deixe nenhuma caixinha marcada.

- Passo 6 - Alterando o Onebeat server

Abra o services, clique com o botao direito no Onebeat server e va em properties (ele nao pode estar rodando!!!!)

Va na aba Log On

Selecione This account

Selecione Browse…

![image.png](/docs/img/Instalacaodalicenca_image_10.png)

Vá em advanced…

Clique Find Now

![image.png](/docs/img/Instalacaodalicenca_image_11.png))

Escolha la em baixo o usuario onebeat_dev com dois cliques.

![image.png](/docs/img/Instalacaodalicenca_image_12.png))

Depois OK

Depois apague as duas senhas desta tela:

![image.png](/docs/img/Instalacaodalicenca_image_13.png))

Vá no PassBolt e pegue a senha do usuario dev e cole nos dois campos

Clique em apply e depois em OK

Ligue e desligue o Onebeat server e deixe desligado por no minimo 10 segundos para que as alteracoes sejam aplicadas de fato

Essa etapa é muito importante e deve ser feita com atencao

Após os 10 segundos ligue o Onebeat server

- Passo 7 - Nova licenca

Pegue a nova licenca do email e adicione na pasta:

\Program Files\Onebeat\Onebeat Server

Obs: Depois de apagar a antiga

Reinicie o servico do onebeat server ligando e desligando por 10 segundos

- Passo 8 - Atualizar versao

Abra o onebeat server manager para ver se está running

Abra o onebeat server administrator como administrador e va na aba DB Convert

Selecione o CLIENTE CORRETO e a ultima versão, deixe a caixinha preenchida:

![image.png](/docs/img/Instalacaodalicenca_image_14.png))

Se for selecionado o cliente errado gerará um problema enorme, faca com atencao!!!

Clique em convert

Clique No quando aparecer a proxima janela

Abra o Onebeat adm e confira se está tudo configurado.