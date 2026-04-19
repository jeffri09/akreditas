/**
 * app.js — Main Application Controller
 * Tab management, sub-tab management, document generation UI
 */

const App = {
  currentTab: 'profil',
  currentSubtab: 'butir1',
  currentPackage: 'A',
  selectedTutors: {},  // per-butir tutor selection { butirId: tutorName }
  generatedDocs: {},  // Track generated docs { docId_paket_mapel: timestamp }

  init() {
    this.generatedDocs = Utils.loadData('generated_docs') || {};
    ProfileManager.init();
    this.setupTabs();
    this.setupPackageSelector();
    this.renderKomponen1();
    this.renderGeneratePanel();
    this.updateStats();

    // Set default package from profile
    const pkgs = ProfileManager.getSelectedPackages();
    if (pkgs.length > 0) {
      this.currentPackage = pkgs[0];
      this.updatePackageUI();
    }

    Utils.showToast('Sistem Akreditasi Doc Generator siap!', 'success');
  },

  // =========================================
  // TAB MANAGEMENT
  // =========================================
  setupTabs() {
    document.querySelectorAll('.tab-btn:not(.locked)').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });
  },

  switchTab(tabId) {
    this.currentTab = tabId;
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabId}`);
    });

    // Re-render if needed
    if (tabId === 'generate') this.renderGeneratePanel();
    if (tabId === 'paket') ProfileManager.renderPackageConfig();
  },

  // =========================================
  // SUB-TAB MANAGEMENT (for Komponen 1)
  // =========================================
  switchSubtab(subtabId) {
    this.currentSubtab = subtabId;
    document.querySelectorAll('.subtab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.subtab === subtabId);
    });
    document.querySelectorAll('.subtab-content').forEach(content => {
      content.classList.toggle('active', content.id === `subtab-${subtabId}`);
    });
  },

  // =========================================
  // PACKAGE SELECTOR (in header)
  // =========================================
  setupPackageSelector() {
    document.querySelectorAll('.pkg-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentPackage = btn.dataset.pkg;
        this.updatePackageUI();
      });
    });
  },

  updatePackageUI() {
    document.querySelectorAll('.pkg-select-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.pkg === this.currentPackage);
    });
    const pkg = CONFIG.packages[this.currentPackage];
    const infoEl = document.getElementById('currentPkgInfo');
    if (infoEl) {
      infoEl.textContent = `${pkg.nama} (${pkg.setara}) | Fase ${pkg.faseAktif} | ${pkg.jpMenit} mnt/JP | ${pkg.levelHOTS}`;
    }
    // Re-render komponen1 to update mapel selector & badges
    this.renderKomponen1();
    this.renderGeneratePanel();
    this.updateStats();
  },

  // =========================================
  // RENDER: Komponen 1 Content
  // =========================================
  renderKomponen1() {
    const pkg = CONFIG.packages[this.currentPackage];
    const mapelWajib = pkg?.mapelWajib || [];
    const totalFiles = CONFIG.getTotalFiles(this.currentPackage);
    const genCount = this._countGeneratedForPackage(this.currentPackage);

    CONFIG.butirs.forEach(butir => {
      const container = document.getElementById(`butir${butir.id}Content`);
      if (!container) return;

      // Calculate files for this butir
      let butirFiles = 0;
      butir.indikators.forEach(ind => {
        ind.dokumen.forEach(d => {
          butirFiles += d.perMapel ? mapelWajib.length : 1;
        });
      });

      let html = `
        <div class="section-header">
          <h2>📌 Butir ${butir.id} — ${butir.judul}</h2>
        </div>
        <p style="color:var(--text-muted);font-size:0.82rem;margin-bottom:12px;">${butir.deskripsi}</p>
        <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;align-items:center;">
          <span class="doc-badge" style="background:var(--accent-primary);color:#fff;padding:4px 10px;border-radius:12px;font-size:0.75rem;">📁 ${butirFiles} file akan di-generate</span>
          <span class="doc-badge" style="background:var(--bg-card);padding:4px 10px;border-radius:12px;font-size:0.75rem;">📚 ${mapelWajib.length} mapel wajib TKA+PAI</span>
        </div>
      `;

      // Mapel Wajib Info
      html += `
        <div class="glass-card" style="padding:12px 16px;margin-bottom:16px;border-left:3px solid var(--accent-primary);">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <span style="font-size:1.1rem;">📚</span>
            <strong style="font-size:0.85rem;color:var(--text-primary);">Mapel Wajib TKA + PAI (Paket ${this.currentPackage})</strong>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${mapelWajib.map(m => {
              const short = m.replace(/Pendidikan Agama Islam dan Budi Pekerti/g, 'PAI').replace(/Pendidikan /g, '');
              const isTKA = m !== 'Pendidikan Agama Islam dan Budi Pekerti';
              return `<span style="font-size:0.75rem;padding:3px 8px;border-radius:10px;background:${isTKA ? 'rgba(46,134,193,0.15)' : 'rgba(243,156,18,0.15)'};color:${isTKA ? 'var(--accent-primary)' : '#F39C12'};">${isTKA ? '📝 TKA' : '🕌 PAI'}: ${short}</span>`;
            }).join('')}
          </div>
          <p style="font-size:0.72rem;color:var(--text-muted);margin-top:6px;">Dokumen bertanda <strong>📚 Per Mapel</strong> otomatis di-generate untuk setiap mapel di atas.</p>
        </div>
      `;

      // Tutor selector
      const tutors = ProfileManager.getTutors().filter(t => t.paket.includes(this.currentPackage));
      html += `
        <div style="display:flex;gap:12px;margin-bottom:16px;align-items:center;flex-wrap:wrap;">
          <label style="font-size:0.8rem;color:var(--text-secondary);white-space:nowrap;">👨‍🏫 Tutor Butir ${butir.id}:</label>
          <select class="form-input" id="tutorSelect-butir${butir.id}" style="max-width:280px;font-size:0.82rem;padding:6px 10px;" onchange="App.selectedTutors[${butir.id}] = this.value || null">
            <option value="">— Otomatis (PIC Mapel) —</option>
            ${tutors.map(t => `<option value="${Utils.escapeHtml(t.nama)}" ${this.selectedTutors[butir.id] === t.nama ? 'selected' : ''}>${Utils.escapeHtml(t.nama)} (${Utils.escapeHtml(t.mapel)})</option>`).join('')}
          </select>
          <span style="font-size:0.7rem;color:var(--text-muted);">Override nama tutor khusus butir ${butir.id}</span>
        </div>
      `;

      butir.indikators.forEach(ind => {
        html += `
          <div class="indicator-card" id="ind-${ind.id.replace('.', '-')}">
            <div class="indicator-header" onclick="App.toggleIndicator('${ind.id}')">
              <h4>
                <span class="ind-num">${ind.id}</span>
                ${ind.judul}
              </h4>
              <span class="toggle-icon open" id="toggle-${ind.id.replace('.', '-')}">▼</span>
            </div>
            <div class="indicator-docs" id="docs-${ind.id.replace('.', '-')}">
              <div class="select-all-bar">
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
                  <input type="checkbox" checked onchange="App.selectAllDocs('${ind.id}', this.checked)">
                  <span>Pilih semua dokumen</span>
                </label>
                <span style="color:var(--text-muted);font-size:0.75rem;">${ind.dokumen.length} template → ${ind.dokumen.reduce((s, d) => s + (d.perMapel ? mapelWajib.length : 1), 0)} file</span>
              </div>
              <div class="checkbox-group">
        `;

        ind.dokumen.forEach(doc => {
          const genKey = `${doc.id}_${this.currentPackage}`;
          const isGenerated = this.generatedDocs[genKey];
          const perMapelBadge = doc.perMapel
            ? `<span class="doc-badge" style="background:rgba(46,134,193,0.15);color:var(--accent-primary);font-size:0.65rem;">📚 Per Mapel (×${mapelWajib.length})</span>`
            : `<span class="doc-badge" style="font-size:0.65rem;">📄 Per Jenjang</span>`;
          const genBadge = isGenerated
            ? `<span class="doc-badge" style="background:rgba(39,174,96,0.15);color:#27AE60;font-size:0.65rem;">✅ Generated</span>`
            : '';

          html += `
                <div class="checkbox-item checked" id="item-${doc.id}">
                  <input type="checkbox" checked data-doc-id="${doc.id}" class="doc-checkbox"
                    onchange="this.closest('.checkbox-item').classList.toggle('checked', this.checked)">
                  <span style="font-size:1rem;">${doc.icon}</span>
                  <span class="doc-label">${doc.nama}</span>
                  ${perMapelBadge}
                  ${genBadge}
                </div>
          `;
        });

        html += `
              </div>
              <div class="indicator-actions">
                <button class="btn btn-primary btn-sm" onclick="App.generateIndicator('${ind.id}')">
                  📥 Generate Indikator ${ind.id}
                </button>
              </div>
            </div>
          </div>
        `;
      });

      // Generate all button for this butir
      html += `
        <div style="margin-top:16px;display:flex;gap:8px;align-items:center;">
          <button class="btn btn-primary" onclick="App.generateButir(${butir.id})">
            📦 Generate Semua Butir ${butir.id} (${butirFiles} file)
          </button>
        </div>
      `;

      container.innerHTML = html;
    });
  },

  toggleIndicator(indId) {
    const docsEl = document.getElementById(`docs-${indId.replace('.', '-')}`);
    const toggleEl = document.getElementById(`toggle-${indId.replace('.', '-')}`);
    if (docsEl) {
      const isVisible = docsEl.style.display !== 'none';
      docsEl.style.display = isVisible ? 'none' : 'block';
      if (toggleEl) toggleEl.classList.toggle('open', !isVisible);
    }
  },

  selectAllDocs(indId, checked) {
    const container = document.getElementById(`docs-${indId.replace('.', '-')}`);
    if (!container) return;
    container.querySelectorAll('.doc-checkbox').forEach(cb => {
      cb.checked = checked;
      cb.closest('.checkbox-item')?.classList.toggle('checked', checked);
    });
  },

  // =========================================
  // GENERATE: Per Indicator
  // =========================================
  async generateIndicator(indId) {
    const container = document.getElementById(`docs-${indId.replace('.', '-')}`);
    if (!container) return;

    const selectedDocs = [];
    container.querySelectorAll('.doc-checkbox:checked').forEach(cb => {
      selectedDocs.push(cb.dataset.docId);
    });

    if (selectedDocs.length === 0) {
      Utils.showToast('Pilih minimal satu dokumen!', 'warning');
      return;
    }

    // Calculate real file count
    const pkg = CONFIG.packages[this.currentPackage];
    const mapelCount = pkg?.mapelWajib?.length || 1;
    let totalFiles = 0;
    selectedDocs.forEach(id => {
      const info = CONFIG.getDocInfo(id);
      totalFiles += info?.perMapel ? mapelCount : 1;
    });

    Utils.showToast(`Generating ${totalFiles} file (${selectedDocs.length} template × mapel)...`, 'info');

    try {
      if (selectedDocs.length === 1 && !CONFIG.getDocInfo(selectedDocs[0])?.perMapel) {
        await DocGenerator.downloadDocument(selectedDocs[0], this.currentPackage);
        this._markGenerated(selectedDocs[0], this.currentPackage);
      } else {
        await DocGenerator.generateBatchZip(selectedDocs, this.currentPackage, null, (done, total) => {
          Utils.showToast(`Progress: ${done}/${total} file`, 'info', 1000);
        }, localStorage.getItem('use_ai') === 'true');
        selectedDocs.forEach(id => this._markGenerated(id, this.currentPackage));
      }
      this.renderKomponen1();
    } catch (err) {
      Utils.showToast(`Error: ${err.message}`, 'error');
    }
  },

  // =========================================
  // GENERATE: Per Butir
  // =========================================
  async generateButir(butirId) {
    const docs = CONFIG.getDocumentsByButir(butirId);
    if (docs.length === 0) return;

    const docIds = docs.map(d => d.id);
    const pkg = CONFIG.packages[this.currentPackage];
    const mapelCount = pkg?.mapelWajib?.length || 1;
    let totalFiles = 0;
    docs.forEach(d => { totalFiles += d.perMapel ? mapelCount : 1; });

    Utils.showToast(`Memproses ${totalFiles} file untuk Butir ${butirId}...`, 'info');

    const progressEl = document.getElementById('batchProgress');

    try {
      await DocGenerator.generateBatchZip(docIds, this.currentPackage, null, (done, total) => {
        const pct = Math.round((done / total) * 100);
        if (progressEl) progressEl.style.width = `${pct}%`;
      }, localStorage.getItem('use_ai') === 'true');
      docIds.forEach(id => this._markGenerated(id, this.currentPackage));
      this.renderKomponen1();
    } catch (err) {
      Utils.showToast(`Error: ${err.message}`, 'error');
    }
  },

  // =========================================
  // PROGRESS TRACKING
  // =========================================
  _markGenerated(docId, paket) {
    const key = `${docId}_${paket}`;
    this.generatedDocs[key] = new Date().toISOString();
    Utils.saveData('generated_docs', this.generatedDocs);
  },

  _countGeneratedForPackage(paket) {
    let count = 0;
    Object.keys(this.generatedDocs).forEach(k => {
      if (k.endsWith(`_${paket}`)) count++;
    });
    return count;
  },

  _isGenerated(docId, paket) {
    return !!this.generatedDocs[`${docId}_${paket}`];
  },

  // =========================================
  // RENDER: Generate Panel
  // =========================================
  renderGeneratePanel() {
    const container = document.getElementById('generatePanelContent');
    if (!container) return;

    const totalDocs = CONFIG.getTotalDocuments();
    const totalFiles = CONFIG.getTotalFiles(this.currentPackage || 'A');
    const selectedPkgs = ProfileManager.getSelectedPackages();
    const genCount = this._countGeneratedForPackage(this.currentPackage || 'A');
    const pkg = CONFIG.packages[this.currentPackage || 'A'];

    container.innerHTML = `
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value">${totalDocs}</div>
          <div class="stat-label">Template Dokumen</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${totalFiles}</div>
          <div class="stat-label">Total File (Paket ${this.currentPackage})</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${pkg?.mapelWajib?.length || 0}</div>
          <div class="stat-label">Mapel Wajib TKA+PAI</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:${genCount > 0 ? '#27AE60' : 'inherit'}">${genCount}/${totalDocs}</div>
          <div class="stat-label">Template Selesai (Paket ${this.currentPackage})</div>
        </div>
      </div>

      <div class="glass-card" style="margin-bottom:16px;padding:12px 16px;border-left:3px solid var(--accent-primary);">
        <strong style="font-size:0.85rem;">📚 Cara Kerja Sistem Per-Mapel:</strong>
        <p style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;">Dokumen bertipe <strong>RPP, Prota, Prosem, ATP, Soal, Kisi-kisi, LKPD</strong> otomatis di-generate untuk setiap mapel wajib TKA+PAI. Anda mendapatkan <strong>${totalFiles} file</strong> dari ${totalDocs} template — semua otomatis!</p>
      </div>

      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">
            <div class="icon">🚀</div>
            <div>
              <h3>Batch Generate</h3>
              <p>Generate semua dokumen sekaligus dalam format ZIP</p>
            </div>
          </div>
        </div>

        <div style="background: rgba(46,134,193,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(46,134,193,0.2); margin-bottom: 16px;">
          <h4 style="color:var(--text-primary);font-size:0.85rem;margin:0 0 4px 0;">📦 Target Generasi: <span style="color:var(--accent-primary)">Paket ${this.currentPackage || 'A'}</span></h4>
          <p style="font-size:0.75rem;color:var(--text-muted);margin:0;">Dokumen akan dicetak berdasarkan Paket jenjang yang sedang Anda pilih di navigasi atas.</p>
        </div>

        <h4 style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:8px;">PILIH MATA PELAJARAN (Khusus dokumen 📚 Per-Mapel)</h4>
        <div class="batch-options">
          ${CONFIG.packages[this.currentPackage || 'A'].mapelWajib.map(m => {
            const pic = CONFIG.mapelPics[this.currentPackage || 'A']?.[m] || '';
            const picHtml = pic ? `<div style="font-size:0.75rem;color:var(--accent-primary);margin-top:4px;font-weight:600;"><span class="badge" style="background:var(--accent-primary);color:#fff;padding:2px 6px;border-radius:4px;font-size:0.7rem;">👤 PIC Mapel: ${pic}</span></div>` : '';
            return `
            <div class="batch-option selected" onclick="this.classList.toggle('selected')" data-batch-mapel="${m}">
              <span class="opt-icon">📘</span>
              <div class="opt-info">
                <div class="opt-title">${m}</div>
                ${picHtml}
              </div>
              <input type="checkbox" checked style="accent-color:var(--accent-primary)">
            </div>
          `}).join('')}
        </div>

        <h4 style="color:var(--text-secondary);font-size:0.8rem;margin:16px 0 8px;">PILIH BUTIR INSTITUSIONAL (Manajemen & Dokumen Umum)</h4>
        <div class="batch-options">
          ${CONFIG.butirs.map(b => {
             const pic = CONFIG.instPics[this.currentPackage || 'A']?.[b.id];
             const picHtml = b.id == 3 
                ? '<div style="font-size:0.75rem;color:var(--accent-primary);margin-top:4px;font-weight:600;">👤 PIC: Sesuai Pilihan Mapel di Atas</div>' 
                : `<div style="font-size:0.75rem;color:#E67E22;margin-top:4px;font-weight:600;"><span class="badge" style="background:#E67E22;color:#fff;padding:2px 6px;border-radius:4px;font-size:0.7rem;">👤 Tim Institusi: ${pic || 'Belum ditentukan'}</span></div>`;
             return `
            <div class="batch-option selected" onclick="this.classList.toggle('selected')" data-batch-butir="${b.id}">
              <span class="opt-icon">📋</span>
              <div class="opt-info">
                <div class="opt-title">Butir ${b.id}</div>
                <div class="opt-desc">${b.judul.substring(0, 40)}...</div>
                ${picHtml}
              </div>
              <input type="checkbox" checked style="accent-color:var(--accent-primary)">
            </div>
          `}).join('')}
        </div>

        <div class="progress-bar" style="margin:16px 0;">
          <div class="progress-fill" id="batchProgress" style="width:0%"></div>
        </div>

        <div class="checkbox-item checked" style="margin-top:16px; margin-bottom:12px; justify-content: center; background: rgba(46,134,193,0.1); padding: 12px; border-radius: 8px;">
           <input type="checkbox" id="useAiToggleGenerate" style="accent-color:var(--accent-primary);transform:scale(1.2);margin-right:8px;" ${localStorage.getItem('use_ai') === 'true' ? 'checked' : ''} onchange="localStorage.setItem('use_ai', this.checked); var syncEl = document.getElementById('useAiToggle'); if (syncEl) syncEl.checked = this.checked;">
           <label for="useAiToggleGenerate" style="font-weight:bold;color:var(--primary);cursor:pointer;font-size:0.95rem;">✨ Gunakan Gemini AI (Auto-Pilot)</label>
        </div>

        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="btn btn-primary btn-lg btn-block" onclick="App.batchGenerate()">
            ⬇️ Generate & Download ZIP
          </button>
        </div>
      </div>

      <!-- AI SETTINGS CARD -->
      <div class="glass-card" style="margin-top:16px;">
        <div class="card-header">
          <div class="card-title">
            <div class="icon">✨</div>
            <h3>Pengaturan AI & Parameter Karakteristik (Gemini 3.1)</h3>
          </div>
        </div>
        
        <div class="form-group">
          <label>Google Gemini API Key</label>
          <input type="password" id="geminiApiKey" class="input-modern" placeholder="AIzaSy..." value="${localStorage.getItem('gemini_api_key') || ''}">
          <small style="color:var(--text-secondary);display:block;margin-top:4px;">Disimpan secara lokal di browser Anda. Tidak ke server mana pun.</small>
        </div>

        <div class="checkbox-item checked" style="margin-bottom: 12px; justify-content: start;">
           <input type="checkbox" id="useAiToggle" style="accent-color:var(--accent-primary);transform:scale(1.2);margin-right:8px;" ${localStorage.getItem('use_ai') === 'true' ? 'checked' : ''} onchange="localStorage.setItem('use_ai', this.checked)">
           <label for="useAiToggle" style="font-weight:bold;color:var(--primary);cursor:pointer;">✨ Gunakan Gemini AI untuk Melengkapi RPP & Soal</label>
        </div>

        <!-- CUSTOM AI PARAMETERS -->
        <h4 style="font-size:0.9rem;margin-bottom:8px;margin-top:16px;border-bottom:1px solid #ddd;padding-bottom:4px;">⚙️ Parameter Output AI (Opsional)</h4>
        
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
          <div class="form-group" style="flex:1;min-width:180px;">
            <label style="font-size:0.8rem;">Model Pembelajaran (RPP)</label>
            <select id="aiModelBelajar" class="form-input" style="font-size:0.85rem;padding:6px;" onchange="localStorage.setItem('ai_model_belajar', this.value)">
              <option value="Problem Based Learning (PBL)" ${localStorage.getItem('ai_model_belajar') === 'Problem Based Learning (PBL)' ? 'selected' : ''}>Problem Based Learning (PBL)</option>
              <option value="Project Based Learning (PjBL)" ${localStorage.getItem('ai_model_belajar') === 'Project Based Learning (PjBL)' ? 'selected' : ''}>Project Based Learning (PjBL)</option>
              <option value="Pendekatan Andragogi (Orang Dewasa)" ${localStorage.getItem('ai_model_belajar') === 'Pendekatan Andragogi (Orang Dewasa)' ? 'selected' : ''}>Andragogi (Khas Dewasa Pendidikan Kesetaraan)</option>
              <option value="Discovery / Inquiry Learning" ${localStorage.getItem('ai_model_belajar') === 'Discovery / Inquiry Learning' ? 'selected' : ''}>Discovery / Inquiry Learning</option>
            </select>
          </div>
          <div class="form-group" style="flex:1;min-width:180px;">
            <label style="font-size:0.8rem;">Format Soal Formatif/Sumatif</label>
            <select id="aiFormatSoal" class="form-input" style="font-size:0.85rem;padding:6px;" onchange="localStorage.setItem('ai_format_soal', this.value)">
              <option value="Soal Analitis Uraian Panjang (Esai)" ${localStorage.getItem('ai_format_soal') === 'Soal Analitis Uraian Panjang (Esai)' ? 'selected' : ''}>Esai / Uraian Panjang (HOTS)</option>
              <option value="Pilihan Ganda A, B, C, D dengan Kunci" ${localStorage.getItem('ai_format_soal') === 'Pilihan Ganda A, B, C, D dengan Kunci' ? 'selected' : ''}>Pilihan Ganda dengan Kunci</option>
              <option value="Soal Isian Singkat & Studi Kasus" ${localStorage.getItem('ai_format_soal') === 'Soal Isian Singkat & Studi Kasus' ? 'selected' : ''}>Studi Kasus Ringkas</option>
            </select>
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
          <div class="form-group" style="flex:1;min-width:180px;">
            <label style="font-size:0.8rem;">Tema Projek Karakter P5</label>
            <select id="aiTemaP5" class="form-input" style="font-size:0.85rem;padding:6px;" onchange="localStorage.setItem('ai_tema_p5', this.value)">
              <option value="Kewirausahaan / Keterampilan Mandiri" ${localStorage.getItem('ai_tema_p5') === 'Kewirausahaan / Keterampilan Mandiri' ? 'selected' : ''}>Kewirausahaan / Keterampilan PKBM</option>
              <option value="Gaya Hidup Berkelanjutan" ${localStorage.getItem('ai_tema_p5') === 'Gaya Hidup Berkelanjutan' ? 'selected' : ''}>Gaya Hidup Berkelanjutan / Lingkungan</option>
              <option value="Kearifan Lokal Daerah" ${localStorage.getItem('ai_tema_p5') === 'Kearifan Lokal Daerah' ? 'selected' : ''}>Kearifan Lokal Budaya Daerah</option>
              <option value="Bhinneka Tunggal Ika / Suara Demokrasi" ${localStorage.getItem('ai_tema_p5') === 'Bhinneka Tunggal Ika / Suara Demokrasi' ? 'selected' : ''}>Bhinneka Tunggal Ika</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:12px;">
          <label style="font-size:0.8rem;">Instruksi Khusus / Konteks (Opsional Bebas)</label>
          <textarea id="aiKonteks" class="form-input" rows="2" style="font-size:0.85rem;padding:6px;" placeholder="Cth: Siswa mayoritas pekerja paruh waktu. Beri soal logika akuntansi warung." onchange="localStorage.setItem('ai_konteks', this.value)" oninput="localStorage.setItem('ai_konteks', this.value)">${localStorage.getItem('ai_konteks') || ''}</textarea>
        </div>
        
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button class="btn btn-primary" onclick="App.saveGeminiKey()">💾 Simpan API Key</button>
          <button class="btn btn-outline" onclick="App.clearGeminiKey()">🗑️ Hapus</button>
        </div>
      </div>
    `;
  },

  // =========================================
  // BATCH GENERATE
  // =========================================
  async batchGenerate() {
    const p = this.currentPackage || 'A';
    
    const selectedMapels = [];
    document.querySelectorAll('.batch-option.selected[data-batch-mapel]').forEach(el => {
      selectedMapels.push(el.dataset.batchMapel);
    });

    const selectedButirs = [];
    document.querySelectorAll('.batch-option.selected[data-batch-butir]').forEach(el => {
      selectedButirs.push(parseInt(el.dataset.batchButir));
    });

    if (selectedMapels.length === 0) {
      Utils.showToast('Pilih minimal satu mata pelajaran!', 'warning');
      return;
    }
    if (selectedButirs.length === 0) {
      Utils.showToast('Pilih minimal satu butir!', 'warning');
      return;
    }

    // Validasi profil PKBM
    const profile = ProfileManager.getProfile();
    if (!profile.lembaga.nama || profile.lembaga.nama.trim() === '') {
      Utils.showToast('⚠️ Nama PKBM belum diisi! Silakan isi di tab Profil PKBM.', 'error');
      return;
    }

    // Validasi API key jika AI aktif
    const useAi = localStorage.getItem('use_ai') === 'true';
    if (useAi) {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey || apiKey.trim() === '') {
        Utils.showToast('⚠️ API Key Gemini belum diisi! Silakan isi di bagian Pengaturan AI atau nonaktifkan mode AI.', 'error');
        return;
      }
    }

    // Collect all doc IDs from selected butirs
    const docIds = [];
    selectedButirs.forEach(butirId => {
      CONFIG.getDocumentsByButir(butirId).forEach(d => {
        docIds.push(d.id);
      });
    });

    // Calculate real file count for toast
    let totalFilesAll = 0;
    const mc = selectedMapels.length;
    docIds.forEach(id => {
      const info = CONFIG.getDocInfo(id);
      totalFilesAll += info?.perMapel ? mc : 1;
    });

    Utils.showToast(`Memproses ${totalFilesAll} file (${docIds.length} template × ${selectedMapels.length} mapel)...`, 'info');

    const progressEl = document.getElementById('batchProgress');
    if (progressEl) progressEl.style.width = '0%'; // Reset progress bar

    // useAi sudah dideklarasikan di validasi atas

    try {
      await DocGenerator.generateBatchZip(docIds, p, selectedMapels, (done, total) => {
        const pct = Math.round((done / total) * 100);
        if (progressEl) progressEl.style.width = `${pct}%`;
      }, useAi);
      // Mark all as generated for this package
      docIds.forEach(id => this._markGenerated(id, p));
      if (progressEl) progressEl.style.width = '100%';
    } catch (err) {
      Utils.showToast(`Error (Paket ${p}): ${err.message}`, 'error');
    }

    this.renderKomponen1();
    this.renderGeneratePanel();
  },

  // =========================================
  // UPDATE STATS
  // =========================================
  updateStats() {
    const totalDocs = CONFIG.getTotalDocuments();
    const el = document.getElementById('totalDocsCount');
    if (el) el.textContent = CONFIG.getTotalFiles(this.currentPackage);
  },

  saveGeminiKey() {
    const key = document.getElementById('geminiApiKey').value.trim();
    if (key) {
      AIClient.setApiKey(key);
      localStorage.setItem('ai_model_belajar', document.getElementById('aiModelBelajar')?.value || '');
      localStorage.setItem('ai_format_soal', document.getElementById('aiFormatSoal')?.value || '');
      localStorage.setItem('ai_tema_p5', document.getElementById('aiTemaP5')?.value || '');
      localStorage.setItem('ai_konteks', document.getElementById('aiKonteks')?.value || '');
      Utils.showToast('Pengaturan AI & Parameter tersimpan', 'success');
    } else {
      Utils.showToast('API Key kosong', 'error');
    }
  },

  clearGeminiKey() {
    AIClient.setApiKey('');
    localStorage.removeItem('ai_model_belajar');
    localStorage.removeItem('ai_format_soal');
    localStorage.removeItem('ai_tema_p5');
    localStorage.removeItem('ai_konteks');
    document.getElementById('geminiApiKey').value = '';
    Utils.showToast('Pengaturan AI terhapus', 'success');
  }
};

// =========================================
// INITIALIZE
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
