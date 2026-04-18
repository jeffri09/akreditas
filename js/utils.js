/**
 * utils.js — Helper Functions
 * Sistem Generator Dokumen Akreditasi PKBM Miftahul Khoir
 */

const Utils = {
  // =========================================
  // DATE FORMATTING
  // =========================================
  bulanIndo: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
              'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  
  hariIndo: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],

  formatTanggal(date) {
    if (!date) date = new Date();
    if (typeof date === 'string') date = new Date(date);
    const d = date.getDate();
    const m = this.bulanIndo[date.getMonth()];
    const y = date.getFullYear();
    return `${d} ${m} ${y}`;
  },

  formatTanggalLengkap(date) {
    if (!date) date = new Date();
    if (typeof date === 'string') date = new Date(date);
    const hari = this.hariIndo[date.getDay()];
    const d = date.getDate();
    const m = this.bulanIndo[date.getMonth()];
    const y = date.getFullYear();
    return `${hari}, ${d} ${m} ${y}`;
  },

  getTahunAjaran() {
    return CONFIG.tahunAjaran;
  },

  // =========================================
  // SKK CALCULATION
  // =========================================
  hitungDurasiJP(jumlahJP, paket) {
    const pkg = CONFIG.packages[paket];
    if (!pkg) return 0;
    return jumlahJP * pkg.jpMenit;
  },

  formatDurasiJP(jumlahJP, paket) {
    const totalMenit = this.hitungDurasiJP(jumlahJP, paket);
    const jam = Math.floor(totalMenit / 60);
    const menit = totalMenit % 60;
    if (jam === 0) return `${menit} menit`;
    if (menit === 0) return `${jam} jam`;
    return `${jam} jam ${menit} menit`;
  },

  getJPLabel(paket) {
    const pkg = CONFIG.packages[paket];
    return `${pkg.jpMenit} menit/JP`;
  },

  // =========================================
  // REFERENCE HELPER
  // =========================================
  getReferensiCP(paket, isKelasAwal = true) {
    if (isKelasAwal) {
      return CONFIG.regulasi.cpKelasAwal.nomor;
    }
    return CONFIG.regulasi.cpKelasBerjalan.nomor;
  },

  getFase(paket) {
    return CONFIG.packages[paket]?.faseAktif || '-';
  },

  getMapel(paket, kelompok = 'umum') {
    const subjects = CONFIG.subjects[paket];
    if (!subjects) return [];
    return subjects[kelompok] || [];
  },

  // =========================================
  // DOM HELPERS
  // =========================================
  $(selector) {
    return document.querySelector(selector);
  },

  $$(selector) {
    return document.querySelectorAll(selector);
  },

  createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, val]) => {
      if (key === 'className') el.className = val;
      else if (key === 'innerHTML') el.innerHTML = val;
      else if (key === 'textContent') el.textContent = val;
      else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), val);
      else el.setAttribute(key, val);
    });
    children.forEach(child => {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else if (child) el.appendChild(child);
    });
    return el;
  },

  // =========================================
  // TOAST NOTIFICATION
  // =========================================
  showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // =========================================
  // LOCAL STORAGE
  // =========================================
  saveData(key, data) {
    try {
      localStorage.setItem(`akreditasi_${key}`, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Failed to save data:', e);
      return false;
    }
  },

  loadData(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(`akreditasi_${key}`);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Failed to load data:', e);
      return defaultValue;
    }
  },

  removeData(key) {
    localStorage.removeItem(`akreditasi_${key}`);
  },

  // =========================================
  // STRING HELPERS
  // =========================================
  getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]?.toUpperCase()).filter(Boolean).slice(0, 2).join('');
  },

  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  truncate(str, maxLen = 50) {
    if (!str || str.length <= maxLen) return str;
    return str.slice(0, maxLen) + '...';
  },

  // =========================================
  // ID GENERATOR
  // =========================================
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  },

  // =========================================
  // DEEP CLONE
  // =========================================
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
};
