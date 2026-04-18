/**
 * config.js — Konfigurasi Regulasi, Butir, Indikator, dan Mata Pelajaran
 * Sistem Generator Dokumen Akreditasi PKBM Miftahul Khoir
 * 
 * Sumber Regulasi:
 * - Kepmendikbudristek No. 246/O/2024 (Instrumen Akreditasi BAN-PDM)
 * - BSKAP No. 046/H/KR/2025 (CP kelas awal)
 * - BSKAP No. 032/H/KR/2024 (CP kelas berjalan)
 * - Panduan Pembelajaran dan Asesmen (PPA) Revisi 2024/2025
 */

const CONFIG = {
  // =========================================
  // INFORMASI UMUM
  // =========================================
  appName: 'Akreditasi Doc Generator',
  version: '1.0.0',
  tahunAjaran: '2025/2026',
  semester: ['Ganjil', 'Genap'],

  // =========================================
  // REGULASI & REFERENSI
  // =========================================
  regulasi: {
    instrumenAkreditasi: {
      nomor: 'Kepmendikbudristek No. 246/O/2024',
      tentang: 'Instrumen Akreditasi BAN-PDM untuk Satuan Pendidikan'
    },
    cpKelasAwal: {
      nomor: 'Keputusan Kepala BSKAP No. 046/H/KR/2025',
      tentang: 'Capaian Pembelajaran untuk Kelas Awal',
      fase: ['A', 'D-awal', 'E']
    },
    cpKelasBerjalan: {
      nomor: 'Keputusan Kepala BSKAP No. 032/H/KR/2024',
      tentang: 'Capaian Pembelajaran untuk Kelas Berjalan',
      fase: ['B', 'C', 'D', 'E', 'F']
    },
    karakter: {
      nomor: 'Keputusan Kepala BSKAP No. 058/H/KR/2025',
      tentang: 'Alur Perkembangan Kompetensi'
    },
    kurikulum: {
      nama: 'Kurikulum Merdeka',
      panduan: 'Panduan Pembelajaran dan Asesmen (PPA) Revisi 2024/2025'
    }
  },

  // =========================================
  // PAKET PROGRAM KESETARAAN
  // =========================================
  packages: {
    A: {
      nama: 'Paket A',
      setara: 'SD/MI',
      fase: ['A', 'B', 'C'],
      faseAktif: 'C',
      jpMenit: 35,
      levelHOTS: 'Menganalisis (C4)',
      kelasRange: ['I', 'II', 'III', 'IV', 'V', 'VI'],
      keterampilan: 'Fungsional (literasi & numerasi rumah tangga)',
      remedialFokus: 'Diagnostik dasar kemampuan baca-tulis-hitung',
      kesepakatan: 'Visual (gambar & simbol sederhana)',
      usia: '7-12 tahun atau lebih',
      mapelWajib: ['Bahasa Indonesia', 'Matematika', 'Pendidikan Agama Islam dan Budi Pekerti']
    },
    B: {
      nama: 'Paket B',
      setara: 'SMP/MTs',
      fase: ['D'],
      faseAktif: 'D',
      jpMenit: 40,
      levelHOTS: 'Mengevaluasi (C5)',
      kelasRange: ['VII', 'VIII', 'IX'],
      keterampilan: 'Okupasional & wirausaha dasar',
      remedialFokus: 'Penguatan konsep & keterampilan dasar',
      kesepakatan: 'Normatif (kesepakatan tertulis bersama)',
      usia: '13-15 tahun atau lebih',
      mapelWajib: ['Bahasa Indonesia', 'Matematika', 'Pendidikan Agama Islam dan Budi Pekerti']
    },
    C: {
      nama: 'Paket C',
      setara: 'SMA/MA',
      fase: ['E', 'F'],
      faseAktif: 'E',
      jpMenit: 45,
      levelHOTS: 'Mencipta (C6)',
      kelasRange: ['X', 'XI', 'XII'],
      keterampilan: 'Vokasional, proposal usaha, kesiapan dunia kerja',
      remedialFokus: 'Persiapan kompetensi kelulusan & vokasi',
      kesepakatan: 'Profesional (kontrak belajar fleksibel)',
      usia: '16-18 tahun atau lebih',
      mapelWajib: ['Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Pendidikan Agama Islam dan Budi Pekerti']
    }
  },

  // =========================================
  // MATA PELAJARAN PER PAKET
  // =========================================
  subjects: {
    A: {
      umum: [
        'Pendidikan Agama Islam dan Budi Pekerti',
        'Pendidikan Pancasila',
        'Bahasa Indonesia',
        'Matematika',
        'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
        'Pendidikan Jasmani Olahraga dan Kesehatan',
        'Seni dan Budaya',
        'Bahasa Inggris'
      ],
      pemberdayaan: [
        'Keterampilan Fungsional Literasi',
        'Keterampilan Fungsional Numerasi',
        'Keterampilan Hidup Sehari-hari'
      ]
    },
    B: {
      umum: [
        'Pendidikan Agama Islam dan Budi Pekerti',
        'Pendidikan Pancasila',
        'Bahasa Indonesia',
        'Matematika',
        'Ilmu Pengetahuan Alam',
        'Ilmu Pengetahuan Sosial',
        'Bahasa Inggris',
        'Pendidikan Jasmani Olahraga dan Kesehatan',
        'Seni dan Budaya',
        'Informatika'
      ],
      pemberdayaan: [
        'Keterampilan Okupasional',
        'Kewirausahaan Dasar',
        'Pemberdayaan Masyarakat'
      ]
    },
    C: {
      umum: [
        'Pendidikan Agama Islam dan Budi Pekerti',
        'Pendidikan Pancasila',
        'Bahasa Indonesia',
        'Matematika',
        'Bahasa Inggris',
        'Sejarah',
        'Seni dan Budaya',
        'Pendidikan Jasmani Olahraga dan Kesehatan',
        'Informatika'
      ],
      peminatan: [
        'Biologi', 'Fisika', 'Kimia',
        'Ekonomi', 'Sosiologi', 'Geografi'
      ],
      pemberdayaan: [
        'Keterampilan Vokasional',
        'Penyusunan Proposal Usaha',
        'Kesiapan Dunia Kerja',
        'Pemberdayaan Masyarakat Lanjut'
      ]
    }
  },

  // =========================================
  // DIMENSI KOMPETENSI / KARAKTER
  // =========================================
  profilPelajarPancasila: [
    'Keimanan, Ketakwaan kepada Tuhan YME, dan Akhlak Mulia',
    'Kewargaan',
    'Penalaran Kritis',
    'Kreativitas',
    'Kolaborasi',
    'Kemandirian',
    'Kesehatan',
    'Komunikasi'
  ],

  // =========================================
  // DEFINISI BUTIR & INDIKATOR (KOMPONEN 1)
  // =========================================
  butirs: [
    {
      id: 1,
      judul: 'Dukungan Sosial Emosional bagi Peserta Didik',
      deskripsi: 'Pendidik menyediakan dukungan sosial emosional bagi peserta didik dalam proses pembelajaran.',
      komponen: 1,
      indikators: [
        {
          id: '1.1',
          judul: 'Interaksi yang setara dan saling menghargai',
          dokumen: [
            { id: 'B1-1.1-01', nama: 'Format Dokumentasi Kegiatan Diskusi Kelas', tipe: 'format', icon: '📋', perMapel: false },
            { id: 'B1-1.1-02', nama: 'Angket Kepuasan Siswa tentang Suasana Interaksi', tipe: 'angket', icon: '📊', perMapel: false },
            { id: 'B1-1.1-03', nama: 'Format Catatan Supervisi/Observasi Pembelajaran', tipe: 'format', icon: '📝', perMapel: false }
          ]
        },
        {
          id: '1.2',
          judul: 'Interaksi yang membangun pola pikir bertumbuh',
          dokumen: [
            { id: 'B1-1.2-01', nama: 'RPP/Modul Ajar dengan Strategi Growth Mindset', tipe: 'rpp', icon: '📄', perMapel: true },
            { id: 'B1-1.2-02', nama: 'Template Portofolio Refleksi Perkembangan Diri Siswa', tipe: 'portofolio', icon: '📁', perMapel: false },
            { id: 'B1-1.2-03', nama: 'Lembar Umpan Balik Guru (Proses vs Hasil)', tipe: 'format', icon: '✏️', perMapel: false }
          ]
        },
        {
          id: '1.3',
          judul: 'Memberi perhatian dan bantuan pada murid yang membutuhkan dukungan lebih/ekstra',
          dokumen: [
            { id: 'B1-1.3-01', nama: 'Program Remedial dan Pengayaan', tipe: 'program', icon: '🎯', perMapel: false },
            { id: 'B1-1.3-02', nama: 'Jurnal Pendampingan Khusus Murid', tipe: 'jurnal', icon: '📓', perMapel: false },
            { id: 'B1-1.3-03', nama: 'Hasil Asesmen Diagnostik Awal', tipe: 'asesmen', icon: '🔍', perMapel: false },
            { id: 'B1-1.3-04', nama: 'Format Buku Penghubung Guru-Orang Tua', tipe: 'format', icon: '📬', perMapel: false }
          ]
        },
        {
          id: '1.4',
          judul: 'Strategi pengajaran yang membangun keterampilan sosial emosional pada murid',
          dokumen: [
            { id: 'B1-1.4-01', nama: 'RPP/Modul Ajar Kolaboratif (PBL, Role Play)', tipe: 'rpp', icon: '📄', perMapel: true },
            { id: 'B1-1.4-02', nama: 'LKPD Kerja Sama dan Empati', tipe: 'lkpd', icon: '📝', perMapel: false },
            { id: 'B1-1.4-03', nama: 'Format Angket/Observasi Keterampilan Sosial Emosional', tipe: 'angket', icon: '📊', perMapel: false }
          ]
        }
      ]
    },
    {
      id: 2,
      judul: 'Pengelolaan Kelas Aman, Nyaman, Kondusif',
      deskripsi: 'Pendidik mengelola kelas untuk menciptakan suasana belajar yang aman, nyaman, dan mendukung tercapainya tujuan pembelajaran.',
      komponen: 1,
      indikators: [
        {
          id: '2.1',
          judul: 'Kesepakatan kelas yang disusun secara partisipatif',
          dokumen: [
            { id: 'B2-2.1-01', nama: 'Dokumen Kesepakatan Kelas', tipe: 'format', icon: '🤝', perMapel: false },
            { id: 'B2-2.1-02', nama: 'Template Poster Aturan Kelas', tipe: 'format', icon: '🖼️', perMapel: false },
            { id: 'B2-2.1-03', nama: 'Jurnal Penerapan Kesepakatan Kelas', tipe: 'jurnal', icon: '📓', perMapel: false }
          ]
        },
        {
          id: '2.2',
          judul: 'Penegakan disiplin dengan pendekatan positif',
          dokumen: [
            { id: 'B2-2.2-01', nama: 'Pedoman Tata Tertib PKBM (Disiplin Positif)', tipe: 'pedoman', icon: '📜', perMapel: false },
            { id: 'B2-2.2-02', nama: 'Format Catatan Supervisi Pengelolaan Kelas', tipe: 'format', icon: '📋', perMapel: false },
            { id: 'B2-2.2-03', nama: 'Template Angket Rasa Aman dan Nyaman Siswa', tipe: 'angket', icon: '🛡️', perMapel: false }
          ]
        },
        {
          id: '2.3',
          judul: 'Waktu di kelas terfokus pada kegiatan belajar',
          dokumen: [
            { id: 'B2-2.3-01', nama: 'RPP/Modul Ajar Model Pembelajaran Aktif', tipe: 'rpp', icon: '📄', perMapel: true },
            { id: 'B2-2.3-02', nama: 'LKPD Kegiatan Belajar Aktif', tipe: 'lkpd', icon: '📝', perMapel: false },
            { id: 'B2-2.3-03', nama: 'Format Dokumentasi Kegiatan Belajar Siswa', tipe: 'format', icon: '📸', perMapel: false }
          ]
        }
      ]
    },
    {
      id: 3,
      judul: 'Pengelolaan Proses Pembelajaran Efektif & Bermakna',
      deskripsi: 'Pendidik mengelola proses pembelajaran secara efektif dan bermakna.',
      komponen: 1,
      indikators: [
        {
          id: '3.1',
          judul: 'Perencanaan yang memadai untuk mendukung pelaksanaan pembelajaran',
          dokumen: [
            { id: 'B3-3.1-01', nama: 'RPP/Modul Ajar Lengkap', tipe: 'rpp', icon: '📄', perMapel: true },
            { id: 'B3-3.1-02', nama: 'Kalender Akademik', tipe: 'kalender', icon: '📅', perMapel: false },
            { id: 'B3-3.1-03', nama: 'Program Tahunan (Prota)', tipe: 'program', icon: '📋', perMapel: true },
            { id: 'B3-3.1-04', nama: 'Program Semester (Prosem)', tipe: 'program', icon: '📋', perMapel: true },
            { id: 'B3-3.1-05', nama: 'Silabus / Alur Tujuan Pembelajaran (ATP)', tipe: 'silabus', icon: '🗺️', perMapel: true },
            { id: 'B3-3.1-06', nama: 'LKPD Kontekstual', tipe: 'lkpd', icon: '📝', perMapel: true }
          ]
        },
        {
          id: '3.2',
          judul: 'Penilaian formatif digunakan sebagai umpan balik dalam proses pembelajaran',
          dokumen: [
            { id: 'B3-3.2-01', nama: 'Contoh Soal/Tugas Formatif', tipe: 'soal', icon: '❓', perMapel: true },
            { id: 'B3-3.2-02', nama: 'Catatan Hasil Penilaian Formatif', tipe: 'format', icon: '📊', perMapel: true },
            { id: 'B3-3.2-03', nama: 'Jurnal Perkembangan Siswa', tipe: 'jurnal', icon: '📓', perMapel: false },
            { id: 'B3-3.2-04', nama: 'Template Umpan Balik Tertulis', tipe: 'format', icon: '✏️', perMapel: false }
          ]
        },
        {
          id: '3.3',
          judul: 'Penilaian sumatif dilakukan dengan metode yang beragam',
          dokumen: [
            { id: 'B3-3.3-01', nama: 'Soal Ujian Sumatif (Uraian & PG)', tipe: 'soal', icon: '📝', perMapel: true },
            { id: 'B3-3.3-02', nama: 'Kisi-Kisi Soal Ujian', tipe: 'kisi', icon: '🗂️', perMapel: true },
            { id: 'B3-3.3-03', nama: 'Rubrik Penilaian', tipe: 'rubrik', icon: '📐', perMapel: true },
            { id: 'B3-3.3-04', nama: 'Daftar Nilai Siswa', tipe: 'format', icon: '📊', perMapel: true }
          ]
        },
        {
          id: '3.4',
          judul: 'Hasil penilaian dilaporkan secara informatif untuk mendorong tindak lanjut',
          dokumen: [
            { id: 'B3-3.4-01', nama: 'Template Rapor/Laporan Hasil Belajar', tipe: 'rapor', icon: '📑', perMapel: false },
            { id: 'B3-3.4-02', nama: 'Rekapitulasi Nilai & Analisis Capaian', tipe: 'format', icon: '📊', perMapel: true },
            { id: 'B3-3.4-03', nama: 'Program Remedial dan Pengayaan', tipe: 'program', icon: '🎯', perMapel: false },
            { id: 'B3-3.4-04', nama: 'Format Komunikasi Orang Tua', tipe: 'format', icon: '📬', perMapel: false }
          ]
        },
        {
          id: '3.5',
          judul: 'Praktik pengajaran HOTS dan kontekstual',
          dokumen: [
            { id: 'B3-3.5-01', nama: 'RPP/Modul Ajar Berbasis HOTS', tipe: 'rpp', icon: '📄', perMapel: true },
            { id: 'B3-3.5-02', nama: 'LKPD Analisis & Berpikir Kritis', tipe: 'lkpd', icon: '🧠', perMapel: true },
            { id: 'B3-3.5-03', nama: 'Template Proyek PBL', tipe: 'pbl', icon: '🔬', perMapel: false }
          ]
        }
      ]
    },
    {
      id: 4,
      judul: 'Pembelajaran Efektif (Iman, Bangsa, Nalar, Karakter)',
      deskripsi: 'Pendidik memfasilitasi pembelajaran yang efektif dalam membangun keimanan, ketakwaan, komitmen kebangsaan, kemampuan bernalar dan memecahkan masalah, serta karakter dan kompetensi lainnya.',
      komponen: 1,
      indikators: [
        {
          id: '4.1',
          judul: 'Pembelajaran yang efektif menguatkan keimanan dan ketakwaan',
          dokumen: [
            { id: 'B4-4.1-01', nama: 'Jadwal Kegiatan Keagamaan', tipe: 'jadwal', icon: '🕌', perMapel: false },
            { id: 'B4-4.1-02', nama: 'RPP Integrasi Nilai Keimanan dan Ketakwaan', tipe: 'rpp', icon: '📄', perMapel: true },
            { id: 'B4-4.1-03', nama: 'Jurnal Pembiasaan Akhlak Mulia Siswa', tipe: 'jurnal', icon: '📓', perMapel: false }
          ]
        },
        {
          id: '4.2',
          judul: 'Pembelajaran menumbuhkan kecintaan pada sejarah, budaya, dan karya bangsa',
          dokumen: [
            { id: 'B4-4.2-01', nama: 'RPP Muatan Lokal/Sejarah/Budaya', tipe: 'rpp', icon: '📄', perMapel: false },
            { id: 'B4-4.2-02', nama: 'Program Peringatan Hari Besar Nasional', tipe: 'program', icon: '🇮🇩', perMapel: false },
            { id: 'B4-4.2-03', nama: 'Template Karya Siswa tentang Budaya', tipe: 'format', icon: '🎨', perMapel: false }
          ]
        },
        {
          id: '4.3',
          judul: 'Pembelajaran memfasilitasi bernalar dan pemecahan masalah',
          dokumen: [
            { id: 'B4-4.3-01', nama: 'LKPD Berbasis HOTS', tipe: 'lkpd', icon: '🧠', perMapel: true },
            { id: 'B4-4.3-02', nama: 'Format Penilaian Berpikir Kritis', tipe: 'format', icon: '📐', perMapel: false },
            { id: 'B4-4.3-03', nama: 'Template Proyek PBL', tipe: 'pbl', icon: '🔬', perMapel: false }
          ]
        },
        {
          id: '4.4',
          judul: 'Pembelajaran membangun kompetensi dan/atau karakter sesuai misi pendidikan',
          dokumen: [
            { id: 'B4-4.4-01', nama: 'Dokumen Visi, Misi, dan Tujuan PKBM', tipe: 'visi-misi', icon: '🏫', perMapel: false },
            { id: 'B4-4.4-02', nama: 'Program Projek Penguatan Karakter', tipe: 'program', icon: '⭐', perMapel: false },
            { id: 'B4-4.4-03', nama: 'Program Ekstrakurikuler & Pembinaan Karakter', tipe: 'program', icon: '🏆', perMapel: false },
            { id: 'B4-4.4-04', nama: 'Template Portofolio Pencapaian Siswa', tipe: 'portofolio', icon: '📁', perMapel: false }
          ]
        }
      ]
    }
  ],

  // =========================================
  // DAFTAR HARI BESAR NASIONAL (untuk Butir 4.2)
  // =========================================
  hariBesarNasional: [
    { tanggal: '17 Agustus', nama: 'Hari Kemerdekaan RI', kegiatan: 'Upacara bendera, lomba 17-an, pentas seni' },
    { tanggal: '10 November', nama: 'Hari Pahlawan', kegiatan: 'Pengenalan tokoh pahlawan, drama sejarah' },
    { tanggal: '2 Oktober', nama: 'Hari Batik Nasional', kegiatan: 'Memakai batik, belajar motif batik daerah' },
    { tanggal: '28 Oktober', nama: 'Hari Sumpah Pemuda', kegiatan: 'Diskusi persatuan, penampilan kebudayaan daerah' },
    { tanggal: '21 April', nama: 'Hari Kartini', kegiatan: 'Seminar kesetaraan gender, busana daerah' },
    { tanggal: '2 Mei', nama: 'Hari Pendidikan Nasional', kegiatan: 'Upacara, penghargaan peserta didik berprestasi' },
    { tanggal: '1 Juni', nama: 'Hari Lahir Pancasila', kegiatan: 'Pendalaman nilai-nilai Pancasila' },
    { tanggal: '22 Desember', nama: 'Hari Ibu', kegiatan: 'Menulis surat untuk ibu, apresiasi perempuan' }
  ],

  // =========================================
  // DIMENSI P5 (untuk Butir 4.4)
  // =========================================
  temaP5: [
    'Gaya Hidup Berkelanjutan',
    'Kearifan Lokal',
    'Bhinneka Tunggal Ika',
    'Bangunlah Jiwa dan Raganya',
    'Suara Demokrasi',
    'Berekayasa dan Berteknologi untuk Membangun NKRI',
    'Kewirausahaan'
  ],

  // =========================================
  // HELPER: Hitung Total Dokumen
  // =========================================
  getTotalDocuments() {
    let total = 0;
    this.butirs.forEach(b => {
      b.indikators.forEach(ind => {
        total += ind.dokumen.length;
      });
    });
    return total;
  },

  /**
   * Hitung total file nyata yang akan di-generate (termasuk multiply per mapel)
   */
  getTotalFiles(paket) {
    const pkg = this.packages[paket];
    if (!pkg) return this.getTotalDocuments();
    const mapelCount = pkg.mapelWajib.length;
    let total = 0;
    this.butirs.forEach(b => {
      b.indikators.forEach(ind => {
        ind.dokumen.forEach(d => {
          total += d.perMapel ? mapelCount : 1;
        });
      });
    });
    return total;
  },

  getDocumentsByButir(butirId) {
    const butir = this.butirs.find(b => b.id === butirId);
    if (!butir) return [];
    const docs = [];
    butir.indikators.forEach(ind => {
      ind.dokumen.forEach(d => {
        docs.push({ ...d, indikator: ind.id, indikatorJudul: ind.judul });
      });
    });
    return docs;
  },

  /**
   * Lookup satu dokumen berdasarkan ID
   */
  getDocInfo(docId) {
    for (const b of this.butirs) {
      for (const ind of b.indikators) {
        for (const d of ind.dokumen) {
          if (d.id === docId) return { ...d, butir: b.id, indikator: ind.id };
        }
      }
    }
    return null;
  },

  getAllDocuments() {
    const docs = [];
    this.butirs.forEach(b => {
      b.indikators.forEach(ind => {
        ind.dokumen.forEach(d => {
          docs.push({ ...d, butir: b.id, butirJudul: b.judul, indikator: ind.id, indikatorJudul: ind.judul });
        });
      });
    });
    return docs;
  }
};
