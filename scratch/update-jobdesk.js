const fs = require('fs');

const path = 'c:/Users/sjeff/Downloads/akreditas/generate-jobdesk.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Mapel Wajib Texts
content = content.replace(
  '["Paket A (SD/MI)", "Bahasa Indonesia, Matematika", "PAI dan Budi Pekerti", "3 mapel"],\n        ["Paket B (SMP/MTs)", "Bahasa Indonesia, Matematika", "PAI dan Budi Pekerti", "3 mapel"],\n        ["Paket C (SMA/MA)", "Bahasa Indonesia, Matematika, B. Inggris", "PAI dan Budi Pekerti", "4 mapel"],',
  '["Paket A (SD)", "B.Indo, Mat", "PAI, Pancasila, IPAS", "5 mapel"],\n        ["Paket B (SMP)", "B.Indo, Mat", "PAI, Pancasila, IPA", "5 mapel"],\n        ["Paket C (SMA)", "B.Indo, Mat, B.Ing", "PAI, Pancasila, Geografi", "6 mapel"],'
);
content = content.replace(
  '["Mapel TKA", "B.Indo + Mat", "B.Indo + Mat", "B.Indo + Mat + B.Ing"],',
  '["Total Mapel Wajib", "5 Mapel (IPAS)", "5 Mapel (IPA)", "6 Mapel (Geografi)"],'
);
content = content.replace(
  'text: "Paket A & B: Bahasa Indonesia, Matematika + PAI"',
  'text: "Paket A & B: B.Indo, Matematika, PAI, Pancasila, IPA/IPAS"'
);
content = content.replace(
  'text: "Paket C: Bahasa Indonesia, Matematika, Bahasa Inggris + PAI"',
  'text: "Paket C: B.Indo, Mat, B.Ing, PAI, Pancasila, Geografi"'
);

// 2. We remove lines from 356 (heading2("Paket A...)) down to 895 (end of Paket C).
// To do this reliably, we'll use regex.
const regex = /heading2\("Paket A — 3 Orang.*?\/\/ ========== HALAMAN PENUTUP ==========/s;

const newData = `heading2("Paket A — 6 Orang (Fase C | 35 mnt | 5 Mapel Wajib)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Naela", "Butir 3 (3.1 & 3.5)", "9 dok", "RPP/Modul Ajar & Turunannya"],
        ["Abdul Hadi", "Butir 3 (3.2 - 3.4)", "11 dok", "Soal Evaluasi AI & Penilaian"],
        ["Anita", "Butir 1 (1.1 & 1.2)", "6 dok", "Diskusi Kelas & Laporan Ortu"],
        ["Asandri", "Butir 1 (1.3 & 1.4)", "7 dok", "Asesmen Diagnostik & Pendampingan"],
        ["Nafis", "Butir 2 (Semua)", "9 dok", "Tata Tertib & Rasa Aman Siswa"],
        ["Rika", "Butir 4 (Semua)", "13 dok", "Visi-Misi & Kegiatan Keagamaan"],
      ],
      { colWidths: [18, 28, 14, 40] }
    ),
    empty(),
    heading2("Paket B — 11 Orang (Fase D | 40 mnt | 5 Mapel Wajib)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Siska", "Butir 3 (3.1 & 3.5)", "9 dok", "RPP Tingkat SMP & Turunannya"],
        ["Handry", "Butir 3 (3.2 & 3.3)", "6 dok", "Kisi-kisi & Soal HOTS (C5)"],
        ["Husen", "Butir 3 (3.4)", "5 dok", "Rubrik Penilaian & Remedial"],
        ["Salim", "Butir 1 (1.1)", "3 dok", "Angket Kepuasan Siswa"],
        ["Romadi", "Butir 1 (1.2)", "3 dok", "Lembar Refleksi"],
        ["Eva", "Butir 1 (1.3 & 1.4)", "7 dok", "Buku Penghubung Ortu"],
        ["Gati", "Butir 2 (2.1)", "3 dok", "Kesepakatan Kelas"],
        ["Zalfa", "Butir 2 (2.2 & 2.3)", "6 dok", "Supervisi Kelas & LKPD"],
        ["Adi", "Butir 4 (4.1)", "3 dok", "Jadwal Agama & Jurnal Keimanan"],
        ["Apriyanto", "Butir 4 (4.2)", "3 dok", "Program Hari Besar Nasional"],
        ["Nadia", "Butir 4 (4.3 & 4.4)", "7 dok", "Portofolio Siswa & Kegiatan P5"],
      ],
      { colWidths: [16, 25, 14, 45] }
    ),
    empty(),
    heading2("Paket C — 10 Orang (Fase E | 45 mnt | 6 Mapel Wajib)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Dea", "Butir 3 (3.1 & 3.5)", "9 dok", "RPP Tingkat SMA/Vokasi"],
        ["Jufri", "Butir 3 (3.2 & 3.3)", "6 dok", "Kisi-kisi & Soal Analitis (C6)"],
        ["Lilik", "Butir 3 (3.4)", "5 dok", "Evaluasi & Daftar Nilai"],
        ["Riki", "Butir 1 (1.1 & 1.2)", "6 dok", "Asesmen Kognitif Awal"],
        ["Dia", "Butir 1 (1.3 & 1.4)", "7 dok", "Pengawasan Laporan & Jurnal"],
        ["Ronald", "Butir 2 (2.1 & 2.2)", "6 dok", "Kontrak Belajar Dewasa & Tata Tertib"],
        ["Ulfa", "Butir 2 (2.3)", "3 dok", "Dokumentasi Belajar & LKPD"],
        ["Leo", "Butir 4 (4.1)", "3 dok", "RPP Integrasi Keimanan"],
        ["Imam", "Butir 4 (4.2 & 4.3)", "6 dok", "Karya Budaya & LKPD HOTS"],
        ["Laila", "Butir 4 (4.4)", "4 dok", "Karya Vokasional & Portofolio"],
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
      ["1", "B3-3.1-01 s.d 06", "RPP, Prota, Prosem, ATP, Kalender, LKPD", "TINGGI", "Generate per mapel. Isi TP/CP"],
      ["2", "B3-3.5-01 s.d 03", "RPP HOTS, LKPD Kritis, Template Proyek", "TINGGI", "Generate per mapel. Lanjutkan rumusan AI"]
    ],
    "Abdul Hadi": [
      ["1", "B3-3.2-01 s.d 04", "Soal Formatif, Jurnal, Umpan Balik", "TINGGI", "Generate & review 5-10 soal PG/Essay dari AI"],
      ["2", "B3-3.3-01 s.d 04", "Soal Sumatif, Kisi-kisi, Rubrik", "TINGGI", "Review 20 PG + 5 Uraian Sumatif dari AI"],
      ["3", "B3-3.4-02", "Rekapitulasi", "SEDANG", "Evaluasi"]
    ],
    "Anita": [
      ["1", "B1-1.1-01 s.d 03", "Dok diskusi, Angket Kepuasan, Catatan Supervisi", "TINGGI", "Minta kepsek isi catatan observasi"],
      ["2", "B1-1.2-01 s.d 03", "RPP Growth Mindset, Portofolio, Umpan Balik Tutor", "TINGGI", "Generate per mapel & kumpulkan jurnal siswa"]
    ],
    "Asandri": [
      ["1", "B1-1.3-01 s.d 04", "Proker Remedial, Jurnal Pendampingan, Asesmen Diagnostik, Buku Ortu", "TINGGI", "Gali data siswa remedial dan gaya belajar"],
      ["2", "B1-1.4-01 s.d 03", "RPP PBL, LKPD Empati, Angket", "TINGGI", "Buat RPP yg berfokus pada kolaborasi antar kelompok"]
    ],
    "Nafis": [
      ["1", "B2-2.1-01 s.d 03", "Kesepakatan, Poster Aturan, Jurnal Kelas", "TINGGI", "Buat poster menarik bergambar untuk siswa SD"],
      ["2", "B2-2.2-01 s.d 03", "Tata Tertib, Supervisi Kelas, Angket Aman", "TINGGI", "Cetak tata tertib bahasa positif tanpa hukuman fisik"],
      ["3", "B2-2.3-01 s.d 03", "RPP Belajar Aktif, LKPD, Dok Belajar", "TINGGI", "Lampirkan banyak foto siswa SD belajar"]
    ],
    "Rika": [
      ["1", "B4-4.1-01 s.d 03", "Jadwal Agama, RPP Iman, Jurnal Akhlak", "TINGGI", "Data pembiasaan agama/shalat Dhuha di PKBM"],
      ["2", "B4-4.2-01 s.d 03", "RPP Budaya, Peringatan Hari Besar, Karya Budaya", "TINGGI", "Data lomba 17 Agustus atau Maulid Nabi"],
      ["3", "B4-4.3-01 s.d 03", "LKPD HOTS, Penilaian Kritis, Template Proyek", "TINGGI", "LKPD spesifik berbasis penalaran SD"],
      ["4", "B4-4.4-01 s.d 04", "Visi Misi, Ekskul, Projek Karakter, Portofolio", "TINGGI", "Deskripsikan cita-cita karakter SD Miftahul Khoir"]
    ]
  };

  Object.keys(aDocs).forEach(name => {
    children.push(
      pageBreak(),
      heading1("📦 PAKET A — " + name.toUpperCase()),
      para("Fase C | 35 mnt/JP | B.Indo, Mat, PAI, Pancasila, IPAS", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Daftar Dokumen (" + aDocs[name].length + " Indikator/Fokus)"),
      makeTable(["No", "Target Generasi", "Berisi Dokumen", "Prioritas", "Aksi"], aDocs[name], { colWidths: [5, 20, 25, 10, 40] })
    );
  });

  // ========== PAKET B MEMBERS ==========
  const bDocs = {
    "Siska": [
      ["1", "B3-3.1-01 s.d 06", "RPP, Prota, Prosem, ATP, Kalender, LKPD", "TINGGI", "Cetak RPP level SMP/Sederajat per mata pelajaran"],
      ["2", "B3-3.5-01 s.d 03", "RPP HOTS, LKPD Kritis, Template Proyek", "TINGGI", "Rancang Modul Ajar level C5 (Mengevaluasi)"]
    ],
    "Handry": [
      ["1", "B3-3.2-01 s.d 04", "Soal Formatif, Jurnal, Umpan Balik", "TINGGI", "Rumuskan formatif C5 yg ditembak AI"],
      ["2", "B3-3.3-01 & 02", "Soal Sumatif, Kisi-kisi", "TINGGI", "Uji kualitas Kisi-kisi dan Butir Soal"]
    ],
    "Husen": [
      ["1", "B3-3.3-03 & 04", "Rubrik Penilaian, Daftar Nilai", "SEDANG", "Susun perhitungan Kriteria Ketercapaian Tujuan Pembelajaran"],
      ["2", "B3-3.4-01 s.d 04", "Rapor, Rekapitulasi, Program Remedial, Ortu", "TINGGI", "Rekap daftar nilai dan cetak Rapor"]
    ],
    "Salim": [
      ["1", "B1-1.1-01 s.d 03", "Dok diskusi, Angket Kepuasan, Catatan Supervisi", "TINGGI", "Print angket kepuasan siswa SMP, minta mereka isi"]
    ],
    "Romadi": [
      ["1", "B1-1.2-01 s.d 03", "RPP Growth Mindset, Portofolio, Umpan Balik Tutor", "TINGGI", "Buat portofolio jurnal pendirian mental diri siswa SMP"]
    ],
    "Eva": [
      ["1", "B1-1.3-01 s.d 04", "Proker Remedial, Jurnal Pendampingan, Asesmen Diagnostik, Buku Ortu", "TINGGI", "Deteksi siswa yg tak lulus CP dan tulis di jurnal pendampingan"],
      ["2", "B1-1.4-01 s.d 03", "RPP PBL, LKPD Empati, Angket", "TINGGI", "Cetak angket keterampilan sosial SMP"]
    ],
    "Gati": [
      ["1", "B2-2.1-01 s.d 03", "Kesepakatan, Poster Aturan, Jurnal Kelas", "TINGGI", "Susun draf kesepakatan tertulis bagi ABG SMP"]
    ],
    "Zalfa": [
      ["1", "B2-2.2-01 s.d 03", "Tata Tertib, Supervisi Kelas, Angket Aman", "TINGGI", "Fokus aturan pencegahan perundungan (Anti-Bullying)"],
      ["2", "B2-2.3-01 s.d 03", "RPP Belajar Aktif, LKPD, Dok Belajar", "TINGGI", "Kegiatan Diskusi Kelompok dan presentasi ABG"]
    ],
    "Adi": [
      ["1", "B4-4.1-01 s.d 03", "Jadwal Agama, RPP Iman, Jurnal Akhlak", "TINGGI", "Cetak jadwal dan tata tertib tadarus/sholat berjamaah"]
    ],
    "Apriyanto": [
      ["1", "B4-4.2-01 s.d 03", "RPP Budaya, Peringatan Hari Besar, Karya Budaya", "TINGGI", "Catat partisipasi siswa PKBM dalam Pentas Seni"]
    ],
    "Nadia": [
      ["1", "B4-4.3-01 s.d 03", "LKPD HOTS, Penilaian Kritis, Template Proyek", "TINGGI", "Rubrik P5 tahap 1"],
      ["2", "B4-4.4-01 s.d 04", "Visi Misi, Ekskul, Projek Karakter, Portofolio", "TINGGI", "Tema pengenalan Wirausaha di usia SMP"]
    ]
  };

  Object.keys(bDocs).forEach(name => {
    children.push(
      pageBreak(),
      heading1("📦 PAKET B — " + name.toUpperCase()),
      para("Fase D | 40 mnt/JP | B.Indo, Mat, PAI, Pancasila, IPA", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Daftar Dokumen (" + bDocs[name].length + " Indikator/Fokus)"),
      makeTable(["No", "Target Generasi", "Berisi Dokumen", "Prioritas", "Aksi"], bDocs[name], { colWidths: [5, 20, 25, 10, 40] })
    );
  });

  // ========== PAKET C MEMBERS ==========
  const cDocs = {
    "Dea": [
      ["1", "B3-3.1-01 s.d 06", "RPP, Prota, Prosem, ATP, Kalender, LKPD", "TINGGI", "Pengayaan RPP level Tinggi (SMA/Sederajat) arah Vokasi/Karier"],
      ["2", "B3-3.5-01 s.d 03", "RPP HOTS, LKPD Kritis, Template Proyek", "TINGGI", "Modul C6 (Mencipta/Mendesain/Merancang) via AI"]
    ],
    "Jufri": [
      ["1", "B3-3.2-01 s.d 04", "Soal Formatif, Jurnal, Umpan Balik", "TINGGI", "Review kualitas soal evaluasi yang diciptakan Gemini AI"],
      ["2", "B3-3.3-01 & 02", "Soal Sumatif, Kisi-kisi", "TINGGI", "Soal harus ada Analisis SWOT atau Problem Solving"]
    ],
    "Lilik": [
      ["1", "B3-3.3-03 & 04", "Rubrik Penilaian, Daftar Nilai", "SEDANG", "Rubrik Penilaian Presentasi / Praktek Bisnis"],
      ["2", "B3-3.4-01 s.d 04", "Rapor, Rekapitulasi, Program Remedial, Ortu", "TINGGI", "Cetak transkrip evaluasi Rapor SMA/Sederajat"]
    ],
    "Riki": [
      ["1", "B1-1.1-01 s.d 03", "Dok diskusi, Angket Kepuasan, Catatan Supervisi", "TINGGI", "Lampirkan bukti foto siswa pekerja dan fleksibilitas jadwal"],
      ["2", "B1-1.2-01 s.d 03", "RPP Growth Mindset, Portofolio, Umpan Balik Tutor", "TINGGI", "Catat portfolio mental kedewasaan belajar Paket C"]
    ],
    "Dia": [
      ["1", "B1-1.3-01 s.d 04", "Proker Remedial, Jurnal Pendampingan, Asesmen Diagnostik, Buku Ortu", "TINGGI", "Evaluasi bagi pemuda putus sekolah lama"],
      ["2", "B1-1.4-01 s.d 03", "RPP PBL, LKPD Empati, Angket", "TINGGI", "Membantu motivasi anak didik usia dewasa"]
    ],
    "Ronald": [
      ["1", "B2-2.1-01 s.d 03", "Kesepakatan, Poster Aturan, Jurnal Kelas", "TINGGI", "Disiplin Andragogi (Orang Dewasa) lewat Kontrak Belajar"],
      ["2", "B2-2.2-01 s.d 03", "Tata Tertib, Supervisi Kelas, Angket Aman", "TINGGI", "Regulasi profesional PKBM tingkat atas"]
    ],
    "Ulfa": [
      ["1", "B2-2.3-01 s.d 03", "RPP Belajar Aktif, LKPD, Dok Belajar", "TINGGI", "Cetak bukti belajar proyek nyata Paket C"]
    ],
    "Leo": [
      ["1", "B4-4.1-01 s.d 03", "Jadwal Agama, RPP Iman, Jurnal Akhlak", "TINGGI", "Integrasi kajian Islam dan Toleransi Dewasa"]
    ],
    "Imam": [
      ["1", "B4-4.2-01 s.d 03", "RPP Budaya, Peringatan Hari Besar, Karya Budaya", "TINGGI", "Partisipasi Panggung Seni Pemuda PKBM"],
      ["2", "B4-4.3-01 s.d 03", "LKPD HOTS, Penilaian Kritis, Template Proyek", "TINGGI", "Rubrik Proposal Karya Siswa Paket C"]
    ],
    "Laila": [
      ["1", "B4-4.4-01 s.d 04", "Visi Misi, Ekskul, Projek Karakter, Portofolio", "TINGGI", "Fokus Dokumentasi Produk Wirausaha Nyata Siap Kurikulum P5"]
    ]
  };

  Object.keys(cDocs).forEach(name => {
    children.push(
      pageBreak(),
      heading1("📦 PAKET C — " + name.toUpperCase()),
      para("Fase E | 45 mnt/JP | B.Indo, Mat, B.Ing, PAI, Pancasila, Geografi", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Daftar Dokumen (" + cDocs[name].length + " Indikator/Fokus)"),
      makeTable(["No", "Target Generasi", "Berisi Dokumen", "Prioritas", "Aksi"], cDocs[name], { colWidths: [5, 20, 25, 10, 40] })
    );
  });

  // ========== HALAMAN PENUTUP ==========`;

content = content.replace(regex, newData);

fs.writeFileSync(path, content, 'utf8');
console.log('generate-jobdesk.js has been successfully updated with the new team structures.');
