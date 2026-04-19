/**
 * profile.js — Profil PKBM Management
 * CRUD LocalStorage untuk data lembaga, tutor, dan peserta didik
 */

const ProfileManager = {
  STORAGE_KEY: 'profile',

  defaultProfile: {
    lembaga: {
      nama: 'PKBM Miftahul Khoir',
      npsn: 'P9970204',
      alamat: 'Jalan Tuanku Imam Bonjol',
      kelurahan: 'Kota Baru Selatan',
      kecamatan: 'Martapura',
      kabupaten: 'Ogan Komering Ulu Timur',
      provinsi: 'Sumatera Selatan',
      telepon: '',
      email: '',
      website: '',
      kepala: {
        nama: 'Hatta Yandika Putra, S.Pd',
        nip: '',
        pangkat: ''
      },
      visi: '',
      misi: '',
      tujuan: ''
    },
    tutors: [
      { id: 't1', nama: 'Naela', mapel: 'Matematika & IPAS', paket: ['A'], nip: '', kualifikasi: '' },
      { id: 't2', nama: 'Abdul Hadi', mapel: 'Bahasa Indonesia & Pendidikan Pancasila', paket: ['A'], nip: '', kualifikasi: '' },
      { id: 't3', nama: 'Anita', mapel: 'PAI & Budi Pekerti', paket: ['A'], nip: '', kualifikasi: '' },
      { id: 't4', nama: 'Siska', mapel: 'Matematika', paket: ['B'], nip: '', kualifikasi: '' },
      { id: 't5', nama: 'Handry', mapel: 'Bahasa Indonesia', paket: ['B'], nip: '', kualifikasi: '' },
      { id: 't6', nama: 'Husen', mapel: 'PAI', paket: ['B'], nip: '', kualifikasi: '' },
      { id: 't7', nama: 'Romadi', mapel: 'Ilmu Pengetahuan Alam (IPA)', paket: ['B'], nip: '', kualifikasi: '' },
      { id: 't8', nama: 'Salim', mapel: 'Pendidikan Pancasila', paket: ['B'], nip: '', kualifikasi: '' },
      { id: 't9', nama: 'Dea', mapel: 'Geografi', paket: ['C'], nip: '', kualifikasi: '' },
      { id: 't10', nama: 'Ulfa', mapel: 'Matematika', paket: ['C'], nip: '', kualifikasi: '' },
      { id: 't11', nama: 'Riki', mapel: 'Bahasa Indonesia', paket: ['C'], nip: '', kualifikasi: '' },
      { id: 't12', nama: 'Nadia', mapel: 'Bahasa Inggris', paket: ['C'], nip: '', kualifikasi: '' },
      { id: 't13', nama: 'Dia', mapel: 'Pendidikan Pancasila', paket: ['C'], nip: '', kualifikasi: '' },
      { id: 't14', nama: 'Ronald', mapel: 'PAI', paket: ['C'], nip: '', kualifikasi: '' }
    ],
    pesertaDidik: {
      A: { jumlah: 0, rombel: 1, kelas: [] },
      B: { jumlah: 0, rombel: 1, kelas: [] },
      C: { jumlah: 0, rombel: 1, kelas: [] }
    },
    selectedPackages: ['A', 'B', 'C'],
    selectedSubjects: { A: [], B: [], C: [] }
  },

  // Current profile in memory
  _profile: null,

  init() {
    this._profile = this.load();
    this.renderProfileForm();
    this.renderTutorList();
    this.renderPackageConfig();
  },

  load() {
    const saved = Utils.loadData(this.STORAGE_KEY);
    const def = Utils.deepClone(this.defaultProfile);
    if (saved) {
      if (!saved.lembaga) saved.lembaga = {};
      if (!saved.lembaga.kepala) saved.lembaga.kepala = {};
      
      const mergedRes = { ...def, ...saved, lembaga: { ...def.lembaga, ...saved.lembaga, kepala: { ...def.lembaga.kepala, ...saved.lembaga.kepala } } };
      if (!saved.lembaga.npsn) mergedRes.lembaga.npsn = def.lembaga.npsn;
      if (!saved.lembaga.alamat) mergedRes.lembaga.alamat = def.lembaga.alamat;
      if (!saved.lembaga.kelurahan) mergedRes.lembaga.kelurahan = def.lembaga.kelurahan;
      if (!saved.lembaga.kecamatan) mergedRes.lembaga.kecamatan = def.lembaga.kecamatan;
      if (!saved.lembaga.kabupaten) mergedRes.lembaga.kabupaten = def.lembaga.kabupaten;
      if (!saved.lembaga.provinsi) mergedRes.lembaga.provinsi = def.lembaga.provinsi;
      if (!saved.lembaga.kepala.nama) mergedRes.lembaga.kepala.nama = def.lembaga.kepala.nama;
      if (!saved.tutors || saved.tutors.length === 0) mergedRes.tutors = def.tutors;
      
      return mergedRes;
    }
    return def;
  },

  save() {
    Utils.saveData(this.STORAGE_KEY, this._profile);
    Utils.showToast('Profil berhasil disimpan!', 'success');
  },

  getProfile() {
    return this._profile;
  },

  getLembaga() {
    return this._profile.lembaga;
  },

  getTutors() {
    return this._profile.tutors;
  },

  getSelectedPackages() {
    return this._profile.selectedPackages;
  },

  // =========================================
  // RENDER: Profile Form
  // =========================================
  renderProfileForm() {
    const container = document.getElementById('profileFormContainer');
    if (!container) return;

    const l = this._profile.lembaga;
    const e = Utils.escapeHtml; // shorthand for safe HTML interpolation
    container.innerHTML = `
      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">
            <div class="icon">🏫</div>
            <div>
              <h3>Data Lembaga</h3>
              <p>Informasi dasar PKBM</p>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="ProfileManager.saveFromForm()">
            💾 Simpan
          </button>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nama PKBM *</label>
            <input type="text" class="form-input" id="pf-nama" value="${e(l.nama)}" placeholder="Nama lengkap PKBM">
          </div>
          <div class="form-group">
            <label class="form-label">NPSN</label>
            <input type="text" class="form-input" id="pf-npsn" value="${e(l.npsn)}" placeholder="Nomor Pokok Satuan Pendidikan">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Alamat Lengkap</label>
          <input type="text" class="form-input" id="pf-alamat" value="${e(l.alamat)}" placeholder="Jl. ...">
        </div>

        <div class="form-row-3">
          <div class="form-group">
            <label class="form-label">Kelurahan/Desa</label>
            <input type="text" class="form-input" id="pf-kelurahan" value="${e(l.kelurahan)}" placeholder="Kelurahan">
          </div>
          <div class="form-group">
            <label class="form-label">Kecamatan</label>
            <input type="text" class="form-input" id="pf-kecamatan" value="${e(l.kecamatan)}" placeholder="Kecamatan">
          </div>
          <div class="form-group">
            <label class="form-label">Kabupaten/Kota</label>
            <input type="text" class="form-input" id="pf-kabupaten" value="${e(l.kabupaten)}" placeholder="Kabupaten/Kota">
          </div>
        </div>

        <div class="form-row-3">
          <div class="form-group">
            <label class="form-label">Provinsi</label>
            <input type="text" class="form-input" id="pf-provinsi" value="${e(l.provinsi)}" placeholder="Provinsi">
          </div>
          <div class="form-group">
            <label class="form-label">Telepon</label>
            <input type="text" class="form-input" id="pf-telepon" value="${e(l.telepon)}" placeholder="08xx-xxxx-xxxx">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="pf-email" value="${e(l.email)}" placeholder="email@pkbm.sch.id">
          </div>
        </div>
      </div>

      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">
            <div class="icon">👤</div>
            <div>
              <h3>Kepala PKBM</h3>
              <p>Penanggung jawab lembaga</p>
            </div>
          </div>
        </div>
        <div class="form-row-3">
          <div class="form-group">
            <label class="form-label">Nama Kepala PKBM *</label>
            <input type="text" class="form-input" id="pf-kepala-nama" value="${e(l.kepala.nama)}" placeholder="Nama lengkap">
          </div>
          <div class="form-group">
            <label class="form-label">NIP/NIK</label>
            <input type="text" class="form-input" id="pf-kepala-nip" value="${e(l.kepala.nip)}" placeholder="NIP atau NIK">
          </div>
          <div class="form-group">
            <label class="form-label">Pangkat/Golongan</label>
            <input type="text" class="form-input" id="pf-kepala-pangkat" value="${e(l.kepala.pangkat)}" placeholder="Opsional">
          </div>
        </div>
      </div>

      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">
            <div class="icon">🎯</div>
            <div>
              <h3>Visi, Misi, dan Tujuan</h3>
              <p>Identitas filosofis PKBM</p>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Visi</label>
          <textarea class="form-textarea" id="pf-visi" rows="2" placeholder="Visi PKBM...">${e(l.visi)}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Misi</label>
          <textarea class="form-textarea" id="pf-misi" rows="3" placeholder="Misi PKBM (pisahkan dengan enter per poin)...">${e(l.misi)}</textarea>
          <div class="form-hint">Pisahkan setiap poin misi dengan baris baru (Enter)</div>
        </div>
        <div class="form-group">
          <label class="form-label">Tujuan</label>
          <textarea class="form-textarea" id="pf-tujuan" rows="3" placeholder="Tujuan PKBM...">${e(l.tujuan)}</textarea>
        </div>
      </div>
    `;
  },

  saveFromForm() {
    const l = this._profile.lembaga;
    const v = (id, fallback = '') => (document.getElementById(id)?.value || fallback).trim();
    l.nama = v('pf-nama', l.nama);
    l.npsn = v('pf-npsn');
    l.alamat = v('pf-alamat');
    l.kelurahan = v('pf-kelurahan');
    l.kecamatan = v('pf-kecamatan');
    l.kabupaten = v('pf-kabupaten');
    l.provinsi = v('pf-provinsi');
    l.telepon = v('pf-telepon');
    l.email = v('pf-email');
    l.kepala.nama = v('pf-kepala-nama');
    l.kepala.nip = v('pf-kepala-nip');
    l.kepala.pangkat = v('pf-kepala-pangkat');
    l.visi = v('pf-visi');
    l.misi = v('pf-misi');
    l.tujuan = v('pf-tujuan');
    this.save();
  },

  // =========================================
  // RENDER: Tutor Management
  // =========================================
  renderTutorList() {
    const container = document.getElementById('tutorListContainer');
    if (!container) return;

    const tutors = this._profile.tutors;
    let html = `
      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">
            <div class="icon">👨‍🏫</div>
            <div>
              <h3>Data Tutor/Pendidik</h3>
              <p>${tutors.length} tutor terdaftar</p>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="ProfileManager.showAddTutorModal()">
            ➕ Tambah Tutor
          </button>
        </div>
        <div class="tutor-list" id="tutorListItems">
    `;

    if (tutors.length === 0) {
      html += `
        <div class="empty-state">
          <div class="empty-icon">👨‍🏫</div>
          <p>Belum ada tutor terdaftar. Klik "Tambah Tutor" untuk memulai.</p>
        </div>
      `;
    } else {
      tutors.forEach((t, idx) => {
        html += `
          <div class="tutor-item">
            <div class="tutor-avatar">${Utils.getInitials(t.nama)}</div>
            <div class="tutor-info">
              <div class="name">${t.nama}</div>
              <div class="mapel">${t.mapel} — ${t.paket.map(p => 'Paket ' + p).join(', ')}</div>
            </div>
            <div class="tutor-actions">
              <button class="btn btn-secondary btn-sm" onclick="ProfileManager.editTutor(${idx})" title="Edit">✏️</button>
              <button class="btn btn-danger btn-sm" onclick="ProfileManager.deleteTutor(${idx})" title="Hapus">🗑️</button>
            </div>
          </div>
        `;
      });
    }

    html += '</div></div>';
    container.innerHTML = html;
  },

  showAddTutorModal() {
    this._showTutorModal();
  },

  editTutor(index) {
    const tutor = this._profile.tutors[index];
    this._showTutorModal(tutor, index);
  },

  _showTutorModal(tutor = null, editIndex = -1) {
    const isEdit = editIndex >= 0;
    const t = tutor || { nama: '', nip: '', mapel: '', kualifikasi: '', paket: ['A', 'B', 'C'] };

    let overlay = document.getElementById('tutorModal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'tutorModal';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>${isEdit ? 'Edit' : 'Tambah'} Tutor</h3>
          <button class="modal-close" onclick="ProfileManager.closeTutorModal()">✕</button>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nama Lengkap *</label>
            <input type="text" class="form-input" id="tutor-nama" value="${t.nama}" placeholder="Nama tutor">
          </div>
          <div class="form-group">
            <label class="form-label">NIP/NIK</label>
            <input type="text" class="form-input" id="tutor-nip" value="${t.nip}" placeholder="NIP atau NIK">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Mata Pelajaran *</label>
            <input type="text" class="form-input" id="tutor-mapel" value="${t.mapel}" placeholder="Mata pelajaran yang diampu">
          </div>
          <div class="form-group">
            <label class="form-label">Kualifikasi</label>
            <input type="text" class="form-input" id="tutor-kualifikasi" value="${t.kualifikasi}" placeholder="S1 Pendidikan, dll">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Program yang Diampu</label>
          <div style="display:flex;gap:12px;margin-top:6px;">
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.85rem;color:var(--text-secondary)">
              <input type="checkbox" id="tutor-paket-a" ${t.paket.includes('A') ? 'checked' : ''}> Paket A
            </label>
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.85rem;color:var(--text-secondary)">
              <input type="checkbox" id="tutor-paket-b" ${t.paket.includes('B') ? 'checked' : ''}> Paket B
            </label>
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.85rem;color:var(--text-secondary)">
              <input type="checkbox" id="tutor-paket-c" ${t.paket.includes('C') ? 'checked' : ''}> Paket C
            </label>
          </div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-secondary" onclick="ProfileManager.closeTutorModal()">Batal</button>
          <button class="btn btn-primary" onclick="ProfileManager.saveTutor(${editIndex})">
            ${isEdit ? '💾 Simpan Perubahan' : '➕ Tambah Tutor'}
          </button>
        </div>
      </div>
    `;

    setTimeout(() => overlay.classList.add('active'), 10);
  },

  saveTutor(editIndex) {
    const nama = document.getElementById('tutor-nama')?.value?.trim();
    const mapel = document.getElementById('tutor-mapel')?.value?.trim();
    if (!nama || !mapel) {
      Utils.showToast('Nama dan mata pelajaran wajib diisi!', 'error');
      return;
    }

    const paket = [];
    if (document.getElementById('tutor-paket-a')?.checked) paket.push('A');
    if (document.getElementById('tutor-paket-b')?.checked) paket.push('B');
    if (document.getElementById('tutor-paket-c')?.checked) paket.push('C');

    const tutor = {
      id: editIndex >= 0 ? this._profile.tutors[editIndex].id : Utils.generateId(),
      nama,
      nip: document.getElementById('tutor-nip')?.value?.trim() || '',
      mapel,
      kualifikasi: document.getElementById('tutor-kualifikasi')?.value?.trim() || '',
      paket: paket.length > 0 ? paket : ['A', 'B', 'C']
    };

    if (editIndex >= 0) {
      this._profile.tutors[editIndex] = tutor;
    } else {
      this._profile.tutors.push(tutor);
    }

    this.save();
    this.closeTutorModal();
    this.renderTutorList();
  },

  deleteTutor(index) {
    if (!confirm('Yakin ingin menghapus tutor ini?')) return;
    this._profile.tutors.splice(index, 1);
    this.save();
    this.renderTutorList();
  },

  closeTutorModal() {
    const overlay = document.getElementById('tutorModal');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
  },

  // =========================================
  // RENDER: Package Configuration
  // =========================================
  renderPackageConfig() {
    const container = document.getElementById('packageConfigContainer');
    if (!container) return;

    const selected = this._profile.selectedPackages;
    let html = `
      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">
            <div class="icon">📦</div>
            <div>
              <h3>Pengaturan Paket Program</h3>
              <p>Pilih program yang akan di-generate dokumennya</p>
            </div>
          </div>
        </div>
        <div class="package-toggle" id="packageToggle">
    `;

    ['A', 'B', 'C'].forEach(p => {
      const pkg = CONFIG.packages[p];
      const isActive = selected.includes(p);
      html += `
        <button class="pkg-btn ${isActive ? 'active' : ''}" onclick="ProfileManager.togglePackage('${p}')">
          Paket ${p}
          <span class="pkg-sub">Setara ${pkg.setara} | ${pkg.jpMenit} mnt/JP</span>
        </button>
      `;
    });

    html += '</div></div>';

    // Subject selection per package
    selected.forEach(p => {
      const pkg = CONFIG.packages[p];
      const subjects = CONFIG.subjects[p];
      html += `
        <div class="glass-card">
          <div class="card-header">
            <div class="card-title">
              <div class="icon">📚</div>
              <div>
                <h3>Mata Pelajaran — Paket ${p}</h3>
                <p>Setara ${pkg.setara} | Fase ${pkg.faseAktif} | ${pkg.levelHOTS}</p>
              </div>
            </div>
          </div>
          <h4 style="margin-bottom:8px;color:var(--text-secondary);font-size:0.8rem;">KELOMPOK UMUM</h4>
          <div class="checkbox-group">
      `;

      subjects.umum.forEach((s, i) => {
        const checked = !this._profile.selectedSubjects[p]?.length || this._profile.selectedSubjects[p].includes(s);
        html += `
          <div class="checkbox-item ${checked ? 'checked' : ''}">
            <input type="checkbox" id="subj-${p}-${i}" data-paket="${p}" data-subject="${s}" ${checked ? 'checked' : ''} onchange="ProfileManager.toggleSubject(this)">
            <span class="doc-label">${s}</span>
          </div>
        `;
      });

      html += '</div>';

      // Pemberdayaan
      html += `
        <h4 style="margin:16px 0 8px;color:var(--text-secondary);font-size:0.8rem;">KELOMPOK PEMBERDAYAAN & KETERAMPILAN</h4>
        <div class="checkbox-group">
      `;

      subjects.pemberdayaan.forEach((s, i) => {
        html += `
          <div class="checkbox-item checked">
            <input type="checkbox" checked data-paket="${p}" data-subject="${s}" onchange="ProfileManager.toggleSubject(this)">
            <span class="doc-label">${s}</span>
            <span class="doc-badge">Pemberdayaan</span>
          </div>
        `;
      });

      html += '</div></div>';
    });

    container.innerHTML = html;
  },

  togglePackage(paket) {
    const idx = this._profile.selectedPackages.indexOf(paket);
    if (idx >= 0) {
      if (this._profile.selectedPackages.length <= 1) {
        Utils.showToast('Minimal satu paket harus dipilih!', 'warning');
        return;
      }
      this._profile.selectedPackages.splice(idx, 1);
    } else {
      this._profile.selectedPackages.push(paket);
      this._profile.selectedPackages.sort();
    }
    this.save();
    this.renderPackageConfig();
  },

  toggleSubject(checkbox) {
    const paket = checkbox.dataset.paket;
    const subject = checkbox.dataset.subject;
    if (!this._profile.selectedSubjects[paket]) {
      this._profile.selectedSubjects[paket] = [...CONFIG.subjects[paket].umum];
    }
    const list = this._profile.selectedSubjects[paket];
    const idx = list.indexOf(subject);
    if (checkbox.checked && idx < 0) list.push(subject);
    if (!checkbox.checked && idx >= 0) list.splice(idx, 1);
    checkbox.closest('.checkbox-item')?.classList.toggle('checked', checkbox.checked);
    this.save();
  }
};
