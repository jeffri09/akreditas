/**
 * butir3.js — Template Dokumen Butir 3
 * Pengelolaan Proses Pembelajaran Efektif & Bermakna
 * Termasuk: RPP, Kalender Akademik, Prota, Prosem, ATP, LKPD, Soal, Rubrik, Rapor
 */

const Butir3Templates = {
  // =================================================
  // 3.1-01: RPP/Modul Ajar Lengkap
  // =================================================
  'B3-3.1-01': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Modul Ajar / Rencana Pelaksanaan Pembelajaran'),
      h.heading('Format Lengkap Kurikulum Merdeka', 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Informasi Umum'),
      h.table(
        ['Komponen', 'Keterangan'],
        [
          ['Satuan Pendidikan', ctx.lembaga.nama],
          ['Program', `${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`],
          ['Mata Pelajaran', ctx.mapel],
          ['Kelas / Fase', `_____ / Fase ${ctx.fase}`],
          ['Topik / Bab', '___________________________'],
          ['Alokasi Waktu', `_____ JP × ${ctx.pkg.jpMenit} menit = _____ menit`],
          ['Pertemuan ke-', '_____ dari _____'],
          ['Tahun Ajaran', ctx.tahunAjaran],
          ['Semester', 'Ganjil / Genap *'],
          ['Tutor/Pendidik', '___________________________'],
          ['Moda Pembelajaran', 'Tatap Muka / Daring / Kombinasi *']
        ]
      ),
      h.empty(),
      h.heading('B. Kompetensi Awal'),
      h.para('Kemampuan prasyarat yang perlu dimiliki peserta didik sebelum mempelajari topik ini:', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('C. Alur Perkembangan Kompetensi (Karakter)'),
      h.para('Pilih dimensi yang relevan (beri tanda ✓):', { indent: false }),
      ...CONFIG.profilPelajarPancasila.map(p => h.bullet(`☐ ${p}`)),
      h.empty(),
      h.heading('D. Sarana dan Prasarana'),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('E. Target Peserta Didik'),
      h.bullet('Peserta didik reguler'),
      h.bullet('Peserta didik dengan kesulitan belajar (membutuhkan scaffolding)'),
      h.bullet('Peserta didik dengan pencapaian tinggi (membutuhkan pengayaan)'),
      h.empty(),
      h.heading('F. Capaian Pembelajaran (CP)'),
      h.para(`Mengacu pada: ${ctx.regulasiCP}`, { italic: true }),
      h.para('Elemen CP: ____________________________________________________________', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('G. Tujuan Pembelajaran'),
      h.numbered('___________________________________________________________________', 1),
      h.numbered('___________________________________________________________________', 2),
      h.numbered('___________________________________________________________________', 3),
      h.empty(),
      h.heading('H. Pemahaman Bermakna'),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('I. Pertanyaan Pemantik'),
      h.numbered('___________________________________________________________________?', 1),
      h.numbered('___________________________________________________________________?', 2),
      h.empty(),
      h.heading('J. Kegiatan Pembelajaran'),
      h.heading('Pendahuluan', 3),
      h.table(
        ['Kegiatan', 'Alokasi Waktu'],
        [
          ['Salam, doa, dan presensi kehadiran', '5 menit'],
          ['Apersepsi: menghubungkan materi sebelumnya / pengalaman peserta didik', '5 menit'],
          ['Menyampaikan tujuan pembelajaran dan pertanyaan pemantik', '5 menit']
        ]
      ),
      h.empty(),
      h.heading('Kegiatan Inti', 3),
      h.table(
        ['Fase/Langkah', 'Kegiatan', 'Alokasi Waktu'],
        [
          ['Stimulus / Orientasi', 'Tutor menyajikan materi stimulus (teks, gambar, video, masalah)', ''],
          ['Eksplorasi', 'Peserta didik mengeksplorasi materi secara individu/kelompok', ''],
          ['Diskusi / Elaborasi', 'Peserta didik berdiskusi, menganalisis, merumuskan jawaban', ''],
          ['Konfirmasi / Presentasi', 'Presentasi hasil, umpan balik dari tutor dan teman sejawat', ''],
          ['Diferensiasi', 'Remedial bagi yang perlu / Pengayaan bagi yang mampu', '']
        ]
      ),
      h.empty(),
      h.heading('Penutup', 3),
      h.table(
        ['Kegiatan', 'Alokasi Waktu'],
        [
          ['Refleksi bersama: apa yang dipelajari hari ini', '5 menit'],
          ['Asesmen formatif singkat (exit ticket / pertanyaan refleksi)', '5 menit'],
          ['Informasi pertemuan berikutnya, penugasan, doa penutup', '5 menit']
        ]
      ),
      h.empty(),
      h.heading('K. Asesmen'),
      h.heading('Asesmen Formatif', 3),
      h.para('Jenis: Observasi / Penugasan / Quiz / Pertanyaan Lisan *', { indent: false }),
      h.para('Instrumen: ____________________________________________________________', { indent: false }),
      h.heading('Asesmen Sumatif', 3),
      h.para('Jenis: Tes Tertulis / Proyek / Portofolio / Presentasi / Praktik *', { indent: false }),
      h.para('Instrumen: ____________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('L. Pengayaan dan Remedial'),
      h.para('Pengayaan: ____________________________________________________________', { indent: false }),
      h.para('Remedial : ____________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('M. Refleksi Pendidik'),
      h.numbered('Apakah tujuan pembelajaran tercapai? Bagaimana buktinya?', 1),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Apa tantangan yang dihadapi? Bagaimana mengatasinya?', 2),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Apa yang perlu diperbaiki untuk pertemuan selanjutnya?', 3),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('N. Lampiran'),
      h.bullet('Bahan ajar / media pembelajaran'),
      h.bullet('LKPD (Lembar Kerja Peserta Didik)'),
      h.bullet('Instrumen asesmen'),
      h.bullet('Rubrik penilaian'),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  // =================================================
  // 3.1-02: Kalender Akademik
  // =================================================
  'B3-3.1-02': function(ctx) {
    const h = DocGenerator.h;
    const bulan = ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
                   'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'];
    const tahun1 = ctx.tahunAjaran.split('/')[0];
    const tahun2 = ctx.tahunAjaran.split('/')[1];

    const content = [
      h.title('Kalender Pendidikan / Kalender Akademik'),
      h.para(`${ctx.lembaga.nama} — Tahun Ajaran ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER, bold: true }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Ringkasan Waktu Efektif'),
      h.table(
        ['Semester', 'Bulan', 'Minggu Efektif', 'Keterangan'],
        [
          ['Ganjil', `Juli — Desember ${tahun1}`, '18-20 minggu', 'Termasuk PTS dan PAS'],
          ['Genap', `Januari — Juni ${tahun2}`, '18-20 minggu', 'Termasuk PTS, PAT, dan P5']
        ]
      ),
      h.empty(),
      h.heading('B. Rincian Kalender Akademik'),
    ];

    const kegiatanPerBulan = [
      { bulan: `Juli ${tahun1}`, kegiatan: ['Awal tahun ajaran baru', 'MPLS (Masa Pengenalan Lingkungan Satuan Pendidikan)', 'Asesmen diagnostik awal', 'Penyusunan kesepakatan kelas'] },
      { bulan: `Agustus ${tahun1}`, kegiatan: ['Pembelajaran efektif', 'HUT RI (17 Agustus) — Upacara & lomba', 'Penguatan karakter kebangsaan'] },
      { bulan: `September ${tahun1}`, kegiatan: ['Pembelajaran efektif', 'Penilaian Tengah Semester (PTS) Ganjil'] },
      { bulan: `Oktober ${tahun1}`, kegiatan: ['Pembelajaran efektif', 'Hari Batik Nasional (2 Oktober)', 'Hari Sumpah Pemuda (28 Oktober)'] },
      { bulan: `November ${tahun1}`, kegiatan: ['Pembelajaran efektif', 'Hari Pahlawan (10 November)', 'Persiapan PAS'] },
      { bulan: `Desember ${tahun1}`, kegiatan: ['Penilaian Akhir Semester (PAS) Ganjil', 'Pembagian rapor semester ganjil', 'Libur akhir semester'] },
      { bulan: `Januari ${tahun2}`, kegiatan: ['Awal semester genap', 'Pembelajaran efektif'] },
      { bulan: `Februari ${tahun2}`, kegiatan: ['Pembelajaran efektif', 'Pelaksanaan Projek P5'] },
      { bulan: `Maret ${tahun2}`, kegiatan: ['Pembelajaran efektif', 'PTS Genap'] },
      { bulan: `April ${tahun2}`, kegiatan: ['Pembelajaran efektif', 'Hari Kartini (21 April)'] },
      { bulan: `Mei ${tahun2}`, kegiatan: ['Hardiknas (2 Mei)', 'Persiapan PAT'] },
      { bulan: `Juni ${tahun2}`, kegiatan: ['Penilaian Akhir Tahun (PAT)', 'Pembagian rapor semester genap', 'Kenaikan kelas / Kelulusan', 'Libur akhir tahun ajaran'] }
    ];

    kegiatanPerBulan.forEach(item => {
      content.push(
        h.table(
          ['Bulan', 'Kegiatan'],
          item.kegiatan.map((k, i) => [i === 0 ? item.bulan : '', k])
        )
      );
    });

    content.push(
      h.empty(),
      h.heading('C. Hari Libur Nasional dan Keagamaan'),
      h.para('(Disesuaikan dengan Keputusan Bersama Menteri tentang Hari Libur Nasional dan Cuti Bersama Tahun yang bersangkutan)', { italic: true }),
      h.empty(),
      ...h.signature(ctx)
    );
    return content;
  },

  // =================================================
  // 3.1-03: Program Tahunan (Prota)
  // =================================================
  'B3-3.1-03': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Program Tahunan (PROTA)'),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.table(
        ['Komponen', 'Keterangan'],
        [
          ['Satuan Pendidikan', ctx.lembaga.nama],
          ['Program', `${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`],
          ['Mata Pelajaran', ctx.mapel],
          ['Kelas / Fase', `_____ / Fase ${ctx.fase}`],
          ['Tahun Ajaran', ctx.tahunAjaran],
          ['Tutor', '___________________________']
        ]
      ),
      h.empty(),
      h.heading('Semester Ganjil'),
      h.table(
        ['No', 'Topik / Bab / Lingkup Materi', 'Alokasi Waktu (JP)', 'Keterangan'],
        [
          ['1', '', '', ''],
          ['2', '', '', ''],
          ['3', '', '', ''],
          ['4', '', '', ''],
          ['5', '', '', ''],
          ['6', '', '', ''],
          ['', 'PTS Ganjil', '2 JP', 'Penilaian Tengah Semester'],
          ['', 'PAS Ganjil', '2 JP', 'Penilaian Akhir Semester'],
          ['', 'TOTAL', '', '']
        ]
      ),
      h.empty(),
      h.heading('Semester Genap'),
      h.table(
        ['No', 'Topik / Bab / Lingkup Materi', 'Alokasi Waktu (JP)', 'Keterangan'],
        [
          ['1', '', '', ''],
          ['2', '', '', ''],
          ['3', '', '', ''],
          ['4', '', '', ''],
          ['5', '', '', ''],
          ['6', '', '', ''],
          ['', 'PTS Genap', '2 JP', 'Penilaian Tengah Semester'],
          ['', 'PAT', '2 JP', 'Penilaian Akhir Tahun'],
          ['', 'TOTAL', '', '']
        ]
      ),
      h.empty(),
      h.para(`Catatan: 1 JP = ${ctx.pkg.jpMenit} menit (${ctx.pkg.nama})`, { italic: true }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  // =================================================
  // 3.1-04: Program Semester (Prosem)
  // =================================================
  'B3-3.1-04': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Program Semester (PROSEM)'),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.table(
        ['Komponen', 'Keterangan'],
        [
          ['Satuan Pendidikan', ctx.lembaga.nama],
          ['Program', `${ctx.pkg.nama}`],
          ['Mata Pelajaran', ctx.mapel],
          ['Kelas / Fase', `_____ / Fase ${ctx.fase}`],
          ['Semester', 'Ganjil / Genap *'],
          ['Tahun Ajaran', ctx.tahunAjaran]
        ]
      ),
      h.empty(),
      h.heading('Distribusi Materi per Minggu'),
      h.table(
        ['Minggu ke-', 'Bulan', 'Topik / Materi', 'JP', 'Kegiatan Asesmen', 'Keterangan'],
        Array.from({length: 20}, (_, i) => [String(i+1), '', '', '', '', ''])
      ),
      h.empty(),
      h.para(`1 JP = ${ctx.pkg.jpMenit} menit`, { italic: true }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  // =================================================
  // 3.1-05: Silabus / Alur Tujuan Pembelajaran (ATP)
  // =================================================
  'B3-3.1-05': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Alur Tujuan Pembelajaran (ATP)'),
      h.heading('Silabus Kurikulum Merdeka', 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.table(
        ['Komponen', 'Keterangan'],
        [
          ['Satuan Pendidikan', ctx.lembaga.nama],
          ['Program', `${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`],
          ['Mata Pelajaran', ctx.mapel],
          ['Fase', ctx.fase],
          ['Tahun Ajaran', ctx.tahunAjaran]
        ]
      ),
      h.empty(),
      h.heading('Capaian Pembelajaran (CP)'),
      h.para(`Referensi: ${ctx.regulasiCP}`, { italic: true }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('Alur Tujuan Pembelajaran'),
      h.table(
        ['No', 'Tujuan Pembelajaran', 'Konten/Materi', 'Kata Kerja Operasional', 'Dimensi Karakter', 'JP', 'Asesmen'],
        Array.from({length: 10}, (_, i) => [String(i+1), '', '', '', '', '', ''])
      ),
      h.empty(),
      h.heading('Catatan'),
      h.bullet('ATP disusun berdasarkan analisis CP dan disesuaikan dengan konteks PKBM'),
      h.bullet('Urutan tujuan pembelajaran dapat disesuaikan dengan kebutuhan peserta didik'),
      h.bullet(`Alokasi waktu menggunakan sistem SKK: 1 JP = ${ctx.pkg.jpMenit} menit`),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  // =================================================
  // 3.1-06: LKPD Kontekstual
  // =================================================
  'B3-3.1-06': function(ctx) {
    const h = DocGenerator.h;
    const konteks = {
      A: 'kehidupan sehari-hari di rumah dan lingkungan sekitar',
      B: 'permasalahan di lingkungan masyarakat dan komunitas',
      C: 'isu aktual di dunia kerja, masyarakat, dan kehidupan global'
    };
    const content = [
      h.title('Lembar Kerja Peserta Didik (LKPD) Kontekstual'),
      h.referensiRegulasi(ctx),
      h.para(`Konteks pembelajaran: ${konteks[ctx.paket]}`, { italic: true }),
      h.empty(),
      h.para(`Program: ${ctx.pkg.nama} | Mapel: ${ctx.mapel} | Fase: ${ctx.fase}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Identitas'),
      h.para('Nama: ___________________________ Kelas: _____ Tanggal: ___________', { indent: false }),
      h.empty(),
      h.heading('Tujuan Pembelajaran'),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('Kegiatan 1 — Orientasi Konteks'),
      h.para(`Perhatikan situasi/permasalahan berikut yang berkaitan dengan ${konteks[ctx.paket]}:`, { indent: true }),
      h.para('[Sajikan stimulus kontekstual: cerita, data, gambar, atau kasus]', { italic: true }),
      h.empty(),
      h.heading('Kegiatan 2 — Eksplorasi & Analisis'),
      h.numbered('Apa yang kamu pahami dari situasi di atas?', 1),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Konsep apa yang berkaitan dengan situasi tersebut?', 2),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Bagaimana kamu menerapkan konsep tersebut untuk menyelesaikan masalah?', 3),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('Kegiatan 3 — Penerapan'),
      h.para('Kerjakan tugas berikut:', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('Refleksi'),
      h.table(
        ['Pertanyaan', 'Jawaban'],
        [
          ['Apa yang sudah kamu pahami dari kegiatan ini?', ''],
          ['Apa manfaat materi ini dalam kehidupan nyata?', ''],
          ['Apa yang masih perlu kamu pelajari?', '']
        ]
      )
    ];
    return content;
  },

  // =================================================
  // 3.2-01 s/d 3.2-04: Penilaian Formatif
  // =================================================
  'B3-3.2-01': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Contoh Instrumen Penilaian Formatif'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | ${ctx.mapel} | Fase ${ctx.fase}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('A. Quiz / Pertanyaan Refleksi (Exit Ticket)'),
      h.para('Diberikan di akhir pembelajaran sebagai umpan balik cepat:', { italic: true }),
      h.empty(),
      h.table(
        ['No', 'Pertanyaan', 'Tujuan'],
        [
          ['1', 'Apa satu hal terpenting yang kamu pelajari hari ini?', 'Mengukur pemahaman materi'],
          ['2', 'Bagian mana yang masih terasa sulit?', 'Identifikasi kesulitan'],
          ['3', 'Jika kamu harus menjelaskan materi ini ke teman, apa yang akan kamu katakan?', 'Mengukur kedalaman pemahaman'],
          ['4', 'Berikan contoh nyata dari konsep yang kita pelajari!', 'Mengukur kemampuan aplikasi'],
          ['5', 'Sebutkan 3 kata kunci dari materi hari ini!', 'Mengukur retensi informasi']
        ]
      ),
      h.empty(),
      h.heading('B. Tugas Formatif Singkat'),
      h.para('[Tutor mengisi soal/tugas sesuai materi yang diajarkan]', { italic: true }),
      h.para('Soal 1: _______________________________________________________________', { indent: false }),
      h.para('Soal 2: _______________________________________________________________', { indent: false }),
      h.para('Soal 3: _______________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('C. Observasi Partisipasi'),
      h.table(
        ['No', 'Nama Peserta Didik', 'Aktif Bertanya', 'Aktif Menjawab', 'Kerja Kelompok', 'Catatan'],
        Array.from({length: 5}, (_, i) => [String(i+1), '', '', '', '', ''])
      ),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  'B3-3.2-02': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Catatan Hasil Penilaian Formatif'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | ${ctx.mapel} | Fase ${ctx.fase} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Rekapitulasi Hasil Penilaian Formatif'),
      h.table(
        ['No', 'Nama Peserta Didik', 'Formatif 1', 'Formatif 2', 'Formatif 3', 'Formatif 4', 'Rata-rata', 'Tindak Lanjut'],
        Array.from({length: 10}, (_, i) => [String(i+1), '', '', '', '', '', '', 'Remedial / Lanjut'])
      ),
      h.empty(),
      h.heading('Analisis'),
      h.para('Jumlah peserta didik yang sudah mencapai tujuan pembelajaran: ______ orang', { indent: false }),
      h.para('Jumlah peserta didik yang membutuhkan remedial: ______ orang', { indent: false }),
      h.para('Materi yang paling sulit dipahami: ________________________________________', { indent: false }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  'B3-3.2-03': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Jurnal Perkembangan Peserta Didik'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | ${ctx.mapel} | Tutor: ______________ | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      ...Array.from({length: 10}, (_, i) => [
        h.heading(`Peserta Didik ${i+1}: ___________________________`, 3),
        h.table(['Tanggal', 'Aspek Perkembangan', 'Catatan', 'Tindak Lanjut'],
          [['', 'Akademik', '', ''], ['', 'Sikap/Karakter', '', ''], ['', 'Sosial-Emosional', '', '']]),
        h.empty()
      ]).flat(),
      ...h.signatureTutor(ctx)
    ];
  },

  'B3-3.2-04': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Template Umpan Balik Tertulis'),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.para('Template yang digunakan tutor untuk menulis umpan balik pada hasil kerja peserta didik (LKPD, tugas, ujian):', { italic: true }),
      h.empty(),
      h.heading('Format Umpan Balik'),
      h.table(
        ['Komponen', 'Contoh Kalimat'],
        [
          ['1. Apresiasi (Apa yang sudah baik)', '"Kamu sudah berhasil menjelaskan konsep... dengan tepat"'],
          ['2. Identifikasi (Apa yang perlu diperbaiki)', '"Pada bagian..., jawabanmu perlu dilengkapi dengan..."'],
          ['3. Panduan (Bagaimana memperbaikinya)', '"Coba baca kembali halaman... dan perhatikan contoh..."'],
          ['4. Motivasi (Dorongan untuk berkembang)', '"Dengan sedikit latihan lagi, kamu pasti bisa menguasainya!"']
        ]
      ),
      h.empty(),
      h.heading('Catatan Umpan Balik per Peserta Didik'),
      h.table(
        ['No', 'Nama', 'Jenis Tugas', 'Umpan Balik yang Diberikan', 'Tanggal'],
        Array.from({length: 8}, (_, i) => [String(i+1), '', '', '', ''])
      ),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  // =================================================
  // 3.3-01 s/d 3.3-04: Penilaian Sumatif
  // =================================================
  'B3-3.3-01': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Soal Ujian Sumatif'),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.table(['Komponen', 'Keterangan'], [
        ['Satuan Pendidikan', ctx.lembaga.nama],
        ['Program', ctx.pkg.nama],
        ['Mata Pelajaran', ctx.mapel],
        ['Kelas / Fase', `_____ / Fase ${ctx.fase}`],
        ['Semester', 'Ganjil / Genap *'],
        ['Waktu', `_____ menit`],
        ['Tahun Ajaran', ctx.tahunAjaran]
      ]),
      h.empty(),
      h.heading('I. Pilihan Ganda (10 soal × 2 poin = 20 poin)'),
      ...Array.from({length: 5}, (_, i) => [
        h.para(`${i+1}. _______________________________________________________________`, { indent: false }),
        h.para('    a. _______________  b. _______________  c. _______________  d. _______________', { indent: false }),
        h.empty()
      ]).flat(),
      h.para('... (lanjutkan hingga soal ke-10)', { italic: true }),
      h.empty(),
      h.heading('II. Uraian Singkat (5 soal × 6 poin = 30 poin)'),
      ...Array.from({length: 3}, (_, i) => [
        h.para(`${i+1}. _______________________________________________________________`, { indent: false }),
        h.para('Jawab: ____________________________________________________________', { indent: false }),
        h.empty()
      ]).flat(),
      h.empty(),
      h.heading('III. Uraian (2 soal × 25 poin = 50 poin)'),
      h.para('1. ________________________________________________________________', { indent: false }),
      h.para('   ________________________________________________________________', { indent: false }),
      h.para('Jawab:', { indent: false }),
      h.empty(),
      h.para('— Selamat Mengerjakan —', { align: docx.AlignmentType.CENTER, bold: true }),
    ];
  },

  'B3-3.3-02': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Kisi-Kisi Soal Ujian'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | ${ctx.mapel} | Fase ${ctx.fase} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.table(
        ['No', 'Tujuan Pembelajaran', 'Materi', 'Indikator Soal', 'Level Kognitif', 'Bentuk Soal', 'No. Soal'],
        Array.from({length: 10}, (_, i) => [String(i+1), '', '', '', `C${Math.min(i%3+3, 6)}`, 'PG / Uraian', ''])
      ),
      h.empty(),
      h.para(`Level kognitif disesuaikan: ${ctx.pkg.levelHOTS}`, { italic: true }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  'B3-3.3-03': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Rubrik Penilaian'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | ${ctx.mapel}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('A. Rubrik Penilaian Uraian'),
      h.table(
        ['Skor', 'Kriteria'],
        [
          ['4 (Sangat Baik)', 'Jawaban lengkap, tepat, disertai contoh/analisis yang relevan'],
          ['3 (Baik)', 'Jawaban tepat namun kurang lengkap atau kurang contoh'],
          ['2 (Cukup)', 'Jawaban sebagian benar, ada miskonsepsi minor'],
          ['1 (Kurang)', 'Jawaban tidak tepat namun menunjukkan usaha'],
          ['0', 'Tidak menjawab']
        ]
      ),
      h.empty(),
      h.heading('B. Rubrik Penilaian Proyek'),
      h.table(
        ['Aspek', '4 (Sangat Baik)', '3 (Baik)', '2 (Cukup)', '1 (Kurang)'],
        [
          ['Konten/Isi', 'Lengkap, akurat, mendalam', 'Cukup lengkap & akurat', 'Kurang lengkap', 'Tidak sesuai'],
          ['Kreativitas', 'Sangat kreatif & inovatif', 'Kreatif', 'Cukup kreatif', 'Kurang kreatif'],
          ['Presentasi', 'Jelas, terstruktur, percaya diri', 'Cukup jelas', 'Kurang terstruktur', 'Sulit dipahami'],
          ['Kerja Sama', 'Kolaborasi sangat baik', 'Kolaborasi baik', 'Cukup kolaboratif', 'Kurang kolaboratif']
        ]
      ),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  'B3-3.3-04': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Daftar Nilai Peserta Didik'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | ${ctx.mapel} | Kelas: _____ | Semester: _____ | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.table(
        ['No', 'Nama Peserta Didik', 'PTS', 'PAS/PAT', 'Tugas', 'Proyek', 'Rata-rata', 'Predikat'],
        Array.from({length: 15}, (_, i) => [String(i+1), '', '', '', '', '', '', ''])
      ),
      h.empty(),
      h.para('Predikat: A (≥90) | B (80-89) | C (70-79) | D (<70)', { italic: true }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  // =================================================
  // 3.4-01 s/d 3.4-04: Pelaporan Hasil
  // =================================================
  'B3-3.4-01': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Template Laporan Hasil Belajar (Rapor)'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.lembaga.nama} | ${ctx.pkg.nama} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER, bold: true }),
      h.empty(),
      h.heading('Identitas Peserta Didik'),
      h.table(['Komponen', 'Isian'], [
        ['Nama', '___________________________'],
        ['NISN', '___________________________'],
        ['Kelas / Fase', `_____ / Fase ${ctx.fase}`],
        ['Semester', '___________________________'],
        ['Tahun Ajaran', ctx.tahunAjaran]
      ]),
      h.empty(),
      h.heading('A. Capaian Pembelajaran — Kelompok Umum'),
      h.table(
        ['No', 'Mata Pelajaran', 'Nilai', 'Predikat', 'Deskripsi Capaian'],
        CONFIG.subjects[ctx.paket].umum.map((s, i) => [String(i+1), s, '', '', ''])
      ),
      h.empty(),
      h.heading('B. Capaian Pembelajaran — Kelompok Pemberdayaan & Keterampilan'),
      h.table(
        ['No', 'Mata Pelajaran', 'Nilai', 'Predikat', 'Deskripsi Capaian'],
        CONFIG.subjects[ctx.paket].pemberdayaan.map((s, i) => [String(i+1), s, '', '', ''])
      ),
      h.empty(),
      h.heading('C. Catatan Perkembangan'),
      h.table(['Aspek', 'Deskripsi'], [
        ['Sikap Spiritual', ''],
        ['Sikap Sosial', ''],
        ['Kehadiran', '_____ dari _____ pertemuan (____%)'],
        ['Catatan Tutor Wali', ''],
        ['Rekomendasi', '']
      ]),
      h.empty(),
      h.table(['Orang Tua/Wali', 'Tutor Wali', 'Kepala PKBM'], [
        ['', '', ''], ['', '', ''],
        ['(_______________)', '(_______________)', `(${ctx.lembaga.kepala.nama || '_______________'})`]
      ])
    ];
  },

  'B3-3.4-02': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Rekapitulasi Nilai & Analisis Capaian Kompetensi'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | ${ctx.mapel} | Kelas: _____ | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.table(
        ['No', 'Nama', 'TP-1', 'TP-2', 'TP-3', 'TP-4', 'TP-5', 'Rata-rata', 'Ketuntasan'],
        Array.from({length: 10}, (_, i) => [String(i+1), '', '', '', '', '', '', '', 'T / BT'])
      ),
      h.para('TP = Tujuan Pembelajaran | T = Tuntas | BT = Belum Tuntas', { italic: true, size: 20 }),
      h.empty(),
      h.heading('Analisis'),
      h.para('Persentase ketuntasan: ______ %', { indent: false }),
      h.para('TP yang paling dikuasai: ________________________________________________', { indent: false }),
      h.para('TP yang paling sulit: ____________________________________________________', { indent: false }),
      h.para('Rencana tindak lanjut: ___________________________________________________', { indent: false }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  'B3-3.4-03': function(ctx) {
    const h = DocGenerator.h;
    // Reusing Butir 1 remedial template with different context
    return Butir1Templates['B1-1.3-01'](ctx);
  },

  'B3-3.4-04': function(ctx) {
    const h = DocGenerator.h;
    // Reusing Butir 1 buku penghubung template
    return Butir1Templates['B1-1.3-04'](ctx);
  },

  // =================================================
  // 3.5-01 s/d 3.5-03: HOTS & Kontekstual
  // =================================================
  'B3-3.5-01': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Modul Ajar Berbasis HOTS'),
      h.heading(`Higher Order Thinking Skills — Level ${ctx.pkg.levelHOTS}`, 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Informasi Umum'),
      h.table(['Komponen', 'Keterangan'], [
        ['Satuan Pendidikan', ctx.lembaga.nama],
        ['Program', `${ctx.pkg.nama}`],
        ['Mata Pelajaran', ctx.mapel],
        ['Kelas / Fase', `_____ / Fase ${ctx.fase}`],
        ['Level Kognitif Target', ctx.pkg.levelHOTS],
        ['Alokasi Waktu', `4 JP × ${ctx.pkg.jpMenit} menit = ${4 * ctx.pkg.jpMenit} menit`]
      ]),
      h.empty(),
      h.heading('B. Tujuan Pembelajaran HOTS'),
      h.numbered(`Peserta didik mampu ${ctx.paket === 'A' ? 'menganalisis informasi dan membandingkan' : ctx.paket === 'B' ? 'mengevaluasi argumen dan membuat penilaian' : 'mencipta solusi baru dan merancang produk'} berdasarkan materi yang dipelajari`, 1),
      h.empty(),
      h.heading('C. Strategi Pembelajaran'),
      h.para(`Level kognitif yang ditargetkan: ${ctx.pkg.levelHOTS}`, { bold: true }),
      h.table(['Tingkat', 'Kata Kerja', 'Contoh Kegiatan'], [
        ['C4 — Menganalisis', 'Membedakan, mengorganisasi, menghubungkan', 'Menganalisis data, membandingkan konsep'],
        ['C5 — Mengevaluasi', 'Menilai, mengkritik, memeriksa', 'Debat, review sejawat, penilaian kritis'],
        ['C6 — Mencipta', 'Merancang, membangun, merencanakan', 'Membuat proyek, menyusun proposal']
      ]),
      h.empty(),
      h.heading('D. Langkah Kegiatan'),
      h.bullet('Stimulus: Sajikan masalah/kasus yang menuntut pemikiran tingkat tinggi'),
      h.bullet('Eksplorasi: Peserta didik menganalisis, mengevaluasi, atau merancang solusi'),
      h.bullet('Diskusi: Presentasi dan umpan balik kritis'),
      h.bullet('Refleksi: Evaluasi proses berpikir'),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  'B3-3.5-02': function(ctx) {
    const h = DocGenerator.h;
    const levelSOAL = {
      A: ['Menganalisis', 'Apa perbedaan antara ... dan ...? Jelaskan!', 'Kelompokkan data berikut berdasarkan ...!', 'Hubungkan konsep ... dengan kehidupan sehari-hari!'],
      B: ['Mengevaluasi', 'Menurut pendapatmu, apakah ... sudah tepat? Berikan alasan!', 'Bandingkan dua pendekatan berikut, mana yang lebih efektif?', 'Kritisi pernyataan berikut: "..."'],
      C: ['Mencipta', 'Rancanglah solusi untuk masalah ... !', 'Susunlah proposal kegiatan untuk ...!', 'Ciptakan model/desain baru untuk ...!']
    };

    const ls = levelSOAL[ctx.paket];
    return [
      h.title(`LKPD Analisis & Berpikir Kritis — Level ${ls[0]}`),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | ${ctx.mapel} | Fase ${ctx.fase}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Identitas'),
      h.para('Nama: ___________________________ Kelas: _____ Tanggal: _____', { indent: false }),
      h.empty(),
      h.heading(`Soal-Soal Level ${ls[0]} (${ctx.pkg.levelHOTS})`),
      ...ls.slice(1).map((s, i) => [
        h.numbered(s, i+1),
        h.para('Jawaban: ______________________________________________________________', { indent: false }),
        h.para('______________________________________________________________', { indent: false }),
        h.empty()
      ]).flat(),
      h.empty(),
      h.heading('Refleksi Proses Berpikir'),
      h.para('Jelaskan langkah-langkah berpikir yang kamu gunakan untuk menjawab soal di atas:', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false })
    ];
  },

  'B3-3.5-03': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Template Proyek PBL (Project Based Learning)'),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Identitas Proyek'),
      h.table(['Komponen', 'Keterangan'], [
        ['Satuan Pendidikan', ctx.lembaga.nama],
        ['Program', ctx.pkg.nama],
        ['Mata Pelajaran', ctx.mapel],
        ['Tema Proyek', '___________________________'],
        ['Durasi', '2-4 minggu'],
        ['Fase', ctx.fase]
      ]),
      h.empty(),
      h.heading('B. Pertanyaan Pemandu'),
      h.para('"Bagaimana kita bisa ... untuk menyelesaikan masalah ...?"', { bold: true, align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('C. Tahapan Proyek'),
      h.table(['Minggu', 'Tahap', 'Kegiatan', 'Output'], [
        ['1', 'Identifikasi Masalah', 'Riset, observasi, wawancara', 'Rumusan masalah'],
        ['2', 'Perencanaan', 'Merancang solusi, distribusi tugas', 'Rencana aksi'],
        ['3', 'Pelaksanaan', 'Membuat produk/karya', 'Prototipe/draft'],
        ['4', 'Presentasi & Refleksi', 'Presentasi, evaluasi sejawat', 'Produk final + laporan']
      ]),
      h.empty(),
      h.heading('D. Rubrik Penilaian Proyek'),
      h.table(['Aspek', '4', '3', '2', '1'], [
        ['Pemahaman Masalah', 'Mendalam', 'Cukup', 'Dangkal', 'Tidak tepat'],
        ['Solusi/Kreativitas', 'Inovatif', 'Kreatif', 'Standar', 'Kurang'],
        ['Kolaborasi', 'Sangat baik', 'Baik', 'Cukup', 'Kurang'],
        ['Presentasi', 'Sangat jelas', 'Jelas', 'Cukup', 'Kurang']
      ]),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  }
};
