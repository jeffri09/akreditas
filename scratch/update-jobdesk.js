const fs = require('fs');

const path = 'c:/Users/sjeff/Downloads/akreditas/generate-jobdesk.js';
let content = fs.readFileSync(path, 'utf8');

const regex = /heading2\("Paket A — 6 Orang.*?========== HALAMAN PENUTUP ==========/s;

const newData = `heading2("Paket A — 6 Orang (Fase C | 35 mnt | 5 Mapel Wajib)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Naela", "Butir 3 (3.1 & 3.5)", "9 dok", "RPP/Modul Matematika & IPAS"],
        ["Abdul Hadi", "Butir 3 (3.2 - 3.4)", "11 dok", "RPP B.Indo & Pancasila \\n Evaluasi"],
        ["Anita", "Butir 1 (1.1 & 1.2)", "6 dok", "RPP PAI & Budi Pekerti\\n Diskusi"],
        ["Asandri", "Butir 1 (1.3 & 1.4)", "7 dok", "Kesiswaan & Emosional (B1)"],
        ["Nafis", "Butir 2 (Semua)", "9 dok", "Kedisiplinan & Budaya Aman (B2)"],
        ["Rika", "Butir 4 (Semua)", "13 dok", "Pengembangan Visi & Ekskul P5"],
      ],
      { colWidths: [18, 28, 14, 40] }
    ),
    empty(),
    heading2("Paket B — 11 Orang (Fase D | 40 mnt | 5 Mapel Wajib)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Siska", "Butir 3 (3.1 & 3.5)", "9 dok", "RPP Tingkat SMP & Turunannya (Matematika)"],
        ["Handry", "Butir 3 (3.2 & 3.3)", "6 dok", "Kisi-kisi & Soal HOTS (Bahasa Indonesia)"],
        ["Husen", "Butir 3 (3.4)", "5 dok", "Rubrik Penilaian (PAI)"],
        ["Romadi", "Butir 1 (1.2)", "3 dok", "RPP IPA Terpadu"],
        ["Salim", "Butir 1 (1.1)", "3 dok", "RPP Pendidikan Pancasila"],
        ["Lilik", "Butir 1 (1.3 & 1.4)", "7 dok", "Hubungan Orangtua & Psikologi"],
        ["Gati", "Butir 2 (2.1)", "3 dok", "Program Remedial & BK"],
        ["Zalfa", "Butir 2 (2.2 & 2.3)", "6 dok", "Kontrak Belajar & SOP (Tata Tertib)"],
        ["Adi", "Butir 4 (4.1)", "3 dok", "Supervisi Iklim Keamanan"],
        ["Apriyanto", "Butir 4 (4.2)", "3 dok", "Regulasi Visi Misi & Agenda Keagamaan"],
        ["Eva", "Butir 4 (4.3 & 4.4)", "7 dok", "Logistik Produk P5 & Ekstrakurikuler"],
      ],
      { colWidths: [16, 25, 14, 45] }
    ),
    empty(),
    heading2("Paket C — 10 Orang (Fase E | 45 mnt | 6 Mapel Wajib)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Dea", "Butir 3 (3.1 & 3.5)", "9 dok", "RPP Geografi Tingkat SMA/Vokasi"],
        ["Ulfa", "Butir 3 (3.2 & 3.3)", "6 dok", "Kisi-kisi Matematika"],
        ["Riki", "Butir 3 (3.4)", "5 dok", "Evaluasi B.Indo"],
        ["Nadia", "Butir 1 (1.1 & 1.2)", "6 dok", "Asesmen Bahasa Inggris"],
        ["Dia", "Butir 1 (1.3 & 1.4)", "7 dok", "RPP Pendidikan Pancasila"],
        ["Ronald", "Butir 2 (2.1 & 2.2)", "6 dok", "Pengawasan Laporan/Jurnal PAI"],
        ["Jufri", "Butir 2 (2.3)", "3 dok", "Manajemen Dinamika Orang Dewasa"],
        ["Leo", "Butir 4 (4.1)", "3 dok", "Tata Tertib & Anti-Perundungan Tingkat Atas"],
        ["Imam", "Butir 4 (4.2 & 4.3)", "6 dok", "Visi Misi & Hari Besar Nasional"],
        ["Laila", "Butir 4 (4.4)", "4 dok", "Kewirausahaan, Prakarya, P5"],
      ],
      { colWidths: [16, 25, 14, 45] }
    ),
  );

  // ================================================================
  // DETAIL PER ANGGOTA MULAI DI SINI
  // ================================================================

  // ========== KETUA TIM ==========
  children.push(
    pageBreak(),
    heading1("👑 KETUA TIM: JEFFRI P. & MARISA"),
    para("Peran: Quality Control, Checklist, Follow-up Progress Tim", { bold: true, color: COLOR_PRIMARY }),
    empty(),
    heading3("Tugas Utama"),
    makeTable(
      ["No", "Tugas", "Deadline", "Cara Eksekusi"],
      [
        ["1", "Setup Profil PKBM di Sistem", "19 April", "Buka sistem → Tab Profile → Isi Data"],
        ["2", "Input Data Tutor", "19 April", "Tab Profile → Tambah Tutor"],
        ["3", "Briefing Tugas", "20 April", "Share dokumen ini ke WA Group"],
        ["4", "QC Kop Surat", "Rolling", "Pastikan kop ada tulisan PKBM MIFTAHUL KHOIR"],
        ["5", "QC Alokasi Jam", "Rolling", "Cek kolom JP sesuai aturan"],
        ["6", "Follow-up", "Setiap hari", "WA PJ: 'Ada kendala?'"],
        ["7", "Konsolidasi", "29 April", "Organisir Folder Paket A/B/C dan siap print"],
      ],
      { colWidths: [5, 25, 12, 58] }
    ),
    empty(),
    infoBox("PENTING", "Beritahu semua anggota untuk MEMAKAI FILTER 'PILIH MATA PELAJARAN' di tab Generate agar pemrosesan lancar dan cepat.")
  );

  // ========== PAKET A MEMBERS ==========
  const aDocs = {
    "Naela": [
      ["1", "Semua RPP", "Matematika & IPAS", "TINGGI", "Cetak dokumen RPP untuk 2 Mapel ini lewat Opsi Generate Mapel"],
      ["2", "Soal AI", "LKPD & Formatif Modul", "TINGGI", "Generate per mapel. Lanjutkan rumusan AI"]
    ],
    "Abdul Hadi": [
      ["1", "Semua RPP", "B.Indo & Pancasila", "TINGGI", "Cetak dokumen RPP khusus B.Indo + Pancasila"],
      ["2", "Evaluasi AI", "Soal Sumatif, Kisi-kisi", "TINGGI", "Review 20 PG + 5 Uraian Sumatif dari AI"]
    ],
    "Anita": [
      ["1", "Semua RPP", "PAI & Budi Pekerti", "TINGGI", "Cukup kerjakan mapel PAI"],
      ["2", "Review Religi", "RPP Integrasi Keagamaan", "TINGGI", "Fokus kualitas pendidikan akhlak"]
    ],
    "Asandri": [
      ["1", "B1 Keseluruhan (Non-Mapel)", "Kesiswaan & Emosional", "TINGGI", "Gali data siswa remedial dan gaya belajar"]
    ],
    "Nafis": [
      ["1", "B2 Keseluruhan (Non-Mapel)", "Kedisiplinan & Budaya Aman", "TINGGI", "Buat poster menarik bergambar untuk siswa SD"],
      ["2", "Tata Tertib", "Buku Panduan", "TINGGI", "Cetak tata tertib bahasa positif tanpa hukuman"]
    ],
    "Rika": [
      ["1", "B4 Keseluruhan (Non-Mapel)", "Pengembangan Visi, P5", "TINGGI", "Data pembiasaan shalat/kegiatan ekskul PKBM"]
    ]
  };

  Object.keys(aDocs).forEach(name => {
    children.push(
      pageBreak(),
      heading1("📦 PAKET A — " + name.toUpperCase()),
      para("Fase C | 35 mnt/JP | B.Indo, Mat, PAI, Pancasila, IPAS", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Daftar Tugas"),
      makeTable(["No", "Tanggung Jawab", "Konteks Laporan", "Prioritas", "Aksi"], aDocs[name], { colWidths: [5, 20, 25, 10, 40] })
    );
  });

  // ========== PAKET B MEMBERS ==========
  const bDocs = {
    "Siska": [
      ["1", "Mapel Target", "Matematika", "TINGGI", "Cetak RPP, LKPD, Soal dan Rubrik MURNI Matematika SMP"]
    ],
    "Handry": [
      ["1", "Mapel Target", "Bahasa Indonesia", "TINGGI", "Cetak RPP, LKPD, Soal dan Rubrik MURNI B.Indonesia"]
    ],
    "Husen": [
      ["1", "Mapel Target", "PAI & Budi Pekerti", "TINGGI", "Susun Prota, Silabus, Rapor untuk PAI"]
    ],
    "Romadi": [
      ["1", "Mapel Target", "Ilmu Pengetahuan Alam", "TINGGI", "Susun RPP dan Dokumen Penilaian IPA Terpadu"]
    ],
    "Salim": [
      ["1", "Mapel Target", "Pendidikan Pancasila", "TINGGI", "Cetak modul PKN level SMP"]
    ],
    "Lilik": [
      ["1", "Institusi", "Hub. Ortu & Psikologi Siswa", "TINGGI", "Tangani dokumen laporan orang tua"]
    ],
    "Gati": [
      ["1", "Institusi", "Remedial & Bimbingan Konseling", "TINGGI", "Tangani pendataan siswa tertinggal"]
    ],
    "Zalfa": [
      ["1", "Institusi", "Kontrak Belajar & Tata Tertib", "TINGGI", "Aturan Anti-Bullying bagi Siswa SMP"]
    ],
    "Adi": [
      ["1", "Institusi", "Supervisi Akademik", "TINGGI", "Form pengawasan kepsek & logistik visitasi"]
    ],
    "Apriyanto": [
      ["1", "Institusi", "Regulasi Visi Misi & Agama", "TINGGI", "Penyesuaian tujuan PKBM di SISPENA"]
    ],
    "Eva": [
      ["1", "Institusi", "Logistik P5 & Ekskul", "TINGGI", "Rubrik P5 Kewirausahaan"]
    ]
  };

  Object.keys(bDocs).forEach(name => {
    children.push(
      pageBreak(),
      heading1("📦 PAKET B — " + name.toUpperCase()),
      para("Fase D | 40 mnt/JP | B.Indo, Mat, PAI, Pancasila, IPA", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Daftar Tugas"),
      makeTable(["No", "Tanggung Jawab", "Konteks Laporan", "Prioritas", "Aksi"], bDocs[name], { colWidths: [5, 20, 25, 10, 40] })
    );
  });

  // ========== PAKET C MEMBERS ==========
  const cDocs = {
    "Dea": [
      ["1", "Mapel Target", "Geografi", "TINGGI", "Pengayaan RPP level Tinggi (SMA/Sederajat) arah Vokasi/Karier"]
    ],
    "Ulfa": [
      ["1", "Mapel Target", "Matematika", "TINGGI", "RPP dan LKPD Hitungan Aplikasi"]
    ],
    "Riki": [
      ["1", "Mapel Target", "Bahasa Indonesia", "TINGGI", "Modul C6 (Mencipta/Mendesain/Merancang) via AI B.Indo"]
    ],
    "Nadia": [
      ["1", "Mapel Target", "Bahasa Inggris", "TINGGI", "RPP Grammar Dasar dan Komunikasi"]
    ],
    "Dia": [
      ["1", "Mapel Target", "Pendidikan Pancasila", "TINGGI", "Kesusastraan NKRI Dewasa"]
    ],
    "Ronald": [
      ["1", "Mapel Target", "PAI", "TINGGI", "Toleransi tingkat tinggi (RPP Agama Keimanan)"]
    ],
    "Jufri": [
      ["1", "Institusi", "Dinamika Dewasa", "TINGGI", "Survei Kesiswaan & Portofolio Mental Paket C"]
    ],
    "Leo": [
      ["1", "Institusi", "Tata Tertib Tingkat Atas", "TINGGI", "Disiplin Andragogi (Orang Dewasa) lewat Kontrak Belajar"]
    ],
    "Imam": [
      ["1", "Institusi", "Visi Misi & Keagamaan", "TINGGI", "Integrasi kajian Islam dan Visi resmi PKBM"]
    ],
    "Laila": [
      ["1", "Institusi", "Prakarya, Vokasional & P5", "TINGGI", "Fokus Dokumentasi Produk Wirausaha Nyata Siap Kerja"]
    ]
  };

  Object.keys(cDocs).forEach(name => {
    children.push(
      pageBreak(),
      heading1("📦 PAKET C — " + name.toUpperCase()),
      para("Fase E | 45 mnt/JP | B.Indo, Mat, B.Ing, PAI, Pancasila, Geografi", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Daftar Tugas"),
      makeTable(["No", "Tanggung Jawab", "Konteks Laporan", "Prioritas", "Aksi"], cDocs[name], { colWidths: [5, 20, 25, 10, 40] })
    );
  });

  // ========== HALAMAN PENUTUP ==========`;

content = content.replace(regex, newData);

fs.writeFileSync(path, content, 'utf8');
console.log('generate-jobdesk.js has been completely patched for precise logic.');
