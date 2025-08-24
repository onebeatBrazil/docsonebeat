/* ==========================
   CONFIGURAÇÃO
   ========================== */
   const FILES = [
    {
      group: "Informativo",
      files: [
        "docs/Overview Onebeat.md",
        "docs/Abertura de tasks.md",
        "docs/Verificar os erros no email.md",
        "docs/Tortoise Git.md",
        "docs/Como funciona o Click Up.md",
        "docs/Validações – CHECK_FILES.py .md",
        "docs/App Onebeat informações e configurações.md",
      ]
    },
    {
      group: "Configurar",
      files: [
        "docs/App Onebeat informações e configurações.md",
        "docs/Configurar filezila.md",
        "docs/Configurar VS Code.md",
      ]
    },
    {
      group: "Documentacao",
      files: [
        "docs/Shared Project.md",
      ]
    },
    {
      group: "Instalacao",
      files: [
        "docs/Instalação da licença.md",
        "docs/Intalação do Onebeat.md",
        "docs/Instalação do Tortoise Git.md",
        "docs/Instalação Python 3.12.0.md",
      ]
    },
  
    {
      group: "Integracao",
      files: [
        "docs/Integração do Analytics.md",
        "docs/Integração no Onebeat.md",
        "docs/Integrar Reposições.md",
        "docs/Integrar Substitutos.md",
        "docs/Integrar Shared Project.md",
      ]
    },
  
    {
      group: "Tutorial de Procedimento",
      files: [
        "docs/Como Reprocessar uma Carga.md",
        "docs/Criar sp_BissHistory.md",
        "docs/Corrigir erro no PBI.md",
        "docs/Criar banco de dados.md",
        "docs/Automatizar o delete de backup dos bancos.md",
        "docs/Corrigir erro no Analytics.md",
        "docs/Corrigir erro na carga diaria.md",
        "docs/Solução de Proporcionalidade Pai-Filho (solution_multiples).md",
      ]
    },  
  ];
  
  /* ==========================
     SENHA
     ========================== */
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
  }
  


  /* ==========================
     UTILIDADES
     ========================== */
  const byId = (id) => document.getElementById(id);
  const fileListEl = byId("fileList");
  const contentEl = byId("content");
  const searchEl = byId("search");
  
  /* ==========================
     Renderiza lista de arquivos na sidebar
     ========================== */
  
  function renderList(groups) {
    fileListEl.innerHTML = "";
  
    groups.forEach(group => {
      const h4 = document.createElement("h4");
      h4.textContent = group.group;
      h4.classList.add("group-title");
      fileListEl.appendChild(h4);

        // adiciona cor por grupo
      if (group.group === "Informativo") h4.classList.add("Informativo");
      if (group.group === "Configurar") h4.classList.add("Configurar");
      if (group.group === "Documentacao") h4.classList.add("Documentacao");
      if (group.group === "Instalacao") h4.classList.add("Instalacao");
      if (group.group === "Integracao") h4.classList.add("Integracao");
      if (group.group === "Tutorial de Procedimento") h4.classList.add("Tutorial-de-Procedimento");
      const ul = document.createElement("ul");

      ul.classList.add("group-list");
      ul.classList.add("open");
  
      group.files.forEach(path => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#/${encodeURIComponent(path)}`;
        a.textContent = path.replace("docs/", "");
        li.appendChild(a);
        ul.appendChild(li);
      });
  
      fileListEl.appendChild(ul);
  
      h4.addEventListener("click", () => {
        ul.classList.toggle("collapsed");
        h4.classList.toggle("open");
      });
      
    });
  }

  /* ==========================
     Renderiza conteúdo Markdown
     ========================== */
  async function renderFile(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Ducumentação em construção`);
      const md = await res.text();
  
      // usa markdown-it
      const mdParser = window.markdownit();
      const html = mdParser.render(md);
      contentEl.innerHTML = html;
  
      // marca link ativo
      document.querySelectorAll(".file-list a").forEach(a => a.classList.remove("active"));
      const sel = `.file-list a[href="#/${encodeURIComponent(path)}"]`;
      const found = document.querySelector(sel);
      if (found) found.classList.add("active");
    } catch (err) {
      contentEl.innerHTML = `<p style="color:red">Erro: ${err.message}</p>`;
    }
  }
  
  
  
  /* ==========================
     Lê hash da URL (#/docs/arquivo.md)
     ========================== */
  function getCurrentPath() {
    const h = decodeURIComponent(location.hash || "");
    if (h.startsWith("#/")) return h.slice(2);
    return null;
  }
  
  /* ==========================
     Filtra arquivos na sidebar
     ========================== */
  function applyFilter() {
    const q = (searchEl.value || "").toLowerCase();
    document.querySelectorAll(".file-list a").forEach(a => {
      a.style.display = a.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  }
  
  /* ==========================
     Inicialização
     ========================== */
  function boot() {
    renderList(FILES);
  
    const current = getCurrentPath();
    if (current) renderFile(current);
  
    window.addEventListener("hashchange", () => {
      const p = getCurrentPath();
      if (p) renderFile(p);
    });
  
    searchEl.addEventListener("input", applyFilter);
  }
  
  boot();



 
  
  