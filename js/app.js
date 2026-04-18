/**
 * app.js — Main Application Controller
 * Tab management, sub-tab management, document generation UI
 */

const App = {
  currentTab: 'profil',
  currentSubtab: 'butir1',
  currentPackage: 'A',
  selectedTutor: null,
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
          <label style="font-size:0.8rem;color:var(--text-secondary);white-space:nowrap;">👨‍🏫 Tutor:</label>
          <select class="form-input" id="tutorSelect-butir${butir.id}" style="max-width:280px;font-size:0.82rem;padding:6px 10px;" onchange="App.selectedTutor = this.value || null">
            <option value="">— Otomatis / Kosong —</option>
            ${tutors.map(t => `<option value="${t.nama}" ${this.selectedTutor === t.nama ? 'selected' : ''}>${t.nama} (${t.mapel})</option>`).join('')}
          </select>
          <span style="font-size:0.7rem;color:var(--text-muted);">Nama tutor otomatis terisi di dokumen</span>
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
        });
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
      });
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
          <div class="stat-label">Sudah Di-generate</div>
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

        <h4 style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:8px;">PILIH PAKET</h4>
        <div class="batch-options">
          ${selectedPkgs.map(p => {
            const pkg = CONFIG.packages[p];
            return `
              <div class="batch-option selected" onclick="this.classList.toggle('selected')" data-batch-pkg="${p}">
                <span class="opt-icon">📦</span>
                <div class="opt-info">
                  <div class="opt-title">Paket ${p}</div>
                  <div class="opt-desc">Setara ${pkg.setara} | ${CONFIG.getTotalFiles(p)} file</div>
                </div>
                <input type="checkbox" checked style="accent-color:var(--accent-primary)">
              </div>
            `;
          }).join('')}
        </div>

        <h4 style="color:var(--text-secondary);font-size:0.8rem;margin:16px 0 8px;">PILIH BUTIR</h4>
        <div class="batch-options">
          ${CONFIG.butirs.map(b => `
            <div class="batch-option selected" onclick="this.classList.toggle('selected')" data-batch-butir="${b.id}">
              <span class="opt-icon">📋</span>
              <div class="opt-info">
                <div class="opt-title">Butir ${b.id}</div>
                <div class="opt-desc">${b.judul.substring(0, 40)}...</div>
              </div>
              <input type="checkbox" checked style="accent-color:var(--accent-primary)">
            </div>
          `).join('')}
        </div>

        <div class="progress-bar" style="margin:16px 0;">
          <div class="progress-fill" id="batchProgress" style="width:0%"></div>
        </div>

        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="btn btn-primary btn-lg btn-block" onclick="App.batchGenerate()">
            ⬇️ Generate & Download ZIP
          </button>
        </div>
      </div>
    `;
  },

  // =========================================
  // BATCH GENERATE
  // =========================================
  async batchGenerate() {
    const selectedPkgs = [];
    document.querySelectorAll('.batch-option.selected[data-batch-pkg]').forEach(el => {
      selectedPkgs.push(el.dataset.batchPkg);
    });

    const selectedButirs = [];
    document.querySelectorAll('.batch-option.selected[data-batch-butir]').forEach(el => {
      selectedButirs.push(parseInt(el.dataset.batchButir));
    });

    if (selectedPkgs.length === 0) {
      Utils.showToast('Pilih minimal satu paket!', 'warning');
      return;
    }
    if (selectedButirs.length === 0) {
      Utils.showToast('Pilih minimal satu butir!', 'warning');
      return;
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
    for (const p of selectedPkgs) {
      const pkgInfo = CONFIG.packages[p];
      const mc = pkgInfo?.mapelWajib?.length || 1;
      docIds.forEach(id => {
        const info = CONFIG.getDocInfo(id);
        totalFilesAll += info?.perMapel ? mc : 1;
      });
    }

    Utils.showToast(`Memproses ${totalFilesAll} file (${docIds.length} template × ${selectedPkgs.length} paket × mapel)...`, 'info');

    const progressEl = document.getElementById('batchProgress');

    for (const p of selectedPkgs) {
      try {
        await DocGenerator.generateBatchZip(docIds, p, null, (done, total) => {
          const pct = Math.round((done / total) * 100);
          if (progressEl) progressEl.style.width = `${pct}%`;
        });
        // Mark all as generated for this package
        docIds.forEach(id => this._markGenerated(id, p));
      } catch (err) {
        Utils.showToast(`Error (Paket ${p}): ${err.message}`, 'error');
      }
    }

    if (progressEl) progressEl.style.width = '100%';
    Utils.showToast('Batch generate selesai! 🎉', 'success');
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
  }
};

// =========================================
// INITIALIZE
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
