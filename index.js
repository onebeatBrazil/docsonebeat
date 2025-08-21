/* ==========================
   CONFIGURAÇÃO
   ========================== */
   const FILES = [
    "docs/2 Abertura de tasks.md",
    "docs/1 Overview Onebeat.md",
    "docs/Verificar os erros no email.md",
  ];
  
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
  function renderList(files) {
    fileListEl.innerHTML = "";
    for (const path of files) {
      const a = document.createElement("a");
      a.href = `#/${encodeURIComponent(path)}`;
      a.textContent = path.replace("docs/", "");
      fileListEl.appendChild(a);
    }
  }
  
  /* ==========================
     Renderiza conteúdo Markdown
     ========================== */
  async function renderFile(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Falha ao carregar ${path}: ${res.status}`);
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
  